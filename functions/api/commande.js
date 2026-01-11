export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();

    const required = ["type", "nom", "email", "phone", "allergies", "plats", "dayLabel"];
    for (const k of required) {
      if (!body[k] || String(body[k]).trim() === "") {
        return json({ error: `Champ manquant : ${k}` }, 400);
      }
    }

    // Réservation: people obligatoire
    if (body.type === "reservation") {
      if (!body.people || String(body.people).trim() === "") {
        return json({ error: "Champ manquant : people" }, 400);
      }
    }

    // Livraison: adresse + commentaire obligatoires
    if (body.type === "livraison") {
      const req2 = ["adresseLivraison", "commentaire"];
      for (const k of req2) {
        if (!body[k] || String(body[k]).trim() === "") {
          return json({ error: `Champ manquant : ${k}` }, 400);
        }
      }
    }

    const lines = (body.plats || []).map((p, i) => {
      const sauces = (p.sauces || []).join(" + ") || "Aucune";
      const acc = p.accompagnement || "Aucun";
      const comps = (p.complements || []).join(" + ") || "Aucun";
      return `Plat #${i + 1}
- Sauce: ${sauces}
- Accompagnement: ${acc}
- Compléments: ${comps}
- Quantité: ${p.qty || 1}
`;
    }).join("\n");

    const text = `COMMANDE - Tante Magni

Type: ${String(body.type).toUpperCase()}
Jour: ${body.dayLabel}

Nom: ${body.nom}
Email: ${body.email}
Téléphone: ${body.phone}

Allergies: ${body.allergies}

${body.type === "reservation" ? `Personnes: ${body.people}\n` : ""}
${body.type === "livraison" ? `Adresse: ${body.adresseLivraison}\n` : ""}

Commentaire: ${body.commentaire || "-"}

--- PLATS ---
${lines}
`;

    await sendEmailResend(env, {
      to: "dragonhousefamily@gmail.com",
      subject: `Commande ${body.type} - Tante Magni (${body.dayLabel})`,
      text
    });

    return json({ ok: true }, 200);
  } catch (e) {
    return json({ error: "Erreur serveur" }, 500);
  }
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
}

async function sendEmailResend(env, { to, subject, text }) {
  if (!env.RESEND_API_KEY) throw new Error("RESEND_API_KEY manquante");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: "onboarding@resend.dev",
      to: [to],
      subject,
      text
    })
  });

  if (!res.ok) throw new Error("Échec envoi email");
}

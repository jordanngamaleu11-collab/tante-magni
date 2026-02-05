export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();

    const plats = Array.isArray(body.plats) ? body.plats : [];
    const dayLabel =
      body.dayLabel ||
      plats?.[0]?.dayLabel ||
      body?.reservation?.dayLabel ||
      "Non précisé";

    const required = ["nom", "telephone", "email", "personnes", "heure", "allergies"];
    for (const k of required) {
      if (body[k] === undefined || body[k] === null || String(body[k]).trim() === "") {
        return json({ ok: false, error: `Champ manquant : ${k}` }, 400);
      }
    }
    if (!plats.length) {
      return json({ ok: false, error: "Aucun plat sélectionné" }, 400);
    }

    const OWNER_EMAIL = env.OWNER_EMAIL || "jordan.ngamaleu.work@gmail.com";
    const FROM_EMAIL = env.FROM_EMAIL || "Tante Magni <onboarding@resend.dev>";
    const RESEND_API_KEY = env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      return json({ ok: false, error: "RESEND_API_KEY manquant côté Cloudflare" }, 500);
    }

    const subject = `🍽️ Réservation — ${body.nom} — ${dayLabel} — ${body.heure}`;

    const platsTxt = plats
      .map((p, i) => {
        const sauce = p.sauce?.label || p.sauce || "—";
        const acc = p.accompagnement?.label || p.accompagnement || "—";
        const comps = Array.isArray(p.complements)
          ? p.complements.map((c) => c.label || c).join(", ")
          : (p.complements?.label || p.complements || "—");
        const d = p.dayLabel || dayLabel;
        return `Plat #${i + 1} — ${d}\n- Sauce: ${sauce}\n- Accompagnement: ${acc}\n- Compléments: ${comps}`;
      })
      .join("\n\n");

    const text = `
RÉSERVATION

Jour: ${dayLabel}

Client:
- Nom: ${body.nom}
- Téléphone: ${body.telephone}
- Email: ${body.email}
- Nombre de personnes: ${body.personnes}
- Heure: ${body.heure}
- Allergies: ${body.allergies}
- Commentaire: ${body.commentaire || "—"}

Plats:
${platsTxt}
`.trim();

    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [OWNER_EMAIL],
        subject,
        text,
      }),
    });

    const data = await resp.json();
    if (!resp.ok) {
      return json({ ok: false, error: data?.message || "Erreur Resend", details: data }, 500);
    }

    return json({ ok: true, message: "Réservation envoyée ✅", data }, 200);
  } catch (e) {
    return json({ ok: false, error: e?.message || "Erreur serveur" }, 500);
  }
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function onRequestPost(context) {
  try {
    const { request, env } = context;

    // 1) Lire le JSON
    const body = await request.json().catch(() => null);
    if (!body) return json({ error: "JSON invalide" }, 400);

    // 2) Validation champs obligatoires
    const required = ["nom", "email", "phone", "people", "date", "time"];
    for (const key of required) {
      if (!body[key] || String(body[key]).trim() === "") {
        return json({ error: `Champ manquant : ${key}` }, 400);
      }
    }

    // 3) Nettoyage simple
    const nom = String(body.nom).trim();
    const email = String(body.email).trim();
    const phone = String(body.phone).trim();
    const people = String(body.people).trim();
    const date = String(body.date).trim();
    const time = String(body.time).trim();
    const service = String(body.service || "").trim();
    const message = String(body.message || "").trim();

    const text =
`Nouvelle réservation - Tante Magni

Nom: ${nom}
Email: ${email}
Téléphone: ${phone}
Personnes: ${people}
Date: ${date}
Heure: ${time}
Service: ${service || "-"}
Message: ${message || "-"}`;

    // ⚠️ IMPORTANT (test Resend) :
    // Mets TON email Resend ici pour tester d'abord.
    // Ensuite on changera vers dragonhousefamily@gmail.com.
    const DESTINATION_TEST = "jordanngamaleu11@gmail.com";

    await sendEmailResend(env, {
      to: DESTINATION_TEST,
      subject: "Nouvelle réservation - Tante Magni",
      text
    });

    return json({ ok: true }, 200);
  } catch (e) {
    // On renvoie le vrai message d'erreur pour comprendre
    return json({ error: String(e?.message || e) }, 500);
  }
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
}

async function sendEmailResend(env, { to, subject, text }) {
  if (!env.RESEND_API_KEY) throw new Error("RESEND_API_KEY manquante dans Cloudflare");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      // expéditeur test Resend
      from: "onboarding@resend.dev",
      to: [to],
      subject,
      text
    })
  });

  // ✅ Ici on récupère le message exact de Resend
  const responseText = await res.text().catch(() => "");

  if (!res.ok) {
    throw new Error(`Resend error ${res.status}: ${responseText}`);
  }

  return true;
}

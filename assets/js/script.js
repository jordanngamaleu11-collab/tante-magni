/* Helpers */
const $ = (sel) => document.querySelector(sel);

const killLoader = () => {
  const loader = $(".loader");
  if (!loader) return;
  loader.style.opacity = "0";
  setTimeout(() => loader.remove(), 350);
};

/* On load: year + gsap fallback */
window.addEventListener("load", () => {
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  if (typeof window.gsap === "undefined") {
    killLoader();
    return;
  }

  try {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      ".loader-logo",
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" }
    );

    gsap.to(".loader", { opacity: 0, duration: 0.8, delay: 1.6, onComplete: killLoader });

    gsap.utils.toArray(".reveal").forEach((el) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 85%" },
        y: 40,
        opacity: 0,
        duration: 0.9
      });
    });
  } catch (e) {
    killLoader();
    console.error(e);
  }
});

/* Phone builder */
const countryCode = $("#countryCode");
const localPhone = $("#localPhone");
const fullPhone = $("#phone");

function buildPhoneNumber() {
  if (!fullPhone) return;
  const code = (countryCode?.value || "+237").trim(); // default Cameroon
  const raw = (localPhone?.value || "").trim();
  const cleaned = raw.replace(/[^\d]/g, "").replace(/^0+/, "");
  fullPhone.value = code + cleaned;
}

if (countryCode && localPhone && fullPhone) {
  countryCode.addEventListener("change", buildPhoneNumber);
  localPhone.addEventListener("input", buildPhoneNumber);
  buildPhoneNumber();
}

/* Submit -> backend */
const form = $("#reservationForm");
const hint = $("#formHint");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    buildPhoneNumber();

    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    // Basic checks
    if (!payload.nom || !payload.email || !payload.phone || !payload.people || !payload.date || !payload.time) {
      if (hint) hint.textContent = "⚠️ Remplis tous les champs obligatoires.";
      return;
    }

    // sanity phone
    const digits = String(payload.phone).replace(/[^\d]/g, "").length;
    if (!String(payload.phone).startsWith("+") || digits < 10) {
      if (hint) hint.textContent = "⚠️ Numéro invalide. Exemple: +237690123456";
      return;
    }

    try {
      if (hint) hint.textContent = "⏳ Envoi en cours…";

      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (hint) hint.textContent = `❌ Erreur: ${json.error || "Impossible d'envoyer."}`;
        return;
      }

      if (hint) hint.textContent = "✅ Réservation envoyée. Merci !";
      form.reset();
      buildPhoneNumber();
    } catch (err) {
      console.error(err);
      if (hint) hint.textContent = "❌ Problème réseau. Réessaie.";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reservationForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Récupère champs
    const nom = form.querySelector('[name="nom"]')?.value?.trim() || "";
    const email = form.querySelector('[name="email"]')?.value?.trim() || "";
    const countryCode = form.querySelector('[name="countryCode"]')?.value?.trim() || "";
    const localPhone = form.querySelector('[name="localPhone"]')?.value?.trim() || "";
    const people = form.querySelector('[name="people"]')?.value?.trim() || "";
    const message = form.querySelector('[name="message"]')?.value?.trim() || "";
    const hint = document.getElementById("formHint");

    // Compose téléphone final
    const phone = `${countryCode}${localPhone.replace(/\s+/g, "")}`;

    // Vérifs mini
    if (!nom || !email || !countryCode || !localPhone || !people) {
      if (hint) {
        hint.textContent = "❌ Remplis tous les champs obligatoires avant de continuer vers le choix des plats.";
        hint.style.color = "#ff8a8a";
      }
      return;
    }

    // Stockage draft pour la page plats
    const draft = {
      type: "reservation",
      nom,
      email,
      phone,
      people,
      allergies: "aucun",     // tu peux laisser vide si tu veux
      commentaire: message     // on reprend le message comme commentaire
    };

    sessionStorage.setItem("tm_reservation_draft", JSON.stringify(draft));

    // Redirection vers page plats
    window.location.href = "./plats/index.html#jours";
  });
});


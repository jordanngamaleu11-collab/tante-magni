/* ===== MENU PAR JOUR ===== */
const MENU = {
  "Lundi": {
    sauces: ["Ndolè","Sauce tomate","Choux pistache","Sauce gombo","Légumes sautés","Sauce blanche","Aucun"],
    accompagnements: ["Viande de bœuf","Poulet","Poisson","Aucun"],
    complements: ["Riz parfumé","Plantain vapeur","Igname jaune","Igname blanc","Couscous frais","Frites de pommes","Frites de plantains","Râpé","Aucun"]
  },
  "Mardi": {
    sauces: ["Ndolè","Sauce tomate","Choux-pistache","Sauce gombo","Légumes sautés","Sauce pistache","Koki","Aucun"],
    accompagnements: ["Viande de bœuf","Poulet","Poisson","Aucun"],
    complements: ["Riz parfumé","Plantain vapeur","Igname jaune","Igname blanc","Frites de pommes","Frites de plantains","Couscous manioc","Couscous maïs","Banane vapeur","Aucun"]
  },
  "Mercredi": {
    sauces: ["Ndolè","Sauce tomate","Légumes sautés","Trippes sautés","Choux pistaches","Sauce gombo","Sauce blanche","Banane malaxée","Aucun"],
    accompagnements: ["Viande de bœuf","Poulet","Poisson","Aucun"],
    complements: ["Riz parfumé","Plantain vapeur","Igname jaune","Igname blanc","Frites de pommes","Frites de plantains","Couscous maïs","Macabo râpé","Aucun"]
  },
  "Jeudi": {
    sauces: ["Ndolè","Sauce tomate","Légumes sautés","Choux pistaches","Sauce gombo","Sauce pistache","Koki","Aucun"],
    accompagnements: ["Viande de bœuf","Poulet","Poisson","Aucun"],
    complements: ["Riz parfumé","Plantain vapeur","Igname jaune","Igname blanc","Frites de pommes","Frites de plantains","Couscous manioc","Couscous maïs","Banane vapeur","Aucun"]
  },
  "Vendredi": {
    sauces: ["Ndolè","Sauce tomate","Légumes sautés","Kondrès","Choux pistaches","Sauce gombo","Sauce blanche","Taro","Aucun"],
    accompagnements: ["Viande de bœuf","Poulet","Poisson","Chèvre","Aucun"],
    complements: ["Riz parfumé","Plantain vapeur","Igname jaune","Igname blanc","Frites de pommes","Frites de plantains","Couscous manioc","Couscous maïs","Aucun"]
  },
  "Samedi": {
    sauces: ["Ndolè","Sauce tomate","Choux pistache","Bouillon","Aucun"],
    accompagnements: ["Viande bœuf","Queue de bœuf","Pattes de bœuf","Poulet","Poisson","Aucun"],
    complements: ["Riz parfumé","Plantain vapeur","Igname jaune","Igname blanc","Frites de pommes","Frites de plantains","Couscous manioc","Couscous maïs","Aucun"]
  }
};

/* ===== Jour auto selon l'appareil =====
   0=Dimanche ... 6=Samedi
   ✅ Dimanche -> Lundi
*/
function getDefaultDayFromDevice(){
  const d = new Date().getDay();
  const map = { 0:"Lundi", 1:"Lundi", 2:"Mardi", 3:"Mercredi", 4:"Jeudi", 5:"Vendredi", 6:"Samedi" };
  const suggested = map[d] || "Lundi";
  return MENU[suggested] ? suggested : "Lundi";
}

/* ===== PATHS BASE ===== */
const BASE = "../assets/images";
const NONE_IMG = `${BASE}/aucun.jpg`;
const FALLBACK = `${BASE}/hero.png`;

/* ===== IMAGES mapping ===== */
const IMG = {
  sauces: {
    "Ndolè": [`${BASE}/sauces/ndole.jpg`],
    "Sauce tomate": [`${BASE}/sauces/sauce tomate.jpg`, `${BASE}/sauces/sauce_tomate.jpg`],
    "Choux pistache": [`${BASE}/sauces/choux_pistache.jpg`],
    "Choux-pistache": [`${BASE}/sauces/choux_pistache.jpg`],
    "Choux pistaches": [`${BASE}/sauces/choux_pistache.jpg`],
    "Sauce gombo": [`${BASE}/sauces/gombo.jpg`],
    "Légumes sautés": [`${BASE}/sauces/legume.jpg`],
    "Sauce blanche": [`${BASE}/sauces/sauce-blanche.jpg`],
    "Sauce pistache": [`${BASE}/sauces/sauce_pistache.jpg`],
    "Koki": [`${BASE}/sauces/Koki.jpg`, `${BASE}/sauces/koki.jpg`],
    "Trippes sautés": [`${BASE}/sauces/trippes_sautées.jpg`],
    "Banane malaxée": [`${BASE}/sauces/banane_malaxé.jpg`, `${BASE}/sauces/banane_malaxée.jpg`],
    "Kondrès": [`${BASE}/sauces/kondre.jpg`],
    "Taro": [`${BASE}/sauces/taro.jpg`],
    "Bouillon": [`${BASE}/sauces/bouillon.jpg`]
  },
  accompagnements: {
    "Viande de bœuf": [`${BASE}/accompagnements/viande_boeuf.jpg`],
    "Viande bœuf": [`${BASE}/accompagnements/viande_boeuf.jpg`],
    "Poulet": [`${BASE}/accompagnements/poulet.jpg`],
    "Poisson": [`${BASE}/accompagnements/poisson.jpg`],
    "Queue de bœuf": [`${BASE}/accompagnements/queue2boeuf.jpg`],
    "Pattes de bœuf": [`${BASE}/accompagnements/pattes2boeuf.jpg`],
    "Chèvre": [`${BASE}/accompagnements/chèvre.jpg`, `${BASE}/accompagnements/chevre.jpg`]
  },
  complements: {
    "Riz parfumé": [`${BASE}/compléments/riz.jpg`],
    "Plantain vapeur": [`${BASE}/compléments/plantain_vapeur.jpg`],
    "Igname jaune": [`${BASE}/compléments/igname_jaune.jpeg`, `${BASE}/compléments/igname_jaune.jpg`],
    "Igname blanc": [`${BASE}/compléments/igname_blanc.jpg`],
    "Couscous manioc": [`${BASE}/compléments/couscous_manioc.jpeg`],
    "Couscous maïs": [`${BASE}/compléments/coucous_maïs.jpeg`, `${BASE}/compléments/couscous_maïs.jpeg`],
    "Couscous frais": [`${BASE}/compléments/coucous_maïs.jpeg`, `${BASE}/compléments/couscous_maïs.jpeg`],
    "Frites de pommes": [`${BASE}/compléments/pomme_fris.jpg`],
    "Frites de plantains": [`${BASE}/compléments/plantain_fris.jpg`],
    "Banane vapeur": [`${BASE}/compléments/banane_vapeur.jpeg`, `${BASE}/compléments/banane_vapeur.jpg`],
    "Macabo râpé": [`${BASE}/compléments/macabo_râpé.jpeg`, `${BASE}/compléments/macabo_rape.jpeg`],
    "Râpé": [`${BASE}/compléments/macabo_râpé.jpeg`, `${BASE}/compléments/macabo_rape.jpeg`]
  }
};

function nextFallback(imgEl){
  try{
    const list = JSON.parse(imgEl.dataset.fallbacks || "[]");
    const idx = Number(imgEl.dataset.fallbackIndex || "0");
    const next = list[idx];
    if(next){
      imgEl.dataset.fallbackIndex = String(idx + 1);
      imgEl.src = next;
      return;
    }
  }catch(e){}
  imgEl.src = FALLBACK;
}
window.nextFallback = nextFallback;

let day = getDefaultDayFromDevice();
let step = "sauce";
let building = { sauces: [], accompagnement: null, complements: [] };
let cart = [];

const elDays = document.getElementById("jours");
const panel = document.getElementById("panel");
const msg = document.getElementById("message");

function setMsg(type, text){
  msg.className = "msg " + type;
  msg.textContent = text;
  msg.style.display = "block";
}
function hideMsg(){ msg.style.display = "none"; }

function renderDays(){
  elDays.innerHTML = "";
  Object.keys(MENU).forEach(d=>{
    const div = document.createElement("div");
    div.className = "day" + (d===day ? " active" : "");
    div.innerHTML = `<b>${escapeHtml(d)}</b><small>Clique</small>`;
    div.onclick = ()=>{
      day = d;
      resetBuilder();
      goto("sauce");
      renderAll();
    };
    elDays.appendChild(div);
  });
}

function setPills(){
  document.getElementById("pill-sauce").classList.toggle("on", step==="sauce");
  document.getElementById("pill-acc").classList.toggle("on", step==="acc");
  document.getElementById("pill-comp").classList.toggle("on", step==="comp");
  document.getElementById("pill-cart").classList.toggle("on", step==="cart");
}

function resetBuilder(){
  building = { sauces: [], accompagnement: null, complements: [] };
}
function goto(s){
  step = s;
  setPills();
}

function imgCandidates(type, name){
  const lower = String(name || "").toLowerCase();
  if (!name || lower==="aucun") return [NONE_IMG, FALLBACK];
  const arr = (IMG[type] && IMG[type][name]) ? IMG[type][name] : [];
  return [...arr, FALLBACK];
}

function optCard(type, name, active){
  const isNone = name.toLowerCase()==="aucun";
  const hint = isNone ? "Choisir aucun" : "Cliquer pour sélectionner";

  const candidates = imgCandidates(type, name);
  const first = candidates[0] || FALLBACK;

  return `
    <div class="opt ${active ? "active":""}" data-name="${escapeHtml(name)}">
      <div class="img">
        <img
          src="${first}"
          alt="${escapeHtml(name)}"
          data-fallbacks='${escapeHtml(JSON.stringify(candidates.slice(1)))}'
          data-fallback-index="0"
          onerror="nextFallback(this)"
        >
      </div>
      <div class="meta">
        <div>
          <h3>${escapeHtml(name)}</h3>
          <p>${hint}</p>
        </div>
      </div>
    </div>
  `;
}

function renderSauce(){
  const sauces = MENU[day].sauces;
  panel.innerHTML = `
    <h2>1) Choisir la sauce (mix 2 max)</h2>
    <p class="sub">Clique sur 1 ou 2 sauces. Ou clique “Aucun”.</p>

    <div class="grid" id="grid"></div>

    <div class="actions">
      <button class="btn orange" id="next">Terminer ➜ Accompagnement</button>
      <button class="btn ghost" id="reset">Réinitialiser</button>
    </div>
  `;

  const grid = document.getElementById("grid");
  grid.innerHTML = sauces.map(s=>{
    const isNone = s.toLowerCase()==="aucun";
    const active = isNone ? (building.sauces.length===0) : building.sauces.includes(s);
    return optCard("sauces", s, active);
  }).join("");

  grid.querySelectorAll(".opt").forEach(card=>{
    card.onclick = ()=>{
      const name = card.dataset.name;

      if (name.toLowerCase()==="aucun"){
        building.sauces = [];
        hideMsg();
        renderAll();
        return;
      }

      if (building.sauces.includes(name)){
        building.sauces = building.sauces.filter(x=>x!==name);
      } else {
        if (building.sauces.length >= 2){
          setMsg("err","Max 2 sauces en mix.");
          return;
        }
        building.sauces.push(name);
      }
      hideMsg();
      renderAll();
    };
  });

  document.getElementById("reset").onclick = ()=>{ resetBuilder(); hideMsg(); renderAll(); };
  document.getElementById("next").onclick = ()=>{ goto("acc"); hideMsg(); renderAll(); };
}

function renderAcc(){
  const accs = MENU[day].accompagnements;
  panel.innerHTML = `
    <h2>2) Choisir l’accompagnement (pas de mix)</h2>
    <p class="sub">Choisis 1 accompagnement ou “Aucun”.</p>

    <div class="grid" id="grid"></div>

    <div class="actions">
      <button class="btn ghost" id="back">⬅ Retour</button>
      <button class="btn orange" id="next">Terminer ➜ Compléments</button>
    </div>
  `;

  const grid = document.getElementById("grid");
  grid.innerHTML = accs.map(a=>{
    const isNone = a.toLowerCase()==="aucun";
    const active = isNone ? (!building.accompagnement) : (building.accompagnement===a);
    return optCard("accompagnements", a, active);
  }).join("");

  grid.querySelectorAll(".opt").forEach(card=>{
    card.onclick = ()=>{
      const name = card.dataset.name;
      building.accompagnement = (name.toLowerCase()==="aucun") ? null : name;
      hideMsg();
      renderAll();
    };
  });

  document.getElementById("back").onclick = ()=>{ goto("sauce"); hideMsg(); renderAll(); };
  document.getElementById("next").onclick = ()=>{ goto("comp"); hideMsg(); renderAll(); };
}

function renderComp(){
  const comps = MENU[day].complements;
  panel.innerHTML = `
    <h2>3) Choisir les compléments (mix 2 max)</h2>
    <p class="sub">Clique sur 1 ou 2 compléments, ou “Aucun”.</p>

    <div class="grid" id="grid"></div>

    <div class="actions">
      <button class="btn ghost" id="back">⬅ Retour</button>
      <button class="btn green" id="add">Ajouter ce plat au panier</button>
    </div>
  `;

  const grid = document.getElementById("grid");
  grid.innerHTML = comps.map(c=>{
    const isNone = c.toLowerCase()==="aucun";
    const active = isNone ? (building.complements.length===0) : building.complements.includes(c);
    return optCard("complements", c, active);
  }).join("");

  grid.querySelectorAll(".opt").forEach(card=>{
    card.onclick = ()=>{
      const name = card.dataset.name;

      if (name.toLowerCase()==="aucun"){
        building.complements = [];
        hideMsg();
        renderAll();
        return;
      }

      if (building.complements.includes(name)){
        building.complements = building.complements.filter(x=>x!==name);
      } else {
        if (building.complements.length >= 2){
          setMsg("err","Max 2 compléments en mix.");
          return;
        }
        building.complements.push(name);
      }
      hideMsg();
      renderAll();
    };
  });

  document.getElementById("back").onclick = ()=>{ goto("acc"); hideMsg(); renderAll(); };
  document.getElementById("add").onclick = ()=>{
    cart.push({ day, sauces:[...building.sauces], accompagnement: building.accompagnement, complements:[...building.complements] });
    resetBuilder();
    goto("cart");
    hideMsg();
    renderAll();
  };
}

function renderCart(){
  panel.innerHTML = `
    <h2>4) Panier</h2>
    <p class="sub">Vérifie ta commande. Puis choisis Réserver ou Livraison.</p>

    <div class="cart" id="cart"></div>

    <div class="actions">
      <button class="btn ghost" id="addMore">+ Ajouter un autre plat</button>
      <button class="btn orange" id="reserve">Réserver</button>
      <button class="btn violet" id="deliver">Livraison</button>
    </div>

    <div id="formArea"></div>
  `;

  const cartEl = document.getElementById("cart");
  if (cart.length === 0){
    cartEl.innerHTML = `<div class="cartItem">Panier vide.</div>`;
  } else {
    cartEl.innerHTML = cart.map((p,i)=>{
      const sauces = (p.sauces||[]).join(" + ") || "Aucune";
      const acc = p.accompagnement || "Aucun";
      const comps = (p.complements||[]).join(" + ") || "Aucun";
      return `
        <div class="cartItem">
          <div class="row">
            <b>Plat #${i+1} — ${escapeHtml(p.day)}</b>
            <button class="btn ghost" onclick="removeItem(${i})">Supprimer</button>
          </div>
          <div style="margin-top:8px;color:rgba(255,255,255,.85);line-height:1.7">
            Sauce: <b>${escapeHtml(sauces)}</b><br>
            Accompagnement: <b>${escapeHtml(acc)}</b><br>
            Compléments: <b>${escapeHtml(comps)}</b>
          </div>
        </div>
      `;
    }).join("");
  }

  document.getElementById("addMore").onclick = ()=>{ goto("sauce"); hideMsg(); renderAll(); };
  document.getElementById("reserve").onclick = ()=> renderForm("reservation");
  document.getElementById("deliver").onclick = ()=> renderForm("livraison");
}

window.removeItem = (i)=>{
  cart.splice(i,1);
  renderAll();
};

function renderForm(type){
  const formArea = document.getElementById("formArea");
  const isLiv = type==="livraison";

  formArea.innerHTML = `
    <div class="panel">
      <h2>${isLiv ? "Livraison" : "Réservation"}</h2>

      <label>Nom (obligatoire)</label>
      <input id="nom" placeholder="Votre nom" />

      <label>Numéro de téléphone (obligatoire)</label>
      <input id="phone" placeholder="+237..." />

      <label>Email (obligatoire)</label>
      <input id="email" placeholder="votre@gmail.com" />

      ${!isLiv ? `
        <label>Nombre de personnes (obligatoire)</label>
        <input id="people" type="number" min="1" placeholder="Ex: 4" />

        <label>Heure de réservation (obligatoire)</label>
        <input id="time" type="time" />
      ` : `
        <label>Adresse (obligatoire)</label>
        <input id="adresseLivraison" placeholder="Adresse complète" />
      `}

      <label>Allergies (obligatoire)</label>
      <input id="allergies" placeholder="Ex: arachides / aucun" />

      <label>Commentaire ${isLiv ? "(obligatoire : où livrer exactement)" : "(optionnel)"}</label>
      <textarea id="commentaire" placeholder="${isLiv ? "Ex: devant la porte, étage 2..." : "Optionnel"}"></textarea>

      <div class="actions">
        <button class="btn green" id="send">Valider & Envoyer</button>
      </div>
    </div>
  `;

  document.getElementById("send").onclick = ()=> sendOrder(type);
}

async function sendOrder(type){
  hideMsg();

  if (cart.length === 0){
    setMsg("err","⚠️ Ajoute au moins 1 plat au panier avant d’envoyer.");
    return;
  }

  const payload = {
    type,
    nom: val("nom"),
    phone: val("phone"),
    email: val("email"),
    allergies: val("allergies"),
    commentaire: val("commentaire"),
    plats: cart
  };

  if (type==="reservation"){
    payload.people = val("people");
    payload.time = val("time");
  } else {
    payload.adresseLivraison = val("adresseLivraison");
  }

  const req = ["nom","phone","email","allergies"];
  for (const r of req){
    if (!payload[r]){ setMsg("err",`Champ obligatoire manquant : ${r}`); return; }
  }

  if (type==="reservation"){
    if (!payload.people){ setMsg("err","Champ obligatoire manquant : people"); return; }
    if (!payload.time){ setMsg("err","Champ obligatoire manquant : time (heure)"); return; }
  }

  if (type==="livraison"){
    if (!payload.adresseLivraison){ setMsg("err","Champ obligatoire manquant : adresseLivraison"); return; }
    if (!payload.commentaire){ setMsg("err","Champ obligatoire manquant : commentaire (livraison)"); return; }
  }

  try{
    const res = await fetch("/api/commande", {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json().catch(()=> ({}));
    if (!res.ok){
      setMsg("err", data.error || "Erreur serveur.");
      return;
    }

    setMsg("ok", "✅ Confirmation : votre demande a été envoyée. Le service va vous appeler dans quelques instants.");
    cart = [];
    resetBuilder();
    goto("sauce");
    renderAll();
  }catch(e){
    setMsg("err","Erreur réseau/serveur.");
  }
}

function val(id){
  const el = document.getElementById(id);
  return el ? String(el.value || "").trim() : "";
}

function escapeHtml(s){
  return String(s)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function renderAll(){
  renderDays();
  setPills();
  if (step==="sauce") renderSauce();
  if (step==="acc") renderAcc();
  if (step==="comp") renderComp();
  if (step==="cart") renderCart();
}

/* ✅ Lancement */
resetBuilder();
goto("sauce");
renderAll();

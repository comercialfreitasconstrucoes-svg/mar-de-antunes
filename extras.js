/* =====================================================================
   Mar de Antunes – extras do lançamento (26/11/2026)
   Arquivo separado: não altera o funcionamento do index.html.
   1) Validade da tabela do evento + selo "Tabela exclusiva do evento"
   2) Filtro "Encontre sua unidade" (tipo e faixa de valor)
   3) Contador ao vivo de unidades disponíveis por bloco (desligado)
   4) Busca pelo número da unidade (101A, C05)
   ===================================================================== */
(function () {
  "use strict";

  /* ---------- CONFIGURAÇÃO ---------- */
  // A tabela do evento vale até 26/11/2026 às 23h59 (horário de Recife).
  // Depois disso, o app mostra "Valores sob consulta" automaticamente.
  var TABELA_FIM = Date.UTC(2026, 10, 27, 3, 0, 0); // 27/11/2026 00:00 em Recife (UTC-3)

  /* ---------- Textos ---------- */
  var X = {
    pt: {
      selo: "Tabela exclusiva do evento",
      selo2: "Condição válida somente dia 26/11",
      find: "Encontre sua unidade",
      findp: "Filtre por tipo e valor e veja só o que está disponível.",
      tipo: "Tipo",
      faixa: "Valor",
      todos: "Todos",
      studio: "Studio",
      q2: "2 quartos",
      s3: "3 suítes",
      casa: "Casas",
      f1: "Até R$ 600 mil",
      f2: "R$ 600 mil a 1,5 mi",
      f3: "R$ 1,5 a 3 mi",
      f4: "Acima de R$ 3 mi",
      nres: "{n} unidades disponíveis",
      nres1: "1 unidade disponível",
      nada: "Nenhuma unidade disponível com esses filtros.",
      busca: "Digite a unidade (ex.: 101A ou C05)",
      ou: "ou filtre por tipo e valor",
      bnada: "Nenhuma unidade com esse número. Confira e tente de novo.",
      vend: "Vendida",
      resv: "Reservada",
      nbus: "{n} unidades encontradas",
      nbus1: "1 unidade encontrada",
      restam: "restam {n}",
      restam1: "resta 1",
      esgot: "esgotado",
      apto: "Apto",
      casaU: "Casa",
      bloco: "Bloco",
      ctipo: "Casa tipo",
      fechar: "Fechar",
      consulta: "Valor sob consulta",
      suites: "suítes"
    },
    es: {
      selo: "Tabla exclusiva del evento",
      selo2: "Condición válida solo el día 26/11",
      find: "Encuentre su unidad",
      findp: "Filtre por tipo y valor y vea solo lo disponible.",
      tipo: "Tipo",
      faixa: "Valor",
      todos: "Todos",
      studio: "Studio",
      q2: "2 habitaciones",
      s3: "3 suites",
      casa: "Casas",
      f1: "Hasta R$ 600 mil",
      f2: "R$ 600 mil a 1,5 mi",
      f3: "R$ 1,5 a 3 mi",
      f4: "Más de R$ 3 mi",
      nres: "{n} unidades disponibles",
      nres1: "1 unidad disponible",
      nada: "No hay unidades disponibles con estos filtros.",
      busca: "Escriba la unidad (ej.: 101A o C05)",
      ou: "o filtre por tipo y valor",
      bnada: "Ninguna unidad con ese número. Verifique e intente de nuevo.",
      vend: "Vendida",
      resv: "Reservada",
      nbus: "{n} unidades encontradas",
      nbus1: "1 unidad encontrada",
      restam: "quedan {n}",
      restam1: "queda 1",
      esgot: "agotado",
      apto: "Apto",
      casaU: "Casa",
      bloco: "Bloque",
      ctipo: "Casa tipo",
      fechar: "Cerrar",
      consulta: "Valor a consultar",
      suites: "suites"
    },
    en: {
      selo: "Event-only price list",
      selo2: "Valid only on November 26",
      find: "Find your unit",
      findp: "Filter by type and price and see only what is available.",
      tipo: "Type",
      faixa: "Price",
      todos: "All",
      studio: "Studio",
      q2: "2 bedrooms",
      s3: "3 suites",
      casa: "Houses",
      f1: "Up to R$ 600k",
      f2: "R$ 600k to 1.5M",
      f3: "R$ 1.5M to 3M",
      f4: "Over R$ 3M",
      nres: "{n} units available",
      nres1: "1 unit available",
      nada: "No units available with these filters.",
      busca: "Type the unit (e.g. 101A or C05)",
      ou: "or filter by type and price",
      bnada: "No unit with that number. Check it and try again.",
      vend: "Sold",
      resv: "Reserved",
      nbus: "{n} units found",
      nbus1: "1 unit found",
      restam: "{n} left",
      restam1: "1 left",
      esgot: "sold out",
      apto: "Apt",
      casaU: "House",
      bloco: "Block",
      ctipo: "House type",
      fechar: "Close",
      consulta: "Price on request",
      suites: "suites"
    }
  };
  function x(k) {
    var l = window.lang || "pt";
    return (X[l] && X[l][k]) || X.pt[k] || k;
  }
  function valida() { return Date.now() < TABELA_FIM; }

  /* ---------- 1) Validade da tabela + selo ---------- */
  if (typeof window.preco === "function") {
    var _preco = window.preco;
    window.preco = function (num, k, s) { return valida() ? _preco(num, k, s) : null; };
  }
  if (typeof window.bgPreco === "function") {
    var _bgPreco = window.bgPreco;
    window.bgPreco = function (num) { return valida() ? _bgPreco(num) : null; };
  }
  if (typeof window.pxHTML === "function") {
    var _px = window.pxHTML;
    window.pxHTML = function (p, a) {
      var h = _px(p, a);
      if (p && !p.demo && valida()) h = '<div class="xsel"><b>' + x("selo") + "</b><em>" + x("selo2") + "</em></div>" + h;
      return h;
    };
  }

  /* ---------- Estilos ---------- */
  var css = document.createElement("style");
  css.textContent =
    ".xsel{display:flex;flex-direction:column;gap:3px;width:100%;margin:18px 0 0;padding:12px 16px;border-radius:12px;" +
    "background:linear-gradient(90deg,#b98a2c,#d4a94c);color:#1a1405}" +
    ".xsel b{font:800 13px var(--mono);letter-spacing:.08em;text-transform:uppercase}" +
    ".xsel em{font:600 12px var(--mono);font-style:normal;opacity:.85}" +
    ".xsel+.px{margin-top:12px}" +
    "@keyframes xpl{70%{box-shadow:0 0 0 8px rgba(242,210,127,0)}100%{box-shadow:0 0 0 0 rgba(242,210,127,0)}}" +
    ".xfind{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;margin:8px 0 16px;padding:15px 16px;border-radius:14px;" +
    "border:0;cursor:pointer;background:linear-gradient(90deg,var(--ac),var(--ac2));color:#1a1405;font:800 15px var(--mono)}" +
    ".xfind svg{width:18px;height:18px}" +
    ".xcnt{display:block;margin-top:3px;font:700 11px var(--mono);color:var(--ac2);letter-spacing:.02em}" +
    ".xcnt.z{color:var(--mut)}" +
    "#xov{position:fixed;inset:0;z-index:60;background:rgba(3,9,16,.72);display:none;align-items:flex-end;justify-content:center}" +
    "#xov.on{display:flex}" +
    "#xsh{width:100%;max-width:560px;max-height:88vh;max-height:88dvh;overflow:auto;background:var(--bg);border:1px solid var(--bd);" +
    "border-radius:22px 22px 0 0;padding:18px max(16px,env(safe-area-inset-right)) calc(18px + env(safe-area-inset-bottom)) max(16px,env(safe-area-inset-left))}" +
    "#xsh h3{margin:2px 0 4px;font-size:20px}#xsh p.s{margin:0 0 14px;color:var(--mut);font-size:13px}" +
    ".xhd{display:flex;justify-content:space-between;align-items:flex-start;gap:10px}" +
    ".xx{flex:none;width:36px;height:36px;border-radius:50%;border:1px solid var(--bd);background:var(--card);color:var(--tx);font-size:16px;cursor:pointer}" +
    ".xlb{margin:12px 0 6px;font:800 11px var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--mut)}" +
    ".xch{display:flex;flex-wrap:wrap;gap:6px}" +
    ".xch button{border:1px solid var(--bd);background:var(--card);color:var(--tx);border-radius:999px;padding:8px 13px;font:700 13px var(--mono);cursor:pointer}" +
    ".xch button.on{background:var(--ac);border-color:var(--ac);color:#1a1405}" +
    ".xn{margin:16px 0 8px;font:800 13px var(--mono);color:var(--ac2)}" +
    ".xls{display:grid;gap:8px}" +
    ".xit{display:flex;justify-content:space-between;align-items:center;gap:10px;width:100%;text-align:left;padding:12px 14px;border-radius:14px;" +
    "border:1px solid var(--bd);background:var(--card);color:var(--tx);cursor:pointer;font-family:inherit}" +
    ".xit b{display:block;font-size:15px}.xit small{display:block;color:var(--mut);font-size:12px;margin-top:2px}" +
    ".xit .v{flex:none;font:800 14px var(--mono);color:var(--ac2);white-space:nowrap}" +
    ".xnada{padding:22px 10px;text-align:center;color:var(--mut);font-size:14px}" +
    ".xq{display:flex;align-items:center;gap:10px;margin:10px 0 4px;padding:0 6px 0 14px;border-radius:14px;border:1.5px solid var(--ac);background:var(--card)}" +
    ".xq svg{flex:none;width:18px;height:18px;color:var(--ac2)}" +
    ".xq input{flex:1;min-width:0;height:50px;border:0;outline:0;background:transparent;color:var(--tx);font:700 16px var(--mono);letter-spacing:.04em}" +
    ".xq input::placeholder{color:var(--mut);font-weight:500;letter-spacing:0}" +
    ".xq input::-webkit-search-cancel-button{display:none}" +
    "#xqc{flex:none;width:34px;height:34px;border:0;border-radius:50%;background:transparent;color:var(--mut);font-size:15px;cursor:pointer}" +
    ".xou{margin:10px 0 0!important}" +
    "#xflt.dim{display:none}" +
    ".xit.off{opacity:.7}.xit .v.z{color:var(--mut);font-weight:700}" +
    ".xit:focus-visible,.xch button:focus-visible,.xfind:focus-visible,.xx:focus-visible{outline:2px solid var(--ac2);outline-offset:2px}";
  document.head.appendChild(css);

  /* ---------- Inventário (todas as unidades à venda) ---------- */
  function stOf(key) {
    var S = window.SRV || {}, T = window.STATUS || {};
    return S[key] || T[key] || "d";
  }
  function tipoApto(k, s) {
    var big = s === "01" || s === "02";
    var c = window.codeOf ? window.codeOf(k, s, big) : (big ? "r3" : "r2");
    if (c === "rst") return "studio";
    if (c === "r3") return "s3";
    return "q2";
  }
  function totalOf(p) {
    if (!p || !p.fluxo) return 0;
    var t = 0;
    p.fluxo.forEach(function (f) { t += f[1] * f[2]; });
    return Math.round(t);
  }
  var INV = null;
  function inventario() {
    if (INV) return INV;
    INV = [];
    var TAB = window.TABELA || {}, NIV = window.NIV || {};
    (window.BLOCOS || []).forEach(function (b) {
      if (b.id === "B1" || b.id === "B2") {
        var D = (window.BGD || {})[b.id];
        if (!D) return;
        for (var n = D.casas[0]; n <= D.casas[1]; n++) {
          var id = "C" + (n < 10 ? "0" : "") + n, key = b.id + "-" + id;
          if (!TAB[key]) continue;
          INV.push({ b: b.id, key: key, id: id, casa: true, tipo: "casa", su: D.su, area: D.area, tot: totalOf(TAB[key]) });
        }
        return;
      }
      b.niv.forEach(function (k, i) {
        var N = NIV[k];
        if (!N) return;
        Object.keys(N.area).forEach(function (s) {
          N.pref.forEach(function (p) {
            var num = "" + p + s, key = b.id + "-" + num;
            if (!TAB[key]) return;
            INV.push({ b: b.id, key: key, id: num, k: k, s: s, i: i, tipo: tipoApto(k, s), area: N.area[s], tot: totalOf(TAB[key]) });
          });
        });
      });
    });
    return INV;
  }

  /* ---------- Inventário completo (inclui vendidas), para a busca ---------- */
  var ALL = null;
  function todas() {
    if (ALL) return ALL;
    ALL = [];
    var TAB = window.TABELA || {}, NIV = window.NIV || {};
    (window.BLOCOS || []).forEach(function (b) {
      if (b.id === "B1" || b.id === "B2") {
        var D = (window.BGD || {})[b.id];
        if (!D) return;
        for (var n = D.casas[0]; n <= D.casas[1]; n++) {
          var id = "C" + (n < 10 ? "0" : "") + n, key = b.id + "-" + id;
          ALL.push({ b: b.id, key: key, id: id, n: n, casa: true, tipo: "casa", su: D.su, area: D.area, tot: TAB[key] ? totalOf(TAB[key]) : 0 });
        }
        return;
      }
      b.niv.forEach(function (k, i) {
        var N = NIV[k];
        if (!N) return;
        Object.keys(N.area).forEach(function (s) {
          N.pref.forEach(function (p) {
            var num = "" + p + s, key = b.id + "-" + num;
            ALL.push({ b: b.id, key: key, id: num, k: k, s: s, i: i, tipo: tipoApto(k, s), area: N.area[s], tot: TAB[key] ? totalOf(TAB[key]) : 0 });
          });
        });
      });
    });
    return ALL;
  }
  function buscar(q) {
    q = (q || "").toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    var ehCasa = /CASA/.test(q);
    q = q.replace(/CASA|APTO|APARTAMENTO|APT|BLOCO|UNIDADE/g, " ").replace(/[^A-Z0-9]/g, "");
    if (!q) return null;
    if (ehCasa && /^\d{1,2}$/.test(q)) q = "C" + q;
    var m, r;
    if ((m = q.match(/^C(\d{1,2})$/))) {                 // casa: C05, C5, casa 5
      r = todas().filter(function (u) { return u.casa && u.n === +m[1]; });
    } else if ((m = q.match(/^(\d{1,3})([A-D])$/)) || (m = q.match(/^([A-D])(\d{1,3})$/))) { // 101A ou A101
      var num = /\d/.test(m[1]) ? m[1] : m[2], bl = /\d/.test(m[1]) ? m[2] : m[1];
      r = todas().filter(function (u) { return !u.casa && u.b === bl && u.id.indexOf(num) === 0; });
    } else if ((m = q.match(/^(\d{1,3})$/))) {            // só o número
      r = todas().filter(function (u) {
        return u.casa ? (m[1].length <= 2 && u.n === +m[1]) : u.id.indexOf(m[1]) === 0;
      });
    } else r = [];
    return r.sort(function (a, b) {
      if (a.casa !== b.casa) return (a.casa ? 1 : -1) * (q.length <= 2 ? -1 : 1);
      return a.id === b.id ? (a.b < b.b ? -1 : 1) : (a.id < b.id ? -1 : 1);
    }).slice(0, 30);
  }

  /* ---------- 3) Contador por bloco ---------- */
  function contar(bid) {
    var n = 0;
    inventario().forEach(function (u) { if (u.b === bid && stOf(u.key) === "d") n++; });
    return n;
  }
  var MOSTRAR_CONTADOR = false; /* contador "restam N" desligado a pedido */
  function pintarContadores() {
    var bg = document.getElementById("bg");
    if (!bg) return;
    if (!MOSTRAR_CONTADOR) { bg.querySelectorAll(".xcnt").forEach(function (e) { e.remove(); }); return; }
    var btns = bg.querySelectorAll("button"), ids = [];
    (window.PINS || []).forEach(function (q) { if (ids.indexOf(q.b) < 0) ids.push(q.b); });
    btns.forEach(function (btn, idx) {
      var bid = ids[idx];
      if (!bid) return;
      var tx = btn.querySelector(".tx") || btn;
      var el = tx.querySelector(".xcnt");
      if (!el) { el = document.createElement("span"); el.className = "xcnt"; tx.appendChild(el); }
      var n = contar(bid);
      el.textContent = n === 0 ? x("esgot") : n === 1 ? x("restam1") : x("restam").replace("{n}", n);
      el.classList.toggle("z", n === 0);
    });
  }

  /* ---------- 2) Filtro "Encontre sua unidade" ---------- */
  var F = { tipo: "todos", faixa: "todas", q: "" };
  var FAIXAS = { todas: [0, Infinity], f1: [0, 600000], f2: [600000, 1500000], f3: [1500000, 3000000], f4: [3000000, Infinity] };
  function moeda(v) { return "R$ " + v.toLocaleString("pt-BR"); }

  function criarBotao() {
    var pick = document.querySelector(".pick");
    var bg = document.getElementById("bg");
    if (!pick || !bg || document.getElementById("xfind")) return;
    var b = document.createElement("button");
    b.id = "xfind";
    b.className = "xfind";
    b.type = "button";
    b.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg><span></span>';
    b.onclick = abrirFiltro;
    pick.insertBefore(b, bg);
  }
  function textosBotao() {
    var b = document.getElementById("xfind");
    if (b) b.querySelector("span").textContent = x("find");
  }

  function criarOverlay() {
    if (document.getElementById("xov")) return;
    var ov = document.createElement("div");
    ov.id = "xov";
    ov.setAttribute("role", "dialog");
    ov.setAttribute("aria-modal", "true");
    ov.innerHTML = '<div id="xsh"></div>';
    ov.onclick = function (e) { if (e.target === ov) fecharFiltro(); };
    document.body.appendChild(ov);
  }
  function chips(grupo, opcoes) {
    return '<div class="xch" data-g="' + grupo + '">' + opcoes.map(function (o) {
      return '<button type="button" data-v="' + o[0] + '" class="' + (F[grupo] === o[0] ? "on" : "") + '">' + o[1] + "</button>";
    }).join("") + "</div>";
  }
  function itemHTML(u, i, comStatus) {
    var titulo, sub;
    if (u.casa) {
      titulo = x("casaU") + " " + u.id.slice(1);
      sub = x("ctipo") + " " + u.b.slice(1) + " · " + u.su + " " + x("suites") + " · " + u.area + " m²";
    } else {
      titulo = x("apto") + " " + u.id + u.b + " · " + x("bloco") + " " + u.b;
      var andar = window.lab ? window.lab(u.id) : "";
      sub = x(u.tipo) + " · " + u.area + " m²" + (andar ? " · " + andar : "");
    }
    var sv = stOf(u.key), dir;
    if (comStatus && sv !== "d") dir = '<span class="v z">' + (sv === "r" ? x("resv") : x("vend")) + "</span>";
    else dir = '<span class="v">' + (valida() && u.tot ? moeda(u.tot) : x("consulta")) + "</span>";
    return '<button class="xit' + (comStatus && sv !== "d" ? " off" : "") + '" type="button" data-i="' + i + '"><span><b>' + titulo + "</b><small>" + sub + "</small></span>" + dir + "</button>";
  }
  function desenharLista() {
    var box = document.getElementById("xres");
    if (!box) return;
    var achados = buscar(F.q), lista, h = "", comStatus = !!achados;
    if (achados) {
      lista = achados;
      h += '<div class="xn">' + (lista.length === 1 ? x("nbus1") : x("nbus").replace("{n}", lista.length)) + "</div>";
      if (!lista.length) h += '<div class="xnada">' + x("bnada") + "</div>";
    } else {
      var fx = FAIXAS[F.faixa];
      lista = inventario().filter(function (u) {
        return stOf(u.key) === "d" && (F.tipo === "todos" || u.tipo === F.tipo) && u.tot >= fx[0] && u.tot < fx[1];
      }).sort(function (a, b) { return a.tot - b.tot; });
      h += '<div class="xn">' + (lista.length === 1 ? x("nres1") : x("nres").replace("{n}", lista.length)) + "</div>";
      if (!lista.length) h += '<div class="xnada">' + x("nada") + "</div>";
    }
    if (lista.length) h += '<div class="xls">' + lista.map(function (u, i) { return itemHTML(u, i, comStatus); }).join("") + "</div>";
    box.innerHTML = h;
    box.querySelectorAll(".xit").forEach(function (b) {
      b.onclick = function () { irPara(lista[+b.dataset.i]); };
    });
    var fl = document.getElementById("xflt");
    if (fl) fl.classList.toggle("dim", comStatus);
  }
  function desenharFiltro() {
    var sh = document.getElementById("xsh");
    if (!sh) return;
    var h = '<div class="xhd"><div><h3>' + x("find") + '</h3></div>' +
      '<button class="xx" type="button" aria-label="' + x("fechar") + '" id="xfx">✕</button></div>';
    h += '<div class="xq"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>' +
      '<input id="xqi" type="search" inputmode="text" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="' + x("busca") + '" aria-label="' + x("busca") + '">' +
      '<button type="button" id="xqc" aria-label="' + x("fechar") + '">✕</button></div>';
    h += '<div id="xflt"><p class="s xou">' + x("ou") + "</p>";
    h += '<div class="xlb">' + x("tipo") + "</div>" + chips("tipo", [["todos", x("todos")], ["studio", x("studio")], ["q2", x("q2")], ["s3", x("s3")], ["casa", x("casa")]]);
    h += '<div class="xlb">' + x("faixa") + "</div>" + chips("faixa", [["todas", x("todos")], ["f1", x("f1")], ["f2", x("f2")], ["f3", x("f3")], ["f4", x("f4")]]) + "</div>";
    h += '<div id="xres"></div>';
    sh.innerHTML = h;
    document.getElementById("xfx").onclick = fecharFiltro;
    var qi = document.getElementById("xqi"), qc = document.getElementById("xqc");
    qi.value = F.q || "";
    qc.hidden = !F.q;
    qi.oninput = function () { F.q = qi.value; qc.hidden = !F.q; desenharLista(); };
    qi.onkeydown = function (e) { if (e.key === "Enter") { e.preventDefault(); qi.blur(); } };
    qc.onclick = function () { F.q = ""; qi.value = ""; qc.hidden = true; desenharLista(); qi.focus(); };
    sh.querySelectorAll(".xch").forEach(function (g) {
      g.querySelectorAll("button").forEach(function (b) {
        b.onclick = function () { F[g.dataset.g] = b.dataset.v; F.q = ""; desenharFiltro(); };
      });
    });
    desenharLista();
  }
  function abrirFiltro() {
    criarOverlay();
    desenharFiltro();
    document.getElementById("xov").classList.add("on");
    document.getElementById("xsh").scrollTop = 0;
    try { if (window.track) window.track("filtro", ""); } catch (e) {}
  }
  function fecharFiltro() {
    var ov = document.getElementById("xov");
    if (ov) ov.classList.remove("on");
  }
  function irPara(u) {
    if (!u) return;
    fecharFiltro();
    var blo = null;
    (window.BLOCOS || []).forEach(function (b) { if (b.id === u.b) blo = b; });
    if (!blo || !window.abrir) return;
    document.body.classList.remove("zo");
    window.abrir(blo);
    setTimeout(function () {
      if (u.casa) { if (window.detBg) window.detBg(u.id); return; }
      if (window.ir) { try { window.ir(u.i); } catch (e) {} }
      // abre direto a unidade escolhida
      if (window.det) {
        window.det(u.k, u.s);
        if (window.sel !== u.id && window.desenhar) { window.sel = u.id; window.desenhar(u.k, u.s); }
      }
    }, 350);
  }

  /* ---------- Ligações com o app ---------- */
  function atualizarTudo() {
    textosBotao();
    pintarContadores();
    var ov = document.getElementById("xov");
    if (ov && ov.classList.contains("on")) desenharFiltro();
  }
  if (typeof window.refreshHS === "function") {
    var _r = window.refreshHS;
    window.refreshHS = function () { _r.apply(this, arguments); atualizarTudo(); };
  }
  if (typeof window.applyLang === "function") {
    var _a = window.applyLang;
    window.applyLang = function () { _a.apply(this, arguments); atualizarTudo(); };
  }
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") fecharFiltro(); });

  function iniciar() {
    criarBotao();
    criarOverlay();
    atualizarTudo();
    // os botões de idioma recriam a lista; repinta em seguida
    var lg = document.getElementById("lang");
    if (lg) lg.addEventListener("click", function () { setTimeout(atualizarTudo, 0); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();

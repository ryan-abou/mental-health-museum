(function () {
  const M = window.MUSEUM;
  const ART = window.ART;
  const rooms = M.rooms;
  const byId = Object.fromEntries(rooms.map((r) => [r.id, r]));
  const order = rooms.map((r) => r.id);
  const main = document.getElementById("main");
  const live = document.getElementById("live");
  const lum = (hex) => {
    const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  };
  function spiralD(cx, cy, turns, r0, r1, steps) {
    let d = "";
    for (let i = 0; i <= steps; i++) {
      const t = i / steps, a = t * turns * 2 * Math.PI - Math.PI / 2, rr = r0 + t * (r1 - r0);
      d += (i ? "L" : "M") + (cx + rr * Math.cos(a)).toFixed(2) + " " + (cy + rr * Math.sin(a)).toFixed(2);
    }
    return d;
  }
  const brandD = spiralD(20, 20, 3.2, 1.2, 17, 160);
  document.getElementById("brand-track").setAttribute("d", brandD);
  document.getElementById("brand-progress").setAttribute("d", brandD);
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  /* ----------------------------------------------------------- floor plan */
  const PLAN = {
    lobby: { cx: 300, cy: 245 },
    stigma: { x: 26, y: 212 },
    social: { x: 90, y: 92 },
    work: { x: 232, y: 30 },
    school: { x: 374, y: 92 },
    book: { x: 438, y: 212 },
    exit: { x: 230, y: 360, w: 140, h: 44 }
  };
  function center(id) {
    const p = PLAN[id];
    if (id === "lobby") return [p.cx, p.cy];
    return [p.x + (p.w || 136) / 2, p.y + (p.h || 70) / 2];
  }
  function floorPlan(current) {
    const corridors = order.filter((id) => id !== "lobby").map((id) => {
      const [x, y] = center(id);
      return `<line x1="300" y1="245" x2="${x}" y2="${y}" class="fp-corridor"/>`;
    }).join("");
    const boxes = order.filter((id) => id !== "lobby").map((id) => {
      const r = byId[id], p = PLAN[id], w = p.w || 136, h = p.h || 70;
      const here = id === current;
      return `<a href="#/${id}" class="fp-room${here ? " is-here" : ""}" aria-label="${esc(r.number ? `Room ${r.number}: ${r.name}` : r.name)}${here ? " (you are here)" : ""}">
        <rect x="${p.x}" y="${p.y}" width="${w}" height="${h}" rx="10" fill="${r.wall}" stroke="${r.accent}"/>
        ${r.number ? `<text x="${p.x + 12}" y="${p.y + 26}" class="fp-num" fill="${r.accent}">${r.number}</text>` : ""}
        <text x="${p.x + (r.number ? 30 : w / 2)}" y="${p.y + (r.number ? 26 : h / 2 + 5)}" class="fp-name" ${r.number ? "" : 'text-anchor="middle"'} fill="${r.ink}">${esc(r.short)}</text>
        ${r.number ? `<text x="${p.x + 12}" y="${p.y + 50}" class="fp-cur" fill="${r.ink}">${esc(r.curator)}</text>` : ""}
      </a>`;
    }).join("");
    const lob = byId.lobby, L = PLAN.lobby, here = current === "lobby";
    const [hx, hy] = center(current || "lobby");
    return `<svg class="floorplan" viewBox="0 0 600 420" xmlns="http://www.w3.org/2000/svg" role="group" aria-label="Floor plan of the museum">
      ${corridors}
      <a href="#/lobby" class="fp-room${here ? " is-here" : ""}" aria-label="The Lobby${here ? " (you are here)" : ""}">
        <circle cx="${L.cx}" cy="${L.cy}" r="64" fill="${lob.wall}" stroke="${lob.accent}"/>
        <text x="${L.cx}" y="${L.cy + 6}" text-anchor="middle" class="fp-name" fill="${lob.ink}">Lobby</text>
      </a>
      ${boxes}
      ${current ? `<g class="fp-here" transform="translate(${hx} ${hy - (current === "lobby" ? 30 : 0)})"><circle r="8"/></g>` : ""}
    </svg>
    <p class="fp-key">Click a room to go there.</p>
    <ol class="fp-list">${order.map((id) => {
      const r = byId[id];
      return `<li><a href="#/${id}" style="--door:${r.wall};--door-ink:${r.ink};--door-accent:${r.accent}"${id === current ? ' aria-current="page"' : ""}>
        <span>${r.number ? `Room ${r.number}` : id === "lobby" ? "Start" : "End"}</span>${esc(r.name)}${id === current ? " <em>(you are here)</em>" : ""}</a></li>`;
    }).join("")}</ol>`;
  }

  /* ------------------------------------------------------------- pieces */
  function exhibit(a, i, room) {
    const id = `${room.id}-${i}`;
    const b = a.book;
    return `<article class="exhibit" id="ex-${id}">
      <div class="plinth" data-art="${a.art}">${ART[a.art]()}</div>
      <div class="placard">
        <h3 class="placard-title">${esc(a.title)}</h3>
        <p>${esc(a.label)}</p>
        <button class="closer-btn" aria-expanded="false" aria-controls="closer-${id}" data-ex="ex-${id}">Look closer</button>
        <p class="closer-text" id="closer-${id}" hidden>${esc(a.closer)}</p>
      </div>
      <aside class="from-book" aria-label="Evidence from the book">
        ${b.quote ? `<blockquote><p>“${esc(b.quote)}”</p><footer><cite>Turtles All the Way Down</cite> (${esc(b.cite)})</footer></blockquote>` : `<p class="from-book-scene">A key scene from <cite>Turtles All the Way Down</cite></p>`}
        <p>${esc(b.note)}</p>
      </aside>
    </article>`;
  }

  function doorways(id) {
    const i = order.indexOf(id);
    const prev = rooms[i - 1], next = rooms[i + 1];
    const door = (r, dir) => r ? `<a class="door door-${dir}" href="#/${r.id}" style="--door:${r.wall};--door-ink:${r.ink};--door-accent:${r.accent}">
        <span class="door-dir">${dir === "prev" ? "Back to" : "Next:"}</span>
        <span class="door-name">${esc(r.number ? `${r.number}. ${r.name}` : r.name)}</span>
      </a>` : `<span class="door door-empty"></span>`;
    return `<nav class="doorways" aria-label="Move between rooms">${door(prev, "prev")}${door(next, "next")}</nav>`;
  }

  function roomHeader(r) {
    return `<header class="room-head">
      <h2 class="room-title" tabindex="-1">${r.id === "book" ? `<cite>${esc(r.name)}</cite>` : esc(r.name)}</h2>
    </header>
    <div class="wall-text">${r.intro.map((p) => `<p>${p}</p>`).join("")}</div>`;
  }

  /* -------------------------------------------------------------- lobby */
  function psaBlock() {
    const url = window.PSA_VIDEO_URL;
    let ytId = null;
    if (url) {
      const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
      ytId = m && m[1];
    }
    const screen = ytId && `<iframe src="https://www.youtube-nocookie.com/embed/${ytId}" title="Public service announcement: the right to mental health" allow="encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    const script = M.psaScript.map((s) => s.cue ? `<p class="cue">[${esc(s.cue)}]</p>` : `<p>${esc(s.line)}</p>`).join("");
    const words = M.psaScript.filter((s) => s.line).map((s) => s.line).join(" ").split(/\s+/).length;
    if (!screen) {
      return `<article class="psa-text">
        <h3 class="placard-title">Our PSA script</h3>
        <p>This is the script for our public service announcement, about two minutes read aloud.</p>
        <div class="psa-script">${script}</div>
      </article>`;
    }
    return `<article class="exhibit exhibit-wide psa-video">
      <div class="theater">${screen}</div>
      <div class="placard">
        <h3 class="placard-title">Our PSA</h3>
        <p>Our public service announcement, about two minutes long.</p>
        <button class="closer-btn" aria-expanded="false" aria-controls="psa-script">Read the script</button>
        <div class="closer-text psa-script" id="psa-script" hidden>${script}</div>
      </div>
    </article>`;
  }

  function lobby(r) {
    return `<section class="hero">
        <svg class="hero-spiral" viewBox="0 0 200 200" aria-hidden="true"><path pathLength="1" d="${heroSpiral()}"/></svg>
        <div class="hero-copy">
          <h1 class="hero-title">${esc(M.title)}</h1>
          <p class="hero-sub">${esc(M.subtitle)}.</p>
          <p class="hero-start"><a href="#/stigma">Start in Room 1, Mental Health Stigma</a></p>
        </div>
      </section>
      ${roomHeader(r)}
      ${r.facts.length ? `<dl class="facts">${r.facts.map((f) => `<div><dt>${esc(f.label)}</dt><dd>${esc(f.text)}</dd></div>`).join("")}</dl>` : ""}
      <h3 class="section-title">In the lobby</h3>
      ${psaBlock()}
      <article class="exhibit exhibit-wide">
        <div class="voices" aria-label="Notes from our interview">
          ${r.voices.map((v, k) => `<figure class="note" style="--tilt:${[-2, 1.5, -1, 2, -1.5, 1, -2.5][k]}deg"><figcaption>${esc(v.q)}</figcaption><blockquote>“${esc(v.a)}”</blockquote></figure>`).join("")}
        </div>
        <div class="placard">
          <h3 class="placard-title">The Student Voices Wall</h3>
          <p>Before we built anything, we interviewed a high school student. We asked about stress, mental health, and what would help. Her answers are pinned here.</p>
          <p class="placard-small">We left out her name to protect her privacy.</p>
        </div>
      </article>
      <section class="pov">
        <div><h3>Point of view</h3><p>${esc(r.pov)}</p></div>
        <div><h3>How might we</h3><p>${esc(r.hmw)}</p></div>
      </section>
      <section class="plan-inline">
        <h3 class="section-title">Floor plan</h3>
        ${floorPlan("lobby")}
      </section>`;
  }

  function heroSpiral() {
    let d = "";
    for (let i = 0; i <= 300; i++) {
      const t = i / 300, a = t * 4.25 * 2 * Math.PI, rr = 3 + t * 92;
      d += (i ? "L" : "M") + (100 + rr * Math.cos(a)).toFixed(1) + " " + (100 + rr * Math.sin(a)).toFixed(1);
    }
    return d;
  }

  /* --------------------------------------------------------------- exit */
  function exitRoom(r) {
    return `${roomHeader(r)}
      <div class="exit-grid">
        <section class="exit-card">
          <h3>Signs someone is struggling</h3>
          <ul>${r.signs.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
        </section>
        <section class="exit-card">
          <h3>How to help a friend</h3>
          <ul>${r.help.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
        </section>
      </div>
      <section class="resources">
        <h3>Where to get help</h3>
        <ul>${r.resources.map((x) => `<li><strong>${x.url ? `<a href="${x.url}" target="_blank" rel="noopener">${esc(x.name)}</a>` : esc(x.name)}</strong><span>${esc(x.how)}</span></li>`).join("")}</ul>
        <p class="resources-note">If someone is in danger right now, call 911.</p>
      </section>
      <p class="parting">Your now is not your forever.<span>— Aza's mom, in <cite>Turtles All the Way Down</cite> (Green 93)</span></p>
      <section class="credits">
        <h3>Made by</h3>
        <ul class="team">${M.team.map((t) => `<li><strong>${esc(t.name)}</strong><span>${esc(t.role)}</span></li>`).join("")}</ul>
        <p class="credits-course">${esc(M.course)}</p>
        <h3>Works cited</h3>
        <ol class="cited">${M.sources.map((s) => `<li>${s}</li>`).join("")}</ol>
      </section>`;
  }

  /* --------------------------------------------------------------- room */
  function gallery(r) {
    return `${roomHeader(r)}
      <div class="exhibits">${r.artifacts.map((a, i) => exhibit(a, i, r)).join("")}</div>
      <section class="connect"><h3>Why it matters</h3><p>${esc(r.connect)}</p></section>`;
  }

  /* ------------------------------------------------------------- render */
  let current = null;
  function render() {
    const id = (location.hash.replace(/^#\/?/, "") || "lobby").split("?")[0];
    const r = byId[id] || byId.lobby;
    current = r.id;
    const root = document.documentElement;
    root.style.setProperty("--wall", r.wall);
    root.style.setProperty("--ink", r.ink);
    root.style.setProperty("--accent", r.accent);
    document.body.classList.toggle("dark", !!r.dark);
    document.body.classList.toggle("lit", lum(r.wall) > 0.3);
    const tc = document.querySelector('meta[name="theme-color"]');
    if (tc) tc.setAttribute("content", r.wall);
    const step = order.indexOf(r.id) + 1;
    document.getElementById("brand-progress").style.strokeDashoffset = String(1 - step / order.length);
    document.querySelector(".brand").setAttribute("aria-label", `Turning Outward, stop ${step} of ${order.length}. Back to the lobby`);
    document.body.dataset.room = r.id;
    document.title = r.id === "lobby" ? `${M.title}: ${M.subtitle}` : `${r.name} · ${M.title}`;

    let html = r.id === "lobby" ? lobby(r) : r.id === "exit" ? exitRoom(r) : gallery(r);
    html += doorways(r.id);
    main.innerHTML = html;
    document.getElementById("plan-body").innerHTML = floorPlan(r.id);
    const pos = document.getElementById("where");
    pos.textContent = r.number ? `Room ${r.number} of 5` : r.short;

    wire();
    window.scrollTo(0, 0);
    const h = main.querySelector(".room-title");
    if (h && !firstLoad) h.focus({ preventScroll: true });
    firstLoad = false;
    live.textContent = `You are in ${r.name}.`;
  }
  let firstLoad = true;

  function wire() {
    main.querySelectorAll(".closer-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const open = btn.getAttribute("aria-expanded") !== "true";
        btn.setAttribute("aria-expanded", String(open));
        const panel = document.getElementById(btn.getAttribute("aria-controls"));
        panel.hidden = !open;
        const ex = btn.dataset.ex && document.getElementById(btn.dataset.ex);
        if (ex) ex.classList.toggle("closer", open);
        if (btn.dataset.ex) btn.textContent = open ? "Step back" : "Look closer";
        else btn.textContent = open ? "Hide the script" : "Read the script";
      });
    });
    main.querySelectorAll("[data-open-plan]").forEach((b) => b.addEventListener("click", openPlan));
  }

  /* --------------------------------------------------------- floor plan dialog */
  const dlg = document.getElementById("plan");
  function openPlan() { if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", ""); }
  document.getElementById("plan-btn").addEventListener("click", openPlan);
  document.getElementById("plan-close").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", (e) => {
    if (e.target === dlg) dlg.close();
    if (e.target.closest("a")) dlg.close();
  });

  /* ------------------------------------------------------ keyboard paging */
  document.addEventListener("keydown", (e) => {
    if (e.target.closest("input, textarea, dialog[open]") || e.metaKey || e.ctrlKey || e.altKey) return;
    const i = order.indexOf(current);
    if (e.key === "ArrowRight" && order[i + 1]) location.hash = `#/${order[i + 1]}`;
    if (e.key === "ArrowLeft" && order[i - 1]) location.hash = `#/${order[i - 1]}`;
  });

  window.addEventListener("hashchange", render);
  render();
})();

/* Hand-drawn SVG artifacts. Each artifact has two states:
   the default view, and a "closer" view toggled by the Look closer button.
   Elements with class "only-a" show by default; "only-b" show when looking closer. */
(function () {
  const V = 'viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img"';

  function person(x, y, s, cls, fill, delay) {
    const st = delay != null ? ` style="transition-delay:${delay}ms"` : "";
    return `<g class="${cls}" transform="translate(${x} ${y}) scale(${s})"${st}>
      <circle cx="0" cy="-34" r="11" fill="${fill}"/>
      <path d="M-17 0 C-17 -18 -10 -22 0 -22 C10 -22 17 -18 17 0 Z" fill="${fill}"/>
    </g>`;
  }

  function arc(cx, cy, r, a0, a1) {
    const rad = (a) => ((a - 90) * Math.PI) / 180;
    const x0 = cx + r * Math.cos(rad(a0)), y0 = cy + r * Math.sin(rad(a0));
    const x1 = cx + r * Math.cos(rad(a1)), y1 = cy + r * Math.sin(rad(a1));
    const large = a1 - a0 > 180 ? 1 : 0;
    return `M${cx} ${cy} L${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} Z`;
  }

  function pie(cx, cy, r, parts, cls) {
    let a = 0, out = "";
    parts.forEach((p) => {
      const span = (p.h / 24) * 360;
      out += `<path class="${cls}" d="${arc(cx, cy, r, a, a + span)}" fill="${p.c}" stroke="#fffaf0" stroke-width="2"/>`;
      const mid = ((a + span / 2 - 90) * Math.PI) / 180;
      if (p.h >= 2) {
        out += `<text class="${cls} art-small" x="${(cx + r * 0.62 * Math.cos(mid)).toFixed(1)}" y="${(cy + r * 0.62 * Math.sin(mid) + 4).toFixed(1)}" text-anchor="middle" fill="#2b1d05">${p.t}</text>`;
      }
      a += span;
    });
    return out;
  }

  function spiralPath(cx, cy, turns, maxR) {
    let d = "";
    const steps = turns * 60;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const ang = t * turns * 2 * Math.PI;
      const r = 4 + t * maxR;
      const x = cx + r * Math.cos(ang), y = cy + r * Math.sin(ang) * 0.82;
      d += (i ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
    }
    return d;
  }

  const ART = {
    crowd() {
      const tones = ["#7a4f86", "#2f6f6a", "#c38b2f", "#3f6e4b", "#23779a", "#a2566a"];
      let g = "", i = 0;
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 6; col++) {
          const x = 40 + col * 36 + (row % 2) * 18, y = 120 + row * 52;
          const c = tones[(col + row) % tones.length];
          g += `<g class="crowd-fig" style="--c:${c};transition-delay:${(i++) * 60}ms">${person(x, y, 1, "", "currentColor")}</g>`;
        }
      }
      return `<svg ${V} aria-label="A gray crowd of figures with one colored figure standing apart">
        <rect x="0" y="230" width="400" height="70" fill="#d8ccdc"/>
        ${g}
        ${person(330, 222, 1.4, "", "#7a4f86")}
        <ellipse cx="330" cy="226" rx="34" ry="6" fill="#00000018"/>
        <text class="art-small only-b" x="200" y="272" text-anchor="middle" fill="#3b2541">4 in 10 high schoolers (CDC, 2023)</text>
      </svg>`;
    },

    mask() {
      const outer = ["I'm fine", "just tired", "it's whatever", "no, I'm good", "lol same"];
      const inner = ["I can't stop thinking", "I'm scared", "I need help"];
      return `<svg ${V} aria-label="A white porcelain mask covered in phrases like I'm fine, with cracks revealing hidden words">
        <defs><clipPath id="maskclip"><path d="M200 30 C285 30 320 90 315 150 C310 220 260 275 200 278 C140 275 90 220 85 150 C80 90 115 30 200 30 Z"/></clipPath></defs>
        <g class="mask-inner only-b">
          ${inner.map((t, k) => `<text x="200" y="${120 + k * 44}" text-anchor="middle" class="art-hand" fill="#5a2f63">${t}</text>`).join("")}
        </g>
        <g class="mask-left">
          <path d="M200 30 C115 30 80 90 85 150 C90 220 140 275 200 278 L188 230 L210 180 L190 130 L206 80 Z" fill="#f7f4ef" stroke="#3b2541" stroke-width="2"/>
        </g>
        <g class="mask-right">
          <path d="M200 30 C285 30 320 90 315 150 C310 220 260 275 200 278 L188 230 L210 180 L190 130 L206 80 Z" fill="#f7f4ef" stroke="#3b2541" stroke-width="2"/>
        </g>
        <g class="mask-face">
          <path d="M140 128 Q160 112 180 128 Q160 140 140 128 Z" fill="#3b2541"/>
          <path d="M220 128 Q240 112 260 128 Q240 140 220 128 Z" fill="#3b2541"/>
          <path d="M165 212 Q200 232 235 212" fill="none" stroke="#3b2541" stroke-width="3" stroke-linecap="round"/>
          <path d="M250 80 L262 104 L254 118 M120 190 L134 176 L130 160" fill="none" stroke="#3b2541" stroke-width="1.5"/>
          ${outer.map((t, k) => {
            const pos = [[152, 82], [258, 172], [142, 174], [206, 258], [244, 76]][k];
            return `<text x="${pos[0]}" y="${pos[1]}" text-anchor="middle" class="art-hand-sm" fill="#7a4f86" transform="rotate(${[-8, 6, -4, 3, 10][k]} ${pos[0]} ${pos[1]})">${t}</text>`;
          }).join("")}
        </g>
      </svg>`;
    },

    phone() {
      const posts = [["#f2c14e", "beach day!!"], ["#8fc1d4", "4.0 again"], ["#e48fa8", "best friends"]];
      const searches = ["is it normal to feel like this", "why can't I stop thinking", "how to stop overthinking", "am I sick or just anxious", "who can I talk to"];
      return `<svg ${V} aria-label="A smartphone showing a social media feed, and its late-night search history">
        <rect x="128" y="10" width="144" height="280" rx="22" fill="#123344"/>
        <rect x="136" y="26" width="128" height="250" rx="12" fill="#f4f8fa"/>
        <rect x="180" y="16" width="40" height="5" rx="2.5" fill="#2c5468"/>
        <g class="only-a">
          <text x="144" y="44" class="art-tiny" fill="#123344">Screen time 7h 42m/day</text>
          ${posts.map((p, k) => `<g transform="translate(144 ${54 + k * 72})">
            <rect width="112" height="62" rx="6" fill="${p[0]}"/>
            <text x="8" y="54" class="art-tiny" fill="#123344">${p[1]}</text>
            <path d="M96 46 c-3-4-9-2-8 2 c1 3 8 7 8 7 s7-4 8-7 c1-4-5-6-8-2z" fill="#d6304f"/>
          </g>`).join("")}
        </g>
        <g class="only-b">
          <text x="144" y="46" class="art-tiny" fill="#123344">Searches at 2:14 AM</text>
          ${searches.map((s, k) => `<g transform="translate(144 ${60 + k * 40})">
            <rect width="112" height="32" rx="6" fill="#e1ecf1"/>
            <circle cx="12" cy="16" r="5" fill="none" stroke="#23779a" stroke-width="2"/>
            <foreignObject x="22" y="3" width="88" height="28"><div xmlns="http://www.w3.org/1999/xhtml" class="art-fo">${s}</div></foreignObject>
          </g>`).join("")}
        </g>
      </svg>`;
    },

    mirror() {
      const sparkle = (x, y, s) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -10 L2.5 -2.5 L10 0 L2.5 2.5 L0 10 L-2.5 2.5 L-10 0 L-2.5 -2.5 Z" fill="#fff6c8"/>`;
      return `<svg ${V} aria-label="An ornate mirror showing a filtered, sparkling reflection, then the real one">
        <ellipse cx="200" cy="150" rx="104" ry="134" fill="#c99a3a"/>
        <ellipse cx="200" cy="150" rx="94" ry="124" fill="#e0b85a"/>
        <ellipse cx="200" cy="150" rx="84" ry="114" class="mirror-glass"/>
        <g class="mirror-face">
          <ellipse cx="200" cy="132" rx="38" ry="46" fill="#e8b897"/>
          <path d="M150 262 C150 205 175 190 200 190 C225 190 250 205 250 262 Z" fill="#23779a"/>
          <path d="M162 122 C160 86 186 78 200 78 C222 78 242 90 238 124 C232 104 214 96 200 96 C184 96 170 104 162 122 Z" fill="#3b2a20"/>
          <circle cx="186" cy="134" r="3.5" fill="#3b2a20"/><circle cx="214" cy="134" r="3.5" fill="#3b2a20"/>
          <path d="M188 156 Q200 164 212 156" fill="none" stroke="#7a3d2c" stroke-width="2.5" stroke-linecap="round"/>
        </g>
        <g class="only-b">
          <circle cx="181" cy="146" r="1.4" fill="#a8775c"/><circle cx="217" cy="150" r="1.4" fill="#a8775c"/><circle cx="207" cy="114" r="1.2" fill="#a8775c"/>
          <path d="M180 126 q6 -3 12 0 M208 126 q6 -3 12 0" stroke="#3b2a20" stroke-width="1.5" fill="none"/>
        </g>
        <g class="only-a mirror-filter">
          <ellipse cx="200" cy="150" rx="84" ry="114" fill="#fff3fa" opacity=".28"/>
          <ellipse cx="176" cy="148" rx="9" ry="5" fill="#f59ab8" opacity=".55"/><ellipse cx="224" cy="148" rx="9" ry="5" fill="#f59ab8" opacity=".55"/>
          ${sparkle(150, 80, 1)}${sparkle(258, 112, 0.8)}${sparkle(140, 196, 0.7)}${sparkle(252, 214, 1.1)}${sparkle(226, 70, 0.6)}
          <rect x="146" y="252" width="108" height="24" rx="12" fill="#ffffffd0"/>
          <text x="200" y="268" text-anchor="middle" class="art-tiny" fill="#123344">filter: flawless ✦</text>
        </g>
        <g class="only-b">
          <rect x="156" y="252" width="88" height="24" rx="12" fill="#ffffffd0"/>
          <text x="200" y="268" text-anchor="middle" class="art-tiny" fill="#123344">filter: off</text>
        </g>
      </svg>`;
    },

    clock() {
      const healthy = [{ h: 9, c: "#9fb6d6", t: "sleep" }, { h: 8, c: "#e2b65a", t: "school / work" }, { h: 3, c: "#a9cf9d", t: "friends" }, { h: 2, c: "#f0d9a8", t: "breaks" }, { h: 2, c: "#d9a5b3", t: "family" }];
      const crunch = [{ h: 5, c: "#9fb6d6", t: "sleep" }, { h: 17, c: "#e2b65a", t: "work + homework" }, { h: 1, c: "#a9cf9d", t: "" }, { h: 1, c: "#f0d9a8", t: "" }];
      return `<svg ${V} aria-label="A clock face divided into parts of the day, then overtaken by work">
        <circle cx="200" cy="150" r="128" fill="#3d2c0c"/>
        <circle cx="200" cy="150" r="120" fill="#fffaf0"/>
        <g class="only-a">${pie(200, 150, 110, healthy, "")}</g>
        <g class="only-b">${pie(200, 150, 110, crunch, "")}</g>
        ${Array.from({ length: 12 }, (_, k) => {
          const a = (k * 30 * Math.PI) / 180;
          return `<line x1="${200 + 114 * Math.sin(a)}" y1="${150 - 114 * Math.cos(a)}" x2="${200 + 120 * Math.sin(a)}" y2="${150 - 120 * Math.cos(a)}" stroke="#3d2c0c" stroke-width="3"/>`;
        }).join("")}
        <g class="clock-hands">
          <line x1="200" y1="150" x2="200" y2="82" stroke="#3d2c0c" stroke-width="5" stroke-linecap="round" class="hand-min"/>
          <line x1="200" y1="150" x2="246" y2="150" stroke="#3d2c0c" stroke-width="7" stroke-linecap="round" class="hand-hr"/>
          <circle cx="200" cy="150" r="7" fill="#3d2c0c"/>
        </g>
      </svg>`;
    },

    poster() {
      const tabs = ["988", "Text HOME to 741741", "Your counselor", "A trusted adult", "Take 10 min", "Log off tonight"];
      return `<svg ${V} aria-label="A break room poster reading It's okay to clock out, with tear-off tabs">
        <rect x="88" y="12" width="224" height="276" fill="#fffaf0" stroke="#3d2c0c" stroke-width="2"/>
        <rect x="88" y="12" width="224" height="88" fill="#9a6a12"/>
        <text x="200" y="50" text-anchor="middle" class="art-poster" fill="#fffaf0">It's okay</text>
        <text x="200" y="84" text-anchor="middle" class="art-poster" fill="#fffaf0">to clock out.</text>
        <text x="110" y="128" class="art-small" fill="#3d2c0c">✓ Take your full break</text>
        <text x="110" y="152" class="art-small" fill="#3d2c0c">✓ Eat away from your desk</text>
        <text x="110" y="176" class="art-small" fill="#3d2c0c">✓ Ask for help early</text>
        <text x="110" y="200" class="art-small" fill="#3d2c0c">✓ Rest is part of the job</text>
        ${tabs.map((t, k) => `<g class="tab" style="transition-delay:${k * 70}ms" transform="translate(${92 + k * 36.3} 214)">
          <rect width="34" height="70" fill="#fdf1d6" stroke="#9a6a12" stroke-dasharray="3 2"/>
          <text class="only-a art-tiny" transform="translate(21 64) rotate(-90)" fill="#9a6a12">take one</text>
          <foreignObject class="only-b" x="1" y="2" width="32" height="66"><div xmlns="http://www.w3.org/1999/xhtml" class="art-fo art-fo-tab">${t}</div></foreignObject>
        </g>`).join("")}
      </svg>`;
    },

    chat() {
      const bad = [["l", "lol who invited her"], ["l", "lmaooo"], ["l", "nobody even likes u"], ["r", "?? what did I do"], ["l", "screenshot this lol"]];
      const good = ["1. Screenshot it", "2. Block them", "3. Report it", "4. Tell an adult", "5. Check on them"];
      return `<svg ${V} aria-label="A group chat with hurtful messages, then steps to respond to cyberbullying">
        <rect x="40" y="200" width="320" height="100" fill="#8a6a46"/>
        <rect x="40" y="200" width="320" height="10" fill="#6d5236"/>
        <g transform="rotate(-6 200 150)">
          <rect x="128" y="16" width="144" height="264" rx="22" fill="#18321f"/>
          <rect x="136" y="32" width="128" height="234" rx="12" fill="#f3f6f2"/>
          <text x="146" y="50" class="art-tiny only-a" fill="#18321f">3rd period group</text>
          <text x="146" y="50" class="art-tiny only-b" fill="#18321f">What you can do</text>
          <g class="only-a">${bad.map((m, k) => {
            const r = m[0] === "r";
            return `<g transform="translate(${r ? 172 : 144} ${62 + k * 40})"><rect width="84" height="30" rx="10" fill="${r ? "#3f6e4b" : "#dde5db"}"/>
              <foreignObject x="4" y="2" width="76" height="28"><div xmlns="http://www.w3.org/1999/xhtml" class="art-fo" style="color:${r ? "#fff" : "#18321f"}">${m[1]}</div></foreignObject></g>`;
          }).join("")}</g>
          <g class="only-b">${good.map((t, k) => `<g transform="translate(144 ${62 + k * 40})"><rect width="112" height="30" rx="10" fill="#3f6e4b"/>
            <text x="10" y="19" class="art-tiny" fill="#fff">${t}</text></g>`).join("")}</g>
        </g>
      </svg>`;
    },

    table() {
      const seats = [80, 140, 200, 260, 320];
      return `<svg ${V} aria-label="A long cafeteria table with one student, then other students joining">
        <rect x="0" y="0" width="400" height="300" fill="#e9efe6"/>
        <rect x="0" y="232" width="400" height="68" fill="#cdd8c9"/>
        ${seats.map((x, k) => (k === 1 ? person(x, 176, 1.1, "", "#3f6e4b") :
          `<g class="join only-b" style="transition-delay:${k * 120}ms">${person(x, 176, 1.1, "", ["#7a4f86", "", "#c38b2f", "#23779a", "#a2566a"][k])}</g>`)).join("")}
        <rect x="40" y="170" width="320" height="18" rx="4" fill="#9fb3a0"/>
        <rect x="56" y="188" width="8" height="60" fill="#7d907e"/><rect x="336" y="188" width="8" height="60" fill="#7d907e"/>
        <rect x="40" y="244" width="320" height="10" rx="4" fill="#7d907e"/>
        <rect x="120" y="160" width="40" height="10" rx="2" fill="#f0d9a8"/>
        <g class="only-b">${[80, 200, 260, 320].map((x) => `<rect x="${x - 20}" y="160" width="40" height="10" rx="2" fill="#f0d9a8"/>`).join("")}</g>
        <text x="200" y="40" text-anchor="middle" class="art-small only-a" fill="#18321f">12:05 PM, lunch period B</text>
        <text x="200" y="40" text-anchor="middle" class="art-small only-b" fill="#18321f">"Is this seat taken?"</text>
      </svg>`;
    },

    spiral() {
      const d = spiralPath(200, 150, 5, 118);
      const labels = [["a friend", 330, 56], ["a parent", 22, 92], ["Dr. Singh", 300, 270], ["writing it down", 90, 270]];
      return `<svg ${V} aria-label="A tight spiral sculpture that unwinds outward toward sources of help">
        <path d="${d}" fill="none" stroke="#e7c46a" stroke-width="3" stroke-linecap="round" class="spiral-path" pathLength="1"/>
        <circle cx="200" cy="150" r="5" fill="#e7c46a"/>
        ${labels.map((l, k) => `<g class="only-b" style="transition-delay:${400 + k * 200}ms">
          <circle cx="${l[1]}" cy="${l[2] - 5}" r="4" fill="#e7c46a"/>
          <text x="${l[1] + (l[1] > 200 ? -10 : 10)}" y="${l[2]}" text-anchor="${l[1] > 200 ? "end" : "start"}" class="art-small" fill="#eef0f8">${l[0]}</text></g>`).join("")}
        ${Array.from({ length: 22 }, (_, k) => `<circle cx="${(k * 97) % 400}" cy="${(k * 53) % 300}" r="${k % 3 ? 0.9 : 1.6}" fill="#eef0f8" opacity=".55"/>`).join("")}
      </svg>`;
    },

    turtles() {
      let t = "";
      for (let k = 0; k < 7; k++) {
        const w = 120 - k * 8, y = 40 + k * 36, op = 1 - k * 0.12;
        t += `<g opacity="${op.toFixed(2)}" transform="translate(200 ${y})">
          <ellipse cx="${-w / 2 - 6}" cy="6" rx="10" ry="7" fill="#7fa36b"/>
          <ellipse cx="${-w / 3}" cy="16" rx="8" ry="5" fill="#7fa36b"/><ellipse cx="${w / 3}" cy="16" rx="8" ry="5" fill="#7fa36b"/>
          <path d="M${-w / 2} 14 C${-w / 2} -14 ${w / 2} -14 ${w / 2} 14 Z" fill="#4f7a45" stroke="#2d4a28" stroke-width="2"/>
          <path d="M${-w / 6} 12 L${-w / 6} -4 M${w / 6} 12 L${w / 6} -4 M${-w / 2.6} 6 L${w / 2.6} 6" stroke="#2d4a28" stroke-width="1.5"/>
        </g>`;
      }
      return `<svg ${V} aria-label="A tower of turtles stacked on each other, fading into the dark below">
        <circle cx="200" cy="22" r="20" fill="#5d8fc4"/><path d="M188 14 q8 -6 14 2 q6 8 -2 14" fill="#7fa36b"/>
        ${t}
        <text x="200" y="292" text-anchor="middle" class="art-small only-a" fill="#eef0f8">…and below that?</text>
        <text x="200" y="292" text-anchor="middle" class="art-small only-b" fill="#e7c46a">You don't have to find the bottom to keep standing.</text>
      </svg>`;
    }
  };

  window.ART = ART;
})();

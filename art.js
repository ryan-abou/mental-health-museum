/* Artifact drawings. Every artifact is drawn as a physical object in the same style:
   light from the upper left, soft shading for form, a cast shadow on the panel,
   and real materials (porcelain, gilt, wood, paper, wire).
   Each artifact has two states: the default view, and a "closer" view toggled by
   the Look closer button. Elements with class "only-a" show by default; "only-b"
   show when looking closer. */
(function () {
  const V = 'viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img"';
  const INK = "#2a2230";

  /* shared pieces ------------------------------------------------------ */
  const blur = (id, sd) => `<filter id="${id}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${sd}"/></filter>`;
  const shadow = (id, cx, cy, rx, ry, op = 0.28) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#1a1420" opacity="${op}" filter="url(#${id})"/>`;
  const grain = (id, freq, op) => `<filter id="${id}" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="3" seed="7" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 ${op} 0"/>
      <feComposite in2="SourceGraphic" operator="in"/>
    </filter>`;

  /* A standing person, drawn as a soft silhouette with hair, arms and legs.
     h = hair style 0..3. Origin is between the feet. */
  function figure(x, y, s, fill, h, extra = "") {
    const hair = [
      `<path d="M-9.5 -64 C-10 -75 -3 -79 1 -78.5 C8 -78 11 -72 9.5 -64 C7 -70 -6 -71 -9.5 -64 Z"/>`,
      `<path d="M-10 -63 C-12 -77 10 -80 10.5 -64 L11 -49 C8 -51 8 -58 8 -62 C3 -70 -6 -69 -8 -62 C-8 -57 -8 -52 -11 -49 Z"/>`,
      `<path d="M-9.5 -64 C-10 -76 9 -79 9.5 -64 C6 -71 -6 -71 -9.5 -64 Z"/><circle cx="0" cy="-78" r="5"/>`,
      `<path d="M-10 -63 C-11 -76 9 -79 10 -66 C13 -66 15 -62 13 -58 C11 -61 9 -62 8 -63 C3 -70 -6 -70 -10 -63 Z"/>`
    ][h % 4];
    return `<g transform="translate(${x} ${y}) scale(${s})" fill="${fill}" ${extra}>
      <circle cx="0" cy="-64" r="9"/>
      ${hair}
      <path d="M-3.5 -56 L3.5 -56 L3.5 -51 L-3.5 -51 Z"/>
      <path d="M-13 -50 C-13 -53 -9 -53 -6 -53 L6 -53 C9 -53 13 -53 13 -50 L15 -24 C15 -21 12 -21 12 -24 L10.5 -40 L10 -22 L-10 -22 L-10.5 -40 L-12 -24 C-12 -21 -15 -21 -15 -24 Z"/>
      <path d="M-9.5 -23 L-1 -23 L-1.5 -1 C-1.5 1 -8 1 -8 -1 Z M1 -23 L9.5 -23 L8 -1 C8 1 1.5 1 1.5 -1 Z"/>
    </g>`;
  }

  /* A seated person seen from behind, for the lunch table. */
  function seated(x, y, s, shirt, hairc, h) {
    const hair = h % 2
      ? `<path d="M-11 -50 C-12 -66 12 -66 11 -50 L12 -36 C8 -37 -8 -37 -12 -36 Z" fill="${hairc}"/>`
      : `<path d="M-10.5 -50 C-11 -64 11 -64 10.5 -50 C9 -46 -9 -46 -10.5 -50 Z" fill="${hairc}"/>`;
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-17 0 C-18 -22 -14 -32 0 -33 C14 -32 18 -22 17 0 Z" fill="${shirt}"/>
      <path d="M-17 0 C-18 -22 -14 -32 0 -33 C-6 -28 -9 -16 -9 0 Z" fill="#ffffff" opacity=".14"/>
      <rect x="-3.5" y="-38" width="7" height="6" fill="#c99a7c"/>
      <circle cx="0" cy="-48" r="10.5" fill="#d8a888"/>
      ${hair}
    </g>`;
  }

  function arc(cx, cy, r, a0, a1) {
    const rad = (a) => ((a - 90) * Math.PI) / 180;
    const x0 = cx + r * Math.cos(rad(a0)), y0 = cy + r * Math.sin(rad(a0));
    const x1 = cx + r * Math.cos(rad(a1)), y1 = cy + r * Math.sin(rad(a1));
    const large = a1 - a0 > 180 ? 1 : 0;
    return `M${cx} ${cy} L${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} Z`;
  }
  function pie(cx, cy, r, parts) {
    let a = 0, out = "";
    parts.forEach((p) => {
      const span = (p.h / 24) * 360;
      if (span > 0) out += `<path d="${arc(cx, cy, r, a, a + span)}" fill="${p.c}" opacity=".9"/>`;
      a += span;
    });
    return out;
  }
  function spiralPath(cx, cy, turns, maxR, squash = 0.82) {
    let d = "";
    const steps = turns * 60;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps, ang = t * turns * 2 * Math.PI, r = 4 + t * maxR;
      d += (i ? "L" : "M") + (cx + r * Math.cos(ang)).toFixed(1) + " " + (cy + r * Math.sin(ang) * squash).toFixed(1);
    }
    return d;
  }
  /* A fo() text box wraps text inside an SVG. */
  const fo = (x, y, w, h, html, style = "") => `<foreignObject x="${x}" y="${y}" width="${w}" height="${h}"><div xmlns="http://www.w3.org/1999/xhtml" class="art-fo" style="${style}">${html}</div></foreignObject>`;

  const ART = {
    /* ------------------------------------------------------------ ROOM 1 */
    crowd() {
      const tones = ["#7a4f86", "#2f6f6a", "#c38b2f", "#3f6e4b", "#23779a", "#a2566a", "#b8643c"];
      const grays = ["#b9b3bd", "#a9a3ae", "#c4bfc7", "#b0aab5"];
      let g = "", i = 0;
      const rows = [[0, 128, 0.78, 7], [1, 168, 0.88, 7], [2, 212, 1, 6]];
      rows.forEach(([row, y, s, n]) => {
        for (let col = 0; col < n; col++) {
          const x = 32 + col * (row === 2 ? 34 : 30) + (row % 2) * 14 + (row === 2 ? 8 : 0);
          const c = tones[(col * 3 + row) % tones.length];
          g += `<g class="crowd-fig" style="--c:${c};--g:${grays[(col + row) % 4]};transition-delay:${(i++) * 50}ms">${figure(x, y, s, "currentColor", col + row)}</g>`;
        }
      });
      return `<svg ${V} aria-label="A mural of a gray crowd of people, with one person painted in color standing apart">
        <defs>
          ${grain("cw-g", 0.75, 0.09)}${blur("cw-b", 5)}
          <linearGradient id="cw-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ede6ee"/><stop offset="1" stop-color="#dcd1df"/></linearGradient>
          <radialGradient id="cw-glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#f6d48a" stop-opacity=".55"/><stop offset="1" stop-color="#f6d48a" stop-opacity="0"/></radialGradient>
        </defs>
        <rect x="14" y="10" width="372" height="236" fill="url(#cw-wall)"/>
        <rect x="14" y="10" width="372" height="236" fill="#5a4560" filter="url(#cw-g)"/>
        <path d="M14 222 L386 222" stroke="#c7b9cb" stroke-width="2"/>
        ${shadow("cw-b", 145, 216, 125, 7, 0.16)}
        ${g}
        <circle cx="338" cy="168" r="64" fill="url(#cw-glow)"/>
        ${shadow("cw-b", 338, 214, 22, 4, 0.3)}
        ${figure(338, 212, 1.12, "#7a4f86", 1)}
        <path d="M331 152 C333 146 338 144 342 145" stroke="#b58ac2" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <rect x="14" y="10" width="372" height="236" fill="none" stroke="#bfb0c4" stroke-width="1.5"/>
        ${shadow("cw-b", 200, 262, 190, 8, 0.12)}
        <text class="art-small only-b" x="200" y="282" text-anchor="middle" fill="#3b2541">4 in 10 high schoolers felt sad or hopeless (CDC, 2023)</text>
      </svg>`;
    },

    mask() {
      const outer = ["I'm fine", "just tired", "it's whatever", "lol same"];
      const inner = ["I can't stop thinking", "I'm scared", "I need help"];
      const face = "M200 26 C278 26 318 82 314 150 C310 222 262 276 200 280 C138 276 90 222 86 150 C82 82 122 26 200 26 Z";
      const crack = "L196 238 L214 196 L193 154 L211 112 L195 70 Z";
      return `<svg ${V} aria-label="A white porcelain mask covered in phrases like I'm fine, with a crack down the middle hiding other words">
        <defs>
          ${blur("mk-b", 7)}
          <radialGradient id="mk-p" cx=".38" cy=".3" r=".8"><stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#f3eee8"/><stop offset="1" stop-color="#d8cdd6"/></radialGradient>
          <radialGradient id="mk-eye" cx=".5" cy=".35" r=".6"><stop offset="0" stop-color="#1d1222"/><stop offset="1" stop-color="#3b2541"/></radialGradient>
          <radialGradient id="mk-dark" cx=".5" cy=".5" r=".6"><stop offset="0" stop-color="#4a2e55"/><stop offset="1" stop-color="#22142a"/></radialGradient>
          <clipPath id="mk-clip"><path d="${face}"/></clipPath>
        </defs>
        ${shadow("mk-b", 210, 284, 92, 9, 0.3)}
        <g class="mask-inner only-b">
          <path d="${face}" fill="url(#mk-dark)"/>
          ${inner.map((t, k) => `<text x="200" y="${116 + k * 50}" text-anchor="middle" class="art-hand" fill="#f2e4f6">${t}</text>`).join("")}
        </g>
        <g class="mask-left">
          <path d="M200 26 C122 26 82 82 86 150 C90 222 138 276 200 280 ${crack}" fill="url(#mk-p)" stroke="#6b5873" stroke-width="1.5"/>
          <path d="M102 112 C96 160 116 226 168 262" stroke="#c9bccd" stroke-width="6" fill="none" opacity=".55" stroke-linecap="round"/>
        </g>
        <g class="mask-right">
          <path d="M200 26 C278 26 318 82 314 150 C310 222 262 276 200 280 ${crack}" fill="url(#mk-p)" stroke="#6b5873" stroke-width="1.5"/>
          <path d="M296 108 C306 160 290 224 236 262" stroke="#c9bccd" stroke-width="8" fill="none" opacity=".6" stroke-linecap="round"/>
        </g>
        <g class="mask-face">
          <g clip-path="url(#mk-clip)">
            <path d="M118 100 C130 76 160 70 186 84" stroke="#e3d8e2" stroke-width="10" fill="none" stroke-linecap="round" opacity=".8"/>
            <path d="M132 112 Q156 96 180 110" stroke="#8a7690" stroke-width="2.5" fill="none" stroke-linecap="round"/>
            <path d="M220 110 Q244 96 268 112" stroke="#8a7690" stroke-width="2.5" fill="none" stroke-linecap="round"/>
            <path d="M136 132 Q158 114 182 132 Q158 146 136 132 Z" fill="url(#mk-eye)"/>
            <path d="M218 132 Q242 114 264 132 Q242 146 218 132 Z" fill="url(#mk-eye)"/>
            <path d="M200 140 C196 160 192 172 186 180 C192 186 206 186 212 181" stroke="#b6a6bb" stroke-width="2" fill="none" stroke-linecap="round"/>
            <path d="M168 216 Q200 234 232 214" fill="none" stroke="#6b5873" stroke-width="3" stroke-linecap="round"/>
            <path d="M211 112 L226 100 L232 84 M193 154 L176 160 L166 176 M214 196 L232 206" stroke="#6b5873" stroke-width="1" fill="none"/>
          </g>
          ${outer.map((t, k) => {
            const pos = [[150, 74], [262, 176], [138, 178], [244, 248]][k];
            return `<text x="${pos[0]}" y="${pos[1]}" text-anchor="middle" class="art-hand-sm" fill="#7a4f86" transform="rotate(${[-9, 7, -5, -7][k]} ${pos[0]} ${pos[1]})">${t}</text>`;
          }).join("")}
          <path d="M86 150 C70 150 56 156 44 168 M314 150 C330 150 344 156 356 168" stroke="#9c6fa8" stroke-width="3" fill="none" stroke-linecap="round"/>
        </g>
      </svg>`;
    },

    /* ------------------------------------------------------------ ROOM 2 */
    phone() {
      const searches = ["is it normal to feel like this", "why can't I stop thinking", "how to stop overthinking", "am I sick or just anxious", "who can I talk to"];
      const post = (y, art, cap, likes) => `<g transform="translate(142 ${y})">
          <circle cx="7" cy="6" r="5" fill="#c9d9e2"/><rect x="16" y="3" width="40" height="5" rx="2.5" fill="#9fb5c2"/>
          <g clip-path="url(#ph-post)" transform="translate(0 14)">${art}</g>
          <path transform="translate(4 81)" d="M5 2.5 C4 0 0 .5 0 3.5 C0 6 5 9 5 9 C5 9 10 6 10 3.5 C10 .5 6 0 5 2.5 Z" fill="#e0355a"/>
          <text x="18" y="89" class="art-tiny" fill="#123344">${likes}  ${cap}</text>
        </g>`;
      const beach = `<rect width="116" height="62" fill="#8fd0ee"/><circle cx="90" cy="18" r="9" fill="#ffe08a"/><rect y="34" width="116" height="12" fill="#2f8fbf"/><rect y="44" width="116" height="18" fill="#f2d39b"/>
        <g fill="#123344">${figure(40, 58, 0.42, "#123344", 1)}${figure(56, 58, 0.42, "#123344", 0)}</g>`;
      const grades = `<rect width="116" height="62" fill="#f6efe2"/><rect x="18" y="8" width="62" height="50" fill="#fff" stroke="#cfc6b6" transform="rotate(-6 49 33)"/>
        <text x="40" y="44" class="art-poster" fill="#d63a3a" transform="rotate(-6 49 33)" style="font-size:26px">A+</text>`;
      return `<svg ${V} aria-label="A smartphone showing a picture-perfect social media feed; looking closer shows its late-night search history">
        <defs>
          ${blur("ph-b", 7)}
          <linearGradient id="ph-body" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2d5164"/><stop offset=".5" stop-color="#123344"/><stop offset="1" stop-color="#0a1f2a"/></linearGradient>
          <linearGradient id="ph-glare" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/></linearGradient>
          <clipPath id="ph-post"><rect width="116" height="62" rx="5"/></clipPath>
          <clipPath id="ph-screen"><rect x="134" y="22" width="132" height="258" rx="16"/></clipPath>
        </defs>
        ${shadow("ph-b", 210, 290, 78, 8, 0.32)}
        <rect x="270" y="74" width="4" height="34" rx="2" fill="#0d2633"/><rect x="126" y="70" width="4" height="22" rx="2" fill="#0d2633"/><rect x="126" y="98" width="4" height="22" rx="2" fill="#0d2633"/>
        <rect x="128" y="14" width="144" height="274" rx="24" fill="url(#ph-body)"/>
        <rect x="134" y="20" width="132" height="262" rx="18" fill="#05141c"/>
        <g clip-path="url(#ph-screen)">
          <rect x="134" y="22" width="132" height="258" fill="#f6f9fb"/>
          <text x="146" y="38" class="art-tiny" fill="#123344">2:14</text>
          <rect x="242" y="31" width="14" height="7" rx="2" fill="none" stroke="#123344"/><rect x="243.5" y="32.5" width="2.5" height="4" fill="#d6304f"/>
          <g class="only-a">
            <text x="146" y="57" class="art-small art-bold" fill="#123344" style="font-size:12px">For you</text>
            <text x="256" y="57" text-anchor="end" class="art-tiny" fill="#23779a" style="font-size:9px">7h 42m</text>
            ${post(66, beach, "beach day!!", "2.1k")}
            ${post(166, grades, "4.0 again lol", "984")}
          </g>
          <g class="only-b">
            <rect x="142" y="48" width="116" height="20" rx="10" fill="#e4eef3"/>
            <circle cx="153" cy="58" r="4" fill="none" stroke="#23779a" stroke-width="1.8"/><path d="M156 61 L159 64" stroke="#23779a" stroke-width="1.8"/>
            <text x="164" y="61.5" class="art-tiny" fill="#6e8794">Search</text>
            <text x="146" y="86" class="art-tiny" fill="#6e8794">Recent, 2:14 AM</text>
            ${searches.map((s, k) => `<g transform="translate(142 ${94 + k * 36})">
              <path d="M6 9 A6 6 0 1 1 6.1 9 M6 5 L6 9 L9 11" fill="none" stroke="#9fb5c2" stroke-width="1.4" transform="translate(0 2)"/>
              ${fo(18, 0, 98, 30, s)}
              <path d="M0 33 L116 33" stroke="#e4eef3"/>
            </g>`).join("")}
          </g>
          <rect x="134" y="22" width="132" height="258" fill="url(#ph-glare)"/>
        </g>
        <rect x="181" y="26" width="38" height="9" rx="4.5" fill="#05141c"/>
      </svg>`;
    },

    mirror() {
      const sparkle = (x, y, s) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -10 C1 -3 3 -1 10 0 C3 1 1 3 0 10 C-1 3 -3 1 -10 0 C-3 -1 -1 -3 0 -10 Z" fill="#fffbe0"/>`;
      /* scalloped gilt frame: bumps around the oval */
      let beads = "";
      for (let k = 0; k < 36; k++) {
        const a = (k / 36) * Math.PI * 2;
        beads += `<circle cx="${(200 + 112 * Math.cos(a)).toFixed(1)}" cy="${(146 + 136 * Math.sin(a)).toFixed(1)}" r="${k % 2 ? 5 : 7}" fill="url(#mr-gold)"/>`;
      }
      return `<svg ${V} aria-label="An ornate gold mirror showing a filtered, sparkling reflection; looking closer turns the filter off">
        <defs>
          ${blur("mr-b", 7)}${blur("mr-soft", 1.4)}
          <linearGradient id="mr-gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4dc8e"/><stop offset=".45" stop-color="#c99a3a"/><stop offset=".7" stop-color="#e6c26a"/><stop offset="1" stop-color="#8a6420"/></linearGradient>
          <linearGradient id="mr-glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#eef6f9"/><stop offset="1" stop-color="#c9dde6"/></linearGradient>
          <linearGradient id="mr-skin" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f0c4a2"/><stop offset="1" stop-color="#d49a78"/></linearGradient>
          <clipPath id="mr-clip"><ellipse cx="200" cy="146" rx="86" ry="110"/></clipPath>
        </defs>
        ${shadow("mr-b", 214, 290, 96, 7, 0.28)}
        <path d="M200 6 C206 0 214 0 216 8" stroke="#8a6420" stroke-width="2" fill="none"/>
        ${beads}
        <ellipse cx="200" cy="146" rx="108" ry="132" fill="url(#mr-gold)"/>
        <ellipse cx="200" cy="146" rx="98" ry="122" fill="none" stroke="#8a6420" stroke-width="2"/>
        <ellipse cx="200" cy="146" rx="94" ry="118" fill="none" stroke="#f6e3a4" stroke-width="3" opacity=".8"/>
        <path d="M200 16 C190 22 186 30 200 36 C214 30 210 22 200 16 Z M200 276 C190 270 186 262 200 256 C214 262 210 270 200 276 Z" fill="#a87a28"/>
        <ellipse cx="200" cy="146" rx="88" ry="112" fill="#7a5a1a"/>
        <g clip-path="url(#mr-clip)">
          <rect x="100" y="30" width="200" height="240" fill="url(#mr-glass)" class="mirror-glass"/>
          <rect x="110" y="40" width="40" height="70" fill="#d8e7ee" opacity=".7"/>
          <path d="M126 270 C126 214 160 198 200 198 C240 198 274 214 274 270 Z" fill="#23779a"/>
          <path d="M184 198 L200 222 L216 198 Z" fill="#1a5d7a"/>
          <rect x="190" y="174" width="20" height="30" fill="#d49a78"/>
          <ellipse cx="200" cy="132" rx="38" ry="47" fill="url(#mr-skin)"/>
          <ellipse cx="162" cy="136" rx="6" ry="10" fill="#d49a78"/><ellipse cx="238" cy="136" rx="6" ry="10" fill="#d49a78"/>
          <path d="M160 128 C152 82 186 70 204 72 C232 74 250 94 240 130 C236 112 230 100 220 96 C210 108 186 110 170 104 C166 110 162 118 160 128 Z" fill="#3b2a20"/>
          <path d="M184 86 C196 80 214 80 226 88" stroke="#5a4232" stroke-width="2" fill="none" opacity=".7"/>
          <path d="M178 120 Q186 116 194 120 M206 120 Q214 116 222 120" stroke="#3b2a20" stroke-width="2.4" fill="none" stroke-linecap="round"/>
          <ellipse cx="186" cy="132" rx="4.5" ry="4" fill="#2a1d16"/><ellipse cx="214" cy="132" rx="4.5" ry="4" fill="#2a1d16"/>
          <circle cx="187.5" cy="130.5" r="1.3" fill="#fff"/><circle cx="215.5" cy="130.5" r="1.3" fill="#fff"/>
          <path d="M200 136 C199 146 196 151 194 153 C198 156 203 156 206 153" stroke="#b47a5a" stroke-width="1.8" fill="none" stroke-linecap="round"/>
          <path d="M188 164 Q200 172 212 164" fill="none" stroke="#9a4a3a" stroke-width="2.6" stroke-linecap="round"/>
          <g class="only-a">
            <ellipse cx="200" cy="146" rx="33" ry="30" fill="#fff4f6" opacity=".45" filter="url(#mr-soft)"/>
            <ellipse cx="186" cy="131" rx="8" ry="7.5" fill="#fff"/><ellipse cx="214" cy="131" rx="8" ry="7.5" fill="#fff"/>
            <circle cx="186" cy="132" r="5.6" fill="#5a3a7a"/><circle cx="214" cy="132" r="5.6" fill="#5a3a7a"/>
            <circle cx="184" cy="129.5" r="2.2" fill="#fff"/><circle cx="212" cy="129.5" r="2.2" fill="#fff"/>
            <path d="M177 127 L173 123 M181 124 L179 119 M223 127 L227 123 M219 124 L221 119" stroke="#3b2a20" stroke-width="1.4"/>
            <ellipse cx="177" cy="152" rx="9" ry="5" fill="#f59ab8" opacity=".6"/><ellipse cx="223" cy="152" rx="9" ry="5" fill="#f59ab8" opacity=".6"/>
            <path d="M186 163 Q200 175 214 163" fill="#f2c4c4" stroke="#c45a6a" stroke-width="2.2" stroke-linecap="round"/>
            ${sparkle(140, 80, 1)}${sparkle(262, 108, 0.8)}${sparkle(136, 196, 0.7)}${sparkle(258, 210, 1.1)}${sparkle(230, 62, 0.6)}
          </g>
          <g class="only-b">
            <g fill="#b9785a" opacity=".45"><circle cx="180" cy="148" r="1.3"/><circle cx="185" cy="151" r="1.1"/><circle cx="176" cy="152" r="1"/><circle cx="220" cy="148" r="1.3"/><circle cx="215" cy="151" r="1.1"/><circle cx="224" cy="152" r="1"/><circle cx="198" cy="147" r=".9"/></g>
            <path d="M176 128 Q178 131 180 131 M224 128 Q222 131 220 131" stroke="#b47a5a" stroke-width="1.2" fill="none" opacity=".7"/>
            <path d="M186 162 Q200 174 214 162" fill="none" stroke="#9a4a3a" stroke-width="2.6" stroke-linecap="round"/>
          </g>
          <path d="M120 60 L180 30 L196 30 L130 70 Z M132 92 L214 40 L222 44 L138 98 Z" fill="#fff" opacity=".28"/>
        </g>
        <g class="only-a">
          <rect x="140" y="246" width="120" height="24" rx="12" fill="#ffffffe0"/>
          <text x="200" y="262" text-anchor="middle" class="art-tiny" fill="#123344">filter: flawless ✦</text>
        </g>
        <g class="only-b">
          <rect x="156" y="246" width="88" height="24" rx="12" fill="#ffffffe0"/>
          <text x="200" y="262" text-anchor="middle" class="art-tiny" fill="#123344">filter: off</text>
        </g>
      </svg>`;
    },

    /* ------------------------------------------------------------ ROOM 3 */
    clock() {
      const c = { sleep: "#9fb6d6", work: "#e2b65a", friends: "#a9cf9d", breaks: "#f0d9a8", family: "#d9a5b3" };
      const healthy = [{ h: 9, c: c.sleep, t: "Sleep" }, { h: 8, c: c.work, t: "School, work" }, { h: 3, c: c.friends, t: "Friends" }, { h: 2, c: c.family, t: "Family" }, { h: 2, c: c.breaks, t: "Breaks" }];
      const crunch = [{ h: 5, c: c.sleep, t: "Sleep" }, { h: 17, c: c.work, t: "School, work" }, { h: 1, c: c.friends, t: "Friends" }, { h: 1, c: c.family, t: "Family" }, { h: 0, c: c.breaks, t: "Breaks" }];
      const cx = 122, cy = 150;
      const legend = (parts) => parts.map((p, k) => `<g transform="translate(252 ${96 + k * 30})">
        <rect width="16" height="16" rx="3" fill="${p.c}" stroke="#3d2c0c" stroke-width=".8"/>
        <text x="24" y="13" class="art-small" fill="#3d2c0c">${p.t}</text>
        <text x="138" y="13" class="art-small art-bold" text-anchor="end" fill="#3d2c0c">${p.h}h</text></g>`).join("");
      const ticks = Array.from({ length: 60 }, (_, k) => {
        const a = (k * 6 * Math.PI) / 180, big = k % 5 === 0, r0 = big ? 86 : 91;
        return `<line x1="${(cx + r0 * Math.sin(a)).toFixed(1)}" y1="${(cy - r0 * Math.cos(a)).toFixed(1)}" x2="${(cx + 96 * Math.sin(a)).toFixed(1)}" y2="${(cy - 96 * Math.cos(a)).toFixed(1)}" stroke="#3d2c0c" stroke-width="${big ? 3 : 1}"/>`;
      }).join("");
      const nums = [[12, 0], [3, 90], [6, 180], [9, 270]].map(([n, d]) => {
        const a = (d * Math.PI) / 180;
        return `<text x="${(cx + 72 * Math.sin(a)).toFixed(1)}" y="${(cy - 72 * Math.cos(a) + 7).toFixed(1)}" text-anchor="middle" class="art-poster" style="font-size:20px" fill="#3d2c0c">${n}</text>`;
      }).join("");
      return `<svg ${V} aria-label="A wall clock whose face is split into the parts of a day, with a color key. Looking closer, work takes over the day.">
        <defs>
          ${blur("ck-b", 6)}
          <linearGradient id="ck-rim" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7a5a2a"/><stop offset=".5" stop-color="#3d2c0c"/><stop offset="1" stop-color="#2a1d06"/></linearGradient>
          <radialGradient id="ck-face" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#fffdf6"/><stop offset="1" stop-color="#efe4cc"/></radialGradient>
          <linearGradient id="ck-glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".4" stop-color="#fff" stop-opacity="0"/></linearGradient>
        </defs>
        ${shadow("ck-b", cx + 10, cy + 12, 112, 112, 0.3)}
        <circle cx="${cx}" cy="${cy}" r="116" fill="url(#ck-rim)"/>
        <circle cx="${cx}" cy="${cy}" r="108" fill="none" stroke="#a88a52" stroke-width="2"/>
        <circle cx="${cx}" cy="${cy}" r="104" fill="url(#ck-face)"/>
        <g class="only-a">${pie(cx, cy, 82, healthy)}</g>
        <g class="only-b">${pie(cx, cy, 82, crunch)}</g>
        <circle cx="${cx}" cy="${cy}" r="56" fill="url(#ck-face)" opacity=".92"/>
        ${ticks}${nums}
        <g class="clock-hands">
          <path d="M${cx - 3} ${cy + 12} L${cx} ${cy - 74} L${cx + 3} ${cy + 12} Z" fill="#3d2c0c" class="hand-min"/>
          <path d="M${cx - 12} ${cy - 4} L${cx + 50} ${cy} L${cx - 12} ${cy + 4} Z" fill="#3d2c0c" class="hand-hr"/>
          <circle cx="${cx}" cy="${cy}" r="6" fill="#c99a3a" stroke="#3d2c0c" stroke-width="2"/>
        </g>
        <circle cx="${cx}" cy="${cy}" r="104" fill="url(#ck-glass)"/>
        <rect x="244" y="58" width="154" height="190" fill="#fffaf0" stroke="#d8c8a2"/>
        <text x="252" y="82" class="art-small art-bold only-a" fill="#3d2c0c">A healthy day</text>
        <text x="252" y="82" class="art-small art-bold only-b" fill="#3d2c0c">A crunch week</text>
        <g class="only-a">${legend(healthy)}</g>
        <g class="only-b">${legend(crunch)}</g>
      </svg>`;
    },

    poster() {
      const tabs = ["Call 988", "Text 741741", "Counselor", "An adult", "Take 10", "Log off"];
      return `<svg ${V} aria-label="A break room poster reading It's okay to clock out, taped to a wall, with tear-off tabs">
        <defs>
          ${blur("ps-b", 5)}${grain("ps-g", 1.2, 0.18)}
          <linearGradient id="ps-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a4a10"/><stop offset=".6" stop-color="#b4781a"/><stop offset="1" stop-color="#e7a94a"/></linearGradient>
        </defs>
        ${shadow("ps-b", 204, 156, 116, 140, 0.24)}
        <g transform="rotate(-1.2 200 150)">
          <rect x="88" y="10" width="224" height="280" fill="#fff9ec"/>
          <rect x="88" y="10" width="224" height="104" fill="url(#ps-sky)"/>
          <circle cx="286" cy="100" r="22" fill="#f6d27a"/>
          <path d="M88 114 L88 96 C130 88 170 104 210 96 C250 88 280 100 312 94 L312 114 Z" fill="#8a5a12" opacity=".55"/>
          <text x="104" y="48" class="art-poster" fill="#fffaf0">It's okay</text>
          <text x="104" y="86" class="art-poster" fill="#fffaf0">to clock out.</text>
          ${["Take your full break", "Eat away from your desk", "Ask for help early", "Rest is part of the job"].map((t, k) => `<g transform="translate(104 ${134 + k * 21})">
            <circle cx="5" cy="-4" r="6" fill="#9a6a12"/><path d="M2 -4 L4.5 -1.5 L8.5 -7" stroke="#fff" stroke-width="1.6" fill="none"/>
            <text x="18" y="0" class="art-small" fill="#3d2c0c">${t}</text></g>`).join("")}
          ${tabs.map((t, k) => `<g class="tab" style="transition-delay:${k * 70}ms" transform="translate(${90 + k * 36.6} 218)">
            <rect width="35" height="70" fill="#fdf1d6"/>
            <path d="M35 0 L35 70" stroke="#c7a05a" stroke-dasharray="3 3"/>
            <text class="only-a art-tiny" transform="translate(21 64) rotate(-90)" fill="#9a6a12">take one</text>
            <text class="only-b art-tiny" transform="translate(21 66) rotate(-90)" fill="#3d2c0c">${t}</text>
          </g>`).join("")}
          <path d="M88 218 L312 218" stroke="#c7a05a" stroke-dasharray="4 3"/>
          <rect x="88" y="10" width="224" height="280" fill="#7a5a2a" filter="url(#ps-g)"/>
          <rect x="74" y="2" width="40" height="15" fill="#f4ecd0" opacity=".85" transform="rotate(-24 94 10)"/>
          <rect x="286" y="2" width="40" height="15" fill="#f4ecd0" opacity=".85" transform="rotate(26 306 10)"/>
        </g>
      </svg>`;
    },

    /* ------------------------------------------------------------ ROOM 4 */
    chat() {
      const bad = [["l", "lol who invited her", "#c38b2f"], ["l", "lmaooo", "#7a4f86"], ["l", "nobody even likes u", "#23779a"], ["r", "why tho??"], ["l", "screenshot this lol", "#c38b2f"]];
      const good = ["Screenshot it", "Block them", "Report it", "Tell an adult", "Check on them"];
      let wood = "";
      for (let k = 0; k < 9; k++) wood += `<path d="M0 ${18 + k * 34} C120 ${8 + k * 34} 260 ${30 + k * 34} 400 ${14 + k * 34}" stroke="#6d4f30" stroke-width="${k % 3 ? 1 : 2}" fill="none" opacity=".35"/>`;
      return `<svg ${V} aria-label="A phone hidden under a desk, showing a group chat with hurtful messages; looking closer shows steps to respond to cyberbullying">
        <defs>
          ${blur("ch-b", 7)}
          <linearGradient id="ch-wood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b28a5e"/><stop offset="1" stop-color="#8a6a46"/></linearGradient>
          <linearGradient id="ch-body" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2f5a3a"/><stop offset="1" stop-color="#10241a"/></linearGradient>
          <linearGradient id="ch-glare" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".2"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/></linearGradient>
          <clipPath id="ch-screen"><rect x="136" y="30" width="128" height="242" rx="14"/></clipPath>
        </defs>
        <rect width="400" height="300" fill="url(#ch-wood)"/>${wood}
        <g transform="rotate(8 64 150)"><rect x="14" y="40" width="100" height="134" fill="#f6f4ee"/><g stroke="#a9c3d6">${Array.from({ length: 10 }, (_, k) => `<path d="M22 ${62 + k * 11} L106 ${62 + k * 11}"/>`).join("")}</g><path d="M30 40 L30 174" stroke="#e7a3a3"/></g>
        <g transform="rotate(-24 340 220)"><rect x="300" y="214" width="96" height="9" fill="#f2c14e"/><path d="M396 214 L410 218.5 L396 223 Z" fill="#e8c9a0"/><rect x="292" y="214" width="9" height="9" fill="#e48fa8"/></g>
        ${shadow("ch-b", 210, 162, 80, 140, 0.35)}
        <g transform="rotate(-6 200 150)">
          <rect x="128" y="14" width="144" height="270" rx="24" fill="url(#ch-body)"/>
          <rect x="134" y="24" width="132" height="254" rx="18" fill="#05140c"/>
          <g clip-path="url(#ch-screen)">
            <rect x="136" y="30" width="128" height="242" fill="#f3f6f2"/>
            <rect x="136" y="30" width="128" height="30" fill="#e3ebe1"/>
            <circle cx="152" cy="46" r="7" fill="#3f6e4b"/><text x="164" y="43" class="art-tiny only-a" fill="#18321f">3rd period group</text>
            <text x="164" y="54" class="art-tiny only-a" fill="#6a8a70" style="font-weight:400">5 people</text>
            <text x="164" y="49" class="art-tiny only-b" fill="#18321f">What you can do</text>
            <g class="only-a">${bad.map((m, k) => {
              const r = m[0] === "r", y = 68 + k * 40;
              return `<g transform="translate(${r ? 176 : 144} ${y})">
                ${r ? "" : `<circle cx="6" cy="24" r="6" fill="${m[2]}"/>`}
                <rect x="${r ? 0 : 15}" width="${r ? 80 : 86}" height="30" rx="11" fill="${r ? "#3f6e4b" : "#dde5db"}"/>
                ${fo(r ? 4 : 19, 2, 78, 28, m[1], `color:${r ? "#fff" : "#18321f"}`)}</g>`;
            }).join("")}
              <text x="250" y="266" text-anchor="end" class="art-tiny" fill="#6a8a70" style="font-weight:400">Seen by 4</text></g>
            <g class="only-b">${good.map((t, k) => `<g transform="translate(144 ${70 + k * 40})"><rect width="112" height="32" rx="11" fill="#3f6e4b"/>
              <circle cx="16" cy="16" r="9" fill="#fff" opacity=".2"/><text x="16" y="20" text-anchor="middle" class="art-tiny" fill="#fff">${k + 1}</text>
              <text x="31" y="20" class="art-tiny" fill="#fff">${t}</text></g>`).join("")}</g>
            <rect x="136" y="30" width="128" height="242" fill="url(#ch-glare)"/>
          </g>
          <rect x="183" y="30" width="34" height="8" rx="4" fill="#05140c"/>
        </g>
      </svg>`;
    },

    table() {
      const seats = [92, 148, 204, 260, 316];
      const shirts = ["#7a4f86", "#3f6e4b", "#c38b2f", "#23779a", "#a2566a"];
      const hairs = ["#3b2a20", "#1f1a17", "#6b4a2a", "#2a1d16", "#8a5a2a"];
      const tray = (x) => `<g transform="translate(${x - 21} 196)"><rect width="42" height="11" rx="2" fill="#cfd9cc"/><circle cx="12" cy="4" r="4.5" fill="#e2b65a"/><rect x="21" y="1.5" width="14" height="5" rx="2" fill="#c96a4a"/></g>`;
      let tiles = "";
      for (let k = -6; k <= 12; k++) tiles += `<path d="M${200 + k * 22} 222 L${200 + k * 60} 300" stroke="#b9c7b6" stroke-width="1"/>`;
      return `<svg ${V} aria-label="A long cafeteria table with one student eating alone; looking closer, other students join">
        <defs>
          ${blur("tb-b", 5)}
          <linearGradient id="tb-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8eee4"/><stop offset="1" stop-color="#d9e3d5"/></linearGradient>
          <linearGradient id="tb-win" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfe6f2"/><stop offset="1" stop-color="#eef6ea"/></linearGradient>
          <linearGradient id="tb-top" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8c9b6"/><stop offset="1" stop-color="#93a892"/></linearGradient>
        </defs>
        <clipPath id="tb-clip"><rect width="400" height="300"/></clipPath>
        <g clip-path="url(#tb-clip)">
        <rect width="400" height="222" fill="url(#tb-wall)"/>
        ${[40, 150, 260].map((x) => `<rect x="${x}" y="40" width="100" height="92" fill="url(#tb-win)" stroke="#b5c3b1" stroke-width="5"/><path d="M${x + 50} 40 L${x + 50} 132 M${x} 86 L${x + 100} 86" stroke="#b5c3b1" stroke-width="3"/>`).join("")}
        <path d="M60 40 L110 132 M180 40 L210 132" stroke="#fff" stroke-width="10" opacity=".35"/>
        <circle cx="368" cy="30" r="15" fill="#fff" stroke="#3d4a3a" stroke-width="2.5"/><path d="M368 30 L368 18 M368 30 L370 31" stroke="#3d4a3a" stroke-width="2" stroke-linecap="round"/><circle cx="368" cy="30" r="1.8" fill="#3d4a3a"/>
        <rect y="222" width="400" height="78" fill="#cdd8c9"/>${tiles}
        <path d="M0 222 L400 222" stroke="#aebdaa" stroke-width="2"/>
        </g>
        ${shadow("tb-b", 200, 262, 176, 10, 0.25)}
        ${seats.map((x, k) => (k === 1 ? seated(x, 206, 1, shirts[k], hairs[k], k) :
          `<g class="join only-b" style="transition-delay:${k * 120}ms">${seated(x, 206, 1, shirts[k], hairs[k], k)}</g>`)).join("")}
        <rect x="34" y="200" width="332" height="14" rx="3" fill="url(#tb-top)"/>
        <rect x="34" y="212" width="332" height="5" fill="#7d907e"/>
        <path d="M58 217 L50 258 M342 217 L350 258" stroke="#6e8270" stroke-width="7" stroke-linecap="round"/>
        <rect x="40" y="244" width="320" height="9" rx="4" fill="#8fa38e"/>
        ${tray(148)}
        <g class="only-b">${[92, 204, 260, 316].map(tray).join("")}</g>
        <text x="200" y="26" text-anchor="middle" class="art-small only-a" fill="#18321f">12:05 PM, lunch period B</text>
        <text x="200" y="26" text-anchor="middle" class="art-small only-b" fill="#18321f">"Is this seat taken?"</text>
      </svg>`;
    },

    /* ------------------------------------------------------------ ROOM 5 */
    spiral() {
      const d = spiralPath(200, 132, 5, 112, 0.7);
      const labels = [["a friend", 334, 46], ["a parent", 26, 82], ["Dr. Singh", 316, 222], ["writing it down", 70, 222]];
      return `<svg ${V} aria-label="A wire spiral sculpture on a stone base that unwinds outward toward sources of help">
        <defs>
          ${blur("sp-b", 5)}${blur("sp-glow", 3)}
          <linearGradient id="sp-wire" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff1c2"/><stop offset=".5" stop-color="#e7c46a"/><stop offset="1" stop-color="#a8822e"/></linearGradient>
          <linearGradient id="sp-base" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3e4a78"/><stop offset="1" stop-color="#1b2246"/></linearGradient>
        </defs>
        ${Array.from({ length: 30 }, (_, k) => `<circle cx="${(k * 97 + 13) % 400}" cy="${(k * 53 + 7) % 230}" r="${k % 4 ? 0.8 : 1.6}" fill="#eef0f8" opacity="${k % 3 ? 0.4 : 0.8}"/>`).join("")}
        ${shadow("sp-b", 200, 266, 92, 8, 0.5)}
        <path d="M152 244 L248 244 L262 270 L138 270 Z" fill="url(#sp-base)"/>
        <rect x="134" y="268" width="132" height="8" rx="2" fill="#141a37"/>
        <path d="M200 244 L200 216" stroke="#a8822e" stroke-width="3"/>
        <path d="${d}" fill="none" stroke="#e7c46a" stroke-width="6" opacity=".35" class="spiral-path" pathLength="1" filter="url(#sp-glow)"/>
        <path d="${d}" fill="none" stroke="url(#sp-wire)" stroke-width="3" stroke-linecap="round" class="spiral-path" pathLength="1"/>
        <circle cx="200" cy="132" r="5" fill="#fff1c2"/>
        ${labels.map((l, k) => `<g class="only-b" style="transition-delay:${400 + k * 200}ms">
          <circle cx="${l[1]}" cy="${l[2] - 5}" r="4" fill="#e7c46a"/>
          <text x="${l[1] + (l[1] > 200 ? -10 : 10)}" y="${l[2]}" text-anchor="${l[1] > 200 ? "end" : "start"}" class="art-small" fill="#eef0f8">${l[0]}</text></g>`).join("")}
      </svg>`;
    },

    turtles() {
      let t = "";
      for (let k = 6; k >= 0; k--) {
        const w = 118 - k * 7, y = 52 + k * 31, op = (1 - k * 0.11).toFixed(2), p = `tt${k}`;
        const plates = [-w / 3.2, 0, w / 3.2].map((px) => `<path d="M${px - w / 8} ${-2} L${px} ${-9} L${px + w / 8} ${-2} L${px + w / 10} ${7} L${px - w / 10} ${7} Z" fill="none" stroke="#2d4a28" stroke-width="1.2" opacity=".7"/>`).join("");
        t += `<g opacity="${op}" transform="translate(200 ${y})">
          <ellipse cx="0" cy="16" rx="${w / 2 + 4}" ry="5" fill="#0a0f24" opacity=".5"/>
          <ellipse cx="${-w / 2 - 8}" cy="5" rx="11" ry="7.5" fill="#7fa36b"/><circle cx="${-w / 2 - 12}" cy="3" r="1.5" fill="#1b2a18"/>
          <ellipse cx="${-w / 3}" cy="15" rx="9" ry="5" fill="#6d9259"/><ellipse cx="${w / 3}" cy="15" rx="9" ry="5" fill="#6d9259"/>
          <path d="M${w / 2} 10 L${w / 2 + 9} 13 L${w / 2} 14 Z" fill="#6d9259"/>
          <path d="M${-w / 2} 13 C${-w / 2} -16 ${w / 2} -16 ${w / 2} 13 Z" fill="url(#tt-shell)"/>
          ${plates}
          <path d="M${-w / 2} 13 L${w / 2} 13" stroke="#2d4a28" stroke-width="2.5"/>
          <path d="M${-w / 3} -4 C${-w / 6} -12 ${w / 8} -12 ${w / 4} -8" stroke="#c6dfb0" stroke-width="2.5" fill="none" opacity=".5" stroke-linecap="round"/>
        </g>`;
      }
      return `<svg ${V} aria-label="A tower of carved turtles stacked on each other, holding up the earth and fading into the dark below">
        <defs>
          ${blur("tt-b", 4)}
          <linearGradient id="tt-shell" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6f9a5c"/><stop offset="1" stop-color="#3f6338"/></linearGradient>
          <radialGradient id="tt-earth" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#8fc0ea"/><stop offset="1" stop-color="#2f5f9a"/></radialGradient>
          <linearGradient id="tt-fade" x1="0" y1="0" x2="0" y2="1"><stop offset=".55" stop-color="#141a37" stop-opacity="0"/><stop offset="1" stop-color="#141a37" stop-opacity=".95"/></linearGradient>
        </defs>
        ${Array.from({ length: 18 }, (_, k) => `<circle cx="${(k * 89 + 31) % 400}" cy="${(k * 41 + 11) % 200}" r="${k % 3 ? 0.8 : 1.4}" fill="#eef0f8" opacity=".5"/>`).join("")}
        <circle cx="200" cy="25" r="21" fill="url(#tt-earth)"/>
        <path d="M187 16 C193 10 202 12 203 18 C204 24 196 26 192 30 C188 26 185 22 187 16 Z M206 30 C210 26 216 28 214 34 C211 38 206 36 206 30 Z" fill="#7fa36b"/>
        <circle cx="200" cy="25" r="21" fill="none" stroke="#cfe3f4" stroke-width="1" opacity=".5"/>
        ${t}
        <rect width="400" height="300" fill="url(#tt-fade)"/>
        <text x="200" y="292" text-anchor="middle" class="art-small only-a" fill="#eef0f8">…and below that?</text>
        <text x="200" y="292" text-anchor="middle" class="art-small only-b" fill="#e7c46a">You don't have to find the bottom to keep standing.</text>
      </svg>`;
    }
  };

  window.ART = ART;
})();

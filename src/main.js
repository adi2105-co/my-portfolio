import "./style.css";
import { config } from "./config.js";
import { initScene } from "./scene.js";

const icons = {
  mail: '<path d="M3 5h18v14H3z"/><path d="m3 6 9 7 9-7"/>',
  linkedin: '<path d="M4 9h4v11H4zM6 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM10 9h4v2c.8-1.4 2.2-2.2 4-2.2 3 0 4 2 4 5V20h-4v-5c0-1.4-.5-2.3-1.8-2.3S14 13.6 14 15v5h-4z"/>',
  github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-1-2.6c3.3-.4 6.7-1.6 6.7-7.2a5.6 5.6 0 0 0-1.5-3.9 5.2 5.2 0 0 0-.1-3.9s-1.2-.4-3.9 1.5a13.4 13.4 0 0 0-7 0C6.5 2.1 5.3 2.5 5.3 2.5a5.2 5.2 0 0 0-.1 3.9A5.6 5.6 0 0 0 3.7 10.3c0 5.6 3.4 6.8 6.7 7.2a3.4 3.4 0 0 0-1 2.6V22"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/>',
  code: '<path d="m8 8-5 4 5 4M16 8l5 4-5 4M14 5l-4 14"/>',
};
const svg = (n) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${icons[n]}</svg>`;

const c = config;
const link = (href, text, cls = "btn") =>
  href ? `<a class="${cls}" href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>` : "";

// per-letter spans for the animated hero name
const lerpHex = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
const letters = (word, colorize) =>
  [...word]
    .map((ch, i, arr) => {
      const col = colorize ? `style="--i:${i};color:rgb(${lerpHex([96, 165, 250], [219, 234, 254], i / Math.max(1, arr.length - 1)).join(",")})"` : `style="--i:${i}"`;
      return `<span class="ch" ${col}>${ch}</span>`;
    })
    .join("");
const [first, ...rest] = c.name.split(" ");

const marquee = (words, rev) => {
  const row = words.map((w) => `<span>${w}</span><i>✦</i>`).join("");
  return `<div class="marquee ${rev ? "rev" : ""}"><div class="track">${row}${row}</div></div>`;
};

document.getElementById("app").innerHTML = `
<header class="nav">
  <a href="#hero" class="logo mag">${c.initials}<span>.</span></a>
  <nav>
    <a href="#about">About</a><a href="#experience">Journey</a><a href="#projects">Projects</a>
    <a href="#skills">Skills</a><a href="#contact" class="pill mag">Contact</a>
  </nav>
</header>

<section id="hero" class="sec hero" data-pose="hero">
  <div class="col">
    <p class="chip"><i></i>${c.status}</p>
    <p class="eyebrow" data-scramble>Hello, I'm</p>
    <h1>
      <span class="line">${letters(first)}</span>
      <span class="line">${letters(rest.join(" "), true)}</span>
    </h1>
    <p class="role"><span id="role"></span><i class="caret"></i></p>
    <p class="lead">${c.tagline}</p>
    <div class="row">
      <a class="btn primary mag" href="#projects">View Projects</a>
      <a class="btn mag" href="#contact">Contact Me</a>
      ${c.resume ? link(c.resume, "Resume ↗", "btn mag") : ""}
    </div>
  </div>
  <div class="scroll-hint">scroll<span></span></div>
</section>

${marquee(c.marquee[0], false)}

<section id="about" class="sec right" data-pose="about">
  <div class="col reveal">
    <p class="eyebrow" data-scramble>01 / About</p>
    <h2>Defender mindset,<br/><span class="grad">builder instincts.</span></h2>
    <p class="lead">${c.about.text}</p>
    <div class="stats">
      ${c.about.stats.map((s) => `<div class="stat"><b data-count="${s.value}">${s.value}</b><span>${s.label}</span></div>`).join("")}
    </div>
    <div class="term" id="term">
      <div class="term-bar"><i></i><i></i><i></i><span>aditya@soc ~ zsh</span></div>
      <div class="term-body" id="termBody"></div>
    </div>
  </div>
</section>

<section id="experience" class="sec left" data-pose="experience">
  <div class="col reveal">
    <p class="eyebrow" data-scramble>02 / Journey</p>
    <h2>Where I've <span class="grad">learned.</span></h2>
    <div class="timeline">
      ${c.experience
        .map(
          (e) => `<div class="tl">
        <span class="when">${e.when}</span>
        <h3>${e.title}</h3><em>${e.org}</em>
        <ul>${e.points.map((p) => `<li>${p}</li>`).join("")}</ul>
      </div>`
        )
        .join("")}
    </div>
  </div>
</section>

${marquee(c.marquee[1], true)}

<section id="projects" class="sec wide" data-pose="projects">
  <div class="reveal">
    <p class="eyebrow" data-scramble>03 / Work</p>
    <h2>Featured <span class="grad">projects.</span></h2>
  </div>
  <div class="grid">
    ${c.projects
      .map(
        (p, i) => `<article class="card tilt reveal" style="--d:${i * 90}ms">
      <div class="card-in">
        <span class="num">0${i + 1}</span>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="tags">${p.tags.map((t) => `<span>${t}</span>`).join("")}</div>
        <div class="row">${link(p.live, "Live Demo ↗", "lnk")}${link(p.code, "Code ↗", "lnk")}</div>
      </div>
    </article>`
      )
      .join("")}
  </div>
</section>

<section id="skills" class="sec wide" data-pose="skills">
  <div class="reveal">
    <p class="eyebrow" data-scramble>04 / Stack</p>
    <h2>Tools of the <span class="grad">trade.</span></h2>
  </div>
  <div class="skills">
    ${c.skills
      .map(
        (g, i) => `<div class="sk tilt reveal" style="--d:${i * 80}ms">
      <h4>${g.group}</h4>
      <div class="tags">${g.items.map((t) => `<span>${t}</span>`).join("")}</div>
    </div>`
      )
      .join("")}
  </div>
</section>

<section id="contact" class="sec center" data-pose="contact">
  <div class="reveal">
    <p class="eyebrow" data-scramble>05 / Contact</p>
    <h2>Let's build <span class="grad">something secure.</span></h2>
    <p class="lead mid">Open to SOC Analyst (L1) internships &amp; roles and project collaborations. Tap any card below.</p>
  </div>
  <div class="contacts">
    ${c.contact
      .map(
        (k, i) => `<a class="ct tilt reveal" style="--d:${i * 70}ms" href="${k.href}" ${
          k.href.startsWith("mailto") ? "" : 'target="_blank" rel="noopener noreferrer"'
        }>
      ${svg(k.icon)}<b>${k.label}</b><span>${k.handle}</span>
    </a>`
      )
      .join("")}
  </div>
  <footer>© ${new Date().getFullYear()} ${c.name} — crafted with Three.js · <a href="#hero" class="mag">back to top ↑</a></footer>
</section>
`;

/* ---------- loader ---------- */
const bar = document.getElementById("ldbar");
const pctEl = document.getElementById("ldpct");
let loaded = document.readyState === "complete";
if (!loaded) addEventListener("load", () => (loaded = true));
const t0 = performance.now();
let finished = false;
function finish() {
  if (finished) return;
  finished = true;
  document.body.classList.remove("loading");
  document.body.classList.add("ready");
}
(function loadLoop() {
  const el = Math.min(1, (performance.now() - t0) / 1400);
  const p = loaded ? el : Math.min(el, 0.9);
  bar.style.transform = `scaleX(${p})`;
  pctEl.textContent = `${Math.round(p * 100)}%`;
  if (p >= 1) finish();
  else requestAnimationFrame(loadLoop);
})();
setTimeout(finish, 6000); // failsafe

/* ---------- rotating role text ---------- */
const roleEl = document.getElementById("role");
let ri = 0, ci = 0, del = false;
(function type() {
  const w = c.roles[ri];
  roleEl.textContent = w.slice(0, ci);
  if (!del && ci < w.length) ci++;
  else if (!del) { del = true; return setTimeout(type, 1400); }
  else if (ci > 0) ci--;
  else { del = false; ri = (ri + 1) % c.roles.length; }
  setTimeout(type, del ? 28 : 65);
})();

/* ---------- text scramble (eyebrows) ---------- */
const GLYPHS = "!<>-_\\/[]{}=+*^?#01";
function scramble(el) {
  const text = el.dataset.text || el.textContent;
  el.dataset.text = text;
  let frame = 0;
  const total = 22;
  const id = setInterval(() => {
    frame++;
    const reveal = Math.floor((frame / total) * text.length);
    el.textContent = [...text].map((ch, i) => (ch === " " || i < reveal ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])).join("");
    if (frame >= total) { clearInterval(id); el.textContent = text; }
  }, 32);
}

/* ---------- animated stat counters ---------- */
function countUp(el) {
  const m = /^(\d+(?:\.\d+)?)(.*)$/.exec(el.dataset.count || "");
  if (!m) return;
  const end = parseFloat(m[1]), dec = (m[1].split(".")[1] || "").length, suffix = m[2];
  const start = performance.now(), dur = 1400;
  (function step(now) {
    const k = Math.min(1, (now - start) / dur);
    const v = end * (1 - Math.pow(1 - k, 3));
    el.textContent = v.toFixed(dec) + suffix;
    if (k < 1) requestAnimationFrame(step);
  })(start);
}

/* ---------- typing terminal ---------- */
let termStarted = false;
function runTerminal() {
  if (termStarted) return;
  termStarted = true;
  const body = document.getElementById("termBody");
  const lines = c.terminal;
  let li = 0;
  (function nextLine() {
    if (li >= lines.length) {
      body.insertAdjacentHTML("beforeend", '<div class="tl-line"><span class="p">$</span> <i class="caret"></i></div>');
      return;
    }
    const text = lines[li++];
    const row = document.createElement("div");
    row.className = "tl-line";
    body.appendChild(row);
    if (text.startsWith("$")) {
      row.innerHTML = '<span class="p">$</span> <span class="cmd"></span>';
      const cmd = row.querySelector(".cmd");
      const s = text.slice(2);
      let k = 0;
      (function typeCmd() {
        cmd.textContent = s.slice(0, ++k);
        if (k < s.length) setTimeout(typeCmd, 38);
        else setTimeout(nextLine, 260);
      })();
    } else {
      row.className += " out";
      row.textContent = text;
      setTimeout(nextLine, 200);
    }
  })();
}

/* ---------- reveal on scroll ---------- */
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      el.classList.add("in");
      el.querySelectorAll("[data-scramble]").forEach(scramble);
      el.querySelectorAll("[data-count]").forEach(countUp);
      if (el.querySelector("#term")) runTerminal();
      io.unobserve(el);
    }),
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
const heroEyebrow = document.querySelector(".hero [data-scramble]");
const readyObs = new MutationObserver(() => {
  if (document.body.classList.contains("ready")) { setTimeout(() => scramble(heroEyebrow), 500); readyObs.disconnect(); }
});
readyObs.observe(document.body, { attributes: true, attributeFilter: ["class"] });

/* ---------- 3D tilt + glare on cards ---------- */
document.querySelectorAll(".tilt").forEach((el) => {
  el.addEventListener("pointermove", (e) => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateZ(8px)`;
    el.style.setProperty("--mx", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--my", `${(y + 0.5) * 100}%`);
  });
  el.addEventListener("pointerleave", () => (el.style.transform = ""));
});

/* ---------- magnetic buttons ---------- */
document.querySelectorAll(".mag").forEach((el) => {
  el.addEventListener("pointermove", (e) => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.28;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.28;
    el.style.translate = `${x}px ${y}px`;
  });
  el.addEventListener("pointerleave", () => (el.style.translate = ""));
});

/* ---------- side dots nav ---------- */
const dots = document.getElementById("dots");
const secIds = ["hero", "about", "experience", "projects", "skills", "contact"];
dots.innerHTML = secIds.map((id) => `<a href="#${id}" data-for="${id}" aria-label="${id}"><span>${id}</span></a>`).join("");
const dio = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) dots.querySelectorAll("a").forEach((a) => a.classList.toggle("on", a.dataset.for === e.target.id));
    }),
  { rootMargin: "-45% 0px -45% 0px" }
);
secIds.forEach((id) => dio.observe(document.getElementById(id)));

/* ---------- cursor + scroll-driven CSS vars ---------- */
const fine = matchMedia("(pointer: fine)").matches;
const cur = document.getElementById("cur");
const curDot = document.getElementById("curdot");
const glow = document.getElementById("glow");
const prog = document.getElementById("progress");
const m = { x: innerWidth / 2, y: innerHeight / 2 }, ring = { x: m.x, y: m.y };
if (fine) document.body.classList.add("has-cursor");
addEventListener("pointermove", (e) => {
  document.body.classList.add("moved");
  m.x = e.clientX; m.y = e.clientY;
  glow.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
});
document.addEventListener("pointerover", (e) => {
  cur.classList.toggle("big", !!e.target.closest("a, button, .tilt"));
});
let lastY = scrollY, skew = 0;
(function loop() {
  ring.x += (m.x - ring.x) * 0.18;
  ring.y += (m.y - ring.y) * 0.18;
  cur.style.transform = `translate(${ring.x}px,${ring.y}px)`;
  curDot.style.transform = `translate(${m.x}px,${m.y}px)`;
  const dy = scrollY - lastY; lastY = scrollY;
  skew += (Math.max(-12, Math.min(12, dy)) * -0.45 - skew) * 0.12;
  document.documentElement.style.setProperty("--skew", `${skew.toFixed(2)}deg`);
  document.documentElement.style.setProperty("--sy", String(Math.min(scrollY, 900)));
  const h = document.documentElement.scrollHeight - innerHeight;
  prog.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
  requestAnimationFrame(loop);
})();

/* ---------- 3D scene (page still works without WebGL) ---------- */
try {
  initScene(document.getElementById("bg"), c.photo, c.initials, c.orbit);
} catch (err) {
  console.warn("3D scene unavailable:", err);
}

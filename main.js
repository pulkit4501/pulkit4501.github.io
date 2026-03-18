/* ═══════════════════════════════════════════
   PULKIT AGARWAL — main.js
═══════════════════════════════════════════ */

/* ── CURSOR ──────────────────────────────── */
const dot = document.getElementById('c-dot');
const ring = document.getElementById('c-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

(function cursorLoop() {
  rx += (mx - rx) * 0.13;
  ry += (my - ry) * 0.13;
  dot.style.left = mx + 'px';
  dot.style.top = my + 'px';
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(cursorLoop);
})();

/* ── NAV SCROLL — glassmorphism on scroll ── */
const navEl = document.querySelector('nav');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > 60) {
    navEl.classList.add('scrolled');
  } else {
    navEl.classList.remove('scrolled');
  }
  lastScroll = y;
}, { passive: true });

/* ── HERO CANVAS — particle network ─────── */
(function heroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  const N = 55;
  const CONNECT = 140;
  let frame = 0;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  for (let i = 0; i < N; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.4,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    frame++;

    // Update
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    }

    // Lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT) {
          const alpha = (1 - dist / CONNECT) * 0.28;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(37,99,235,${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    // Dots
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(96,165,250,0.6)';
      ctx.fill();
    }

    // Drifting glow
    const gx = W / 2 + Math.sin(frame * 0.003) * W * 0.3;
    const gy = H / 2 + Math.cos(frame * 0.004) * H * 0.2;
    const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, W * 0.55);
    grad.addColorStop(0, 'rgba(37,99,235,0.07)');
    grad.addColorStop(1, 'rgba(37,99,235,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── THEME TOGGLE ────────────────────────── */
const themeBtn = document.getElementById('themeBtn');
let isDark = true;
themeBtn.addEventListener('click', () => {
  isDark = !isDark;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeBtn.textContent = isDark ? '☀ light' : '☾ dark';
});

/* ── ROLE ROTATOR — scramble effect ─────── */
const roles = [
  'AI_Strategist',
  'Solutions_Consultant',
  'Technical_Scoper',
  'GenAI_Builder',
  'Presales_Lead',
];
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#!%&*';
const SCRAMBLE_MS = 500;

const rotator = document.getElementById('roleRotator');

roles.forEach((r, i) => {
  const el = document.createElement('span');
  el.className = 'hero-role-item' + (i === 0 ? ' active' : '');
  el.textContent = r;
  rotator.appendChild(el);
});

function scramble(el, target) {
  let startTime = null;
  function frame(ts) {
    if (!startTime) startTime = ts;
    const progress = Math.min((ts - startTime) / SCRAMBLE_MS, 1);
    const settled = Math.floor(progress * target.length);
    let out = '';
    for (let i = 0; i < target.length; i++) {
      if (i < settled) {
        out += target[i];
      } else {
        const ch = target[i];
        out += (ch === ' ' || ch === '_')
          ? ch
          : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
    }
    el.textContent = out;
    if (progress < 1) requestAnimationFrame(frame);
    else el.textContent = target;
  }
  requestAnimationFrame(frame);
}

let roleIdx = 0;
setInterval(() => {
  const items = rotator.querySelectorAll('.hero-role-item');
  items[roleIdx].classList.remove('active');
  items[roleIdx].classList.add('leaving');
  setTimeout(() => items[roleIdx].classList.remove('leaving'), 420);
  roleIdx = (roleIdx + 1) % roles.length;
  items[roleIdx].classList.add('active');
  scramble(items[roleIdx], roles[roleIdx]);
}, 2800);

/* ── CODE WINDOW ─────────────────────────── */
document.getElementById('codeBody').innerHTML = `
<span class="cl c-cm"># pulkit_agarwal.py</span>
<span class="cl">&nbsp;</span>
<span class="cl"><span class="c-kw">class</span> <span class="c-fn">PulkitAgarwal</span><span class="c-op">:</span></span>
<span class="cl">&nbsp;</span>
<span class="cl">  <span class="c-kw">def</span> <span class="c-fn">__init__</span><span class="c-op">(</span><span class="c-var">self</span><span class="c-op">):</span></span>
<span class="cl">    <span class="c-var">self</span><span class="c-op">.</span><span class="c-fn">role</span>         <span class="c-op">=</span> <span class="c-str">"Solutions Consultant"</span></span>
<span class="cl">    <span class="c-var">self</span><span class="c-op">.</span><span class="c-fn">location</span>     <span class="c-op">=</span> <span class="c-str">"Singapore"</span></span>
<span class="cl">    <span class="c-var">self</span><span class="c-op">.</span><span class="c-fn">speaks</span>       <span class="c-op">=</span> <span class="c-op">[</span><span class="c-str">"Python"</span><span class="c-op">,</span> <span class="c-str">"Business"</span><span class="c-op">,</span> <span class="c-str">"AI"</span><span class="c-op">]</span></span>
<span class="cl">    <span class="c-var">self</span><span class="c-op">.</span><span class="c-fn">open_to_work</span> <span class="c-op">=</span> <span class="c-kw">True</span></span>
<span class="cl">&nbsp;</span>
<span class="cl">  <span class="c-kw">def</span> <span class="c-fn">what_i_do</span><span class="c-op">(</span><span class="c-var">self</span><span class="c-op">):</span></span>
<span class="cl">    <span class="c-kw">return</span> <span class="c-op">{</span></span>
<span class="cl">      <span class="c-str">"regions"</span>         <span class="c-op">:</span> <span class="c-op">[</span><span class="c-str">"SG"</span><span class="c-op">,</span><span class="c-str">"KR"</span><span class="c-op">,</span><span class="c-str">"ID"</span><span class="c-op">,</span><span class="c-str">"VN"</span><span class="c-op">]</span></span>
<span class="cl">      <span class="c-str">"ai_scoping"</span>      <span class="c-op">:</span> <span class="c-str">"Edge AI → LLMs"</span><span class="c-op">,</span></span>
<span class="cl">      <span class="c-str">"pitch_competitions_won"</span> <span class="c-op">:</span> <span class="c-str">"5"</span><span class="c-op">,</span></span>
<span class="cl">    <span class="c-op">}</span></span>
<span class="cl">&nbsp;</span>
<span class="cl c-cm">  # open to next chapter <span class="code-cursor"></span></span>`.trim();

/* ── RESUME TABS ─────────────────────────── */
function switchTab(t) {
  document.getElementById('res-short').style.display = t === 'short' ? 'block' : 'none';
  document.getElementById('res-long').style.display = t === 'long' ? 'block' : 'none';
  document.getElementById('tabShort').className = 'res-tab' + (t === 'short' ? ' on' : '');
  document.getElementById('tabLong').className = 'res-tab' + (t === 'long' ? ' on' : '');
}

/* ── SCROLL REVEAL ───────────────────────── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ── LIGHTBOX ────────────────────────────── */
function openLb(src) {
  document.getElementById('lb-img').src = src;
  document.getElementById('lb').classList.add('open');
}
function closeLb() {
  document.getElementById('lb').classList.remove('open');
}

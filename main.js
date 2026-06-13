/* ── CURSOR ── */
const cur = document.getElementById('cur');
let mx = 0, my = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top = my + 'px';
  cur.style.opacity = '1';
});
document.addEventListener('mouseleave', () => cur.style.opacity = '0');

/* ── CANVAS BG ── */
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
let W, H, particles = [];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

function Particle() {
  this.x = Math.random() * W;
  this.y = Math.random() * H;
  this.vx = (Math.random() - .5) * .3;
  this.vy = (Math.random() - .5) * .3;
  this.r = Math.random() * 1.2 + .3;
  this.a = Math.random() * .5 + .1;
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

function drawBg() {
  ctx.clearRect(0, 0, W, H);
  // radial glow
  const g = ctx.createRadialGradient(W * .5, H * .3, 0, W * .5, H * .3, W * .6);
  g.addColorStop(0, 'rgba(74,222,128,.03)');
  g.addColorStop(1, 'transparent');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = W;
    if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H;
    if (p.y > H) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(74,222,128,${p.a})`;
    ctx.fill();
  });

  requestAnimationFrame(drawBg);
}
drawBg();

/* ── NAV SCROLL ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── REVEAL ── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); } });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ── STATS COUNTER ── */
function animateCount(el, target, suffix = '') {
  let start = 0;
  const duration = 1200;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCount(document.getElementById('sv-keys'), 1200, '+');
      animateCount(document.getElementById('sv-prem'), 48);
      animateCount(document.getElementById('sv-exec'), 9400, '+');
      statsObserver.disconnect();
    }
  });
}, { threshold: .5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

/* ── SCRIPT DATA ── */
const scripts = {
  abyss: {
    name: 'Abyss',
    img: 'https://tr.rbxcdn.com/180DAY-c5753cc975fb188a120dea8c9e9df82c/256/256/Image/Webp/noFilter',
    status: 'Working',
    features: ['Blantant', 'Auto Catch', 'Other'],
    file: 'abyss.lua',
    code: `_G.script_key = "Stre-xxxx-xxxx-xx@1"
loadstring(game:HttpGet(
  "https://cdn.streehub.xyz/load?game=abyss"
))()`
  },
  tsunami: {
    name: 'Escape Tsunami For Brainrots',
    img: 'https://tr.rbxcdn.com/180DAY-3b569ae77d5b5b22d251745dbb456cad/512/512/Image/Webp/noFilter',
    status: 'Working',
    features: ['Teleport', 'Auto Rebirth', 'God Mode', 'Other'],
    file: 'tsunami.lua',
    code: `_G.script_key = "Stre-xxxx-xxxx-xx@1"
loadstring(game:HttpGet(
  "https://cdn.streehub.xyz/load?game=tsunami"
))()`
  },
  arsenal: {
    name: 'Arsenal',
    img: 'https://tr.rbxcdn.com/180DAY-2c691f8c1278352cc98e30afef3c3a4e/256/256/Image/Webp/noFilter',
    status: 'Working',
    features: ['Silent Aim', 'ESP', 'Other'],
    file: 'arsenal.lua',
    code: `_G.script_key = "Stre-xxxx-xxxx-xx@1"
loadstring(game:HttpGet(
  "https://cdn.streehub.xyz/load?game=arsenal"
))()`
  },
  horizon: {
    name: 'Grow Horizons',
    img: 'https://tr.rbxcdn.com/180DAY-cbe4cb391baed898276cfbe5984a5e62/512/512/Image/Webp/noFilter',
    status: 'Working',
    features: ['Auto Harvest', 'Auto Plant', 'Events', 'Other'],
    file: 'growhorizons.lua',
    code: `_G.script_key = "Stre-xxxx-xxxx-xx@1"
loadstring(game:HttpGet(
  "https://cdn.streehub.xyz/load?game=growhorizons"
))()`
  },
  solohunter: {
    name: 'Solo Hunter',
    img: 'https://tr.rbxcdn.com/180DAY-706460eda08704e8805ecc17037e875f/256/256/Image/Webp/noFilter',
    status: 'Working',
    features: ['Lobby', 'Auto Attack', 'Auto Farm', 'Other'],
    file: 'solohunter.lua',
    code: `_G.script_key = "Stre-xxxx-xxxx-xx@1"
loadstring(game:HttpGet(
  "https://cdn.streehub.xyz/load?game=solohunter"
))()`
  },
  balb: {
    name: 'Break A Lucky Block',
    img: 'https://tr.rbxcdn.com/180DAY-43d54204b23106ae9e9f910b6301bcd8/256/256/Image/Webp/noFilter',
    status: 'Working',
    features: ['Auto Rebirth', 'Collect Drop', 'Auto Sell', 'Other'],
    file: 'balb.lua',
    code: `_G.script_key = "Stre-xxxx-xxxx-xx@1"
loadstring(game:HttpGet(
  "https://cdn.streehub.xyz/load?game=balb"
))()`
  }
};

/* ── MODAL ── */
const modal = document.getElementById('modal');

function openScript(id) {
  const s = scripts[id];
  if (!s) return;
  document.getElementById('modal-title').textContent = s.name;
  document.getElementById('modal-status').innerHTML = `<span style="width:5px;height:5px;border-radius:50%;background:currentColor;display:inline-block"></span> ${s.status}`;
  document.getElementById('modal-filename').textContent = s.file;
  document.getElementById('modal-code').textContent = s.code;

  const iconEl = document.getElementById('modal-icon');
  iconEl.innerHTML = `<img src="${s.img}" alt="${s.name}" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display='none'" />`;

  const featEl = document.getElementById('modal-features');
  featEl.innerHTML = s.features.map(f => `<span class="feat-tag">${f}</span>`).join('');

  document.getElementById('modalcp').textContent = 'copy';
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  if (e && e.target !== modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { modal.classList.remove('open'); document.body.style.overflow = ''; }
});

/* ── COPY ── */
function copyHero() {
  const code = `_G.script_key = "Stre-xxxx-xxxx-xx@1"\n\nloadstring(game:HttpGet(\n  "https://cdn.streehub.xyz/load"\n))()`;
  navigator.clipboard.writeText(code).then(() => {
    const btn = document.getElementById('herocp');
    btn.textContent = 'copied!';
    setTimeout(() => btn.textContent = 'copy', 2000);
  });
}

function copyModal() {
  const code = document.getElementById('modal-code').textContent;
  navigator.clipboard.writeText(code).then(() => {
    const btn = document.getElementById('modalcp');
    btn.textContent = 'copied!';
    setTimeout(() => btn.textContent = 'copy', 2000);
  });
}

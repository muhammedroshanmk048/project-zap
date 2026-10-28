// Theme toggle (remembered per browser)
const root = document.documentElement;
try {
  const saved = localStorage.getItem("theme");
  if (saved) root.dataset.theme = saved;
} catch {}
document.getElementById("themeToggle").addEventListener("click", () => {
  const next = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch {}
});

// Typing effect in hero
const words = ["scalable APIs", "microservices", "AI chat backends", "event-driven systems", "healthcare platforms"];
const typed = document.getElementById("typed");
let w = 0, i = words[0].length, deleting = true;
function tick() {
  const word = words[w];
  typed.textContent = word.slice(0, i);
  if (deleting) {
    i--;
    if (i < 0) { deleting = false; w = (w + 1) % words.length; i = 0; }
  } else {
    i++;
    if (i > words[w].length) { deleting = true; setTimeout(tick, 1600); return; }
  }
  setTimeout(tick, deleting ? 40 : 80);
}
setTimeout(tick, 2000);

// Reveal on scroll + count-up stats
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in");
    e.target.querySelectorAll("[data-count]").forEach(countUp);
    io.unobserve(e.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

function countUp(el) {
  const target = parseFloat(el.dataset.count);
  const decimals = target % 1 ? 1 : 0;
  const start = performance.now();
  const step = (now) => {
    const p = Math.min((now - start) / 1200, 1);
    el.textContent = (target * (1 - Math.pow(1 - p, 3))).toFixed(decimals);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// Cursor spotlight on bento cards
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

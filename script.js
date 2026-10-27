// SWARIT CREATION — small interactive features
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");
let stars = [];
let width = 0;
let height = 0;
let animationFrame = 0;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  const count = Math.min(150, Math.floor((width * height) / 8500));
  stars = Array.from({ length: count }, () => makeStar(true));
}

function makeStar(randomY = false) {
  return {
    x: Math.random() * width,
    y: randomY ? Math.random() * height : -5,
    size: Math.random() * 1.6 + 0.35,
    speed: Math.random() * 0.55 + 0.12,
    drift: (Math.random() - 0.5) * 0.22,
    alpha: Math.random() * 0.65 + 0.25,
    twinkle: Math.random() * 0.02 + 0.004
  };
}

function drawStars() {
  ctx.clearRect(0, 0, width, height);
  for (const star of stars) {
    star.y += star.speed;
    star.x += star.drift;
    star.alpha += (Math.random() - 0.5) * star.twinkle;
    star.alpha = Math.max(0.18, Math.min(0.95, star.alpha));
    if (star.y > height + 5 || star.x < -5 || star.x > width + 5) {
      Object.assign(star, makeStar(false));
      if (Math.random() > 0.5) star.x = Math.random() * width;
    }
    ctx.beginPath();
    ctx.fillStyle = `rgba(190, 214, 255, ${star.alpha})`;
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
    if (star.size > 1.25) {
      ctx.strokeStyle = `rgba(118, 185, 255, ${star.alpha * 0.45})`;
      ctx.beginPath();
      ctx.moveTo(star.x - 3, star.y);
      ctx.lineTo(star.x + 3, star.y);
      ctx.moveTo(star.x, star.y - 3);
      ctx.lineTo(star.x, star.y + 3);
      ctx.stroke();
    }
  }
  if (!reduceMotion) animationFrame = requestAnimationFrame(drawStars);
}

resizeCanvas();
drawStars();
window.addEventListener("resize", () => {
  cancelAnimationFrame(animationFrame);
  resizeCanvas();
  if (!reduceMotion) drawStars();
});

// Mobile navigation menu
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});

// Reveal sections smoothly as they enter the screen
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !reduceMotion) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}
const discordButton = document.getElementById("discordButton");
const contactMessage = document.getElementById("contactMessage");

if (discordButton) {
discordButton.addEventListener("click", async () => {
try {
await navigator.clipboard.writeText("real_swarit");

  contactMessage.textContent =
    "Discord username copied! Add me: real_swarit";

  discordButton.textContent = "Copied ✓";

  setTimeout(() => {
    discordButton.textContent = "Discord: real_swarit";
  }, 2000);

} catch (error) {
  contactMessage.textContent =
    "My Discord username is: real_swarit";
}

});
}
// ===== SWARIT CREATION CYBER INTRO =====

(() => {
  const loader = document.getElementById("intro-loader");
  const portal = document.getElementById("energyPortal");
  const typedText = document.getElementById("cyberTypedText");

  if (!loader) return;

  let finished = false;
  let typingTimer;
  let finishTimer;

  const message = "Web Development & Full-Stack Specialist";

  document.body.classList.add("intro-active");

  function finishIntro() {
    if (finished) return;
    finished = true;

    clearInterval(typingTimer);
    clearTimeout(finishTimer);

    loader.classList.add("intro-finished");
    document.body.classList.remove("intro-active");

    setTimeout(() => {
      loader.remove();
    }, 900);
  }

  function activatePortal(event) {
    if (event) event.stopPropagation();

    if (finished || loader.classList.contains("portal-activated")) return;

    loader.classList.add("portal-activated");

    // Reveal the name and specialization sooner
    const identity = loader.querySelector(".cyber-identity");
    if (identity) {
      identity.style.animationDelay = "0s";
    }

    setTimeout(finishIntro, 1300);
  }

  // Clicking the portal triggers the portal transition.
  portal?.addEventListener("click", activatePortal);

  // Clicking anywhere else skips the intro.
  loader.addEventListener("click", (event) => {
    if (event.target.closest("#energyPortal")) return;
    finishIntro();
  });

  // Terminal typing effect
  setTimeout(() => {
    if (finished || !typedText) return;

    let index = 0;

    typingTimer = setInterval(() => {
      if (finished) {
        clearInterval(typingTimer);
        return;
      }

      typedText.textContent = message.slice(0, index + 1);
      index++;

      if (index >= message.length) {
        clearInterval(typingTimer);
      }
    }, 48);
  }, 1750);

  // Automatically finish after the intro has played.
  finishTimer = setTimeout(finishIntro, 7500);
})();

// Update footer year automatically if you decide to add one later.

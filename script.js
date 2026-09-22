document.addEventListener("DOMContentLoaded", () => {
  // ===== ROLAGEM DOS BOTÕES =====
  document.querySelectorAll("[data-scroll]").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelector(button.dataset.scroll)?.scrollIntoView({ behavior: "smooth" });
    });
  });

  // ===== ANIMAÇÃO AO ENTRAR NA TELA =====
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  // ===== CORAÇÕES FLUTUANTES =====
  const hearts = document.querySelector(".hearts");
  setInterval(() => {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = Math.random() > .35 ? "♥" : "♡";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (10 + Math.random() * 18) + "px";
    heart.style.animationDuration = (5 + Math.random() * 7) + "s";
    hearts.appendChild(heart);
    setTimeout(() => heart.remove(), 13000);
  }, 850);

  // ===== PLAYER DE MÚSICA =====
  const audio = document.getElementById("audio");
  const playBtn = document.getElementById("playBtn");
  const volumeBtn = document.getElementById("volumeBtn");
  const progress = document.getElementById("progress");
  const progressArea = document.getElementById("progressArea");
  const currentTime = document.getElementById("currentTime");
  const duration = document.getElementById("duration");
  const vinyl = document.querySelector(".vinyl");

  function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return "0:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  }

  playBtn.addEventListener("click", async () => {
    try {
      if (audio.paused) {
        await audio.play();
        playBtn.textContent = "❚❚";
        vinyl.classList.add("playing");
      } else {
        audio.pause();
        playBtn.textContent = "▶";
        vinyl.classList.remove("playing");
      }
    } catch {
      alert("Não encontrei a música. Coloque o arquivo 'nossa-musica.mp3' dentro da pasta 'musica'.");
    }
  });

  audio.addEventListener("loadedmetadata", () => {
    duration.textContent = formatTime(audio.duration);
  });

  audio.addEventListener("timeupdate", () => {
    const percent = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
    progress.style.width = percent + "%";
    currentTime.textContent = formatTime(audio.currentTime);
  });

  audio.addEventListener("ended", () => {
    playBtn.textContent = "▶";
    vinyl.classList.remove("playing");
    progress.style.width = "0%";
  });

  progressArea.addEventListener("click", e => {
    if (!audio.duration) return;
    const rect = progressArea.getBoundingClientRect();
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
  });

  volumeBtn.addEventListener("click", () => {
    audio.muted = !audio.muted;
    volumeBtn.textContent = audio.muted ? "🔇" : "🔊";
  });
});

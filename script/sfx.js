// script/sfx.js

let sfxEnabled = true;
let audioUnlocked = false;

// SFX
const clickSfx = new Howl({
  src: ['sounds/click.mp3'],
  volume: 0.5
});

const hoverSfx = new Howl({
  src: ['sounds/hover.mp3'],
  volume: 0.3
});

// unlock audio on first user interaction
function unlockAudio() {
  if (audioUnlocked) return;

  Howler.ctx.resume();
  audioUnlocked = true;

  // silent play to unlock
  clickSfx.play();
  clickSfx.stop();
}

document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll(".nav-btn");
  const soundToggleBtn = document.querySelectorAll(".icon-btn")[1];
  const soundIcon = soundToggleBtn.querySelector("i");

  // NAV BUTTONS
  navButtons.forEach(btn => {

    btn.addEventListener("click", (e) => {
      unlockAudio();
      if (!sfxEnabled) return;

      e.preventDefault(); // STOP instant navigation
      clickSfx.stop();
      clickSfx.play();

      // delay navigation so sound plays
      const link = btn.closest("a")?.href;
      if (link) {
        setTimeout(() => {
          window.location.href = link;
        }, 120);
      }
    });

    btn.addEventListener("mouseenter", () => {
      if (!audioUnlocked || !sfxEnabled) return;
      hoverSfx.stop();
      hoverSfx.play();
    });

  });

  // SFX TOGGLE
  soundToggleBtn.addEventListener("click", () => {
    unlockAudio();
    sfxEnabled = !sfxEnabled;

    if (sfxEnabled) {
      soundIcon.classList.replace("bi-volume-mute", "bi-volume-up");
      clickSfx.play();
    } else {
      soundIcon.classList.replace("bi-volume-up", "bi-volume-mute");
    }
  });
});

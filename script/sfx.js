// script/sfx.js

let sfxEnabled = true;

// SFX instances
const clickSfx = new Howl({
  src: ['../sounds/click.mp3'],
  volume: 0.5
});

const hoverSfx = new Howl({
  src: ['../sounds/hover.mp3'],
  volume: 0.3
});

document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll(".nav-btn");
  const soundToggleBtn = document.querySelectorAll(".icon-btn")[1]; // 2nd icon
  const soundIcon = soundToggleBtn.querySelector("i");

  // NAV BUTTON SFX
  navButtons.forEach(btn => {

    btn.addEventListener("mouseenter", () => {
      if (!sfxEnabled) return;
      hoverSfx.stop();
      hoverSfx.play();
    });

    btn.addEventListener("click", () => {
      if (!sfxEnabled) return;
      clickSfx.stop();
      clickSfx.play();
    });

    // mobile support
    btn.addEventListener("touchstart", () => {
      if (!sfxEnabled) return;
      clickSfx.stop();
      clickSfx.play();
    });

  });

  // SFX TOGGLE BUTTON
  soundToggleBtn.addEventListener("click", () => {
    sfxEnabled = !sfxEnabled;

    // visual feedback
    if (sfxEnabled) {
      soundIcon.classList.remove("bi-volume-mute");
      soundIcon.classList.add("bi-volume-up");
      clickSfx.play(); // lil confirmation click
    } else {
      soundIcon.classList.remove("bi-volume-up");
      soundIcon.classList.add("bi-volume-mute");
    }
  });
});

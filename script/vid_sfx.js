const featuredVideo = document.getElementById("featuredVideo");
const volumeSlider = document.getElementById("videoVolume");
const volumeIcon = document.getElementById("volumeIcon");

volumeSlider.addEventListener("input", () => {
    featuredVideo.volume = volumeSlider.value;

    // update icon
    if (volumeSlider.value == 0) {
        volumeIcon.className = "bi bi-volume-mute";
    } else if (volumeSlider.value < 0.5) {
        volumeIcon.className = "bi bi-volume-down";
    } else {
        volumeIcon.className = "bi bi-volume-up";
    }
});

// optional: unmute on first interaction
featuredVideo.muted = false;


const video = document.querySelector(".carousel-slide.featured video");
const volumeControl = document.createElement("div");
volumeControl.classList.add("video-volume-control");
volumeControl.innerHTML = `
    <i class="bi bi-volume-up"></i>
    <input type="range" min="0" max="1" step="0.01" value="1">
`;
document.querySelector(".carousel-slide.featured").appendChild(volumeControl);

const slider = volumeControl.querySelector("input[type='range']");

// set initial full volume
video.volume = 1;
updateSliderHighlight(1);

// update video volume & CSS highlight
slider.addEventListener("input", (e) => {
    const val = parseFloat(e.target.value);
    video.volume = val;
    updateSliderHighlight(val);
});

// highlight fill for Webkit
function updateSliderHighlight(val) {
    const perc = val * 100 + "%";
    slider.style.setProperty("--volume-percentage", perc);
}

// auto-hide control when idle
let hideTimeout;
function showVolumeControl() {
    volumeControl.classList.add("visible");
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
        volumeControl.classList.remove("visible");
    }, 2000); // hide after 2s idle
}

// show on hover or tap
document.querySelector(".carousel-slide.featured").addEventListener("mousemove", showVolumeControl);
document.querySelector(".carousel-slide.featured").addEventListener("touchstart", showVolumeControl);


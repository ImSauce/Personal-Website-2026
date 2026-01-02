const featuredVideo = document.getElementById("featuredVideo");

// ====================
// VOLUME CONTROL
// ====================
const volumeControl = document.createElement("div");
volumeControl.classList.add("video-volume-control");
volumeControl.innerHTML = `
    <i class="bi bi-volume-up" id="volumeIcon"></i>
    <input type="range" min="0" max="1" step="0.01" value="1" id="videoVolume">
`;
document.querySelector(".carousel-slide.featured").appendChild(volumeControl);

const slider = volumeControl.querySelector("#videoVolume");
const volumeIcon = volumeControl.querySelector("#volumeIcon");

// initial volume
featuredVideo.volume = parseFloat(slider.value);

// function to update the fill highlight
function updateSliderHighlight(val) {
    slider.style.setProperty("--volume-percentage", val * 100 + "%");
}

// sync highlight at start
updateSliderHighlight(featuredVideo.volume);

// update video volume & icon
slider.addEventListener("input", (e) => {
    const val = parseFloat(e.target.value);
    featuredVideo.volume = val;
    updateSliderHighlight(val);

    if (val == 0) volumeIcon.className = "bi bi-volume-mute";
    else if (val < 0.5) volumeIcon.className = "bi bi-volume-down";
    else volumeIcon.className = "bi bi-volume-up";
});

// auto-hide volume control
let volumeHideTimeout;
function showVolumeControl() {
    volumeControl.classList.add("visible");
    clearTimeout(volumeHideTimeout);
    volumeHideTimeout = setTimeout(() => {
        volumeControl.classList.remove("visible");
    }, 1000); // hide after 1s of inactivity
}

// show volume on hover/touch
const videoContainer = document.querySelector(".carousel-slide.featured");
videoContainer.addEventListener("mousemove", showVolumeControl);
videoContainer.addEventListener("touchstart", showVolumeControl);

// show initially
showVolumeControl();


// ====================
// PLAY/PAUSE BUTTON
// ====================
const playPauseBtn = document.createElement("div");
playPauseBtn.classList.add("play-pause-btn");
playPauseBtn.innerHTML = `<i class="bi bi-pause-fill"></i>`; // default playing
videoContainer.appendChild(playPauseBtn);

// toggle play/pause on click
playPauseBtn.addEventListener("click", () => {
    if (featuredVideo.paused) {
        featuredVideo.play();
        playPauseBtn.innerHTML = `<i class="bi bi-pause-fill"></i>`;
    } else {
        featuredVideo.pause();
        playPauseBtn.innerHTML = `<i class="bi bi-play-fill"></i>`;
    }
});

// auto-hide play/pause button
let playHideTimeout;
function showPlayBtn() {
    playPauseBtn.classList.add("visible");
    clearTimeout(playHideTimeout);
    playHideTimeout = setTimeout(() => {
        playPauseBtn.classList.remove("visible");
    }, 1000); // hide after 1s
}

// show play button on hover/touch
videoContainer.addEventListener("mousemove", showPlayBtn);
videoContainer.addEventListener("touchstart", showPlayBtn);

// show initially
showPlayBtn();


const bgMusic = new Audio("../audio/home_bgm.mp3"); 
bgMusic.loop = true; 
bgMusic.volume = 0; 


function fadeIn(audio, targetVolume = 0.2, duration = 3000) {
    const stepTime = 50; 
    const steps = duration / stepTime;
    const volumeStep = targetVolume / steps;

    const fadeInterval = setInterval(() => {
        if (audio.volume < targetVolume) {
            audio.volume = Math.min(audio.volume + volumeStep, targetVolume);
        } else {
            clearInterval(fadeInterval);
        }
    }, stepTime);
}


function playMusic() {
    bgMusic.play()
        .then(() => fadeIn(bgMusic)) 
        .catch(() => {
  
            document.addEventListener(
                "click",
                () => {
                    bgMusic.play().then(() => fadeIn(bgMusic));
                },
                { once: true } 
            );
        });
}


window.addEventListener("load", playMusic);

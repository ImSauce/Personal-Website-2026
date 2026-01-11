// document.addEventListener("DOMContentLoaded", () => {
//     const loader = document.querySelector(".loader_wrapper");
//     const body = document.body;

//     setTimeout(() => {
//         loader.classList.add("wave-exit"); // start wave drop

//         setTimeout(() => {
//             loader.remove();               // kill loader
//             body.classList.remove("preload");
//         }, 1000); // match CSS transition
//     }, 1200); // edit the speed of which the wave in the loader will go down type shi
// });


document.addEventListener("DOMContentLoaded", () => {
    const loader = document.querySelector(".loader_wrapper");
    const body = document.body;
    const overlay = document.getElementById("click-overlay");
    const mainContent = document.querySelector(".main-content");
    

    // Step 1: show loader, then remove
    setTimeout(() => {
        loader.classList.add("wave-exit"); // start wave drop

        setTimeout(() => {
            loader.remove();               // kill loader
            body.classList.remove("preload");

            // Step 2: fade in overlay
            overlay.style.opacity = 1;
            overlay.style.pointerEvents = "auto"; // enable click
        }, 1000); // match CSS transition of loader
    }, 1200); // loader display duration

    // Step 3: handle click on overlay
    overlay.addEventListener("click", async () => {
        overlay.style.opacity = 0;
        overlay.style.pointerEvents = "none";
        setTimeout(() => overlay.remove(), 1000);

        mainContent.style.opacity = 1;

        // play and fade in music
        try {
            await bgMusic.play();
            await fadeInAudio(bgMusic);
        } catch {
            document.addEventListener("click", async () => {
                await bgMusic.play();
                await fadeInAudio(bgMusic);
            }, { once: true });
        }
    });
});

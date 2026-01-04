document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("toggle-anime");
    const easterItems = document.querySelectorAll(".easter-item");

    // hide everything initially
    easterItems.forEach(item => {
        item.style.display = "none";
        item.style.opacity = "0";
    });

    let visible = false;

    toggle.addEventListener("click", () => {
        visible = !visible;

        easterItems.forEach(item => {
            if (visible) {
                // show first, then fade in
                item.style.display = "list-item";
                requestAnimationFrame(() => item.style.opacity = "1");
            } else {
                // fade out first
                item.style.opacity = "0";
                setTimeout(() => {
                    item.style.display = "none";
                }, 350); // match the CSS transition duration
            }
        });
    });
});

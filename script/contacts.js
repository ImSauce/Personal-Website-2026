// -----------------------------
// Discord pop-up
// -----------------------------
const discordLink = document.querySelector('.contact-item[href*="discord.com"]');

discordLink.addEventListener("click", (e) => {
    e.preventDefault();

    // Create modal only on click
    let modal = document.getElementById("discordModal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "discordModal";
        modal.style.cssText = `
            position: fixed;
            z-index: 2000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        const img = document.createElement("img");
        img.src = "../images/screenshots/discord_profile.png";
        img.style.cssText = `
            max-width: 80%;
            max-height: 80%;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.7);
            animation: popin 0.3s ease;
        `;
        modal.appendChild(img);

        // Click outside image closes modal
        modal.addEventListener("click", () => {
            modal.style.display = "none";
        });

        document.body.appendChild(modal);

        // Add popin animation style once
        if (!document.getElementById("popinStyle")) {
            const style = document.createElement("style");
            style.id = "popinStyle";
            style.innerHTML = `
                @keyframes popin {
                    0% { transform: scale(0.5); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    modal.style.display = "flex";
});




window.addEventListener("DOMContentLoaded", Initial_Start);

function Initial_Start(){
    setTimeout(LoadingScreen_Hide, 200);
    Initial_Properties_Set();
}

function Initial_Properties_Set(){
    const images = Array.from(document.getElementsByTagName("img"));

    images.forEach(img => {
        // Set opacity using .style property (safer for existing inline styles)
        img.style.opacity = "0";

        // Set attributes. draggable and loading are good candidates for HTML directly
        // If these are always set, consider adding them to your HTML markup instead.
        img.setAttribute("draggable", "false");
        img.setAttribute("loading", "lazy"); // Consider if this is appropriate for all images

        // Add load listener
        img.addEventListener("load", function() {
            // `this` refers to the img element that loaded
            console.log(`Image loaded: ${this.src}, current opacity: ${this.style.opacity}`);
            this.style.opacity = "1"; // Set opacity to 1 (100%)
            // Optional: Add a transition for a fade-in effect
            // this.style.transition = "opacity 0.5s ease-in-out";
        });

        // Handle images that might already be loaded (e.g., from cache)
        // This is important because 'load' event might not fire for cached images.
        if (img.complete) {
             console.log(`Image already complete (cached): ${img.src}`);
             img.style.opacity = "1";
        }
    })
}
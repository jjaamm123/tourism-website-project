    document.querySelectorAll(".tour-packages").forEach(packages => {
    const track = packages.querySelector(".tour-cards");
    const leftBtn = packages.querySelector(".carousel-arrow.left");
    const rightBtn = packages.querySelector(".carousel-arrow.right");

    if (!track || !leftBtn || !rightBtn) return;

    const scrollAmount = track.querySelector(".tour-card").offsetWidth + 24;

    function updateArrows() {
        leftBtn.disabled = track.scrollLeft <= 0;
        rightBtn.disabled =
        track.scrollLeft + track.clientWidth >= track.scrollWidth - 5;
    }

    leftBtn.addEventListener("click", () => {
        track.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    rightBtn.addEventListener("click", () => {
        track.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    track.addEventListener("scroll", updateArrows);

    updateArrows();
    });

const track = document.querySelector(".carousel-track");
const dots = document.querySelectorAll(".dot");
const carousel = document.querySelector(".carousel");

let index = 0;
let intervalId = null;

function updateCarousel() {
  track.style.transform = `translateX(-${index * 100}%)`;

  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

function startAutoSlide() {
  intervalId = setInterval(() => {
    index = (index + 1) % dots.length;
    updateCarousel();
  }, 4000);
}

function stopAutoSlide() {
  clearInterval(intervalId);
  intervalId = null;
}

/* dot click */
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    index = i;
    updateCarousel();
  });
});

/* pause on hover */
carousel.addEventListener("mouseenter", stopAutoSlide);
carousel.addEventListener("mouseleave", startAutoSlide);

/* start autoplay */
startAutoSlide();

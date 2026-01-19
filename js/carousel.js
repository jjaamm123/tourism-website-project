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

function updateArrows(track, leftBtn, rightBtn) {
  leftBtn.disabled = track.scrollLeft <= 0;
  rightBtn.disabled =
    track.scrollLeft + track.clientWidth >= track.scrollWidth - 5;
}

updateArrows(track, leftBtn, rightBtn);

track.addEventListener("scroll", () =>
  updateArrows(track, leftBtn, rightBtn)
);


// Navbar scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.hero-header .navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Optional: Multiple background images rotation
const heroImages = [
  'images/carousel/himalayas-carousel.jpg',
  'images/carousel/boudha-carousel.jpg',
  'images/carousel/tibet-monastery-carousel.jpg'
];

let currentImageIndex = 0;


function rotateHeroImage() {
  const heroBg = document.querySelector('.hero-bg-image');
  if (heroBg) {
    heroBg.style.opacity = 0;
    setTimeout(() => {
      currentImageIndex = (currentImageIndex + 1) % heroImages.length;
      heroBg.src = heroImages[currentImageIndex];
      heroBg.style.opacity = 1;
    }, 500);
  }
}

// Rotate every 8 seconds
setInterval(rotateHeroImage, 8000);

document.addEventListener("DOMContentLoaded", () => {
  
const slides = document.querySelectorAll(".carousel-item");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let current = 0;
let isAnimating = false;

// Initialize
slides.forEach((slide, i) => {
  slide.style.opacity = i === 0 ? 1 : 0;
  slide.style.zIndex = i === 0 ? 1 : 0;
});

function goToSlide(nextIndex) {
  if (isAnimating || nextIndex === current) return;

  isAnimating = true;

  const currentSlide = slides[current];
  const nextSlide = slides[nextIndex];

  // Bring next slide on top
  nextSlide.style.zIndex = 2;
  currentSlide.style.zIndex = 1;

  nextSlide.style.opacity = 0;

  // Force repaint
  nextSlide.offsetHeight;

  // Animate
  nextSlide.style.opacity = 1;
  currentSlide.style.opacity = 0;

  setTimeout(() => {
    current = nextIndex;
    isAnimating = false;
  }, 800); // must match CSS
}

// Next
function nextSlide() {
  const next = (current + 1) % slides.length;
  goToSlide(next);
}

// Prev
function prevSlide() {
  const next = (current - 1 + slides.length) % slides.length;
  goToSlide(next);
}

// Buttons
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

// Auto
let auto = setInterval(nextSlide, 4000);

// Pause on hover
const carousel = document.querySelector(".carousel");

carousel.addEventListener("mouseenter", () => clearInterval(auto));
carousel.addEventListener("mouseleave", () => {
  auto = setInterval(nextSlide, 4000);
});
});
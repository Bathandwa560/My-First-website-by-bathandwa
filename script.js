let slideIndex = 0;
let slides = document.getElementsByClassName("mySlide");
let progress = document.querySelector(".progress");
let autoSlideInterval;

function showSlides() {
  for (let slide of slides) slide.classList.remove("active");

  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;

  let currentSlide = slides[slideIndex - 1];
  currentSlide.classList.add("active");

  // Animate progress bar
  progress.style.transition = "none";
  progress.style.width = "0%";
  setTimeout(() => { progress.style.transition = "width 12s linear"; progress.style.width = "100%"; }, 50);

  // Typewriter effect for all slides
  let caption = currentSlide.querySelector(".slide-text p");
  let text = currentSlide.querySelector(".slide-text").getAttribute("data-text");
  caption.innerHTML = "";
  text.split(" ").forEach((word, i) => {
    setTimeout(() => { caption.innerHTML += word + " "; }, 150 * i);
  });

  // Matrix slide handling
  if(currentSlide.classList.contains("matrix-slide")){
    initMatrix();
    cycleMatrixImages(currentSlide);
  } else {
    stopMatrix();
  }

  autoSlideInterval = setTimeout(showSlides, 12000);
}

function plusSlides(n) {
  clearTimeout(autoSlideInterval);
  slideIndex += n - 1;
  showSlides();
}

// Music toggle
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
musicToggle.addEventListener("click", () => {
  if (bgMusic.paused) { bgMusic.play(); musicToggle.textContent = "⏸️"; }
  else { bgMusic.pause(); musicToggle.textContent = "▶️"; }
});

// Start slideshow & music
window.addEventListener("load", () => {
  bgMusic.play().catch(() => console.log("Autoplay blocked."));
  showSlides();
});

// ---------------- MATRIX EFFECT ----------------
let matrixInterval;
function initMatrix(){
  const canvas = document.getElementById("matrixCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@$%^&*";
  const fontSize = 20;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);

  matrixInterval = setInterval(() => {
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0F0";
    ctx.font = fontSize + "px monospace";

    for(let i=0; i<drops.length; i++){
      const text = letters.charAt(Math.floor(Math.random() * letters.length));
      ctx.fillText(text, i*fontSize, drops[i]*fontSize);

      if(drops[i]*fontSize > canvas.height && Math.random() > 0.975){
        drops[i] = 0;
      }
      drops[i]++;
    }
  }, 50);
}

function stopMatrix(){
  clearInterval(matrixInterval);
  clearInterval(matrixImageInterval);
}

// ---------------- MATRIX IMAGE CYCLE ----------------
let matrixImageInterval;
function cycleMatrixImages(slide){
  clearInterval(matrixImageInterval);
  const images = slide.querySelectorAll(".matrix-img");
  let index = 0;
  images.forEach(img => img.classList.remove("active"));
  images[0].classList.add("active");

  matrixImageInterval = setInterval(() => {
    images[index].classList.remove("active");
    index = (index + 1) % images.length;
    images[index].classList.add("active");
  }, 4000); // change every 4 seconds
}

const countdow = document.getElementById("countdown");
const eventDate = new Date("2025-09-06T11:00:00");

function updateCountdown() {
    const now = new Date();
    const diff = eventDate - now;

    if (diff <= 0) {
        countdow.textContent = "É hoje! ✨";
        return
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const seconds = Math.floor(diff / (1000)) % 60;

    countdow.textContent = `${days} dias, ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCountdown, 1000);
updateCountdown();



const sliderContent = document.querySelector('.slider-content');
const slides = document.querySelectorAll('.slide-box');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const manualBtns = document.querySelectorAll('.manual-btn');

let currentIndex = 0;

function updateCarousel() {
    const containerWidth = sliderContent.parentElement.clientWidth; // Largura do .slider-wrapper.slider
    const singleSlidePixelWidth = slides[0].clientWidth; // Largura de um .slide-box (incluindo padding)

    // Calcula o deslocamento para centralizar o slide atual
    // (Largura total do contêiner / 2) - (largura de 1 slide / 2) - (índice atual * largura de 1 slide)
    const finalTransform = (containerWidth / 2) - (singleSlidePixelWidth / 2) - (currentIndex * singleSlidePixelWidth);

    sliderContent.style.transform = `translateX(${finalTransform}px)`;

    // Aplica o efeito de escala nas imagens
    slides.forEach((slide, index) => {
        if (index === currentIndex) {
            slide.querySelector('img').style.transform = 'scale(1)'; // Imagem central em escala normal
        } else {
            slide.querySelector('img').style.transform = 'scale(0.9)'; // Imagens laterais reduzidas
        }
    });

    // Atualiza os pontinhos de navegação (radios) - Apenas para o feedback visual
    // Verifique se os rádios existem para evitar erros
    const currentRadio = document.getElementById('radio' + (currentIndex + 1));
    if (currentRadio) {
        currentRadio.checked = true;
    }
}

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length; // Loop infinito
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length; // Loop infinito
    updateCarousel();
});

manualBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
    });
});

let autoplayInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
}, 5000);

// Pausar autoplay ao passar o mouse sobre o .slider-wrapper.slider
const carouselContainer = document.querySelector('.slider-wrapper.slider');
if (carouselContainer) { // Garante que o elemento exista
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });

    carouselContainer.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        }, 5000);
    });
}


window.addEventListener('resize', updateCarousel);
updateCarousel(); // Inicializa o carrossel
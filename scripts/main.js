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


// Carrossel de imagens
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


//Envelope
document.addEventListener('DOMContentLoaded', () => {
    const invitationOverlay = document.getElementById('invitation-overlay');
    const invitationCard = document.querySelector('.invitation-card');

    if (invitationOverlay && invitationCard) {
        // Exibir o convite assim que a página carrega
        invitationOverlay.style.opacity = '1';
        invitationOverlay.style.visibility = 'visible';

        // Adicionar evento de clique para fechar o convite
        invitationOverlay.addEventListener('click', () => {
            // Adiciona a classe para iniciar a animação de "abertura" do card
            invitationCard.classList.add('open');

            // Adiciona a classe para esconder o overlay completo
            // Atrasamos um pouco para a animação do card começar
            setTimeout(() => {
                invitationOverlay.classList.add('hidden');
            }, 500); // Meio segundo de atraso para a animação do card

            // Opcional: Remover o overlay completamente do DOM após a transição
            // para garantir que não haja interações ou sobreposições.
            invitationOverlay.addEventListener('transitionend', function handler(e) {
                if (e.propertyName === 'opacity' && invitationOverlay.classList.contains('hidden')) {
                    invitationOverlay.remove();
                    // Remove o event listener para evitar chamadas duplicadas
                    invitationOverlay.removeEventListener('transitionend', handler);
                }
            });
        });
    }
});



// Brilhos
document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica para mostrar/esconder local da festa (mantida) ---
    const localFestaSection = document.getElementById('local-festa');

    function getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    const status = getParameterByName('status');

    if (localFestaSection) {
        if (status === 'confirmado') {
            localFestaSection.style.display = 'block';
        } else {
            localFestaSection.style.display = 'none';
        }
    }

    // --- Lógica para Convite de Abertura (mantida) ---
    const invitationOverlay = document.getElementById('invitation-overlay');
    const invitationCard = document.querySelector('.invitation-card');

    if (invitationOverlay) {
        invitationOverlay.addEventListener('click', () => {
            if (!invitationOverlay.classList.contains('hidden')) {
                invitationCard.classList.add('open');
                setTimeout(() => {
                    invitationOverlay.classList.add('hidden');
                }, 1000); // Duração da transição do convite-card
            }
        });
    }

    // --- NOVA LÓGICA PARA GLITTERS ANIMADOS ---
    const numGlitters = 100; // Quantidade de glitters que você quer
    const body = document.body; // Onde os glitters serão adicionados

    for (let i = 0; i < numGlitters; i++) {
        const glitter = document.createElement('div'); // Cria um novo elemento div
        glitter.classList.add('glitter-point'); // Adiciona a classe CSS

        // Define um tamanho aleatório para o glitter (entre 3px e 10px, por exemplo)
        const size = Math.random() * 7 + 3; // Tamanho entre 3 e 10
        glitter.style.width = `${size}px`;
        glitter.style.height = `${size}px`;

        // Posiciona o glitter aleatoriamente na tela (viewport)
        // Usamos window.innerWidth e window.innerHeight para garantir que cubra a tela inteira
        glitter.style.left = `${Math.random() * 100}vw`; // Posição horizontal aleatória (0-100% da largura da viewport)
        glitter.style.top = `${Math.random() * 100}vh`; // Posição vertical aleatória (0-100% da altura da viewport)

        // Aplica a animação com duração e atraso aleatórios
        const animationDuration = Math.random() * 2 + 2; // Duração entre 2s e 4s
        const animationDelay = Math.random() * 3; // Atraso entre 0s e 3s
        glitter.style.animation = `sparkle ${animationDuration}s infinite ease-in-out alternate`;
        glitter.style.animationDelay = `${animationDelay}s`;

        body.appendChild(glitter); // Adiciona o glitter ao body
    }
});
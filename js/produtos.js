document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        once: true,
        duration: 600,
    });

    // --- SELEÇÃO DOS ELEMENTOS ---
    const allSlides = document.querySelectorAll('.carousel-slide');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const accessoryCards = document.querySelectorAll('.card');
    const indicatorsContainer = document.getElementById('carousel-indicators');

    if (allSlides.length === 0) return;

    // --- VARIÁVEIS DE ESTADO ---
    let visibleSlides = Array.from(allSlides);
    let currentIndex = 0;

    // --- FUNÇÕES ---
    function createIndicators() {
        indicatorsContainer.innerHTML = '';
        visibleSlides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('indicator-dot');
            dot.dataset.index = index;
            if (index === currentIndex) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
            });
            indicatorsContainer.appendChild(dot);
        });
    }

    function updateIndicators() {
        const dots = indicatorsContainer.querySelectorAll('.indicator-dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Localize a função antiga em js/produtos.js e substitua por esta
function updateCarousel() {
    if (visibleSlides.length === 0) {
        indicatorsContainer.innerHTML = '';
        nextBtn.style.display = 'none';
        prevBtn.style.display = 'none';
        // Garante que slides que não pertencem ao filtro desapareçam
        allSlides.forEach(slide => slide.classList.add('hidden-slide'));
        return;
    }

    nextBtn.style.display = 'flex';
    prevBtn.style.display = 'flex';

    // Primeiro, aplicamos a classe para esconder em TODOS os slides originais.
    // Isso "limpa" o carrossel e garante que os slides de um filtro anterior sumam.
    allSlides.forEach(slide => {
        slide.classList.remove('active', 'inactive-left', 'inactive-right');
        slide.classList.add('hidden-slide');
    });

    // Agora, pegamos apenas os 3 slides que devem aparecer na tela
    // e damos a eles as classes de posicionamento corretas.
    const prevIndex = (currentIndex - 1 + visibleSlides.length) % visibleSlides.length;
    const nextIndex = (currentIndex + 1) % visibleSlides.length;

    if (visibleSlides[currentIndex]) {
        visibleSlides[currentIndex].classList.remove('hidden-slide');
        visibleSlides[currentIndex].classList.add('active');
    }
    if (visibleSlides[prevIndex]) {
        visibleSlides[prevIndex].classList.remove('hidden-slide');
        visibleSlides[prevIndex].classList.add('inactive-left');
    }
    if (visibleSlides[nextIndex]) {
        // Evita que o slide anterior e o próximo sejam o mesmo quando há apenas 2 slides
        if (prevIndex !== nextIndex) {
            visibleSlides[nextIndex].classList.remove('hidden-slide');
            visibleSlides[nextIndex].classList.add('inactive-right');
        }
    }

    updateIndicators();
}

    function applyFilter(filter) {
        // --- FILTRO DOS ACESSÓRIOS (LA EMBAIXO) ---
        accessoryCards.forEach(card => {
            const cardBrand = card.dataset.brand ? card.dataset.brand.toLowerCase() : '';
            const isBrandMatch = cardBrand === filter.toLowerCase();
            const isInitiallyHidden = card.classList.contains('initial-hide');

            if (filter === 'all') {
                if (isInitiallyHidden) card.style.display = 'none'; // Mostra 2 de cada
                else card.style.display = 'block';
            } else {
                if (isBrandMatch) card.style.display = 'block'; // Mostra todos da marca
                else card.style.display = 'none';
            }
        });

        // --- FILTRO DO CARROSSEL (LÓGICA ATUALIZADA) ---
        if (filter === 'all') {
            // Lógica para intercalar os slides
            const telexSlides = Array.from(allSlides).filter(s => s.dataset.brand.toLowerCase() === 'telex');
            const philipsSlides = Array.from(allSlides).filter(s => s.dataset.brand.toLowerCase() === 'philips');
            const interleavedSlides = [];
            const maxLength = Math.max(telexSlides.length, philipsSlides.length);

            for (let i = 0; i < maxLength; i++) {
                if (philipsSlides[i]) interleavedSlides.push(philipsSlides[i]);
                if (telexSlides[i]) interleavedSlides.push(telexSlides[i]);
            }
            visibleSlides = interleavedSlides;
        } else {
            // Lógica para filtrar por uma marca específica
            visibleSlides = Array.from(allSlides).filter(slide => 
                slide.dataset.brand && slide.dataset.brand.toLowerCase() === filter.toLowerCase()
            );
        }
        
        currentIndex = 0;
        createIndicators();
        updateCarousel();

        setTimeout(() => {
            AOS.refresh();
        }, 300);
    }

    // --- EVENTOS DE CLICK ---
    nextBtn.addEventListener('click', () => {
        if (visibleSlides.length > 1) {
            currentIndex = (currentIndex + 1) % visibleSlides.length;
            updateCarousel();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (visibleSlides.length > 1) {
            currentIndex = (currentIndex - 1 + visibleSlides.length) % visibleSlides.length;
            updateCarousel();
        }
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const isAllButton = button.dataset.filter === 'all';
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            if (isAllButton) {
                filterButtons.forEach(btn => {
                    btn.style.opacity = '1';
                    btn.style.transform = btn.classList.contains('filter-btn-center') ? 'scale(1.1)' : 'scale(1)';
                });
            } else {
                filterButtons.forEach(btn => {
                    if (btn.classList.contains('active')) {
                        btn.style.opacity = '1';
                        btn.style.transform = btn.classList.contains('filter-btn-center') ? 'scale(1.2)' : 'scale(1.1)';
                    } else {
                        btn.style.opacity = '0.4';
                        btn.style.transform = 'scale(1)';
                    }
                });
            }
            applyFilter(button.dataset.filter);
        });
    });

    // --- INICIALIZAÇÃO ---
    applyFilter('all');
});
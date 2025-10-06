/* ================================================================
  SCRIPT.JS - VERSÃO COMPLETA E UNIFICADA
  Contém scripts globais e scripts específicos para cada página.
  ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Script para o menu mobile (funciona em todas as páginas) ---
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
  
  // --- Função para os cards da página "Sobre" ---
  window.toggleInfo = function(btn) {
    const box = btn.nextElementSibling;
    box.classList.toggle("hidden");
  }

  // --- Script do Carrossel Hero (index.html, produtos.html) ---
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    let slides = [];
    const currentPage = window.location.pathname;

    if (currentPage.includes('index.html') || currentPage === '/') {
        slides = [
            { title: "Reconecte-se com os Sons da Vida", description: "Nossos aparelhos auditivos de última geração trazem de volta a clareza e a alegria dos momentos em família.", image: "Imagens/index1.jpg" },
            { title: "Tecnologia e Discreção para o seu Dia a Dia", description: "Descubra modelos quase invisíveis, com conectividade Bluetooth e baterias recarregáveis.", image: "Imagens/index2.avif" },
            { title: "Qualidade de Vida Começa com Boa Audição", description: "Invista no seu bem-estar. Agende uma avaliação gratuita e transforme sua experiência auditiva.", image: "Imagens/index3.jpg" }
        ];
    } else if (currentPage.includes('produtos.html')) {
        slides = [
            { title: "Conheça Nossos Aparelhos Auditivos", description: "Tecnologia de ponta para uma audição clara e confortável. Encontre a solução perfeita para você.", image: "Imagens/index1.jpg" },
            { title: "Philips HearLink: Inovação e Conectividade", description: "Conecte-se diretamente ao seu mundo com os aparelhos Philips, que oferecem som nítido e natural.", image: "Imagens/phillipsApa.png" },
            { title: "Telex Zircon: Tradição e Confiança", description: "Desempenho robusto e confiável para todos os ambientes, garantindo que você não perca nenhum momento.", image: "Imagens/telexApa.png" }
        ];
    }

    if (slides.length > 0) {
        const heroTitle = document.getElementById('heroTitle');
        const heroDesc = document.getElementById('heroDesc');
        const heroImage = document.getElementById('heroImage');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (heroTitle && heroDesc && heroImage && prevBtn && nextBtn) {
            let currentIndex = 0;
            let autoPlay;

            function showSlide(index) {
                heroTitle.classList.add("fade-out");
                heroDesc.classList.add("fade-out");
                heroImage.classList.add("fade-out");

                setTimeout(() => {
                    const slide = slides[index];
                    heroTitle.textContent = slide.title;
                    heroDesc.textContent = slide.description;
                    heroImage.src = slide.image;
                    heroImage.alt = slide.title; 
                    heroTitle.classList.remove("fade-out");
                    heroDesc.classList.remove("fade-out");
                    heroImage.classList.remove("fade-out");
                }, 300);
            }

            function startAutoPlay() { autoPlay = setInterval(() => { currentIndex = (currentIndex + 1) % slides.length; showSlide(currentIndex); }, 5000); }
            function stopAutoPlay() { clearInterval(autoPlay); }

            prevBtn.addEventListener('click', () => { currentIndex = (currentIndex - 1 + slides.length) % slides.length; showSlide(currentIndex); stopAutoPlay(); startAutoPlay(); });
            nextBtn.addEventListener('click', () => { currentIndex = (currentIndex + 1) % slides.length; showSlide(currentIndex); stopAutoPlay(); startAutoPlay(); });
            heroSection.addEventListener("mouseenter", stopAutoPlay);
            heroSection.addEventListener("mouseleave", startAutoPlay);

            showSlide(currentIndex);
            startAutoPlay();
        }
    }
  }

  // --- SCRIPT DE AVALIAÇÕES (para servicos.html) ---
  const testimonialsSection = document.getElementById('testimonials-section');
  if (testimonialsSection) {
    
    // 1. Dados das avaliações
    const testimonials = [
      { quote: "O atendimento foi excepcional, do início ao fim. Senti que minhas necessidades foram realmente ouvidas. Voltei a participar das conversas em família!", name: "Maria S.", location: "Limeira, SP", stars: 5 },
      { quote: "Depois de anos adiando, finalmente decidi procurar ajuda. A equipe da DuoConnect me deu toda a segurança e o aparelho é super discreto e eficiente. Recomendo!", name: "João P.", location: "Piracicaba, SP", stars: 5 },
      { quote: "A fonoaudióloga foi muito paciente e explicou tudo em detalhes. O processo de adaptação foi mais fácil do que eu imaginava. Estou muito satisfeita.", name: "Ana C.", location: "Americana, SP", stars: 4 }
    ];

    // 2. Selecionar os elementos do HTML
    const track = document.getElementById('testimonial-track');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');

    // 3. Criar e inserir as avaliações no HTML
    let testimonialsHTML = '';
    testimonials.forEach(testimonial => {
      let starsHTML = '';
      for (let i = 0; i < 5; i++) {
        starsHTML += `<i class="fa-solid fa-star ${i < testimonial.stars ? 'text-yellow-400' : 'text-gray-300'}"></i>`;
      }
      testimonialsHTML += `
        <div class="testimonial-slide w-full flex-shrink-0 p-8 flex flex-col">
          <div class="flex items-center mb-4">${starsHTML}</div>
          <p class="text-gray-600 text-lg italic mb-6 flex-grow">"${testimonial.quote}"</p>
          <div class="text-right">
            <p class="font-bold text-blue-900">${testimonial.name}</p>
            <p class="text-gray-500 text-sm">${testimonial.location}</p>
          </div>
        </div>
      `;
    });
    
    // CORREÇÃO: A linha abaixo foi movida para fora do loop 'forEach'
    track.innerHTML = testimonialsHTML;

    // 4. Lógica do carrossel
    let currentIndex = 0;
    const totalSlides = testimonials.length;

    function updateSliderPosition() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSliderPosition();
    });

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateSliderPosition();
    });

    updateSliderPosition(); // Define a posição inicial
  }
  // --- FIM DO SCRIPT DE AVALIAÇÕES ---

});
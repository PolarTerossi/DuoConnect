/**
 * @file Gerencia o carrossel do Hero na página inicial.
 */
document.addEventListener('DOMContentLoaded', () => {
  const heroSection = document.getElementById('hero');
  if (!heroSection) return;

  const slides = [
    { title: "Reconecte-se com os Sons da Vida", description: "Nossos aparelhos auditivos de última geração trazem de volta a clareza e a alegria dos momentos em família.", image: "imagens/index1.jpg" },
    { title: "Tecnologia e Discreção para o seu Dia a Dia", description: "Descubra modelos quase invisíveis, com conectividade Bluetooth e baterias recarregáveis.", image: "imagens/index2.avif" },
    { title: "Qualidade de Vida Começa com Boa Audição", description: "Invista no seu bem-estar. Agende uma avaliação gratuita e transforme sua experiência auditiva.", image: "imagens/index3.jpg" }
  ];

  const heroTitle = document.getElementById('heroTitle');
  const heroDesc = document.getElementById('heroDesc');
  const heroImage = document.getElementById('heroImage');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  if (!heroTitle || !heroDesc || !heroImage || !prevBtn || !nextBtn) return;

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

  function startAutoPlay() {
    autoPlay = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }, 5000);
  }

  function stopAutoPlay() {
    clearInterval(autoPlay);
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
    stopAutoPlay();
    startAutoPlay();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
    stopAutoPlay();
    startAutoPlay();
  });

  heroSection.addEventListener("mouseenter", stopAutoPlay);
  heroSection.addEventListener("mouseleave", startAutoPlay);

  showSlide(currentIndex);
  startAutoPlay();
});
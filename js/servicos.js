/**
 * @file Gerencia o carrossel de avaliações na página de serviços.
 */
document.addEventListener('DOMContentLoaded', () => {
  const testimonialsSection = document.getElementById('testimonials-section');
  if (!testimonialsSection) return;

  const testimonials = [
    { quote: "O atendimento foi excepcional, do início ao fim. Senti que minhas necessidades foram realmente ouvidas. Voltei a participar das conversas em família!", name: "Maria S.", location: "Limeira, SP", stars: 5 },
    { quote: "Depois de anos adiando, finalmente decidi procurar ajuda. A equipe da DuoConnect me deu toda a segurança e o aparelho é super discreto e eficiente. Recomendo!", name: "João P.", location: "Piracicaba, SP", stars: 5 },
    { quote: "A fonoaudióloga foi muito paciente e explicou tudo em detalhes. O processo de adaptação foi mais fácil do que eu imaginava. Estou muito satisfeita.", name: "Ana C.", location: "Americana, SP", stars: 4 }
  ];

  const track = document.getElementById('testimonial-track');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');

  let testimonialsHTML = '';
  testimonials.forEach(testimonial => {
    let starsHTML = Array(5).fill(0).map((_, i) => 
      `<i class="fa-solid fa-star ${i < testimonial.stars ? 'text-yellow-400' : 'text-gray-300'}"></i>`
    ).join('');
    
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
  track.innerHTML = testimonialsHTML;

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
});
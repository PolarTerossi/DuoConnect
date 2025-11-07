/**
 * @file Gerencia o carrossel de avaliações na página de serviços.
 */
document.addEventListener('DOMContentLoaded', () => {
  const testimonialsSection = document.getElementById('testimonials-section');
  if (!testimonialsSection) return;

  const testimonials = [
    { quote: "Excelente serviço & atendimento ao cliente.", name: "Marcelo Souza", location: "Icaraí, Niterói", stars: 5 },
    { quote: "Fácil estacionamento, equipe cordial e o principal, saí de lá ouvindo.", name: "Dejair Antunes", location: "Barra da Tijuca, RJ", stars: 5 },
    { quote: "Muita atenção e eu diria e também paciência, esclarecimento total sobre o aparelho, estou muito satisfeita pelo profissionalismo e simpatia", name: "Sonia Mello", location: "Ipanema, RJ", stars: 5 }
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
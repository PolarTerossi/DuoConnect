/**
 * @file Gerencia a interatividade dos cards na página "Sobre Nós".
 */
document.addEventListener('DOMContentLoaded', () => {
  const toggleButtons = document.querySelectorAll('.toggle-info-btn');

  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const box = btn.nextElementSibling;
      if (box) {
        box.classList.toggle('hidden');
      }
    });
  });
});

// NO SEU HTML da página "Sobre", mude o botão de:
// <button onclick="toggleInfo(this)" ...>
// PARA:
// <button class="toggle-info-btn" ...>
// Remova o 'onclick' e adicione a classe 'toggle-info-btn'.
/**
 * @file Contém os scripts globais que rodam em todas as páginas do site.
 * @author DuoConnect
 * @version 1.0.0
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // Módulo para o menu mobile
  const MobileMenu = {
    init() {
      const menuBtn = document.getElementById('mobileMenuBtn');
      const menu = document.getElementById('mobileMenu');

      if (menuBtn && menu) {
        menuBtn.addEventListener('click', () => {
          menu.classList.toggle('hidden');
        });
      }
    }
  };

  MobileMenu.init();

});
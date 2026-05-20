'use strict';

// =================== burger menu start script ======================
const burgerMenu = document.querySelector('.burger_menu');
const mobileMenu = document.querySelector('.mobile_menu');
const mobileMenuLinks = mobileMenu.querySelectorAll('a[href^="#"]');

function closeOrOpenMenu() {
  burgerMenu.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  document.body.classList.toggle('no_scroll');
}

burgerMenu.onclick = closeOrOpenMenu;

mobileMenuLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();

    const duration =
      parseFloat(window.getComputedStyle(mobileMenu).transitionDuration) * 1000;

    closeOrOpenMenu();

    setTimeout(() => {
      const target = document.querySelector(link.hash);
      if (target) target.scrollIntoView();
    }, duration);
  });
});
// =================== burger menu end script ======================

// ============== Scroll-to-Top button start script ================

// ============== Scroll-to-Top button end script =--===============
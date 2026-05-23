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
const scrollToTop = document.querySelector('.scroll_to_top');

window.addEventListener('scroll', () => {
  if (window.innerWidth <= 768 && window.scrollY > 300) {
    scrollToTop.classList.add('show');
  } else {
    scrollToTop.classList.remove('show');
  }
});

scrollToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
// ============== Scroll-to-Top button end script ==================

// ================== Modal gifts start stript =====================
import { gifts } from './all_gifts.js';

const cardsContainer = document.querySelector('.cards');
const modal = document.querySelector('.modal');
const modal_body = modal.querySelector('.modal_body');
const modalGift = modal.querySelector('.modal_gift');
const modalCloseBtn = document.querySelector('.modal_close_btn');

const modalGiftImg = modalGift.querySelector('.modal_gift img');
const giftCategory = modalGift.querySelector('.modal_gift .category');
const giftName = modalGift.querySelector('.modal_gift .name');
const giftText = modalGift.querySelector('.modal_gift .text');
const giftPowersContainer = modalGift.querySelector('.powers_container');

const countSnowflakes = 5;

function createSuperpowersHTML(superpowers) {
  let html = '';
  for (const [powerName, powerValue] of Object.entries(superpowers)) {
    const numericValue = parseInt(powerValue.slice(1));
    const activeSnowflakesCount = numericValue / 100;
    let snowflakesHTML = '';
    for (let i = 0; i < countSnowflakes; ++i) {
      const isActiveSnowflake =
        i < activeSnowflakesCount ? 'active' : 'inactive';
      snowflakesHTML += `
        <div class="snowflake">
            <svg>
              <path class="${isActiveSnowflake}" d="M11.0885 9.88162L10.5408 9.56542L12.0084 9.17219L11.7658 8.26704L9.39312 8.90278L8.27403 8.25667C8.28946 8.17336 8.29796 8.08765 8.29796 7.99997C8.29796 7.91229 8.2895 7.82655 8.27403 7.74327L9.39312 7.09716L11.7658 7.7329L12.0084 6.82775L10.5408 6.43452L11.0885 6.11831L13.4386 5.97725L13.7847 4.02063L11.9172 3.34203L10.6199 5.30677L10.0723 5.62297L10.4655 4.15545L9.56036 3.91293L8.92462 6.28561L7.80484 6.93211C7.67505 6.82103 7.52499 6.73313 7.36088 6.67494V5.3828L9.09779 3.64586L8.43518 2.98325L7.36085 4.05755V3.42515L8.4105 1.32584L6.89234 0L5.37415 1.3259L6.4238 3.42521V4.05761L5.34947 2.98332L4.68686 3.64592L6.42377 5.38286V6.675C6.25966 6.73319 6.1096 6.82109 5.97981 6.93217L4.86004 6.28568L4.22429 3.91299L3.31913 4.15551L3.71236 5.62304L3.1647 5.30684L1.86747 3.34209L0 4.02069L0.346063 5.97731L2.6962 6.11838L3.24386 6.43458L1.77633 6.82781L2.01887 7.73296L4.39156 7.09722L5.51065 7.74333C5.49522 7.82664 5.48672 7.91235 5.48672 8.00003C5.48672 8.08771 5.49519 8.17345 5.51065 8.25673L4.39156 8.90285L2.01887 8.2671L1.77633 9.17226L3.24386 9.56548L2.6962 9.88169L0.346063 10.0227L0 11.9793L1.8675 12.6579L3.16473 10.6932L3.71243 10.377L3.3192 11.8445L4.22435 12.087L4.8601 9.71435L5.97988 9.06786C6.10966 9.17894 6.25972 9.26684 6.42383 9.32503V10.6172L4.68693 12.3541L5.34953 13.0167L6.42386 11.9424V12.5748L5.37421 14.6741L6.8924 16L8.4106 14.6741L7.36094 12.5748V11.9424L8.43527 13.0167L9.09788 12.3541L7.36098 10.6172V9.32503C7.52509 9.26684 7.67515 9.17894 7.80493 9.06786L8.92471 9.71435L9.56046 12.087L10.4656 11.8445L10.0724 10.377L10.6201 10.6932L11.9173 12.6579L13.7848 11.9793L13.4387 10.0227L11.0885 9.88162Z" />
            </svg>
          </div>
      `;
    }

    html += `
      <div class="power">
        <span class="power_name paragraph">${powerName.toLowerCase()}</span>
        <div class="power_stats_group">
          <span class="power_value paragraph">${powerValue}</span>
          <div class="snowflake_container">
            ${snowflakesHTML}
          </div>
        </div>
      </div>
    `;
  }

  return html;
}

function fillModal(card) {
  const chooseGifts = gifts.find((gift) => gift.name === card.dataset.name);

  const categoryNew = chooseGifts.category.toLowerCase().split(' ').join('-');
  modalGiftImg.setAttribute(
    'src',
    `../img/img-compressed/img-compressed/gift-${categoryNew}.png`,
  );
  modalGiftImg.setAttribute('alt', `gift-${categoryNew}`);
  modalGift.dataset.category = categoryNew;
  giftCategory.textContent = chooseGifts.category;
  giftName.textContent = chooseGifts.name;
  giftText.textContent = chooseGifts.description;

  if (chooseGifts.superpowers) {
    giftPowersContainer.innerHTML = createSuperpowersHTML(
      chooseGifts.superpowers,
    );
  }
}

function toggleModal() {
  modal.classList.toggle('active');
  modalGift.classList.toggle('active');
  document.body.classList.toggle('no_scroll');
}

if (cardsContainer) {
  cardsContainer.addEventListener('click', (event) => {
    const clickedCard = event.target.closest('.card');
    if (clickedCard) {
      fillModal(clickedCard);
      toggleModal();
    }
  });
}

if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', toggleModal);
}

if (modal_body) {
  modal_body.addEventListener('click', (event) => {
    if (event.target === modal_body) {
      toggleModal();
    }
  });
}
// ================== Modal gifts end stript =======================

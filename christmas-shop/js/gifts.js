'use strict';

// =========== Category switching in Gifts start sctipt ===========
import { gifts } from './all_gifts.js';

const giftsElement = document.querySelector('.gifts');
const cardsContainer = giftsElement.querySelector('.cards');
const filterContainer = giftsElement.querySelector('.filter'); 

function filterArray(array, categoryName) {
  if (categoryName === 'all') return array;
  return array.filter((card) => card.category.toLowerCase() === categoryName);
}

function createListCards(array) {
  cardsContainer.innerHTML = array
    .map((card) => {
      const categoryNew = card.category.toLowerCase().split(' ').join('-');
      return `<div class="card ${categoryNew}" data-name="${card.name}">
        <img
          src="../img/img-compressed/img-compressed/gift-${categoryNew}.png"
          alt="gift-${categoryNew}" />
        <div class="title">
          <p class="category header_4">${card.category}</p>
          <p class="name header_3">${card.name}</p>
        </div>
      </div>`;
    })
    .join('');
}

const activeBtn = giftsElement.querySelector('.filter .active');
if (activeBtn) {
  const initialCategory = activeBtn.innerHTML.toLowerCase();
  const filterCards = filterArray(gifts, initialCategory);
  createListCards(filterCards);
}

function chooseCategory(event) {
  const clickedButton = event.target.closest('button');
  if (!clickedButton) return;

  giftsElement.querySelector('.filter .active').classList.remove('active');
  clickedButton.classList.add('active');

  const clickedCategory = clickedButton.textContent.trim().toLowerCase();
  const filterCards = filterArray(gifts, clickedCategory);
  createListCards(filterCards);
}

if (filterContainer) {
  filterContainer.addEventListener('click', chooseCategory);
}
// =========== Category switching in Gifts end sctipt =============

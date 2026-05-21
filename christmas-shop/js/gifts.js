'use strict';

// =========== Category switching in Gifts start sctipt ===========
import { gifts } from './all_gifts.js';

const giftsElement = document.querySelector('.gifts');
const cards = giftsElement.querySelector('.cards');
const categoryButton = giftsElement.querySelectorAll('.filter button');

function filterArray(array, categoryName) {
  if (categoryName === 'all') return array;
  return array.filter((card) => card.category.toLowerCase() === categoryName);
}

function createListCards(array) {
  cards.innerHTML = array
    .map((card) => {
      const categoryNew = card.category.toLowerCase().split(' ').join('-');
      return `<div class="card ${categoryNew}">
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

const initialCategory = giftsElement.querySelector('.active').innerHTML.toLowerCase();
const filterCards = filterArray(gifts, initialCategory);

createListCards(filterCards);

categoryButton.forEach((botton) => {
  botton.addEventListener('click', (event) => {
    giftsElement.querySelector('.active').classList.remove('active');
    event.target.classList.add('active');

    const clickedCategory = event.target.innerHTML.toLowerCase();

    const filterCards = filterArray(gifts, clickedCategory);
    createListCards(filterCards);
  });
});
// =========== Category switching in Gifts end sctipt =============

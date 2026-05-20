'use strict';

// =================== slider start sctript ========================
const slider = document.querySelector('.slider');
const container = slider.querySelector('.container');
const ticker = slider.querySelector('.ticker');
const leftButton = slider.querySelector('.left_button');
const rightButton = slider.querySelector('.right_button');

const state = {};

function updateButtons() {
  leftButton.disabled = state.currentStep <= 0;
  rightButton.disabled = state.currentStep >= state.maxNumberStep;
}

function applyTransform() {
  ticker.style.transform = `translateX(${state.currentTranslate}px)`;
  updateButtons(state.currentStep, state.maxNumberStep);
}

function resetTicker() {
  state.currentTranslate = 0;
  state.currentStep = 0;
  state.maxNumberStep = document.documentElement.clientWidth > 767 ? 3 : 6;
  state.dx = (ticker.scrollWidth - container.clientWidth) / state.maxNumberStep;
  applyTransform();
}

function rightMove() {
  if (state.currentStep < state.maxNumberStep) {
    state.currentStep++;
    state.currentTranslate -= state.dx;
    applyTransform();
  }
}

function leftMove() {
  if (state.currentStep > 0) {
    state.currentStep--;
    state.currentTranslate += state.dx;
    applyTransform();
  }
}

function init() {
  resetTicker();
  rightButton.onclick = rightMove;
  leftButton.onclick = leftMove;
  window.addEventListener('resize', () => {
    resetTicker();
  });
}

init();
// ==================== slider script end ===========================

// ==================== timer start script ==========================
const timerElement = document.querySelector('.timer');
const timerItems = timerElement.querySelectorAll('.timer_item');

const unitMultipliers = [24, 60, 60, 1000];
let timeComponents = new Array(4);

function getTimeComponents(multipliers, components, remainingTime) {
  for (let i = 0; i < components.length; i++) {
    const divisor = multipliers
      .slice(i)
      .reduce((multipl, item) => multipl * item, 1);
    components[i] = Math.floor(remainingTime / divisor);
    remainingTime -= components[i] * divisor;
  }
  return components;
}

setInterval(() => {
  const currentDate = new Date();
  const nextYearDate = new Date(currentDate.getFullYear() + 1, 0, 1);
  const timeToNextYear = nextYearDate.getTime() - currentDate.getTime();

  timeComponents = getTimeComponents(
    unitMultipliers,
    timeComponents,
    timeToNextYear,
  );

  for (let i = 0; i < timerItems.length; ++i) {
    timerItems[i].innerHTML = timeComponents[i];
  }
}, 1000);
// ====================== time end script ========================

// ============ random 4 gifts in home start script ==============
import { gifts } from './all_gifts.js';

function shuffle(array) {
  const result = [...array];
  for (let i = array.length - 1; i > 0; --i) {
    const random = Math.floor(Math.random() * (i + 1));
    [result[i], result[random]] = [result[random], result[i]];
  }
  return result;
}

const giftsElement = document.querySelector('.gifts');
const cards = giftsElement.querySelector('.cards');

const numbersBestGifts = 4;
const randomGifts = shuffle(gifts);

function createListCards(container, array, numberCards) {
  container.innerHTML = createListCardsText(array, numberCards);
}

function createListCardsText(array, numberCards) {
  let listCards = ``;
  for (let i = 0; i < numberCards; ++i) {
    const card = array[i];
    const categoryNew = card.category.toLowerCase().split(' ').join('-');
    listCards += `<div class="card ${categoryNew}">
        <img
          src="../img/img-compressed/img-compressed/gift-${categoryNew}.png"
          alt="gift-${categoryNew}" />
        <div class="title">
          <p class="category header_4">${card.category}</p>
          <p class="name header_3">${card.name}</p>
        </div>
      </div>`;
  }
  return listCards;
}

createListCards(cards, randomGifts, numbersBestGifts);
// ============ random 4 gifts in home end script =================

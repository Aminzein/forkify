import { elements } from "./base";
import {Fraction} from 'fractional';

const formatCount = count => {
  if(count){
    const [int , dec] = count.toString().split('.').map(el => parseInt(el,10));
    if(!dec) return count;
    if(int === 0){
      const fr = new Fraction(count);
      return `${fr.numerator}/${fr.denominator}`;
    }else {
      const fr = new Fraction(count - int);
      return `${int} ${fr.numerator}/${fr.denominator}`;
    }
  }
  return '?';
}


const createiIngredient = ing => `
  <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="src/img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${formatCount(ing.count)}</div>
        <div class="recipe__description">
          <span class="recipe__unit">${ing.unit}</span>
          ${ing.ingredient}
        </div>
  </li>
`

export const clearRecipe = () => {
  elements.recipe.innerHTML = '';
}

export const renderRecipe = recipe => {
    const markup =`
    <figure class="recipe__fig">
        <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img" />
        <h1 class="recipe__title">
        <span>${recipe.title}</span>
        </h1>
    </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="src/img/icons.svg#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">45</span>
      <span class="recipe__info-text"> ${recipe.time} minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="src/img/icons.svg#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--decrease-servings">
          <svg>
            <use href="src/img/icons.svg#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="src/img/icons.svg#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated">
      <svg>
        <use href="src/img/icons.svg#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round">
      <svg class="">
        <use href="src/img/icons.svg#icon-bookmark-fill"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
      ${recipe.ingredients.map(el => createiIngredient(el)).join('')}
    </ul>
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${recipe.author}</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${recipe.url}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="src/img/icons.svg#icon-arrow-right"></use>
      </svg>
    </a>
  </div>
    `;
  elements.recipe.insertAdjacentHTML("afterbegin" , markup);  
}

export const updateServingsIngredients = recipe => {
  document.querySelector('.recipe__info-data--people').textContent = recipe.servings;
  const countEl = Array.from(document.querySelectorAll(".recipe__quantity"));
  countEl.forEach((el , idx) => {
    el.textContent = formatCount(recipe.ingredients[idx].count);
  })
}
import { elements } from "./base";
import {Fraction} from 'fractional';
import icons from 'url:../../img/icons.svg';

const formatCount = count => {
  if(count){
    let [int , dec] = count.toString().split('.').map(el => parseInt(el,10));
    if(!dec) return count;
    if(dec > 10) {
      let strNum = dec.toString();
      dec = parseInt(strNum[0]);
    }
    if(int === 0){
      const fr = new Fraction(count);
      return `${fr.numerator}/${fr.denominator}`;
    }else {
      const fr = new Fraction(dec/10);
      return `${int} ${fr.numerator}/${fr.denominator}`;
    }
  }
  return '?';
}

const generateBookMarkButton = isBookMark => (`
  <svg class="">
    <use href="${icons}#icon-bookmark-${isBookMark ? 'fill' : ''}"></use>
  </svg>`
  )

export const renderBookMarkButton = isBookMark => {
  document.querySelector('.btn--round').innerHTML = generateBookMarkButton(isBookMark);
}

const createiIngredient = ing => `
  <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
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
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">45</span>
      <span class="recipe__info-text"> ${recipe.time} minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--decrease-servings">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated">
      <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round">
      ${generateBookMarkButton(recipe.isBookMark)}
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
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;
  elements.recipe.insertAdjacentHTML("afterbegin" , markup);  
}

export const updateServingsIngredients = recipe => {
  document.querySelector('.recipe__info-data--people').textContent = recipe.servings;
  const countEl = Array.from(document.querySelectorAll(".recipe__quantity"));
  countEl.forEach((el , idx) => {
    el.textContent = formatCount(recipe.ingredients[idx].count);
  })
}
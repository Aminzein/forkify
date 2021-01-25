import {elements} from './base'
import icons from 'url:../../img/icons.svg';
export const getInput = () => elements.searchInput.value; 

export const clearInput = () => {
    elements.searchInput.value = '';
}

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPage.innerHTML = ''; 
}

const limitRecipeTitle = (title , limit = 17) => {
    const newTitle = [];
    if(title.length > limit){
        title.split(' ').reduce((acc,cur) => {
            if(acc + cur.length <= limit){
                newTitle.push(cur);
            }
            return acc + cur.length;
        } , 0);

        return `${newTitle.join(' ')} ...`;
    }
    return title;
}


const renderRecipe = recipe => {
    const markup = `
    <li class="preview" data-id="${recipe.recipe_id}">
        <a class="preview__link" href="${recipe.recipe_id}">
        <figure class="preview__fig">
            <img src="${recipe.image_url}" alt="${recipe.title}" />
        </figure>
        <div class="preview__data">
            <h4 class="preview__title">${limitRecipeTitle(recipe.title)}</h4>
            <p class="preview__publisher">${recipe.publisher}</p>
            <div class="preview__user-generated">
            <svg>
                <use href="src/img/icons.svg#icon-user"></use>
            </svg>
            </div>
        </div>
        </a>
    </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend' , markup);
}

//type: 'prev' or 'next'

const createPageButtons = (page , type) => 
    `<button class="btn--inline pagination__btn--${type}" data-goto=${type === 'prev' ? page -1 : page + 1}>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
        <span>Page ${type === 'prev' ? page -1 : page + 1}</span>
    </button>`;

/*
          `<button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page 1</span>
          </button>
          <button class="btn--inline pagination__btn--next">
            <span>Page 3</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </button>`;
*/

const renderPageButtons = (page , numRes , resPerPage) => {
    const pages = Math.ceil(numRes / resPerPage);
    let button;
    if(page === 1 && pages > 1){
        button = createPageButtons(page , 'next');
    }
    else if(page < pages){
        //both pages
        button = `
            ${createPageButtons(page , 'prev')}
            ${createPageButtons(page , 'next')}
        `; 
    } 
    else if(page === pages && pages > 1){
        // go to previous page
        button = createPageButtons(page , 'prev');
    }
    elements.searchResPage.insertAdjacentHTML('afterbegin' , button);
}

export const renderResults = (recipes , page = 1 , resPerPage = 10) => {
    const start = (page-1) * resPerPage;
    const end = page * resPerPage;
    const rec = recipes.slice(start , end);
    rec.forEach(recipe => renderRecipe(recipe));
    //render page buttons
    renderPageButtons(page , recipes.length , resPerPage);
}

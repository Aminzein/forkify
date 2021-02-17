import {elements} from './base'
import * as paginationView from './paginationView';
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


export const highlightSelected = id => {
    const previewArr = Array.from(document.querySelectorAll('.preview__link'));
    previewArr.forEach(el => {
        el.classList.remove('preview__link--active');
    })
    document.querySelector(`a[href="${id}"]`).classList.add('preview__link--active');
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


export const renderResults = (recipes , page = 1 , resPerPage = 10) => {
    const start = (page-1) * resPerPage;
    const end = page * resPerPage;
    const rec = recipes.slice(start , end);
    rec.forEach(recipe => renderRecipe(recipe));
    //render page buttons
    paginationView.renderPageButtons(page , recipes.length , resPerPage , elements.searchResPage);
}

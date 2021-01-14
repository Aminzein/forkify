import  {elements} from './base'
export const getInput = () => elements.searchInput.value
export const clearInput = () => {
    elements.searchInput.value = '';
}
export const clearResult = () => {
    elements.searchResultList.innerHTML = '';
}
const renderRecipe = recipe => {
    const markup = `
            <li class="preview">
            <a class="preview__link preview__link--active" href="#${recipe.recipe_id}">
            <figure class="preview__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}" />
            </figure>
            <div class="preview__data">
                <h4 class="preview__title">${recipe.title}</h4>
                <p class="preview__publisher">${recipe.publisher}</p>
                <div class="preview__user-generated">
                <svg>
                    <use href="src/img/icons.svg#icon-user"></use>
                </svg>
                </div>
            </div>
            </a>
        </li>
    `
    elements.searchResultList.insertAdjacentElement('beforeend' , markup);
}
export const renderResults = recipes => {
    recipes.forEach(renderRecipe);
}
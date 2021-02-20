import Search from './models/Search';
import * as searchView from './views/searchView' 
import * as recipeView from './views/recipeView'
import {elements , renderLoader , clearLoader} from './views/base'
import Recipe from './models/Recipe';
import * as bookMarkView from './views/bookMarkView';
import BookMark from './models/BookMark';
const state = {};

const initialize = () => {
    state.bookMark = new BookMark();
    state.bookMark.getItemsFromStorage();
    bookMarkView.renderAllBookMarks(state.bookMark.items);
}

/**
 * Search Controller 
 */
const controlSearch = async () => {
    const query = searchView.getInput();
    if(query){
        state.search = new Search(query);
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchElement);
        try{
            await state.search.getResults();
            clearLoader();
            searchView.renderResults(state.search.results);
        }catch (error){
            renderError('Error in searching recipe');
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit' , event => {
    event.preventDefault();
    controlSearch();
})


elements.searchResPage.addEventListener('click' , event => {
    const btn = event.target.closest('.btn--inline');
    if(btn){
        searchView.clearResults();
        const goToPage = parseInt(btn.dataset.goto);
        searchView.renderResults(state.search.results , goToPage);
    }
})
/***************************************************/
/**
* Recipe Controller 
*/

const loadRecipeFromAPI = async (id) =>{
    state.recipe = new Recipe(id);
    await state.recipe.getRecipe();
    state.recipe.calculateTime();
    state.recipe.calculateServings();
    state.recipe.isBookMark = state.bookMark.searchItem(state.recipe.id) === -1 ? false : true;
    state.recipe.parseIngredients();
}

const controlRecipe = async (id) => {
    recipeView.clearRecipe();
    renderLoader(elements.recipe);
    if(state.search) searchView.highlightSelected(id);
    try{
        await loadRecipeFromAPI(id);
        recipeView.renderRecipe(state.recipe);
    }
    catch(error){
        renderError('Error in loading recipe');
    }
    clearLoader();
}
elements.searchResList.addEventListener('click' , event => {
    event.preventDefault();
    const recipe = event.target.closest('.preview');
    if(recipe){
        const id = recipe.dataset.id;
        if(state.recipe){
            if(state.recipe.id == id){
                return;
            }
        }
        controlRecipe(id);
    }
});
// recipe button clicks
elements.recipe.addEventListener('click' , event => {
    if(event.target.matches('.btn--decrease-servings , .btn--decrease-servings *')){
        if(state.recipe.servings > 1){
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    }
    else if(event.target.matches('.btn--increase-servings , .btn--increase-servings *')){
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }
    else if(event.target.matches('.btn--round , .btn--round *')){
        handleBookMarkButtonClick();
    }
})
/***************************************************/

/**
* Book Marks 
*/

const bookMarkRecipe = (img , url , author ,title , id) => {
    bookMarkView.hideMessage();
    state.bookMark.addItem(img , title , url , author , id);
    state.recipe.updateBookMarkStatus(true);
    recipeView.renderBookMarkButton(state.recipe.isBookMark);
    state.bookMark.saveItemsInStorage();
}

const unBookMarkRecipe = (id , isBookMark) => {
    state.bookMark.deleteItem(id);
    state.recipe.updateBookMarkStatus(false);
    recipeView.renderBookMarkButton(isBookMark);
    state.bookMark.saveItemsInStorage();
}

const handleBookMarkButtonClick = () => {
    const {img , url , author ,title , id} = state.recipe;
    if(!state.recipe.isBookMark){
        bookMarkRecipe(img , url , author ,title , id);
    }
    else {
        unBookMarkRecipe(id , state.recipe.isBookMark);
    }
    bookMarkView.renderAllBookMarks(state.bookMark.items);
}

elements.bookMarks.addEventListener('click' , e => {
    let btn = e.target.closest('.btn--inline');
    if(btn){
        bookMarkView.clearBookmarks();
        let goToPage = parseInt(btn.dataset.goto);
        bookMarkView.renderAllBookMarks(state.bookMark.items , goToPage);
    }
})
/********************************************************** */

/**
* Errors
*/

const getErrorElement = (errorMessage) => `
    <div class="error">
        <div>
        <svg>
            <use href="src/img/icons.svg#icon-alert-triangle"></use>
        </svg>
        </div>
        <p>${errorMessage}. Please try again!</p>
    </div>`;

const renderError = (errorMessage) => {
    elements.recipe.innerHTML = '';
    elements.recipe.insertAdjacentHTML('afterbegin' , getErrorElement(errorMessage));
}    

initialize();
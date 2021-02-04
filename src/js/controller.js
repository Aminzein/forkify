import Search from './models/Search';
import * as searchView from './views/searchView' 
import * as recipeView from './views/recipeView'
import {elements , renderLoader , clearLoader} from './views/base'
import Recipe from './models/recipe';
const state = {};
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
            alert('Error in searching recipe');
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

const controlRecipe = async (id) => {
    recipeView.clearRecipe();
    renderLoader(elements.recipe);
    if(state.search) searchView.highlightSelected(id);
    try{
        state.recipe = new Recipe(id);
        await state.recipe.getRecipe();
        state.recipe.calculateTime();
        state.recipe.calculateServings();
        state.recipe.parseIngredients();
        recipeView.renderRecipe(state.recipe);
    }
    catch(error){
        alert(error);
    }
    clearLoader();
}
elements.searchResList.addEventListener('click' , event => {
    event.preventDefault();
    const recipe = event.target.closest('.preview');
    if(recipe){
        const id = recipe.dataset.id;
        console.log(id);
        if(state.recipe){
            if(state.recipe.id == id){
                return;
            }
        }
        controlRecipe(id);
    }
});
/***************************************************/
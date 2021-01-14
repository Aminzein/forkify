import Search from './models/Search';
import * as searchView from './views/searchView'
import {elements , renderLoader  } from './views/base'
const controlSearch = async () => {
    // 1 get query
    const query = searchView.getInput();
    if(query){
        state.serach = new Search(query);
        searchView.clearInput();
        searchView.clearResult();
        await state.serach.getResults();
        searchView.renderResults(state.search.result);
    }
}
const state = {};
document.querySelector('.search').addEventListener('click' , event => {
    event.preventDefault();
    controlSearch();
})
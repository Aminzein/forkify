import icons from 'url:../../img/icons.svg';

export const elements = {
    searchForm : document.querySelector('.search') ,
    searchInput : document.querySelector('.search__field') ,
    searchResList : document.querySelector('.results') ,
    searchElement : document.querySelector('.search-results') ,
    searchResPage : document.querySelector('.pagination') , 
    recipePreview : document.querySelector('.preview') ,
    recipe : document.querySelector('.recipe') ,
    bookMarks : document.querySelector('.bookmarks__list')
}

export const elementStrings = {
    loader : 'spinner'
}
 
export const renderLoader = parent => {
    const loader = `
      <div class="${elementStrings.loader}">
        <svg>
            <use href="${icons}#icon-loader"></use>
        </svg>
      </div>  
    `;
    parent.insertAdjacentHTML('afterbegin' , loader);
}

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if(loader){
        loader.parentElement.removeChild(loader);
    }
}









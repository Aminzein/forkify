import icons from 'url:../../img/icons.svg';

//type: 'prev' or 'next'
const createPageButtons = (page , type) => 
    `<button class="btn--inline pagination__btn--${type}" data-goto=${type === 'prev' ? page -1 : page + 1}>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
        <span>Page ${type === 'prev' ? page -1 : page + 1}</span>
    </button>`;


export const renderPageButtons = (page , numRes , resPerPage , parent , place = 'afterbegin') => {
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
    parent.insertAdjacentHTML(place, button);
}    
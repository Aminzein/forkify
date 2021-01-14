export const elements = {
    searchInput : document.querySelector('.search__field') ,
    searchForm : document.querySelector('.search') , 
    searchResultList : document.querySelector('.results_list')
}
export const renderLoader = parent => {
    const loader = `
        <div class="loader">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHtml('afterbegin' , loader);
}
import {elements} from './base';
import * as  paginationView from './paginationView';
import icons from 'url:../../img/icons.svg';
const renderBookMark = ({img , url , title , author , id}) => {
    const markup = `
    <li class="preview" id="${id}">
        <a class="preview__link" href="${url}">
        <figure class="preview__fig">
            <img src="${img}" alt="${title}" />
        </figure>
        <div class="preview__data">
            <h4 class="preview__name">
            ${title}
            </h4>
            <p class="preview__author">${author}</p>
        </div>
        </a>
    </li>
    `;
    elements.bookMarks.insertAdjacentHTML('beforeend' , markup);
}

const clearBookmarks = () => {
    elements.bookMarks.innerHTML = '';
}


const getMessageElement = () => (`
    <div class="message">
        <div>
        <svg>
            <use href="${icons}#icon-smile"></use>
        </svg>
        </div>
        <p>
        No bookmarks yet. Find a nice recipe and bookmark it :)
        </p>
    </div>`
)

export const hideMessage = () => {
    const el = document.querySelector('.message');
    if(el) el.style.display = 'none';
}


export const showMessage = () => {
    elements.bookMarks.innerHTML = getMessageElement();
}

export const renderAllBookMarks = (bookMark , page = 1 , markPerPage = 4) => {
    const startIndex = (page-1) * markPerPage;
    const endIndex = startIndex + markPerPage;
    clearBookmarks();
    if(bookMark.length !== 0){
        bookMark.slice(startIndex , endIndex).forEach(el => renderBookMark(el));
        paginationView.renderPageButtons(page , bookMark.length , markPerPage , elements.bookMarks);
    }
    else {
        showMessage();
    }
}
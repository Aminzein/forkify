import {elements} from './base';
export const renderBookmark = ({image , url , title , author , id}) => {
    const markup = `
    <li class="preview" id="${id}">
        <a class="preview__link" href="${url}">
        <figure class="preview__fig">
            <img src="${image}" alt="${title}" />
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

export const clearBookmark = () => {}
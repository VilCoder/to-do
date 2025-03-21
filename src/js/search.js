import sadFaceIcon from '../icons/emoticon-sad-outline.svg';
import sortIcon from '../icons/sort.svg';

import todoList from './todoList';
import DOM from './DOM';

function displaySearch(searchValue) {
  const searchedValue = todoList.searchTasks(searchValue);
  const main = document.querySelector('.layout__main');
  main.textContent = '';
  main.insertAdjacentHTML( // Add DOM elements to the end of main
    'beforeend',
    `
    <div class="main__sort"><i class="icon">${sortIcon}</i> <p>Sort by priority</p></div>
    <h3 class="main__title">Search result for '${searchValue}'</h3>
    `
  );

  DOM.closeDialog();

  if (!searchValue || (searchedValue.length === 0)) {
    main.insertAdjacentHTML(
      'beforeend',
      `<div class="todo__list">
           <p class="list__notfound">Not Found <i class="icon">${sadFaceIcon}</i></p>
       </div>
      `
    );

    return;
  }

  searchedValue.forEach((task) => {
    DOM.updateDom(main, task, 0)
    DOM.removeTaskDom();
    DOM.editTaskDom(searchValue);
    DOM.completeTaskDom(searchValue);
    DOM.sortTaskDom(searchValue);
  });
}

function handlerEnterSearch() {
  const searchButton = document.querySelector('#search');
  // Before adding a new listener, delete the previous ones
  const newSearchButton = searchButton.cloneNode(true);
  searchButton.replaceWith(newSearchButton); // Delete previous events

  newSearchButton.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
      let searchValue = newSearchButton.value.toLowerCase();
      displaySearch(searchValue)
    }
  });
}

export {
  displaySearch,
  handlerEnterSearch,
}
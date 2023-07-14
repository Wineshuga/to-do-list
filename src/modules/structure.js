/* eslint-disable import/no-cycle */
import { tasks, deleteTask, editTask } from '../index.js';

const setLocalStorage = () => {
  localStorage.setItem('task', JSON.stringify(tasks));
};
const getLocalStorage = () => (localStorage.getItem('task') ? JSON.parse(localStorage.getItem('task')) : []);

const populateTasks = () => {
  const listContainer = document.querySelector('.all-tasks');
  listContainer.innerHTML = '';
  const listElements = tasks.map((task) => {
    const li = `<li class="list--item">
    <div class="desc--container">
        <input type="checkbox" name="" id="">
        <div id=${task.index} class="parent--div">
            <p class="desc">${task.desc}</p>
            <form action="" id=${task.index} class="edit--form">
                <input type="text" name="" class="edit--input" id="" value=${task.desc}>
            </form>
        </div>
    </div>
    <div class="icons--container">
        <i class="fa-solid  fa-ellipsis-vertical" data-vertical=${task.index}></i>
        <i class="fa-solid fa-trash-can" data-delete=${task.index} ></i>
    </div>
  </li>`;
    return li;
  }).join('');
  listContainer.insertAdjacentHTML('beforeend', listElements);
  const deleteIcons = listContainer.querySelectorAll('.fa-trash-can');
  const verticalIcons = listContainer.querySelectorAll('.fa-ellipsis-vertical');
  verticalIcons.forEach((icon) => {
    icon.addEventListener('click', (e) => {
      const { parentElement } = e.target.parentElement;
      const editInput = parentElement.querySelector('.edit--input');
      editInput.focus();
      parentElement.classList.add('about--to--edit');
    });
  });
  deleteIcons.forEach((icon) => {
    icon.addEventListener('click', (e) => {
      const data = e.target.dataset.delete;
      deleteTask(+data);
      populateTasks();
    });
  });
  const editForm = document.querySelectorAll('.edit--form');
  editForm.forEach((editForm, index) => {
    editForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputId = e.target.id;
      const editInput = document.querySelectorAll('.edit--input')[index];
      const { value } = editInput;
      editTask(value, inputId);
    });
  });
};

export { setLocalStorage, getLocalStorage, populateTasks };

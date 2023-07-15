import { completedTask, updateTask } from './completedTask.js';
import { setLocalStorage, getLocalStorage } from './localStorage.js';

let tasks = getLocalStorage();
const listContainer = document.querySelector('.all-tasks');

const populateTasks = () => {
  const listContainer = document.querySelector('.all-tasks');
  listContainer.innerHTML = '';
  const listElements = tasks.map((task) => {
    const li = `<li class="list--item">
    <div class="desc--container">
        <input type="checkbox" name="" class="check--box">
        <div id=${task.index} class="parent--div">
            <p class="desc">${task.desc}</p>
            <form action="" id=${task.index} class="edit--form">
                <input type="text" name="" class="edit--input" id="" >
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
      const descText = parentElement.querySelector('.desc');
      parentElement.classList.add('about--to--edit');
      editInput.value = descText.textContent;
      editInput.focus();
    });
  });
  deleteIcons.forEach((icon) => {
    icon.addEventListener('click', (e) => {
      const data = e.target.dataset.delete;
      // eslint-disable-next-line no-use-before-define
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
      // eslint-disable-next-line no-use-before-define
      editTask(value, inputId);
    });
  });
  const checkBox = document.querySelectorAll('.check--box');
  checkBox.forEach((checkBox, index) => {
    checkBox.addEventListener('change', () => {
      const taskText = document.querySelectorAll('.desc')[index];
      completedTask(tasks[index], taskText, tasks);
    });
  });
  if (tasks.length > 0) {
    updateTask(tasks);
  }
};

function deleteTask(index) {
  tasks = tasks.filter((task) => task.index !== +index)
    .map((task, idx) => {
      task.index = idx + 1;
      return task;
    });
  setLocalStorage(tasks);
}

function editTask(input, index) {
  tasks = tasks.map((task) => {
    if (task.index === +index) {
      task.desc = input;
      populateTasks();
      setLocalStorage(tasks);
    }
    return task;
  });
}

function addTasks(desc, complete = false) {
  const index = tasks.length + 1;
  const newTask = { desc, complete, index };
  tasks = [...tasks, newTask];
  setLocalStorage(tasks);
}

const clearCompleted = () => {
  tasks = tasks.filter((task) => task.complete === false)
    .map((task, idx) => {
      task.index = idx + 1;
      return task;
    });
  setLocalStorage(tasks);
  populateTasks();
};

const button = document.querySelector('.button');
button.addEventListener('click', clearCompleted);

const form = document.querySelector('.add-task');
const addToListInput = document.querySelector('#add-to-list');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const { value } = addToListInput;
  if (value) {
    addTasks(value);
    populateTasks();
    addToListInput.value = '';
  }
});

// Drag and Drop functionality
let draggedTask = null;

listContainer.addEventListener('dragstart', (event) => {
  draggedTask = event.target;
});

listContainer.addEventListener('dragover', (event) => {
  event.preventDefault();
});

const updateIndices = () => {
  const items = Array.from(listContainer.children);
  items.forEach((item, index) => {
    item.dataset.index = index;
  });
};

listContainer.addEventListener('drop', (event) => {
  event.preventDefault();
  if (draggedTask) {
    const targetItem = event.target;
    const targetIndex = Number(targetItem.dataset.index);
    const draggedIndex = Number(draggedTask.dataset.index);

    if (targetIndex !== draggedIndex) {
      const items = Array.from(listContainer.children);
      const targetOffset = targetIndex < draggedIndex ? 0 : 1;
      listContainer.insertBefore(draggedTask, items[targetIndex + targetOffset]);
      updateIndices();
    }
  }
});

export default populateTasks;

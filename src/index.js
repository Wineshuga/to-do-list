/* eslint-disable import/no-mutable-exports */
/* eslint-disable import/no-cycle */
import './style.css';
import { getLocalStorage, setLocalStorage, populateTasks } from './modules/structure.js';

let tasks = getLocalStorage();
const listContainer = document.querySelector('.all-tasks');

function addTasks(desc, complete = false) {
  const index = tasks.length + 1;
  const newTask = { desc, complete, index };
  tasks = [...tasks, newTask];
  setLocalStorage();
}
function deleteTask(index) {
  tasks = tasks.filter((task) => task.index !== +index)
    .map((task, idx) => {
      task.index = idx + 1;
      return task;
    });
  setLocalStorage();
}
function editTask(input, index) {
  tasks = tasks.map((task) => {
    if (task.index === +index) {
      task.desc = input;
      populateTasks();
      setLocalStorage();
    }
    return task;
  });
}

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
window.addEventListener('DOMContentLoaded', () => {
  populateTasks();
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

export { tasks, deleteTask, editTask };
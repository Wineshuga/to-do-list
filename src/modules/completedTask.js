import { getLocalStorage, setLocalStorage } from './localStorage.js';

const completedTask = (task, desc, tasks) => {
  if (task.complete === true) {
    desc.classList.remove('checked');
    task.complete = false;
  } else {
    desc.classList.add('checked');
    task.complete = true;
  }
  setLocalStorage(tasks);
};

const updateTask = (tasks) => {
  getLocalStorage();
  tasks.forEach((task, index) => {
    const checkBox = document.querySelectorAll('.check--box')[index];
    const desc = document.querySelectorAll('.desc')[index];
    if (task.complete) {
      checkBox.checked = true;
      desc.classList.add('checked');
    } else {
      checkBox.checked = false;
      desc.classList.remove('checked');
    }
  });
};

export { completedTask, updateTask };
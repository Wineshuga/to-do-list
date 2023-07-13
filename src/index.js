import './style.css';
import enterIcon from './assets/enter.png';
import moreIcon from './assets/more.png';
import binIcon from './assets/bin.png';

// Array of Tasks
const tasks = JSON.parse(localStorage.getItem('taskStore')) || [];

// Set up task structure
const listContainer = document.querySelector('.all-tasks');
const liContent = (desc) => {
  const listDiv = document.createElement('div');
  listDiv.innerHTML = `
      <label>
      <input type="checkbox" name="task" class="task" > 
      ${desc}</label>
      <img class="more-btn" alt="more">
      <img class="bin-btn" alt="bin">
      `;
  listDiv.className = 'todo-task';
  listDiv.setAttribute('draggable', 'true');
  listContainer.appendChild(listDiv);
  // Add images
  const moreBtn = document.querySelectorAll('.more-btn');
  const binBtn = document.querySelectorAll('.bin-btn');
  moreBtn.forEach((img) => {
    img.src = moreIcon;
  });
  binBtn.forEach((img) => {
    img.src = binIcon;
  });
};

// Show tasks in local storage
const showTasks = () => {
  if (tasks.length > 0) {
    tasks.forEach((task) => {
      liContent(task.description);
    });
  }
  document.querySelector('.enter-btn').src = enterIcon;
};
showTasks();

// Add task from input
const userInput = document.querySelector('#add-to-list');
const addUserInput = (event) => {
  const { value } = userInput;
  const newTask = {
    description: value,
    completed: false,
    index: tasks.length,
  };
  if (value !== '') {
    event.preventDefault();
    liContent(value);
    tasks.push(newTask);
    localStorage.setItem('taskStore', JSON.stringify(tasks));
    userInput.value = '';
  }
};
const enterBtn = document.querySelector('.enter-btn');
enterBtn.addEventListener('click', addUserInput);

// Remove task from list
const removeTask = (index) => {
  tasks.splice(index, 1);

  tasks.forEach((tasks, i) => {
    tasks.index = i;
  });

  localStorage.setItem('taskStore', JSON.stringify(tasks));

  listContainer.innerHTML = '';

  showTasks();
};

listContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('bin-btn')) {
    const taskElement = event.target.closest('.todo-task');
    const index = parseInt(taskElement.getAttribute('data-index'), 10);
    removeTask(index);
  }
});

const binBtn = document.querySelectorAll('.bin-btn');
binBtn.forEach((bin, index) => {
  bin.addEventListener('click', () => removeTask(index));
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
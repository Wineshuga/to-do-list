import './style.css';

// Arrayb of Tasks
const tasks = [
  {
    description: 'Wash plate',
    completed: false,
    index: 1,
  },
  {
    description: 'Bathe',
    completed: false,
    index: 2,
  },
];

const listContainer = document.querySelector('.list-div');

// Show tasks
const showTasks = () => {
  tasks.forEach((task) => {
    const listDiv = document.createElement('li');
    listDiv.innerHTML = `
    <input type="checkbox" name="task" id="task" >
    <label>${task.description}</label>
    `;
    listDiv.className = 'todo-task';
    listDiv.setAttribute('draggable', 'true');
    listContainer.appendChild(listDiv);
  });
};

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

showTasks();
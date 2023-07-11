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

showTasks();
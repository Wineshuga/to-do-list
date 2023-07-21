import {
  editTask, clearCompleted, addTasks, getTasks,
} from './structure.js';

const listContainer = document.createElement('ul');
const button = document.createElement('button');
button.classList.add('button');
listContainer.classList.add('all-tasks');
const form = document.createElement('form');
form.classList.add('add-task');
const addToListInput = document.createElement('input');
addToListInput.id = 'add-to-list';

document.body.appendChild(listContainer);
document.body.appendChild(button);
document.body.appendChild(form);
document.body.appendChild(addToListInput);

describe('edit and clear-completed-task function', () => {
  test('editTask updates task description correctly', () => {
    // Arrange
    const desc = 'Task 1';
    const desc2 = 'Task 2';
    const desc3 = 'Task 3';
    addTasks(desc);
    addTasks(desc2, true);
    addTasks(desc3);
    // Act
    editTask('Updated Task 2', 2);
    const allTasks = getTasks();

    // Assert
    expect(allTasks[1].desc).toBe('Updated Task 2');
  });
});

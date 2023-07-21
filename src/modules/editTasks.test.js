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
  test('clearCompleted removes completed tasks and updates indices', () => {
    // Arrange
    const tasks = [
      { desc: 'Task 1', complete: false, index: 1 },
      { desc: 'Task 2', complete: true, index: 2 },
      { desc: 'Task 3', complete: false, index: 3 },
    ];

    // Act
    const remainingTasks = clearCompleted();

    // Assert: Check that the tasks array no longer contains completed tasks
    const completedTasks = remainingTasks.filter((task) => task.complete);
    expect(completedTasks.length).toEqual(0);

    // Assert: Check that the remaining tasks have updated indices
    expect(tasks[0].index).toBe(1);
    expect(tasks[1].index).toBe(2);
  });
});

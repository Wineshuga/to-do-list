import {
  addTasks, deleteTask, getTasks, initialize,
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

describe('add and delete function', () => {
  test('should add new task into the task array', () => {
    // Arrange
    const desc = 'Wash plate';

    // act
    initialize();
    addTasks(desc);
    // Assert

    expect(getTasks()).toHaveLength(1);
  });

  test('should delete task from the task array', () => {
    // Arrange
    const index = 1;

    // act
    initialize();
    deleteTask(index);
    // Assert

    expect(getTasks()).toHaveLength(0);
  });
});

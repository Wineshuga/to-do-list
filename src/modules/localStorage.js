const setLocalStorage = (tasks) => {
  localStorage.setItem('task', JSON.stringify(tasks));
};
const getLocalStorage = () => (localStorage.getItem('task') ? JSON.parse(localStorage.getItem('task')) : []);

export { setLocalStorage, getLocalStorage };
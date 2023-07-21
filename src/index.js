import './style.css';
import { initialize, populateTasks } from './modules/structure.js';

window.addEventListener('DOMContentLoaded', () => {
  initialize();
  populateTasks();
});
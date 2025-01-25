// Select DOM elements
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const filterButtons = document.querySelectorAll('.filter button');

// Task list array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to render tasks
function renderTasks(filter = 'all') {
    todoList.innerHTML = '';

    tasks
        .filter(task => {
            if (filter === 'completed') return task.completed;
            if (filter === 'pending') return !task.completed;
            return true;
        })
        .forEach((task, index) => {
            const li = document.createElement('li');
            li.className = `todo-item ${task.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <button onclick="toggleTask(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                </div>
            `;
            todoList.appendChild(li);
        });
}

// Function to add a task
function addTask() {
    const taskText = todoInput.value.trim();
    if (taskText === '') return alert('Task cannot be empty!');

    tasks.push({ text: taskText, completed: false });
    saveTasks();
    renderTasks();
    todoInput.value = '';
}

// Function to toggle task completion
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Event listeners
addBtn.addEventListener('click', addTask);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        renderTasks(button.dataset.filter);
    });
});

// Initial render
renderTasks();
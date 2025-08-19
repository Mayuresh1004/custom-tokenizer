document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from Local Storage
    loadTasks();

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span class="task-text">${taskText}</span>
            <button>Delete</button>
        `;
        taskList.appendChild(listItem);

        // Save tasks to Local Storage
        saveTasks();

        // Clear input
        taskInput.value = '';

        // Add event listener for deleting task
        listItem.querySelector('button').addEventListener('click', () => {
            listItem.remove();
            saveTasks();
        });

        // Add event listener for completing task
        listItem.querySelector('.task-text').addEventListener('click', () => {
            listItem.classList.toggle('completed');
            saveTasks();
        });
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(listItem => {
            tasks.push({
                text: listItem.querySelector('.task-text').textContent,
                completed: listItem.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span class="task-text">${task.text}</span>
                <button>Delete</button>
            `;
            if (task.completed) {
                listItem.classList.add('completed');
            }
            taskList.appendChild(listItem);

            listItem.querySelector('button').addEventListener('click', () => {
                listItem.remove();
                saveTasks();
            });

            listItem.querySelector('.task-text').addEventListener('click', () => {
                listItem.classList.toggle('completed');
                saveTasks();
            });
        });
    }
});
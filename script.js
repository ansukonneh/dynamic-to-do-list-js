document.addEventListener('DOMContentLoaded', function () {

    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    let tasks = [];
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    function addTask(taskTextParam, save = true) {
        const taskText = (typeof taskTextParam === 'string') ? taskTextParam.trim() : taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }
        const li = document.createElement('li');
        const textSpan = document.createElement('span');
        textSpan.textContent = taskText;
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');
        removeButton.onclick = function () {
            taskList.removeChild(li);
            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasks();
            }
        };
        li.appendChild(textSpan);
        li.appendChild(removeButton);
        taskList.appendChild(li);
        if (save) {
            tasks.push(taskText);
            saveTasks();
        }
        if (taskTextParam === undefined) {
            taskInput.value = "";
        } else {
            taskInput.value = "";
        }
    }
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = storedTasks.slice(); 
        tasks.forEach(taskText => addTask(taskText, false));
    }
    addButton.addEventListener('click', function () {
        addTask(); 
    });

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    loadTasks();
});

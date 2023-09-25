let tasks = {}

const form = document.querySelector('form');
const addBtn = document.getElementById('add-task');
const removeBtn = document.getElementsByClassName('remove-task');

function addTodoItem(id, taskName, status) {
    tasks[id] = {
        task: taskName,
        status: 'incomplete'
    };

    document.getElementById('tasks').innerHTML += `<li class="task-container ${status}" id=${id}>
                                                    <div class="main-part">
                                                        <img src="images/unchecked.png" alt="" class="task-icon" data-id=${id} data-status="incomplete" data-taskName="${taskName}">
                                                        <span class="task">${taskName}</span>
                                                    </div>
                                                    <span class="task-icon"><i class="fa-solid fa-x" data-id=${id}></i></span>
                                                </li>`;

    document.querySelector('input[type="text"]').value = '';
}

function updateTask(id, status, taskName) {
    const task = document.getElementById(id);
    
    if (status == 'incomplete') {
        task.innerHTML = `<li class="task-container done" id=${id}>
                            <div class="main-part">
                                <img src="images/checked.png" alt="" class="task-icon" data-id=${id} data-status="done" data-taskName="${taskName}">
                                <span class="task">${taskName}</span>
                            </div>
                            <span class="task-icon"><i class="fa-solid fa-x" data-id=${id}></i></span>
                        </li>`;
    } else {
        task.innerHTML = `<li class="task-container incomplete" id=${id}>
                            <div class="main-part">
                                <img src="images/unchecked.png" alt="" class="task-icon" data-id=${id} data-status="incomplete" data-taskName="${taskName}">
                                <span class="task">${taskName}</span>
                            </div>
                            <span class="task-icon"><i class="fa-solid fa-x" data-id=${id}></i></span>
                        </li>`;
    }
}

function removeTask(id) {
    const task = document.getElementById(id);
    task.remove();
}


form.addEventListener('keypress', ev => {
    if (ev.keyCode === 13) {
        ev.preventDefault();
    }
})

addBtn.addEventListener('click', () => {
    const taskName = document.querySelector('input[type="text"]').value;
    let key = Object.keys(tasks).length;
    
    addTodoItem(key, taskName, 'incomplete');
})

document.body.addEventListener('click', ev => {
    const {id, status, taskname} = ev.target.dataset;
    if (!id && !status && !taskname) {
        return;
    } else if (id && !status && !taskname) {
        removeTask(id);
    } else if (id && status && taskname) {
        updateTask(id, status, taskname);
    } 
})



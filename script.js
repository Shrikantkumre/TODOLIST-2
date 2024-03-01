const addbtn = document.querySelector('.add')
const editbtn = document.querySelector('.edit')
const taskname = document.querySelector('.taskname')
const description = document.querySelector('.description')
const tasksContainer = document.querySelector('.tasksContainer')

let tasksArray = [];
tasksArray = JSON.parse(localStorage.getItem('mytasks')) || [];

let currentIndex = '';

function addTask() {
    if (taskname.value !== '') {
        tasksArray.push({ name: taskname.value, description: description.value, checked: false });
        displayArrayValue();
        taskname.value = '';
        description.value = '';
    }
}

function displayArrayValue() {
    let htmlblock = '';
    tasksArray.forEach(function (value, index) {
        htmlblock = htmlblock + ` <div class="task">
        <div>
            <div class="name"><input type="checkbox" ${value.checked === true ? 'checked' : ''} onchange="checkboxClicked(this, ${index})">${value.name}</div>
            <div class="desc">${value.description}</div>
        </div>
        <div class="action">
            <img src="" alt="edit"  onclick="editTask(${index})">
            <img src="" alt="delete" onclick="deleteTask(${index})">
        </div>
    </div>`
    })
    tasksContainer.innerHTML = htmlblock;

    localStorage.setItem('mytasks', JSON.stringify(tasksArray))
}

function checkboxClicked(ele, index) {
    const isChecked = ele.checked;
    tasksArray[index].checked = isChecked;
    displayArrayValue();
}
function editTask(index) {
    taskname.value = tasksArray[index].name;
    description.value = tasksArray[index].description;
    editbtn.style.display = 'block';
    addbtn.style.display = 'none';
    currentIndex = index;
}

function deleteTask(index) {
    tasksArray.splice(index, 1);
    displayArrayValue();
}

function editTaskValue() {
    tasksArray[currentIndex].name = taskname.value;
    tasksArray[currentIndex].description = description.value;
    displayArrayValue();
    taskname.value = '';
    description.value = '';
    editbtn.style.display = 'none';
    addbtn.style.display = 'block';
}
addbtn.addEventListener('click', addTask)
editbtn.addEventListener('click', editTaskValue)

displayArrayValue()
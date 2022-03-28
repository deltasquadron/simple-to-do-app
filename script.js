const text = document.getElementById("text");
const deadline = document.getElementById("deadline");
const taskList = document.getElementById("tasks");
const localStorageTasks = JSON.parse(localStorage.getItem("tasks"));
const form = document.getElementById("form");
let tasks = localStorage.getItem("tasks") !== null ? localStorageTasks : [];

// Add a task
function addTask(e) {
  e.preventDefault();

  if (text.value.trim() === "" || deadline.value.trim() === "") {
    alert("Please add text and a deadline");
  } else {
    const task = {
      completed: false,
      id: generateID(),
      text: text.value,
      deadline: deadline.value,
    };

    tasks.push(task);

    addTaskDOM(task);

    updateLocalStorage();

    text.value = "";
    deadline.value = "";
  }
}

// Generate a random ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
  }

  // Add task to the DOM list
function addTaskDOM(task) {
    const item = document.createElement("li");
    item.setAttribute('id',`${task.id}`);
    item.classList.add('list-group-item');
    item.innerHTML = `<input onclick="setComplete(this)" type="checkbox" class="checkbox"><p>Task: 
        ${task.text}</p> <p>Due date: ${task.deadline}</p>
     <button class="delete-btn btn btn-danger btn-sm ms-3" onclick="removeTask(${
      task.id
    })">x</button>
      `;
  if (task.completed === true) {
    item.firstChild.setAttribute('checked', "")
  } else {
    item.firstChild.setAttribute('unchecked', "")
  }
    taskList.appendChild(item);
  }
  
  
  // Remove task by ID
  function removeTask(id) {
    tasks = tasks.filter((task) => task.id !== id);
  
    updateLocalStorage();
  
    init();
  }

  // Set as complete
  function setComplete(elem) {   
    let completedID = elem.parentNode.id;
   
    let completedTask = tasks.find(task => task.id == completedID)
    if (completedTask.completed === false) {
      completedTask.completed = true;
    } else {
      completedTask.completed = false;
    }

    updateLocalStorage();
  
    init();
  }

  // Update local storage task
  function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  // Init app
  function init() {
    taskList.innerHTML = "";
  
    tasks.forEach(addTaskDOM);
   
  }
  
  init();
  
  form.addEventListener("submit", addTask);
  
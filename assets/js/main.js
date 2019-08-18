const formTask = document.getElementById("formTask");
const outputArea = document.getElementById("outputArea");
const projectSelect = document.getElementById("projectSelect")

const testTasks = [
  { group: "Project X", task: "Finish this part", completed: false },
  { group: "Project X", task: "Finish next part", completed: false },
  { group: "Project Y", task: "test response", completed: true }
];

function deleteTasks(key) {
  localStorage.removeItem(key);
};

function getTasks() {
  outputArea.innerHTML = "";
  const taskList = JSON.parse(localStorage.getItem("tasks-projects-to-do"));

  if (taskList === null) {
    outputArea.style.display = "none";
    return console.log("There is no task list");
  } else {
    outputArea.style.display = "grid";
  }

  const taskGroups = taskList.map(task => task.group);
  const taskGroupsDuplesss = taskGroups.filter((item, index) => taskGroups.indexOf(item) === index);
  let orderedTasks = [];

  for (let i = 0; i < taskGroupsDuplesss.length; i++) {
    const sameGroups = taskList.filter(task => task.group === taskGroupsDuplesss[i])
    orderedTasks.push(sameGroups);
  }

  projectSelect.innerHTML = "";

  const startOption = document.createElement("option");
  startOption.value = "default";
  startOption.textContent = "Pick Existing";
  projectSelect.append(startOption);

  taskGroupsDuplesss.forEach((one, i) => {
    const optionPlace = document.createElement("option");
    optionPlace.value = taskGroupsDuplesss[i];
    optionPlace.textContent = taskGroupsDuplesss[i];
    projectSelect.append(optionPlace)
  })
  tasksToPage(orderedTasks, taskList);
}

function setTasks(taskArr) {
  localStorage.setItem("tasks-projects-to-do", JSON.stringify(taskArr));
}

function tasksToPage(orderedTasks, taskList) {
  orderedTasks.forEach(one => {
    // create div and title elements
    const newGroup = document.createElement("div");
    newGroup.classList = "newGroup";
    const newTitle = document.createElement("h2");
    newTitle.classList = "newGroupTitle";
    newTitle.textContent = one[0].group;
    const newGroupDelete = document.createElement("button");
    newGroupDelete.classList = "groupDelBtn";
    newGroupDelete.textContent = "remove";
    newGroupDelete.addEventListener("click", function() {
      const remainingList = taskList.filter(tasks => tasks.group !== one[0].group);
      Promise.all([setTasks(remainingList)])
        .then(result => getTasks())
        .catch(err => console.log(err));
    })
    const topHolder = document.createElement("div");
    topHolder.classList = "topHolder";
    topHolder.append(newTitle, newGroupDelete)
    newGroup.append(topHolder);

    // create task div for each task
    one.forEach(task => {
      const newTask = document.createElement("div");
      newTask.classList = "newTask";
      const taskContent = document.createElement("p");
      taskContent.classList = task.completed ? "textContent completed" : "textContent notComplete";
      taskContent.dataset.completed = task.completed;
      taskContent.textContent = task.task;
      const taskComplete = document.createElement("button");
      taskComplete.innerHTML = task.completed ? '<i class="awe fas fa-undo"></i>' : '<i class="awe fas fa-check"></i>';
      taskComplete.classList = task.completed ? "taskBtn done" : "taskBtn todo";
      taskComplete.addEventListener("click", function() {
        const rightTask = taskList.filter(original => original.task === task.task);
        rightTask[0].completed = !rightTask[0].completed;
        Promise.all([setTasks(taskList)])
          .then(result => {
            getTasks()
          })
          .catch(err => console.log(err))
      })
      const delButton = document.createElement("button");
      delButton.classList = "taskBtn delBtn";
      delButton.innerHTML = '<i class="awe fas fa-window-close"></i>';
      delButton.addEventListener("click", function() {
        const rightTask = taskList.filter(original => original.task === task.task);
        taskList.splice(taskList.indexOf(rightTask[0]), 1);
        Promise.all([setTasks(taskList)])
          .then(result => getTasks())
          .catch(err => console.log(err));
      })

      newTask.append(taskComplete, taskContent, delButton);
      newGroup.append(newTask);
    })
    outputArea.append(newGroup);
  })
}

getTasks();

formTask.addEventListener("submit", function(e) {
  e.preventDefault();
  const taskType = document.getElementById("typeInput");
  const taskContent = document.getElementById("contentInput");
  const taskSelect = projectSelect.value;
  console.log(taskSelect)
  let sendObj;
  if (taskSelect === "default") {
    // taskType & taskContent
    if (taskType.value.trim() === "" || taskContent.value.trim() === "") {
      return alert("Not enough info, tasktype taskcontent")
    } else {
      // make object and return function call
      // or set to local var and then call func after if else
      sendObj = {group: taskType.value.trim(), task: taskContent.value.trim(), completed: false};
    }
  } else {
    // taskSelect & taskContent
    if (taskContent === "") {
      return alert("Not enough info, taskContent, taskSelect")
    } else {
      sendObj = {group: taskSelect, task: taskContent.value.trim(), completed: false}
    }
  }
  updateTaskList(sendObj)
  
})

function updateTaskList(task) {
  const taskList = JSON.parse(localStorage.getItem("tasks-projects-to-do"));
  const taskType = document.getElementById("typeInput");
  const taskContent = document.getElementById("contentInput");
  // task needs to be object, group: groupName, task: task content, completed: false
  taskList.push(task);
  Promise.all([setTasks(taskList)])
    .then(result => {
      taskType.value = "";
      taskContent.value = "";
      getTasks()
    })
    .catch(err => console.log(err));
} 

// setTasks(testTasks)
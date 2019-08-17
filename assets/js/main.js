const formTask = document.getElementById("formTask");
const outputArea = document.getElementById("outputArea");

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

  if (taskList === null || taskList.length === 0) {
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
    newGroup.append(newTitle, newGroupDelete);

    // create task div for each task
    one.forEach(task => {
      const newTask = document.createElement("div");
      newTask.classList = "newTask";
      const taskContent = document.createElement("h5");
      taskContent.classList = task.completed ? "textContent completed" : "textContent notComplete";
      taskContent.dataset.completed = task.completed;
      taskContent.textContent = task.task;
      const taskComplete = document.createElement("button");
      taskComplete.textContent = task.completed ? "Done" : "To Do";
      taskComplete.classList = task.completed ? "completeBtn done" : "completeBtn todo";
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
      delButton.classList = "delBtn";
      delButton.textContent = "X";
      delButton.addEventListener("click", function() {
        const rightTask = taskList.filter(original => original.task === task.task);
        taskList.splice(taskList.indexOf(rightTask[0]), 1);
        Promise.all([setTasks(taskList)])
          .then(result => getTasks())
          .catch(err => console.log(err));
      })

      newTask.append(taskContent, taskComplete, delButton);
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
  if (taskType.value.trim() === "" || taskContent.value.trim() === "") {
    return alert("Not enough info dude")
  }
  const taskList = JSON.parse(localStorage.getItem("tasks-projects-to-do"));
  taskList.push({ group: taskType.value, task: taskContent.value, completed: false });
  Promise.all([setTasks(taskList)])
    .then(result => {
      taskContent.value = "";
      getTasks()
    })
    .catch(err => console.log(err));
})

// setTasks(testTasks)
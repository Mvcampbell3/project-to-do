const formTask = document.getElementById("formTask");
const outputArea = document.getElementById("outputArea");

const testTasks = [
  {group: "Project X", task: "Finish this part", completed: false}, 
  {group: "Project X", task: "Finish next part", completed: false},
  {group: "Project Y", task: "test response", completed: true}
];

function deleteTasks(key) {
  localStorage.removeItem(key);
};

function getTasks() {
  const taskList = JSON.parse(localStorage.getItem("tasks-projects-to-do"));

  if (taskList === null) {
    return console.log("There is no task list");
  }
  
  const taskGroups = taskList.map(task => task.group);
  console.log(taskGroups);
  const taskGroupsDuplesss = taskGroups.filter((item, index) => taskGroups.indexOf(item) === index);
  console.log(taskGroupsDuplesss);

  let orderedTasks = [];

  for (let i = 0; i < taskGroupsDuplesss.length; i++) {
    const sameGroups = taskList.filter(task => task.group === taskGroupsDuplesss[i])
    orderedTasks.push(sameGroups);
  }

  console.log(orderedTasks);
  tasksToPage(orderedTasks, taskList);
}

function setTasks(taskArr) {
  localStorage.setItem("tasks-projects-to-do", JSON.stringify(taskArr));
}

function tasksToPage(orderedTasks, taskList) {
  orderedTasks.forEach(one => {
    console.log(one.length);
    // create div and title elements
    const newGroup = document.createElement("div");
    newGroup.classList = "newGroup";
    const newTitle = document.createElement("h2");
    newTitle.classList = "newGroupTitle";
    newTitle.textContent = one[0].group;
    newGroup.append(newTitle);
    // create task div for each task
    one.forEach(task => {
      const newTask = document.createElement("div");
      newTask.classList = "newTask";
      const taskContent = document.createElement("h5");
      taskContent.textContent = task.completed ? "textContent completed": "textContent notComplete";
      taskContent.dataset.completed = task.completed;
      const taskComplete = document.createElement("button");
      taskComplete.textContent = task.completed ? "Check": "Nope";
      taskComplete.classList = task.completed ? "completeBtn done": "completeBtn todo";
      taskComplete.addEventListener("click", function() {
        console.log("this is going to be a pain in the ass");
        const rightTask = taskList.filter(original => original.task === task.task);
        console.log(rightTask);
        rightTask[0].completed = !rightTask[0].completed;
        console.log(taskList);
        Promise.all([setTasks(taskList)])
          .then(result => {
            outputArea.innerHTML = ""
            getTasks()
          })
          .catch(err => console.log(err))
      })

      newTask.append(taskContent, taskComplete);
      newGroup.append(newTask);
    })
    outputArea.append(newGroup);
  })
}

getTasks();

formTask.addEventListener("submit", function(e) {
  e.preventDefault();
})

// setTasks(testTasks)
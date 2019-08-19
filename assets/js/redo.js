const className = "col-lg-6 col-md-6 col-sm-12 border p-2 mb-2";

const projectPlace = document.getElementById("projectPlace");

function getTaskLoad() {
  const taskList = JSON.parse(localStorage.getItem("tasks-projects-to-do"));
  console.log(taskList);
  taskList.projects.forEach(one => {
    const newCol = document.createElement("div");
    newCol.classList = className;
    const newColTop = document.createElement("div");
    newColTop.classList = "newColTop";
    const projectTitle = document.createElement("h4");
    projectTitle.textContent = one;
    const removeProject = document.createElement("button");
    removeProject.classList = "removeProject btn btn-danger";
    removeProject.textContent = "remove";
    newColTop.append(projectTitle, removeProject);
    newCol.append(newColTop)
    const allTasks = taskList.tasks.filter(task => task.project === one);
    allTasks.forEach(task => {
      newTask = document.createElement("div");
      newTask.classList = "newTask mt-1 mb-1";
      const newCompleteBtn = document.createElement("button");
      newCompleteBtn.innerHTML = task.completed ? '<i class="fas fa-undo-alt"></i>' : '<i class="fas fa-check"></i>';
      newCompleteBtn.classList = task.completed ? "completeBtn done btn btn-warning" : "completeBtn notDone btn btn-success";
      const taskDelBtn = document.createElement("button");
      taskDelBtn.innerHTML = '<i class="fas fa-times-circle"></i>';
      taskDelBtn.classList = "taskDelBtn btn btn-danger";
      const newTaskContent = document.createElement("p");
      newTaskContent.textContent = task.task;
      newTaskContent.classList = task.completed ? "line-through taskContent" : "taskContent";

      newCompleteBtn.addEventListener("click", function() {
        const oldTasks = JSON.parse(localStorage.getItem("tasks-projects-to-do"));
        const rightTask = oldTasks.tasks.filter(oldTask => oldTask.task === task.task);
        rightTask[0].completed = !rightTask[0].completed;
        setThenGrab(oldTasks);
      });

      taskDelBtn.addEventListener("click", function() {
        const oldTasks = JSON.parse(localStorage.getItem("tasks-projects-to-do"));
        const restOfTasks = oldTasks.tasks.filter(oldTask => oldTask.task !== task.task);
        console.log(restOfTasks);
        setThenGrab({ projects: oldTasks.projects, tasks: restOfTasks });
      })

      newTask.append(newCompleteBtn, newTaskContent, taskDelBtn);
      newCol.append(newTask);
    })
    const addTaskForm = document.createElement("div");
    addTaskForm.classList = "input-group";
    const addTaskLabel = document.createElement("label");
    addTaskLabel.textContent = "Add Task";
    const addTaskInput = document.createElement("input");
    addTaskInput.type = "text";
    addTaskInput.dataset.which_project = one;
    const addTaskBtn = document.createElement("button");
    addTaskBtn.classList = "addTaskBtn btn btn-primary";
    addTaskBtn.textContent = "+";
    addTaskBtn.dataset.which_project = one;
    addTaskBtn.addEventListener("click", function() {
      console.log(this.dataset.which_project);
      console.log(this.previousElementSibling.value)
      const inputValue = this.previousElementSibling.value.trim();
      if (inputValue === "") {
        console.log("nothing there");
      } else {
        console.log(inputValue);
        const oldTasks = JSON.parse(localStorage.getItem("tasks-projects-to-do"));
        oldTasks.tasks.push({project: this.dataset.which_project, task: inputValue, completed: false});
        setThenGrab(oldTasks);
      }
    })
    addTaskForm.append(addTaskLabel, addTaskInput, addTaskBtn)
    newCol.append(addTaskForm)
    projectPlace.append(newCol)
  })
}


function setTestList() {
  localStorage.setItem("tasks-projects-to-do", JSON.stringify({
    projects: ["To Do List", "Project X", "Project Y"], tasks: [
      { project: "To Do List", task: "Figure this out", completed: false },
      { project: "Project X", task: "Test 1", completed: false },
      { project: "Project Y", task: "Test 2", completed: false },
      { project: "To Do List", task: "Keep testing things", completed: true }
    ]
  }))
}

function setList(taskList) {
  localStorage.setItem("tasks-projects-to-do", JSON.stringify(taskList));
}

function setThenGrab(taskList) {
  projectPlace.innerHTML = "";
  Promise.all([setList(taskList)])
    .then(result => getTaskLoad())
    .catch(err => console.log(err));
}

getTaskLoad();
// setTestList();
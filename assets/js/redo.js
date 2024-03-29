const className = "col-lg-8 col-md-10 col-sm-12 border p-2 mb-2 bg-white";
const projectPlace = document.getElementById("projectPlace");
const addProject = document.getElementById("addProject");
const addProjectBtn = document.getElementById("addProjectBtn");

function getTaskLoad() {
  const taskList = JSON.parse(localStorage.getItem("tasks-projects-to-do"));
  if (taskList === null) {
    return setThenGrab({ projects: [], tasks: [] })
  }
  console.log(taskList);
  taskList.projects.forEach(one => {
    const newCol = document.createElement("div");
    newCol.classList = className;
    const newColTop = document.createElement("div");
    newColTop.classList = "newColTop mb-3";
    const projectTitle = document.createElement("h4");
    projectTitle.textContent = one;
    const removeProject = document.createElement("button");
    removeProject.classList = "removeProject btn btn-danger";
    removeProject.textContent = "remove";
    removeProject.dataset.which_project = one;
    removeProject.addEventListener("click", function() {
      const oldTaskList = JSON.parse(localStorage.getItem("tasks-projects-to-do"));
      const remaingProjects = oldTaskList.projects.filter(oldTaskPro => oldTaskPro !== one);
      const remaingTasks = oldTaskList.tasks.filter(oldTasksTasks => oldTasksTasks.project !== one);
      console.log(remaingProjects, remaingTasks);
      setThenGrab({ projects: remaingProjects, tasks: remaingTasks });
    })
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

    const addTaskPre = document.createElement("div");
    addTaskPre.classList = "input-group-prepend";
    const addTaskApp = document.createElement("div");
    addTaskApp.classList = "input-group-append";

    const addTaskForm = document.createElement("div");
    addTaskForm.classList = "input-group mt-3";
    const addTaskSpan = document.createElement("span");
    addTaskSpan.textContent = "Add Task";
    addTaskSpan.classList = "input-group-text text-white bg-info";
    const addTaskInput = document.createElement("input");
    addTaskInput.type = "text";
    addTaskInput.classList = "form-control"
    addTaskInput.dataset.which_project = one;
    const addTaskBtn = document.createElement("button");
    addTaskBtn.classList = "addTaskBtn btn btn-primary";
    addTaskBtn.textContent = "+";
    addTaskBtn.dataset.which_project = one;
    addTaskBtn.addEventListener("click", function() {
      console.log(this.dataset.which_project);
      console.log(this.parentElement.previousElementSibling.value)
      const inputValue = this.parentElement.previousElementSibling.value.trim();
      if (inputValue === "") {
        console.log("nothing there");
      } else {
        console.log(inputValue);
        const oldTasks = JSON.parse(localStorage.getItem("tasks-projects-to-do"));
        oldTasks.tasks.push({ project: this.dataset.which_project, task: inputValue, completed: false });
        setThenGrab(oldTasks);
      }
    })
    addTaskPre.append(addTaskSpan);
    addTaskApp.append(addTaskBtn);
    addTaskForm.append(addTaskPre, addTaskInput, addTaskApp)
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

addProjectBtn.addEventListener("click", function() {
  const oldTasks = JSON.parse(localStorage.getItem("tasks-projects-to-do"));
  const newProject = addProject.value.trim();
  console.log(newProject);
  if (newProject !== "") {
    oldTasks.projects.push(newProject);
    setThenGrab(oldTasks);
    addProject.value = "";
  }

})

getTaskLoad();
// setTestList();
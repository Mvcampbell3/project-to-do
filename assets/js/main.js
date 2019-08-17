const taskList = localStorage.getItem("tasks-project-to-do");

if (taskList === null){
  console.log("there is no task list yet")
};

const formTask = document.getElementById("formTask");

formTask.addEventListener("submit", function(e) {
  e.preventDefault();
})
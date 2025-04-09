function openCity(cityName, elmnt, color) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }
  
    document.getElementById(cityName).style.display = "block";
  
    elmnt.style.backgroundColor = color;
}
  
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("defaultOpen").click();
});



  document.getElementById("profile-pic").addEventListener("click", function () {
    document.getElementById("alert").style.display = "block";
  });
  
  function closeAlert() {
    document.getElementById("alert").style.display = "none";
  }
  

//TODO Tab Functions

function addTask() {
  let taskInput = document.getElementById("taskInput");
  let taskText = taskInput.value.trim();
  
  if (taskText === "") return; // Prevent empty tasks

  let taskList = document.getElementById("taskList");
  
  let li = document.createElement("li");

  let taskSpan = document.createElement("span");
  taskSpan.textContent = taskText;
  taskSpan.onclick = function() {
      this.classList.toggle("completed");
  };

  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = function() {
      taskList.removeChild(li);
  };

  li.appendChild(taskSpan);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  taskInput.value = ""; 
}

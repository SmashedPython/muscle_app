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
  
  document.getElementById("defaultOpen").click();



  document.getElementById("profile-pic").addEventListener("click", function () {
    document.getElementById("alert").style.display = "block";
  });
  
  function closeAlert() {
    document.getElementById("alert").style.display = "none";
  }
  
  function printChoices() {
      const cameraType1 = document.querySelector('input[name="cameraType1"]:checked').value;
      const cameraType2 = document.getElementById('cameraType2').value;
      
      alert(`You selected:\nCamera Type #1: ${cameraType1}\nCamera Type #2: ${cameraType2}`);
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

const muscleUsage = {
  chest: 0.8,
  "left-bicep": 0.6,
  "right-bicep": 0.6,
  abs: 0.3
};

function usageToColor(value) {
  const r = Math.round(255 * value);
  const g = Math.round(255 * (1 - value));
  return `rgb(${r}, ${g}, 0)`;
}

for (const muscle in muscleUsage) {
  const el = document.getElementById(muscle);
  if (el) el.setAttribute("fill", usageToColor(muscleUsage[muscle]));
}
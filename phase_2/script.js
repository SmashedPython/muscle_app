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

    if (cityName === "Profile") {
      onProfileLoad();
    }
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
  
  if (taskText === "") return; 

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


//PROFILE CODE:

const completedWorkouts = {
  "2025-04-01": ["Yoga", "Cardio"],
  "2025-04-02": ["Running"],
  "2025-04-03": ["Stretching"]
};

const plannedWorkouts = {
  "2025-04-10": ["Strength Training"],
  "2025-04-11": ["Rest Day"]
};

let profileData = {
  age: "21",
  height: "5'6\"",
  weight: "130 lbs"
};


let currentStartDate = new Date("2025-04-01");

function formatDate(date) {
  return date.toISOString().split("T")[0];
}


function prevWeek() {
  currentStartDate.setDate(currentStartDate.getDate() - 7);
  renderWeek(currentStartDate);
}

function nextWeek() {
  currentStartDate.setDate(currentStartDate.getDate() + 7);
  renderWeek(currentStartDate);
}

document.addEventListener("DOMContentLoaded", () => {
  renderWeek(currentStartDate);
});

function renderWeek(startDate) {
  const calendar = document.getElementById("weekCalendar");
  const weekLabel = document.getElementById("weekLabel");
  calendar.innerHTML = "";

  const weekStart = new Date(startDate);
  const weekEnd = new Date(startDate);
  weekEnd.setDate(weekEnd.getDate() + 6);
  weekLabel.textContent = `${weekStart.toDateString()} - ${weekEnd.toDateString()}`;

  for (let i = 0; i < 7; i++) {
    const day = new Date(startDate);
    day.setDate(day.getDate() + i);
    const dateStr = formatDate(day);

    const box = document.createElement("div");
    box.className = "day-box";
    let emoji = "";
    if (completedWorkouts[dateStr]) {
      emoji = " 💪";  
    }

    box.innerHTML = `
      <div>${day.toLocaleDateString('en-US', { weekday: 'short' })}</div>
      <div>${day.getDate()}${emoji}</div>
    `;


    if (dateStr === formatDate(new Date())) box.classList.add("today");
    if (completedWorkouts[dateStr]) box.classList.add("active");
    else if (plannedWorkouts[dateStr]) box.classList.add("future");

    box.addEventListener("click", () => openModal(dateStr, day));

    calendar.appendChild(box);
  }
}

function onProfileLoad() {
  renderWeek(currentStartDate);

  document.getElementById("ageInput").value = profileData.age;
  document.getElementById("heightInput").value = profileData.height;
  document.getElementById("weightInput").value = profileData.weight;

  document.getElementById("displayAge").textContent = profileData.age;
  document.getElementById("displayHeight").textContent = profileData.height;
  document.getElementById("displayWeight").textContent = profileData.weight;

  document.getElementById("personalInfoDisplay").style.display = "block";
  document.getElementById("personalInfoEdit").style.display = "none";
}


function openModal(dateStr, dateObj) {
  document.getElementById("modalDate").textContent = dateObj.toDateString();
  const contentDiv = document.getElementById("modalContent");

  if (completedWorkouts[dateStr]) {
    contentDiv.innerHTML = `
      <p><strong>Completed Workouts:</strong></p>
      <ul>${completedWorkouts[dateStr].map(act => `<li>${act}</li>`).join("")}</ul>
    `;
  } else if (plannedWorkouts[dateStr]) {
    contentDiv.innerHTML = `
      <p><strong>Planned Workouts:</strong></p>
      <ul>${plannedWorkouts[dateStr].map(act => `<li>${act}</li>`).join("")}</ul>
    `;
  } else {
    contentDiv.innerHTML = `
      <p>No workouts logged or planned.</p>
      <button onclick="addPlannedWorkout('${dateStr}')">➕ Add a Planned Workout</button>
    `;
  }

  document.getElementById("dayModal").style.display = "block";
}

function addPlannedWorkout(date) {
  document.getElementById("notImplementedModal").style.display = "block";
}

function closeNotImplemented() {
  document.getElementById("notImplementedModal").style.display = "none";
}





function closeModal() {
  document.getElementById("dayModal").style.display = "none";
}

function showStreakPage() {
  document.getElementById("profilePictureSection").style.display = "none";
  document.getElementById("personalInfoSection").style.display = "none";
  document.getElementById("fitnessGoalSection").style.display = "none";
  document.getElementById("calendarSection").style.display = "none";

  document.getElementById("streakPage").style.display = "block";

  renderWeek(currentStartDate);
}

function hideStreakPage() {
  document.getElementById("streakPage").style.display = "none";

  document.getElementById("profilePictureSection").style.display = "flex";
  document.getElementById("personalInfoSection").style.display = "block";
  document.getElementById("fitnessGoalSection").style.display = "block";
  document.getElementById("calendarSection").style.display = "block";
}



function savePersonalInfo() {
  const age = document.getElementById("ageInput").value;
  const height = document.getElementById("heightInput").value;
  const weight = document.getElementById("weightInput").value;

  profileData.age = age;
  profileData.height = height;
  profileData.weight = weight;

  document.getElementById("displayAge").textContent = age;
  document.getElementById("displayHeight").textContent = height;
  document.getElementById("displayWeight").textContent = weight;

  toggleEditForm(false);
}



function toggleEditForm(show) {
  document.getElementById("personalInfoDisplay").style.display = show ? "none" : "block";
  document.getElementById("personalInfoEdit").style.display = show ? "block" : "none";

  document.getElementById("profilePictureSection").style.display = show ? "none" : "flex";
  document.getElementById("fitnessGoalSection").style.display = show ? "none" : "block";
  document.getElementById("calendarSection").style.display = show ? "none" : "block";
}



function showGoalEditor() {
  document.getElementById("profilePictureSection").style.display = "none";
  document.getElementById("personalInfoSection").style.display = "none";
  document.getElementById("fitnessGoalSection").style.display = "none";
  document.getElementById("calendarSection").style.display = "none";

  document.getElementById("goalEditPage").style.display = "block";

  const current = document.getElementById("currentGoal").textContent;
  document.querySelectorAll('input[name="goal"]').forEach(r => {
    r.checked = (r.value === current);
  });
}

function saveGoal() {
  const selected = document.querySelector('input[name="goal"]:checked').value;
  document.getElementById("currentGoal").textContent = selected;

  document.getElementById("goalEditPage").style.display = "none";
  document.getElementById("profilePictureSection").style.display = "flex";
  document.getElementById("personalInfoSection").style.display = "block";
  document.getElementById("fitnessGoalSection").style.display = "block";
  document.getElementById("calendarSection").style.display = "block";
}

function cancelGoalEdit() {
  document.getElementById("goalEditPage").style.display = "none";
  document.getElementById("profilePictureSection").style.display = "flex";
  document.getElementById("personalInfoSection").style.display = "block";
  document.getElementById("fitnessGoalSection").style.display = "block";
  document.getElementById("calendarSection").style.display = "block";
}


function saveGoal() {
  const selected = document.querySelector('input[name="goal"]:checked').value;
  document.getElementById("currentGoal").textContent = selected;

  document.getElementById("goalEditPage").style.display = "none";
  document.getElementById("profilePictureSection").style.display = "flex";
  document.getElementById("personalInfoSection").style.display = "block";
  document.getElementById("fitnessGoalSection").style.display = "block";
  document.getElementById("calendarSection").style.display = "block";
}

function cancelGoalEdit() {
  document.getElementById("goalEditPage").style.display = "none";
  document.getElementById("profilePictureSection").style.display = "flex";
  document.getElementById("personalInfoSection").style.display = "block";
  document.getElementById("fitnessGoalSection").style.display = "block";
  document.getElementById("calendarSection").style.display = "block";
}



document.getElementById("profile-pic").addEventListener("click", function () {
  document.getElementById("logoutModal").style.display = "block";
});

function logout() {
  closeLogoutModal();
  document.getElementById("confirmLogoutModal").style.display = "block";
}

function changeProfile() {
  document.getElementById("logoutModal").style.display = "none";

  document.getElementById("notImplementedModal").style.display = "block";
}

function closeNotImplemented() {
  document.getElementById("notImplementedModal").style.display = "none";
}


function closeLogoutModal() {
  document.getElementById("logoutModal").style.display = "none";
}


function closeConfirmLogout() {
  document.getElementById("confirmLogoutModal").style.display = "none";
}

function confirmLogout() {
  document.getElementById("confirmLogoutModal").style.display = "none";
  alert("logged out"); 
}

function deleteAccount() {
  closeLogoutModal();
  document.getElementById("confirmDeleteModal").style.display = "block";
}

function closeConfirmDelete() {
  document.getElementById("confirmDeleteModal").style.display = "none";
}

function confirmDelete() {
  document.getElementById("confirmDeleteModal").style.display = "none";
  alert("deleted account"); 
}

// end of profile code





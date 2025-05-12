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

  // globalWorkoutDate default today
  const today = new Date().toISOString().split("T")[0];
  const dateInput = document.getElementById("globalWorkoutDate");
  if (dateInput) {
    dateInput.value = today;
  }
});


let currentMeal = 'Breakfast';
document.querySelectorAll('.meal-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    currentMeal = tab.dataset.meal;
    document.querySelectorAll('.meal-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

const chosen = new Set();
document.querySelectorAll('.food-item').forEach(item => {
  item.addEventListener('click', () => {
    const key = item.dataset.food;
    if (chosen.has(key)) {                // deselect
      chosen.delete(key);
      item.classList.remove('selected');
    } else {                              // select
      chosen.add(key);
      item.classList.add('selected');
    }
  });
});

document.getElementById('btn-clear').addEventListener('click', () => {
  chosen.clear();
  document.querySelectorAll('.food-item').forEach(i => i.classList.remove('selected'));
});

document.getElementById('btn-enter').addEventListener('click', () => {
  if (!chosen.size) {
    alert('Select at least one food item.');
    return;
  }
  alert(`Logged to ${currentMeal}: ${[...chosen].join(', ')}`);
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
// Muscle interaction: track training severity visually (green to red)
const MAX_SEVERITY = 5;
const muscleTrainingStatus = {
  pecs: 1,
  abs: 1,
  "biceps-left": 1,
  "biceps-right": 1,
  "quads-left": 1,
  "quads-right": 1,
  traps: 1,
  lats: 1,
  "triceps-left": 1,
  "triceps-right": 1,
  glute: 1,
  "hams-left": 1,
  "hams-right": 1
};
let currentLoggingExercise = null;

const muscleUsage = {
  pecs: 0,
  abs: 0,
  "biceps-left": 0,
  "biceps-right": 0,
  "quads-left": 0,
  "quads-right": 0,
  traps: 0,
  lats: 0,
  "triceps-left": 0,
  "triceps-right": 0,
  glute: 0,
  "hams-left": 0,
  "hams-right": 0
};

const exerciseToMuscles = {
  "Bench Press": ["pecs", "triceps-left", "triceps-right"],
  "Pull Up": ["lats", "biceps-left", "biceps-right"],
  "Shoulder Press": ["triceps-left", "triceps-right", "traps"],
  "Bicep Curl": ["biceps-left", "biceps-right"],
  "Push Up": ["pecs", "triceps-left", "triceps-right", "abs"],
  "Deadlift": ["glute", "hams-left", "hams-right", "lats", "traps"],
  "Squat": ["quads-left", "quads-right", "glute"],
  "Lunges": ["quads-left", "quads-right", "glute", "hams-left", "hams-right"],
  "Sit Up": ["abs"],
  "Crunch": ["abs"],
  "Plank": ["abs", "quads-left", "quads-right", "triceps-left", "triceps-right"],
  "Russian Twist": ["abs"],
  "Leg Raise": ["abs"]
};

function logExercise(exerciseName) {
  const muscles = exerciseToMuscles[exerciseName] || [];
  muscles.forEach(muscle => {
    if (muscle in muscleUsage) {
      muscleUsage[muscle]++;
      updateMuscleColor(muscle);
    }
  });
}


function updateMuscleColor(muscleId) {
  const rect = document.querySelector(`#${muscleId} rect`);
  if (!rect) return;

  const usage = muscleUsage[muscleId];
  const level = Math.min(Math.floor(Math.log10(usage + 1)), MAX_SEVERITY);


  rect.setAttribute("fill", severityColors[level]);
}

// Color scale (severity level 0 → 5)
const severityColors = ["#4caf50", "#aee571", "#fff176", "#ffb74d", "#ff7043", "#f44336"];

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".muscle").forEach(el => {
    const id = el.id;
    muscleTrainingStatus[id] = 0;

    const rect = el.querySelector("rect");
    if (rect) {
      rect.setAttribute("fill", severityColors[0]);
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Exercise selection functionality
  document.querySelectorAll('.workouts').forEach(icon => {
    icon.addEventListener('click', function() {
      const section = this.getAttribute('data-section');
      const exercise = this.getAttribute('data-workout');
     
      // First, deselect all workouts in this section
      document.querySelectorAll(`.workouts[data-section="${section}"]`).forEach(i => {
        i.classList.remove('selected');
      });
     
      // Then select this workout
      this.classList.add('selected');
    });
  });
});

document.querySelectorAll('#workoutTabs .meal-tab').forEach(tab => {
  tab.addEventListener('click', function() {
    document.querySelectorAll('#workoutTabs .meal-tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');

    if (this.dataset.tab === "log") {
      document.getElementById("logTabContent").style.display = "block";
      document.getElementById("historyTabContent").style.display = "none";
    } else {
      document.getElementById("logTabContent").style.display = "none";
      document.getElementById("historyTabContent").style.display = "block";
    }
  });
});

document.querySelectorAll('.workouts').forEach(icon => {
  
  icon.addEventListener('click', function() {
    const exercise = this.getAttribute('data-workout');
    currentLoggingExercise = exercise;
    document.getElementById("exerciseNameTitle").textContent = `Log ${exercise}`;
    document.getElementById("inputWeight").value = "";
    document.getElementById("inputSets").value = "";
    document.getElementById("inputReps").value = "";
    document.getElementById("exerciseInputModal").style.display = "block";
  });
});

function submitExerciseData() {
  const weight = parseFloat(document.getElementById("inputWeight").value);
  const sets = parseInt(document.getElementById("inputSets").value);
  const reps = parseInt(document.getElementById("inputReps").value);

  if (isNaN(weight) || isNaN(sets) || isNaN(reps)) {
    alert("Please enter all fields correctly.");
    return;
  }

  const totalLoad = weight * sets * reps;

  const muscles = exerciseToMuscles[currentLoggingExercise] || [];
  muscles.forEach(muscle => {
    if (muscle in muscleUsage) {
      muscleUsage[muscle] += totalLoad;
      updateMuscleColor(muscle);
    }
  });

  const date = document.getElementById("globalWorkoutDate").value;
  addWorkoutToHistory(date, currentLoggingExercise, weight, sets, reps);

  closeExerciseModal();
}
function closeExerciseModal() {
  document.getElementById("exerciseInputModal").style.display = "none";
}

function addWorkoutToHistory(date, workout, weight, sets, reps) {
  if (!workoutLogHistory[date]) workoutLogHistory[date] = [];
  workoutLogHistory[date].push({ workout, weight, sets, reps });

  const tableBody = document.querySelector("#workoutHistoryTable tbody");
  const newRow = document.createElement("tr");

  newRow.innerHTML = `
    <td style="border: 1px solid #000; padding: 8px;">${date}</td>
    <td style="border: 1px solid #000; padding: 8px;">${workout}</td>
    <td style="border: 1px solid #000; padding: 8px;">${weight}</td>
    <td style="border: 1px solid #000; padding: 8px;">${sets}</td>
    <td style="border: 1px solid #000; padding: 8px;">${reps}</td>
  `;

  tableBody.appendChild(newRow);
}
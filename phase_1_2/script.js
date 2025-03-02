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

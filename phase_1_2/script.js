function openCity(cityName, elmnt, color) {
    // Hide all elements with class="tabcontent" by default */
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Remove the background color of all tablinks/buttons
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }
  
    // Show the specific tab content
    document.getElementById(cityName).style.display = "block";
  
    // Add the specific color to the button used to open the tab content
    elmnt.style.backgroundColor = color;
}
  
  // Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

function printChoices() {
    const cameraType1 = document.querySelector('input[name="cameraType1"]:checked').value;
    const cameraType2 = document.getElementById('cameraType2').value;
    
    alert(`You selected:\nCamera Type #1: ${cameraType1}\nCamera Type #2: ${cameraType2}`);
}

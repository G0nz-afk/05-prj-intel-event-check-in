// Get all the DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

//track attendence
let count = 0;
const maxCount = 50;
let attendees = [];

// Load data from local storage when page loads
function loadDataFromStorage() {
  const savedCount = localStorage.getItem("totalCount");
  const savedWaterCount = localStorage.getItem("waterCount");
  const savedZeroCount = localStorage.getItem("zeroCount");
  const savedPowerCount = localStorage.getItem("powerCount");
  const savedAttendees = localStorage.getItem("attendeesList");

  if (savedCount !== null) {
    count = parseInt(savedCount);
    document.getElementById("attendeeCount").textContent = count;
  }

  if (savedWaterCount !== null) {
    document.getElementById("waterCount").textContent = savedWaterCount;
  }

  if (savedZeroCount !== null) {
    document.getElementById("zeroCount").textContent = savedZeroCount;
  }

  if (savedPowerCount !== null) {
    document.getElementById("powerCount").textContent = savedPowerCount;
  }

  if (savedAttendees !== null) {
    attendees = JSON.parse(savedAttendees);
    displayAttendees();
  }

  // Update progress bar based on loaded count
  const percentage = Math.round((count / maxCount) * 100) + "%";
  document.getElementById("progressBar").style.width = percentage;
}

// Save data to local storage
function saveDataToStorage() {
  localStorage.setItem("totalCount", count);
  localStorage.setItem(
    "waterCount",
    document.getElementById("waterCount").textContent,
  );
  localStorage.setItem(
    "zeroCount",
    document.getElementById("zeroCount").textContent,
  );
  localStorage.setItem(
    "powerCount",
    document.getElementById("powerCount").textContent,
  );
  localStorage.setItem("attendeesList", JSON.stringify(attendees));
}

// Load data when page first loads
loadDataFromStorage();

// Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission behavior

  //Get form values
  const name = nameInput.value;
  const team = teamSelect.value;
  // const teamName = teamSelect.selectOptions[0].text;

  // console.log(name, teamName);

  //incremnet count
  count++;
  console.log("total check-ins: " + count);

  //update progress bar
  const percentage = Math.round((count / maxCount) * 100) + "%";
  console.log(`Progress: ${percentage}`);
  document.getElementById("progressBar").style.width = percentage;

  // update attendee count display
  document.getElementById("attendeeCount").textContent = count;

  // update team counter
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  // add attendee to list
  attendees.push({
    name: name,
    team: team,
  });

  // update attendee list display
  displayAttendees();

  // save data to local storage
  saveDataToStorage();

  //show welcome message
  const message = `Welcome, ${name} from ${team}!`;
  console.log(message);
  const greetingElement = document.getElementById("greeting");
  greetingElement.textContent = message;
  greetingElement.className = "success-message";
  greetingElement.style.display = "block";

  form.reset(); // Reset the form after submission
});

// Function to display attendees
function displayAttendees() {
  const listContainer = document.getElementById("attendeeListContainer");

  if (attendees.length === 0) {
    listContainer.innerHTML =
      '<p class="no-attendees">No attendees checked in yet</p>';
    return;
  }

  let html = "";
  let i = 0;
  while (i < attendees.length) {
    const attendee = attendees[i];
    const teamClass = attendee.team;
    const teamEmoji = getTeamEmoji(attendee.team);
    const teamDisplayName = getTeamDisplayName(attendee.team);

    html += `<div class="attendee-item attendee-${teamClass}">
      <span class="attendee-name">${attendee.name}</span>
      <span class="attendee-team">${teamEmoji} ${teamDisplayName}</span>
    </div>`;

    i++;
  }

  listContainer.innerHTML = html;
}

// Function to get team emoji
function getTeamEmoji(team) {
  if (team === "water") {
    return "🌊";
  } else if (team === "zero") {
    return "🌿";
  } else if (team === "power") {
    return "⚡";
  }
  return "";
}

// Function to get team display name
function getTeamDisplayName(team) {
  if (team === "water") {
    return "Team Water Wise";
  } else if (team === "zero") {
    return "Team Net Zero";
  } else if (team === "power") {
    return "Team Renewables";
  }
  return "";
}

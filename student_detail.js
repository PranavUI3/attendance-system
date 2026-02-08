console.log("hellow teachers and students");

function submitComplaint() {
  const complaintText = document.getElementById("complaint").value.trim();

  if (complaintText === "") {
    alert("Is there any Complaint regarding students or class.");
    return;
  }

  if (
    complaintText.toLowerCase() === "nothing" ||
    complaintText.toLowerCase() === "no complaint" ||
    complaintText.toLowerCase() === "no"
  ) {
    alert("Have a nice day.");
  } else {
    alert("We will look into it have a nice day.");
  }
  document.getElementById("complaint").value = "";
}

// clock

function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  document.getElementById("clock").textContent =
    `${hours}:${minutes}:${seconds}`;
}

updateClock();
setInterval(updateClock, 1000);

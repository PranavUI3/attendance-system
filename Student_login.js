console.log("Hello students");

// select
const nameInput = document.getElementById("Name");
const rollnoInput = document.getElementById("Rollno");
const erpidInput = document.getElementById("Erpid");
const submitbtn = document.querySelector("button");

// show error
function showError(input, message) {
  let error = input.parentElement.querySelector(".error");

  if (!error) {
    error = document.createElement("small");
    error.className = "error";
    error.style.color = "red";
    error.style.marginTop = "10px";
    input.parentElement.appendChild(error);
  }
  error.textContent = message;
}

// remove error
function clearError(input) {
  const error = input.parentElement.querySelector(".error");
  if (error) error.remove();
}

// name validation
function validationName(name) {
  const nameRule = /^[A-Z][A-Za-z\s]{1,29}$/;
  return !!name && nameRule.test(name);
}

// rollno validation
function validationRollno(rollno) {
  const prefix = 20251010115;
  return (
    rollno >= 20251010115 &&
    rollno <= 202510101152000 &&
    (Math.floor(rollno / 10) === prefix ||
      Math.floor(rollno / 100) === prefix ||
      Math.floor(rollno / 1000) === prefix ||
      Math.floor(rollno / 10000) === prefix)
  );
}

// erpid validation
function validationErpid(erpid) {
  const minErpid = 10000;
  const maxErpid = 50000;
  return (
    erpid !== null &&
    erpid !== undefined &&
    erpid >= minErpid &&
    erpid <= maxErpid
  );
}

// submit button

submitbtn.addEventListener("click", (e) => {
  e.preventDefault();

  // empty check
  if (
    nameInput.value.trim() === "" ||
    rollnoInput.value.trim() === "" ||
    erpidInput.value.trim() === ""
  ) {
    alert("Please enter your detail first!");
    return;
  }
  let valid = true;

  // name
  if (!validationName(nameInput.value)) {
    showError(nameInput, "Enter your name in right format");
    valid = false;
  } else {
    clearError(nameInput);
  }

  // rollno
  if (!validationRollno(Number(rollnoInput.value))) {
    showError(rollnoInput, "Enter your correct rollno");
    valid = false;
  } else {
    clearError(rollnoInput);
  }

  //erpid
  if (!validationErpid(Number(erpidInput.value))) {
    showError(erpidInput, "Enter your correct erpid");
    valid = false;
  } else {
    clearError(erpidInput);
  }

  if (valid) {
    submitbtn.textContent = "Submitted";
    submitbtn.disabled = true;

    setTimeout(() => {
      alert("Data has been submitted Sucessfully");
      submitbtn.textContent = "Submit";
      submitbtn.disabled = false;
    }, 1200);
  }
});

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

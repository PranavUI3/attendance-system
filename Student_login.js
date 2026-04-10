const BASE_URL = "https://attendance-system-production-1bc7.up.railway.app";

// selecting elements
const nameInput = document.getElementById("Name");
const rollnoInput = document.getElementById("Rollno");
const erpidInput = document.getElementById("Erpid");
const submitbtn = document.getElementById("submitbtn");


// ✅ Error handling
function showError(input, message) {
  let error = input.parentElement.querySelector(".error");
  if (!error) {
    error = document.createElement("small");
    error.className = "error";
    error.style.color = "red";
    input.parentElement.appendChild(error);
  }
  error.textContent = message;
}

function clearError(input) {
  const error = input.parentElement.querySelector(".error");
  if (error) error.remove();
}


// ✅ Validation
function validationName(name) {
  return /^[A-Z][A-Za-z\s]{1,29}$/.test(name);
}

function validationRollno(rollno) {
  return rollno >= 0 && rollno <= 1000;
}

function validationErpid(erpid) {
  return erpid >= 10000 && erpid <= 100000;
}


// ✅ Submit
submitbtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const roll = Number(rollnoInput.value);
  const erp = Number(erpidInput.value);

  if (!name || !rollnoInput.value || !erpidInput.value) {
    alert("Please enter all details!");
    return;
  }

  let valid = true;

  if (!validationName(name)) {
    showError(nameInput, "Name must start with capital");
    valid = false;
  } else clearError(nameInput);

  if (!validationRollno(roll)) {
    showError(rollnoInput, "Invalid roll number");
    valid = false;
  } else clearError(rollnoInput);

  if (!validationErpid(erp)) {
    showError(erpidInput, "ERP must be 10000–100000");
    valid = false;
  } else clearError(erpidInput);

  if (!valid) return;

  submitbtn.textContent = "Submitting...";
  submitbtn.disabled = true;

  try {
    const response = await fetch(`${BASE_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, roll, erp }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      nameInput.value = "";
      rollnoInput.value = "";
      erpidInput.value = "";
    } else {
      alert(data.message || "Submission failed");
    }
  } catch (err) {
    console.error(err);
    alert("Server error");
  } finally {
    submitbtn.textContent = "Submit";
    submitbtn.disabled = false;
  }
});


// ✅ CLOCK
function updateClock() {
  const now = new Date();
  document.getElementById("clock").textContent =
    now.toLocaleTimeString("en-US", { hour12: false });
}

updateClock();
setInterval(updateClock, 1000);

// selecting elements
const nameInput = document.getElementById("Name");
const rollnoInput = document.getElementById("Rollno");
const erpidInput = document.getElementById("Erpid");
const submitbtn = document.getElementById("submitbtn"); // Fixed ID match

// Error handling
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

function clearError(input) {
  const error = input.parentElement.querySelector(".error");
  if (error) error.remove();
}

// Validation functions
function validationName(name) {
  const nameRule = /^[A-Z][A-Za-z\s]{1,29}$/;
  return !!name && nameRule.test(name);
}

function validationRollno(rollno) {
  return rollno >= 0 && rollno <= 1000;
}

function validationErpid(erpid) {
  return erpid >= 10000 && erpid <= 100000;
}

// Single submit handler
submitbtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const roll = Number(rollnoInput.value);
  const erp = Number(erpidInput.value);

  // Empty check
  if (!name || !rollnoInput.value.trim() || !erpidInput.value.trim()) {
    alert("Please enter all details!");
    return;
  }

  let valid = true;

  // Validate all fields
  if (!validationName(name)) {
    showError(
      nameInput,
      "Name: Start with capital, letters only (max 30 chars)",
    );
    valid = false;
  } else {
    clearError(nameInput);
  }

  if (!validationRollno(roll)) {
    showError(rollnoInput, "Invalid roll number format");
    valid = false;
  } else {
    clearError(rollnoInput);
  }

  if (!validationErpid(erp)) {
    showError(erpidInput, "ERP ID must be 10000-50000");
    valid = false;
  } else {
    clearError(erpidInput);
  }

  if (!valid) return;

  // Disable button during submission
  submitbtn.textContent = "Submitting...";
  submitbtn.disabled = true;

  try {
    const response = await fetch("https://attendance-system-production-1bc7.up.railway.app/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        roll: roll.toString(),
        erp: erp.toString(),
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      // Reset form
      nameInput.value = rollnoInput.value = erpidInput.value = "";
    } else {
      alert(data.message || "Submission failed");
    }
  } catch (error) {
    alert("Network error. Is server running on port 3000?");
    console.error(error);
  } finally {
    submitbtn.textContent = "Submit";
    submitbtn.disabled = false;
  }
});

// Clock (unchanged)
function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  document.getElementById("clock").textContent = timeString;
}
updateClock();
setInterval(updateClock, 1000);

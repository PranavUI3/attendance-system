// selecting elements
const nameInput = document.getElementById("Name");
const rollnoInput = document.getElementById("Rollno");
const erpidInput = document.getElementById("Erpid");
const submitbtn = document.getElementById("submitbtn");

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
  return rollno > 0 && rollno <= 1000;
}

function validationErpid(erpid) {
  return erpid >= 10000 && erpid <= 100000; // fixed range
}

// Submit handler
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
    showError(nameInput, "Name: Start with capital, letters only (max 30 chars)");
    valid = false;
  } else {
    clearError(nameInput);
  }

  if (!validationRollno(roll)) {
    showError(rollnoInput, "Roll number must be between 1 - 1000");
    valid = false;
  } else {
    clearError(rollnoInput);
  }

  if (!validationErpid(erp)) {
    showError(erpidInput, "ERP ID must be 10000 - 100000");
    valid = false;
  } else {
    clearError(erpidInput);
  }

  if (!valid) return;

  // Disable button during submission
  submitbtn.textContent = "Submitting...";
  submitbtn.disabled = true;

  try {
    const response = await fetch("http://localhost:3000/mark-attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        roll_no: roll.toString(),
        erp_id: erp.toString(),
      }),
    });

    const data = await response.json();

    // Show response
    if (response.ok) {
      alert("✅ " + data.message);

      // Reset form
      nameInput.value = "";
      rollnoInput.value = "";
      erpidInput.value = "";
    } else {
      alert("❌ " + (data.message || "Submission failed"));
    }

  } catch (error) {
    alert("⚠️ Network error. Is server running?");
    console.error(error);
  } finally {
    submitbtn.textContent = "Submit";
    submitbtn.disabled = false;
  }
});

// Clock
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




document.getElementById("loginBtn").addEventListener("click", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (data.message.includes("successful")) {
    alert("Login Success");

    // ✅ Save login session
    localStorage.setItem("teacher", JSON.stringify(data.teacher));

    // ✅ Redirect
    window.location.href = "dashboard.html";
  } else {
    alert(data.message);
  }
});
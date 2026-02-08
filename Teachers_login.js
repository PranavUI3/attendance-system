console.log("hellow teachers");

//Select Element
const emailInput = document.getElementById("userid");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const signBtn = document.querySelector("button");
const languageSelect = document.getElementById("select");

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

// email valid or not
function validateEmail(email) {
  const emailRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRule.test(email);
}

// password validation
// first letter captial + special symbol + 2-3 numbers
function validatePassword(password) {
  const passwordRule = /^[A-Z][A-Za-z@#$%^&*!]{3,}\d{2,3}$/;
  return passwordRule.test(password);
}

//toggle password visibility
togglePassword.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    togglePassword.textContent = "👁‍🗨";
  } else {
    passwordInput.type = "password";
    togglePassword.textContent = "👁";
  }
});

// language smart default
const userLang = navigator.language || navigator.userLanguage;

if (userLang.startsWith("hi")) {
  languageSelect.innerHTML = `<option value="hi">Hindi</option>
    <option value="en">English</option>`;
} else {
  languageSelect.innerHTML = `<option value="en">English</option>
    <option value="hi">Hindi</option>`;
}

// sign in button

signBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // empty check
  if (emailInput.value.trim() === "" || passwordInput.value.trim() === "") {
    alert("Please enter your details first!");
    return;
  }
  let valid = true;

  // email
  if (!validateEmail(emailInput.value)) {
    showError(emailInput, "Enter valid email address");
    valid = false;
  } else {
    clearError(emailInput);
  }

  //password
  if (!validatePassword(passwordInput.value)) {
    showError(
      passwordInput,
      "Password: Capital first letter + special symbol + 2-3 numbers",
    );
    valid = false;
  } else {
    clearError(passwordInput);
  }

  // succes
  if (valid) {
    signBtn.textContent = "Singningin..";
    signBtn.disabled = true;

    setTimeout(() => {
      alert("Login Successful ✅");
      signBtn.textContent = "Signin";
      signBtn.disabled = false;
    }, 1200);
  }
});

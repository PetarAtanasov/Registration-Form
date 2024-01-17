const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const cpassword = document.getElementById("cpassword");

// error msg function

function errorMsg(input, msg) {
  const form_control = input.parentElement;
  // console.log(form_control);
  form_control.className = "form_control error";
  const small = form_control.querySelector("small");
  // console.log(small);
  small.innerText = msg;
}

//success function
function successMsg(input) {
  const form_control = input.parentElement;
  form_control.className = "form_control success";
}

// email function
function emailCheck(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    successMsg(input);
  } else {
    errorMsg(input, "Email is not valid");
  }
}

// function to validate all fields
function validateAll(inputArr) {
  inputArr.forEach(function (input) {
    // error msg for all input fields
    if (input.value.trim() === "") {
      errorMsg(input, `${upperCaseLetter(input)} is required`);
    } else {
      successMsg(input);
    }
  });
}
function upperCaseLetter(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// check length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    errorMsg(
      input,
      `${upperCaseLetter(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    errorMsg(
      input,
      `${upperCaseLetter(input)} must be less than ${max} 
            characters`
    );
  } else {
    successMsg(input);
  }
}

// password match
function checkPassword(password1, password2) {
  if (password1.value !== password2.value) {
    errorMsg(password2, "Passwords do not match");
  } else {
    // Überprüfung auf Großbuchstaben, Kleinbuchstaben und Zahlen
    const hasUpperCase = /[A-Z]/.test(password1.value);
    const hasLowerCase = /[a-z]/.test(password1.value);
    const hasNumbers = /\d/.test(password1.value);

    if (hasUpperCase && hasLowerCase && hasNumbers) {
      successMsg(password2);
    } else {
      errorMsg(password2, `Confirm Password`);
    }
  }
}

// event listener
form.addEventListener("submit", function (e) {
  e.preventDefault();

  //function to validate all fields
  validateAll([username, email, password, cpassword]);
  checkLength(username, 6, 20);
  checkLength(password, 6, 20);

  //Überprüfung der Passwortkomplexität
  if (password.value.length < 6) {
    errorMsg(password, "Password must be at least 6 characters");
  } else {
    const hasUpperCase = /[A-Z]/.test(password.value);
    const hasLowerCase = /[a-z]/.test(password.value);
    const hasNumbers = /\d/.test(password.value);

    if (hasUpperCase && hasLowerCase && hasNumbers) {
      successMsg(password);
    } else {
      errorMsg(password, "Password must have lowercase, Uppercase and numbers");
    }
  }
  emailCheck(email);
  checkPassword(password, cpassword);

  // Check if all validations passed
  const errorInputs = document.querySelectorAll(".error");
  if (errorInputs.length === 0) {
    let datatable = localStorage.getItem("datatable");
    if (datatable !== null) {
      datatable = JSON.parse(datatable);
    } else {
      datatable = [];
    }

    const usr = {
      username: username.value,
      email: email.value,
      password: password.value,
    };

    datatable.push(usr);
    localStorage.setItem("datatable", JSON.stringify(datatable));

    window.location.href = "pageLogIn.html";
  }
});



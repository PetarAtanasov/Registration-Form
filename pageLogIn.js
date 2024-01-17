document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("data");
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  function errorMsg(input, msg) {
    const form_control = input.parentElement;
    form_control.className = "form_control error";
    const small = form_control.querySelector("small");
    small.innerText = msg;
  }

  function successMsg(input) {
    const form_control = input.parentElement;
    form_control.className = "form_control success";
  }

  function validateEmail() {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email.value.trim())) {
      successMsg(email);
    } else {
      errorMsg(email, "Email is not valid");
    }
  }

  function validatePassword() {
    if (password.value.trim() === "") {
      errorMsg(password, "Password is required");
    } else {
      successMsg(password);
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    validateEmail();
    validatePassword();

    const datatable = JSON.parse(localStorage.getItem("datatable")) || [];
    const user = datatable.find((user) => user.email === email.value);

    if (user && user.password === password.value) {
      window.location.href =
        "secondPage.html?email=" + encodeURIComponent(email.value);
    } else {
      alert("Login failed. Please check your credentials.");
    }
  });
});


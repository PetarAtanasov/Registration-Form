document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const emailParam = urlParams.get("email");
  const usernameDisplay = document.getElementById("usernameDisplay");

  if (emailParam) {
    const names = emailParam.split("@")[0].split("."); // Extract username from email
    const formattedName = names
      .map((name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase())
      .join(" ");
    usernameDisplay.textContent = formattedName;
  } else {
    usernameDisplay.textContent = "Guest";
  }
});

const urlParams = new URLSearchParams(window.location.search);
const validatedUsername = urlParams.get('username');
const usernameDisplay = document.getElementById('usernameDisplay');

if (validatedUsername) {
    const names = validatedUsername.split(' ');
    const formattedName = names.map(name => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()).join(' ');
    usernameDisplay.textContent = formattedName;
} else {
    usernameDisplay.textContent = 'Guest';
}
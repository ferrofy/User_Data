let incorrectAttempts = 0;
const maxAttempts = 5;
const defaultPassword = "team_ferrofy";
const userSpecificPasswords = {
    "vpx": "user_vpx",
    "uci": "user_uci",
    "akx": "user_akx",
};

function getPasswordFromURL() {
    const url = window.location.pathname;
    const userName = url.split("/").pop().toLowerCase();
    return userSpecificPasswords[userName] || `user_${userName}`;
}

function checkPassword() {
    const password = document.getElementById("password-input").value.toLowerCase();
    const correctPassword = getPasswordFromURL() || defaultPassword;

    if (password === correctPassword) {
        document.getElementById('content-placeholder').style.display = 'none';
        document.getElementById('profile-content').classList.remove('hidden');
        document.querySelector('.Content').classList.add('no-blur');
    } else {
        incorrectAttempts++;
        showErrorPopup(maxAttempts - incorrectAttempts);
        if (incorrectAttempts >= maxAttempts) {
            window.location.href = "https://ferrofy.github.io/Home";
        }
    }
}

function showErrorPopup(attemptsLeft) {
    const popup = document.createElement('div');
    popup.innerHTML = `Incorrect Password. ${attemptsLeft} attempts left.`;
    popup.style.backgroundColor = '#00ff00';
    popup.style.color = 'black';
    popup.style.padding = '20px';
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.zIndex = '1000';
    popup.style.border = '2px solid #000';
    popup.style.textShadow = '0 0 5px #00ff00';
    document.body.appendChild(popup);
    setTimeout(() => {
        document.body.removeChild(popup);
    }, 2000);
}

function togglePassword() {
    const passwordInput = document.getElementById("password-input");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}

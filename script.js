// Simulated user data (normally you'd get this from a database)
const users = {
    "john_doe": { password: "1234", balance: 1000, accountStatus: true, failedAttempts: 0, lockUntil: null },
    "jane_smith": { password: "5678", balance: 5000, accountStatus: true, failedAttempts: 0, lockUntil: null },
};

// Lockout settings
const MAX_ATTEMPTS = 3;
const LOCKOUT_TIME = 30 * 1000; // 30 seconds in milliseconds
let lockoutInterval;

// Function to update the credentials box dynamically
function updateCredentialsBox() {
    document.getElementById("credentialsBox").innerHTML = `
        <h3>Test Credentials</h3>
        <p><strong>Username:</strong> john_doe</p>
        <p><strong>Password:</strong> ${users["john_doe"].password}</p>
        <p><strong>Username:</strong> jane_smith</p>
        <p><strong>Password:</strong> ${users["jane_smith"].password}</p>
    `;
}

// Initialize credentials on page load
updateCredentialsBox();

// Function to start lockout countdown
function startLockoutCountdown(username) {
    let user = users[username];
    let timeLeft = Math.ceil((user.lockUntil - Date.now()) / 1000);
    document.getElementById("loginButton").disabled = true;

    lockoutInterval = setInterval(() => {
        if (timeLeft > 0) {
            document.getElementById("lockoutMessage").innerText = `Too many failed attempts. Try again in ${timeLeft} seconds.`;
            timeLeft--;
        } else {
            clearInterval(lockoutInterval);
            user.failedAttempts = 0;
            user.lockUntil = null;
            document.getElementById("lockoutMessage").innerText = "";
            document.getElementById("loginButton").disabled = false;
        }
    }, 1000);
}

// Handle user login
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!users[username]) {
        document.getElementById("loginMessage").innerText = "Invalid username.";
        return;
    }

    const user = users[username];

    if (user.lockUntil && user.lockUntil > Date.now()) {
        return;
    }

    if (user.password === password) {
        user.failedAttempts = 0;
        showAccountInfo(username);
    } else {
        user.failedAttempts++;
        if (user.failedAttempts >= MAX_ATTEMPTS) {
            user.lockUntil = Date.now() + LOCKOUT_TIME;
            startLockoutCountdown(username);
        } else {
            document.getElementById("loginMessage").innerText = `Incorrect password. Attempts left: ${MAX_ATTEMPTS - user.failedAttempts}`;
        }
    }
});

// Forgot Password Feature
document.getElementById("forgotPassword").addEventListener("click", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;

    if (users[username]) {
        const newPassword = prompt("Enter a new password:");
        if (newPassword) {
            users[username].password = newPassword;
            users[username].failedAttempts = 0;
            users[username].lockUntil = null;
            clearInterval(lockoutInterval);
            document.getElementById("lockoutMessage").innerText = "";
            document.getElementById("loginButton").disabled = false;
            alert("Password successfully changed! Use the new password to log in.");
            updateCredentialsBox();
        }
    } else {
        alert("Username not found.");
    }
});

// Show Account Info
function showAccountInfo(username) {
    document.getElementById("login").style.display = "none";
    document.getElementById("accountInfo").style.display = "block";
    document.getElementById("accountStatus").innerText = "Account Status: Active";
    document.getElementById("balance").innerText = `Balance: $${users[username].balance}`;
}


// Deposit & Withdraw Functions
function checkBalance() { alert("Your balance is shown above."); }

function depositMoney() {
    const depositAmount = prompt("Enter deposit amount:");
    const username = document.getElementById("username").value;

    if (depositAmount && !isNaN(depositAmount)) {
        users[username].balance += parseFloat(depositAmount);
        alert(`Deposit successful! New balance: $${users[username].balance}`);
        document.getElementById("balance").innerText = `Balance: $${users[username].balance}`;
    } else {
        alert("Invalid deposit amount.");
    }
}

// Withdraw Money (Test case 5)
function withdrawMoney() {
    const withdrawAmount = prompt("Enter withdrawal amount:");
    const username = document.getElementById("username").value;

    if (withdrawAmount && !isNaN(withdrawAmount)) {
        if (users[username].balance >= withdrawAmount) {
            users[username].balance -= parseFloat(withdrawAmount);
            alert(`Withdrawal successful! New balance: $${users[username].balance}`);
            document.getElementById("balance").innerText = `Balance: $${users[username].balance}`;
        } else {
            alert("Insufficient balance.");
        }
    } else {
        alert("Invalid withdrawal amount.");
    }
}


// Simulated user data (normally you'd get this from a database)
const users = {
    "john_doe": { password: "1234", balance: 1000, accountStatus: true },
    "jane_smith": { password: "5678", balance: 5000, accountStatus: true },
};

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

// Handle user login
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (users[username] && users[username].password === password) {
        showAccountInfo(username);
    } else {
        document.getElementById("loginMessage").innerText = "Invalid username or password.";
        alert('Invalid username or password.');
    }
});

// Forgot Password Feature
document.getElementById("forgotPassword").addEventListener("click", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;

    if (users[username]) {
        const newPassword = prompt("Enter a new password:");

        if (newPassword) {
            users[username].password = newPassword;
            alert("Password successfully changed! Use the new password to log in.");
            updateCredentialsBox(); // Update the credentials display
        } else {
            alert("Password reset canceled.");
        }
    } else {
        alert("Username not found. Please enter a valid username.");
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

// Deposit Money (Test case 4)
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

// Simulated user data (normally you'd get this from a database)
const users = {
    "ekshita": { password: "1234", balance: 1000, accountStatus: true },
    "rishita": { password: "5678", balance: 5000, accountStatus: true },
};

// Handle user login
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();  // Prevent page reload on form submit

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Check if user exists and credentials are correct
    if (users[username] && users[username].password === password) {
        // Show account info
        showAccountInfo(username);
    } else {
        // Invalid login
        document.getElementById("loginMessage").innerText = "Invalid username or password.";
    }
});

// Show account info after successful login
function showAccountInfo(username) {
    document.getElementById("login").style.display = "none";  // Hide login form
    document.getElementById("credentialsBox").style.display = "none" // Hide Test-credentialsBox
    document.getElementById("accountInfo").style.display = "block";  // Show account info section

    const account = users[username];

    // Test case 1: Check if user has an account
    if (account.accountStatus) {
        document.getElementById("accountStatus").innerText = "Account Status: Active";
    } else {
        document.getElementById("accountStatus").innerText = "Account Status: Inactive";
    }

    // Test case 2: Show balance
    document.getElementById("balance").innerText = `Balance: $${account.balance}`;
}

// Check Balance functionality (Test case 3)
function checkBalance() {
    alert("Your balance is shown above.");
}

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

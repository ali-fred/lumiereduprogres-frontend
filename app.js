// frontend/app.js

// ======================
// Lumière Du Progrès API
// ======================

// Backend URL yawe kuri Render
const API_URL = "https://lumiere-du-progres-backend-4.onrender.com";

// Elements muri HTML
const createUserBtn = document.getElementById("create-user-btn");
const newUsernameInput = document.getElementById("new-username");
const usersList = document.getElementById("users-list");
const transactionUsernameInput = document.getElementById("transaction-username");
const transactionAmountInput = document.getElementById("transaction-amount");
const depositBtn = document.getElementById("deposit-btn");
const withdrawBtn = document.getElementById("withdraw-btn");
const messageDiv = document.getElementById("message");

// Helper: Erekana ubutumwa bwa user
function showMessage(msg) {
  messageDiv.textContent = msg;
  setTimeout(() => messageDiv.textContent = "", 3000);
}

// Fetch users uko bari muri backend
async function fetchUsers() {
  try {
    const res = await fetch(`${API_URL}/users`);
    const data = await res.json();
    usersList.innerHTML = "";
    data.forEach(user => {
      const li = document.createElement("li");
      li.textContent = `${user.username} - Balance: ${user.balance}`;
      usersList.appendChild(li);
    });
  } catch (err) {
    console.error(err);
    showMessage("Error fetching users");
  }
}

// ========================
// Create User
// ========================
createUserBtn.addEventListener("click", async () => {
  const username = newUsernameInput.value.trim();
  if (!username) return showMessage("Please enter a username");

  try {
    const res = await fetch(`${API_URL}/create-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username })
    });
    const user = await res.json();
    showMessage(`User created: ${user.username}`);
    newUsernameInput.value = "";
    fetchUsers();
  } catch (err) {
    console.error(err);
    showMessage("Error creating user");
  }
});

// ========================
// Deposit
// ========================
depositBtn.addEventListener("click", async () => {
  const username = transactionUsernameInput.value.trim();
  const amount = parseFloat(transactionAmountInput.value);
  if (!username || isNaN(amount)) return showMessage("Enter valid username and amount");

  try {
    const res = await fetch(`${API_URL}/deposit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, amount })
    });
    const user = await res.json();
    showMessage(`Deposited ${amount} to ${user.username}`);
    transactionUsernameInput.value = "";
    transactionAmountInput.value = "";
    fetchUsers();
  } catch (err) {
    console.error(err);
    showMessage("Error depositing");
  }
});

// ========================
// Withdraw
// ========================
withdrawBtn.addEventListener("click", async () => {
  const username = transactionUsernameInput.value.trim();
  const amount = parseFloat(transactionAmountInput.value);
  if (!username || isNaN(amount)) return showMessage("Enter valid username and amount");

  try {
    const res = await fetch(`${API_URL}/withdraw`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, amount })
    });
    const user = await res.json();
    showMessage(`Withdrew ${amount} from ${user.username}`);
    transactionUsernameInput.value = "";
    transactionAmountInput.value = "";
    fetchUsers();
  } catch (err) {
    console.error(err);
    showMessage("Error withdrawing");
  }
});

// ========================
// Load users initially
// ========================
fetchUsers();

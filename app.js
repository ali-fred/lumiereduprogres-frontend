// API URL ya public backend yawe kuri Render
const API_URL = "https://lumiereduprogres-backend-4.onrender.com";

// Fungura elements za HTML
const createUserForm = document.getElementById("create-user-form");
const usernameInput = document.getElementById("username");
const usersList = document.getElementById("users-list");

const transactionForm = document.getElementById("transaction-form");
const transUsernameInput = document.getElementById("trans-username");
const amountInput = document.getElementById("amount");

// Fungura user
createUserForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = usernameInput.value.trim();
  if (!username) return alert("Enter a username");

  try {
    const res = await fetch(`${API_URL}/create-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });
    const data = await res.json();
    alert(`User created: ${data.username}`);
    usernameInput.value = "";
    loadUsers();
  } catch (err) {
    console.error(err);
    alert("Error creating user");
  }
});

// Fungura transaction
transactionForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = transUsernameInput.value.trim();
  const amount = Number(amountInput.value);
  if (!username || !amount) return alert("Enter username and amount");

  try {
    const res = await fetch(`${API_URL}/transaction`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, amount }),
    });
    const data = await res.json();
    alert(`Transaction done: ${data.username} new balance ${data.balance}`);
    transUsernameInput.value = "";
    amountInput.value = "";
    loadUsers();
  } catch (err) {
    console.error(err);
    alert("Error processing transaction");
  }
});

// Fungura function yo load users
async function loadUsers() {
  try {
    const res = await fetch(`${API_URL}/users`);
    const users = await res.json();
    usersList.innerHTML = "";
    users.forEach(u => {
      const li = document.createElement("li");
      li.textContent = `${u.username} - Balance: ${u.balance}`;
      usersList.appendChild(li);
    });
  } catch (err) {
    console.error(err);
    usersList.innerHTML = "<li>Error fetching users</li>";
  }
}

// Load users mu ntangiriro
loadUsers();

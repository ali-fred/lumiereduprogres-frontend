import express from "express";
import cors from "cors";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { nanoid } from "nanoid";

const app = express();
const port = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json());

// Setup database
const adapter = new JSONFile("db.json");
const db = new Low(adapter);

// Init DB
await db.read();
db.data ||= { users: [] };
await db.write();

// Routes
app.get("/", (req, res) => {
  res.send("🚀 Lumière Du Progrès API irakora neza");
});

// Get users
app.get("/users", async (req, res) => {
  await db.read();
  res.json(db.data.users);
});

// Create user
app.post("/users", async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: "Username required" });

  const newUser = { id: nanoid(), username, balance: 0 };
  db.data.users.push(newUser);
  await db.write();
  res.json(newUser);
});

// Deposit
app.post("/deposit", async (req, res) => {
  const { username, amount } = req.body;
  await db.read();
  const user = db.data.users.find(u => u.username === username);
  if (!user) return res.status(404).json({ error: "User not found" });
  if (isNaN(amount) || amount <= 0) return res.status(400).json({ error: "Invalid amount" });

  user.balance += Number(amount);
  await db.write();
  res.json(user);
});

// Withdraw
app.post("/withdraw", async (req, res) => {
  const { username, amount } = req.body;
  await db.read();
  const user = db.data.users.find(u => u.username === username);
  if (!user) return res.status(404).json({ error: "User not found" });
  if (isNaN(amount) || amount <= 0) return res.status(400).json({ error: "Invalid amount" });
  if (user.balance < amount) return res.status(400).json({ error: "Insufficient balance" });

  user.balance -= Number(amount);
  await db.write();
  res.json(user);
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

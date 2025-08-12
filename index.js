const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid"); // untuk generate id unik
const app = express();

app.use(cors());
app.use(express.json());

let users = [
  {
    id: "40dc",
    username: "yusup",
    email: "yusupbudiman3@gmail.com",
    password: "12345",
  },
  {
    id: "742b",
    username: "andika",
    email: "andika@gmail.com",
    password: "123",
  },
  // ... user awal lainnya
];

// Login: filter user berdasarkan username dan password
app.get("/users", (req, res) => {
  const { username, password } = req.query;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username dan password diperlukan" });
  }
  const foundUsers = users.filter(
    (u) => u.username === username && u.password === password
  );
  res.json(foundUsers);
});

// Register: terima data username dan password, simpan user baru
app.post("/users", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username dan password diperlukan" });
  }

  // Cek username sudah dipakai belum
  const exists = users.some((u) => u.username === username);
  if (exists) {
    return res.status(409).json({ message: "Username sudah digunakan" });
  }

  const newUser = {
    id: uuidv4().slice(0, 4), // contoh id 4 karakter
    username,
    password,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Serveur Mire Store Backend OK ✅");
});

const colisRoutes = require("./routes/colis");
app.use("/api/colis", colisRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas connecté ✅"))
  .catch((err) => console.error("Erreur MongoDB ❌", err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT} 🚀`);
});
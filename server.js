import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/play-round", (req, res) => {
  const { amount, choice } = req.body;

  const result = Math.random() > 0.5 ? "W" : "C";
  const winnings = result === choice;

  res.json({ result, winnings });
});

app.listen(3001, () => {
  console.log("Mock backend running on http://localhost:3001");
});
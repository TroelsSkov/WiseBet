import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/playround", (req, res) => {
  const { amount, choice } = req.body; // 0 eller 1

  const result = Math.random() > 0.5 ? 0 : 1;
  const win = result === choice;
  const winnings = win ? amount * 2 : 0;

  res.json({ result, win, winnings });
});

app.listen(3001, () => {
  console.log("Mock backend running on http://localhost:3001");
});
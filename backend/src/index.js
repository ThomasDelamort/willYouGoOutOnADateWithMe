import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  console.log("Hello World");
  res.status(200).json({ message: "Hello World" });
});

app.listen(port, () => {
  console.log(`Server is running in port ${port}`);
});

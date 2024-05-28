import express from "express";
import router from "./routes/index";

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

// Log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

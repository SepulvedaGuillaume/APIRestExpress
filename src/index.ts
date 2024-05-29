import express from "express";
import router from "./routes/index";
import db from "./sql/configSql";
import fs from "fs";
import path from "path";

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

const queries = fs.readFileSync(
  path.join(__dirname, "./sql/queries.sql"),
  "utf8"
);

db.exec(queries, (err) => {
  if (err) {
    console.error("Error executing the SQL script:", err.message);
  } else {
    console.log("Database initialized successfully.");
  }
});

// Log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

import express from "express";
import router from "./routes/index";
import db from "./sql/configSql";
import fs from "fs";
import path from "path";
import "reflect-metadata";
import dataSource from "./sql/dataSource";

const port = process.env.PORT || 3001;

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

dataSource
  .initialize()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
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

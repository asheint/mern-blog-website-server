const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const upload = require("express-fileupload");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
const port = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// Middleware setup
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(upload()); // Move this above route definitions
app.use("/uploads", express.static(__dirname + "/uploads")); // Fix static path

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// MongoDB connection and server start
mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  })
  .catch((error) => {
    console.log(error);
  });

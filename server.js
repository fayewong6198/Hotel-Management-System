const express = require("express");
const connectDb = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Connect Database

connectDb();

// Initi Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Running"));

// Define Routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/rooms", require("./routes/api/room"));
app.use("/api/users", require("./routes/api/user"));
app.use("/api/staffs", require("./routes/api/staff"));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
);

// Handle unhandled promise rejecttion
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});

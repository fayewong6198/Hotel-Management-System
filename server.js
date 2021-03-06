const express = require("express");
const connectDb = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
const fileupload = require("express-fileupload");
const path = require("path");
const app = express();

// Connect Database
connectDb();

// Initi Middleware
app.use(express.json({ extended: false }));

// File upload
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.send("API Running"));

// Define Routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/rooms", require("./routes/api/room"));
app.use("/api/users", require("./routes/api/user"));
app.use("/api/staffs", require("./routes/api/staff"));
app.use("/api/comments", require("./routes/api/comment"));
app.use("/api/payments", require("./routes/api/payment"));

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

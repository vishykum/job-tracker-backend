const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const pool = require("./db"); // Your MySQL pool
require("dotenv").config();

const app = express();
app.use(cors({
    origin: "http://localhost:5173",  // your Vite frontend dev server
    credentials: true
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const appRoutes = require("./routes/applications");
const refRoutes = require("./routes/references");
const netRoutes = require("./routes/networking");
const skillRoutes = require("./routes/skills");
const dashRoutes = require("./routes/dashboard");

app.use("/api/applications", appRoutes);
app.use("/api/references", refRoutes);
app.use("/api/networking", netRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/dashboard", dashRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

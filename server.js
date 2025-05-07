// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
const appRoutes = require("./routes/applications");
const refRoutes = require("./routes/references");
const netRoutes = require("./routes/networking");
const skillRoutes = require("./routes/skills");
const dashRoutes = require("./routes/dashboard");

// Use routes
app.use("/api/applications", appRoutes);
app.use("/api/references", refRoutes);
app.use("/api/networking", netRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/dashboard", dashRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

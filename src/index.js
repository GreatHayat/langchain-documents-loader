require("dotenv").config();
const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const router = require("./routes");

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// API ENDPOINTS
app.use("/api", router);
app.use(errorHandler);
const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`App is listining on port ${port}`));

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const routesUrls = require("./routes/routes.js");
const cors = require("cors");

dotenv.config();

const mongodburl = process.env.DATABASE_ACCESS;

mongoose
    .connect(mongodburl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log("Database Connected!"));

app.use(express.static("public"));
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());
app.use("/app", routesUrls);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

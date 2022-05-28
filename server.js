//const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const emailRoutes = require("./routes/emailRoutes");

const PORT = 5000;

app.use(express.json());
app.use(cors({ origin: `*` }));
app.options("*", cors());
app.use("/api/email", emailRoutes);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));

//const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const emailRoutes = require("./routes/emailRoutes");

app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));
app.options("*", cors());
app.use("/api/email", emailRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));

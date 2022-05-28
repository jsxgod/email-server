//const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const emailRoutes = require("./routes/emailRoutes");

app.use(express.json());
app.use(cors({ origin: "https://ksdev.netlify.app/", credentials: true }));
app.options("*", cors());
app.use("/api/email", emailRoutes);

app.listen(process.env.PORT, () =>
  console.log(`server running on port ${process.env.PORT}`)
);

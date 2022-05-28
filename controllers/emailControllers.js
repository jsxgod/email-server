require("dotenv").config();
const nodemailer = require("nodemailer");
const nl2br = require("nl2br");

const sendEmail = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
  const data = req.body;
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.user,
        pass: process.env.password,
      },
    });
    let info = await transporter.sendMail({
      from: `${data?.name} ${data?.surname} <${data?.email}>`,
      to: "kacpersmyczyk@gmail.com",
      subject: `${data?.subject} <${data?.email}>`,
      html: `<h1>Name: ${data?.name}</h1><h1>Surname: ${
        data?.surname
      }</h1><h2>Email: ${data?.email}</h2><p>${nl2br(
        data?.message
      )}</p><br/>Embedded image: <img src=${
        data?.attachment
      } width="100" height="150"/>`,
    });
    console.dir(req.body);
    console.log("Message sent: $s", info.messageId);
    res.json({ response: "ok" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log("error: %s", error);
  }
};

module.exports = {
  sendEmail,
};

require("dotenv").config();
const nodemailer = require("nodemailer");
const nl2br = require("nl2br");
const { ImgurClient } = require("imgur");

const sendEmail = async (req, res) => {
  const data = req.body;
  let imageURL = undefined;
  try {
    if (data?.attachment) {
      const base64Data = data.attachment.split(",")[1];
      if (base64Data !== undefined) {
        const client = new ImgurClient({
          clientId: process.env.IMGUR_CLIENT_ID,
          clientSecret: process.env.IMGUR_CLIENT_SECRET,
        });
        const response = await client.upload({
          image: base64Data,
          type: "base64",
        });
        if (response.success) {
          imageURL = response.data.link;
        }
      }
    }
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
      subject: `🥳 ~ Portfolio contact ~ ${data?.subject} <${data?.email}>`,
      html: `<h1>Name: ${data?.name}</h1><h1>Surname: ${
        data?.surname
      }</h1><h2>Email: ${data?.email}</h2><p>${nl2br(
        data?.message
      )}</p><br/><p>Image attachment: ${
        imageURL ? `<a href="${imageURL}">Image Link</a>` : "No image"
      }</p>`,
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

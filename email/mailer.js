const nodemailer = require("nodemailer");
const pug = require("pug");
const juice = require("juice");
const htmlToText = require("html-to-text");

exports.send = async options => {
  const generateHTML = options => {
    const pugpath = __dirname + "/contact-email.pug";
    const html = pug.renderFile(pugpath, options);
    const inlined = juice(html);
    return inlined;
  };

  let transporter = nodemailer.createTransport({
    pool: true,
    host: "smtp.sendgrid.net",
    port: 587,
    secure: false, // use TLS
    auth: {
      user: "apikey",
      pass: process.env.DATABASE
    }
  });

  let html = generateHTML(options);
  let text = htmlToText.fromString(html);

  let info = await transporter.sendMail({
    from: '"Liz Lovero for Spikeforest 🌲" <elizabethlovero@gmail.com>', // sender address
    to: "spikeforest@flatironinstitute.org", // list of receivers
    subject: "Contact form message to SpikeForest ✔", // Subject line
    text: text, // plain text body
    html: html // html body
  });

  return info;
};

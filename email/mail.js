const nodemailer = require("nodemailer");
const pug = require("pug");
const juice = require("juice");
const htmlToText = require("html-to-text");
const promisify = require("es6-promisify");

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const generateHTML = (options = {}) => {
  const html = pug.renderFile(`./contact-email.pug`, options);
  const inlined = juice(html);

  return inlined;
};

export const send = async options => {
  const html = generateHTML(options);
  const text = htmlToText.fromString(html);

  console.log = ("📎", text);

  const mailOptions = {
    from: `Spikeforest <noreply@flatironinstitute.org>`,
    to: `Elizabeth Lovero <elovero@flatironinstitute.org>`,
    subject: `Thank you for contacting SpikeForest`,
    html,
    text
  };
  const sendMail = promisify(transport.sendMail, transport);
  return sendMail(mailOptions);
};

// Documentation from mailtrap.io
// var transport = nodemailer.createTransport({
//   host: "smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "9fe12073f605c2",
//     pass: "f6bd91ba40d3dd"
//   }
// });

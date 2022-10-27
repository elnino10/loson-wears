import nodemailer from 'nodemailer'
import config from '../config.js';

const sendEmail = async (options) => {
    // create  a transporter
    const transporter = nodemailer.createTransport({
      host: config.EMAIL_HOST,
      port: config.EMAIL_PORT,
      auth: {
        user: config.EMAIL_USERNAME, 
        pass: config.EMAIL_PASSWORD,
      },
      // debug: true,
      // logger: true
    });
    // define email options
    const mailOptions = {
      from: 'Joe Egboka <joe@losonwears.com>',
      to: options.email,
      subject: options.subject,
      text: options.message,
      // html:
    };
  
    // send email
    await transporter.sendMail(mailOptions);
  };

  export default sendEmail
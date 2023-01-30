const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Robert Klasen <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      //sendgrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          username: process.env.SENDGRID_USERNAME,
          password: process.env.SENDGRID_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  //Send the actual email
  async send(template, subject) {
    try {
      // 1) Render HTML based on PUG Template
      console.log('send email 1');
      const html = pug.renderFile(
        `${__dirname}/../views/email/${template}.pug`,
        {
          firstName: this.firstName,
          url: this.url,
          subject,
        }
      );
      console.log('send email 2');
      // 2) Define email options
      const mailOptions = {
        from: this.from,
        to: this.to,
        subject,
        html,
        text: htmlToText.htmlToText(html),
      };
      //Create a transport and send email
      console.log('send email 3');
      await this.newTransport().sendMail(mailOptions);
    } catch (err) {
      console.log(err);
    }
  }

  async sendWelcome() {
    try {
      await this.send('Welcome', 'Welcome to Newsify!');
    } catch (err) {
      console.log(err);
    }
  }

  async sendPasswordReset() {
    try {
      await this.send(
        'passwordReset',
        'Your Password Reset Token -- Valid for 10 minutes'
      );
    } catch (err) {
      console.log(err);
    }
  }
};

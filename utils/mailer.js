const nodemailer = require('nodemailer')


// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
function mailer (address, info) {
  nodemailer.createTestAccount((err) => {
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.qq.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: '813306660@qq.com', // generated ethereal user
        pass: 'godsxquqcfexbcec'  // generated ethereal password
      }
    })
  
    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Fred Foo 👻" <813306660@qq.com>', // sender address
      to: address,// list of receivers
      subject: '降价啦', // Subject line
      text: `你关注的货物 ${info.name} , 降价啦！！`, // plain text body
      html: `<a href="${info.url}">${info.url} 赶紧看看！</a>` // html body
    }
  
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    })
  })
}

module.exports = mailer
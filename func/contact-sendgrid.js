/* eslint-disable no-console */

let axios = require('axios')

var options = {
  method: 'POST',
  url: 'https://api.sendgrid.com/v3/mail/send',
  headers: {
    'content-type': 'application/json',
    'authorization': 'Bearer ' + process.env.SENDGRID_API_KEY
  },
  body: {},
  json: true
}

const post = (opt) => {
  return axios(opt)
}

exports.handler = function (event, content, cb) {
  console.log(event)
  let body = JSON.parse(event.body)

  options.data = {
    personalizations: [
      {
        to:
                    [
                      {
                        email: process.env.CONTACT_MAIL_TO, name: process.env.B_NAME || ''
                      }
                    ],
        dynamic_template_data:
                    {
                      subject: body.name + ' is trying to get in touch.',
                      name: body.name,
                      phone: body.phone,
                      email: body.email,
                      message: body.message,
                      website: body.website
                    }
      }
    ],
    from: {
      email: process.env.CONTACT_MAIL_FROM,
      name: 'ICRAFT - Email Service'
    },
    reply_to: {
      email: process.env.CONTACT_MAIL_FROM,
      name: 'ICRAFT - Email Service'
    },
    template_id: process.env.CONTACT_TEMPLATE_ID
  }

  post(options).then(() => {
    options.data = {
      personalizations: [
        {
          to:
                        [
                          {
                            email: body.email, name: process.env.B_NAME || ''
                          }
                        ],
          dynamic_template_data:
                        {
                          subject: 'Your message has been sent!',
                          name: body.name,
                          phone: body.phone,
                          email: body.email,
                          message: body.message,
                          website: body.website
                        }
        }
      ],
      from: {
        email: process.env.CONTACT_MAIL_FROM,
        name: 'ICRAFT'
      },
      reply_to: {
        email: process.env.CONTACT_MAIL_FROM,
        name: 'ICRAFT'
      },
      template_id: process.env.SENT_TEMPLATE_ID
    }
    return post(options).then(() => { cb() }).catch(error => {
      console.log('ERROR - Sender')
      cb(error)
    })
  }).catch(error => {
    console.log('ERROR - Recipient')
    cb(error)
  })
}

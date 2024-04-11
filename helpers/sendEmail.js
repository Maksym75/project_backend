const sgMail = require('@sendgrid/mail')
require('dotenv').config()

const { SENDGRID_API_KEY } = process.env

sgMail.setApiKey(SENDGRID_API_KEY)

// const mail = {
// 	to: 'maksymkolii@gmail.com',
// 	from: 'rukus015@gmail.com',
// 	subject: '6r66rcy6jercy6rvy6jvjrv6r6r',
// 	html: 'After 2-4 weeks',
// }
// sgMail
// 	.send(mail)
// 	.then(() => console.log('Email send success'))
// 	.catch(error => console.error(error.message))

const sendEmail = async data => {
	const email = { ...data, from: 'rukus015@gmail.com' }
	await sgMail.send(email)
	return true
}

module.exports = sendEmail

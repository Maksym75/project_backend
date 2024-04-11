const bcrypt = require('bcryptjs')
const { RequestError, sendEmail } = require('../../helpers')
const { User } = require('../../models/user')
const gravatar = require('gravatar')

//* for checking email in sendgrid
const { nanoid } = require('nanoid')
const { BASE_URL } = process.env

const register = async (req, res) => {
	const { name, email, password } = req.body
	//* 1 check email, what we don't have already this user in our databases
	const user = await User.findOne({ email })
	//* 2 if user exist - throw error
	if (user) {
		throw RequestError(409, 'email in use (already exist!)')
	}
	//* 3 if this anew user - write them to database
	//* Before save - Hashing password
	const hashPassword = await bcrypt.hash(password, 10)
	const avatarURL = gravatar.url(email)
	//* при добавлении в базу записываем код подтверждения, а поле verify будет fals
	const verificationToken = nanoid
	const result = await User.create({
		name,
		email,
		password: hashPassword,
		avatarURL,
		verificationToken,
	})
	//* создаем и отправляем письмо с кодом подтверждеия тому кто регится
	const mail = {
		to: email,
		subject: 'Verify email',
		html: `<a target="_blank" href = "${BASE_URL}/api/auth/verify/${verificationToken}">Click to verify your EMAIL </a>`,
	}
	await sendEmail(mail)
	res.status(201).json({
		name: result.name,
		email: result.email,
	})
}

module.exports = register

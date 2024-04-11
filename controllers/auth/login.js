const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { User } = require('../../models/user')

const { RequestError } = require('../../helpers')

const { SECRET_KEY } = process.env

const login = async (req, res) => {
	const { email, password } = req.body
	const user = await User.findOne({ email })
	//*.  !user.verify чтоб выдавал токен не только если есть логин и пароль Но еще и Подтвержден email
	if (!user || !user.verify) {
		throw RequestError(401, 'Wrong email or password')
	}
	const passwordCompare = await bcrypt.compare(password, user.password)
	if (!passwordCompare) {
		throw RequestError(401, 'Wrong email or password')
	}
	// if passwords the same - we create token $ send
	const payload = {
		id: user._id,
	}
	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' })
	//* записываем токен в бд, чтоб при logout его удалять
	await User.findByIdAndUpdate(user._id, { token })
	res.json({
		token,
	})
}

module.exports = login

//!======
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')

// const { User } = require('../../models/user')

// const { RequestError } = require('../../helpers')

// const { SECRET_KEY } = process.env

// const login = async (req, res) => {
// 	const { email, password } = req.body
// 	const user = await User.findOne({ email })
// 	if (!user) {
// 		throw RequestError(401, 'Email or password wrong')
// 	}
// 	const passwordCompare = await bcrypt.compare(password, user.password)
// 	if (!passwordCompare) {
// 		throw RequestError(401, 'Email or password wrong')
// 	}
// 	const payload = {
// 		id: user._id,
// 	}
// 	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' })
// 	await User.findByIdAndUpdate(user._id, { token })
// 	res.json({
// 		token,
// 	})
// }

// module.exports = login

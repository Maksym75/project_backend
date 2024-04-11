const { RequestError } = require('../helpers')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = process.env
const { User } = require('../models/user')
const authenticate = async (req, res, next) => {
	try {
		//* 1 from headers took header - authorization
		const { authorization } = req.headers
		// console.log('authorization', authorization)
		const [bearer, token] = authorization.split(' ')
		// * check if the first word in authorization - Bearer
		if (bearer !== 'Bearer') {
			throw RequestError(401)
		}
		// * 2. проверяем мы лы выдавали токен
		const { id } = jwt.verify(token, SECRET_KEY)

		//* 3 проверяем что человек есть в базе (токен может еще быть а юзера уже удалили)импортируем Model
		const user = await User.findById(id)

		//* проверка !user.token || user.token !== token нужна для  logout
		if (!user || !user.token || user.token !== token) {
			throw RequestError(401)
		}
		//? если токен валидный мы записываем всю инфу о нем в req.user и передаем ее поцепочке т.о. in add.js in req.body
		//? we will have all information to connect exact book with exact
		req.user = user
		next()
	} catch (error) {
		if (!error.status) {
			error.status = 401
			error.message = 'Unauthorized'
		}
		next(error)
	}
}

module.exports = authenticate

//!!  ------------------------------

const { Book } = require('../../models/book')
const { RequestError } = require('../../helpers')

const add = async (req, res) => {
	// console.log('Я нахожусь в controllers add.js', req.user)
	//? we will have all information to connect exact book with exact user & put to owner
	// * извлекаем id и переименовываем в owner
	const { _id: owner } = req.user

	//* для проверки повторяющихся книг
	const duplicateBook = await Book.findOne({ owner, title: req.body.title })
	if (duplicateBook) {
		throw RequestError(409, `book with title '${req.body.title}' already exist`)
	}
	const result = await Book.create({ ...req.body, owner })
	res.status(201).json(result)
}

module.exports = add

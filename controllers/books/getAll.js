const { Book } = require('../../models/book')

const getAll = async (req, res) => {
	const { _id: owner } = req.user
	//* извлекаем page i limit из req.query
	const { page = 1, limit = 10 } = req.query
	// console.log(req.query)
	const skip = (page - 1) * limit

	//* populate('owner', 'name email') позволяет выбрать куда записать -> 1 ый параметр- owner и 2 oй параметр- что-> name и email
	const result = await Book.find({ owner }, '-createdAt -updatedAt', {
		skip,
		limit,
	}).populate('owner', 'name email')
	res.json(result)
}

module.exports = getAll

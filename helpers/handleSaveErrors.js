// const isConflict = ({ name, code }) => {
// 	name === 'MongoServerError' && code === 11000
// }
const handleSaveErrors = (error, data, next) => {
	const { name, code } = error
	console.log(name)
	console.log(code)
	error.status = name === 'MongoServerError' && code === 11000 ? 409 : 400
	// error.status = isConflict(error) ? 409 : 400

	next()
}

module.exports = handleSaveErrors

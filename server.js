const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const app = require('./app')

const { DB_HOST1, PORT = 3000 } = process.env

mongoose
	.connect(DB_HOST1)
	.then(() => {
		console.log('Connected to database successful')
		app.listen(PORT)
	})
	.catch(error => {
		console.log(error.message)
		process.exit(1)
	})

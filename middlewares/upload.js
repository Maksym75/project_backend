const multer = require('multer')
const path = require('path')
const tempDir = path.join(__dirname, '../', 'temp')

//* Объект с настройками для мидлвары
const multerConfig = multer.diskStorage({
	destination: tempDir,
	filename: (req, file, cb) => {
		cb(null, file.originalname)
	},
})
// *   мидлварa
const upload = multer({
	storage: multerConfig,
})

module.exports = upload

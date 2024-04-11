const fs = require('fs/promises')
const path = require('path')

const { User } = require('../../models/user')

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars')

const updateAvatar = async (req, res) => {
	const { _id } = req.user
	const { path: tempUpload, originalname } = req.file

	// console.log(req.file)
	// * вырезаем расширение файла
	const extension = originalname.split('.').pop()
	//* Создаем новое имя файла из  id и расширения
	const filename = `${_id}.${extension}`

	const resultUpload = path.join(avatarsDir, filename)
	// const resultUpload = path.join(avatarsDir, originalname)

	await fs.rename(tempUpload, resultUpload)
	const avatarURL = path.join('avatars', filename)
	await User.findByIdAndUpdate(_id, { avatarURL })
	res.json({ avatarURL })
}
module.exports = updateAvatar

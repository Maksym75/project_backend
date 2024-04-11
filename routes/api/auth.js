const express = require('express')
const router = express.Router()
const { schemas } = require('../../models/user')
const { validateBody, authenticate, upload } = require('../../middlewares')
const { ctrlWrapper } = require('../../helpers')
const ctrl = require('../../controllers/auth')
// signup register

router.post(
	'/register',
	validateBody(schemas.registerSchema),
	ctrlWrapper(ctrl.register)
)

router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verify))

// * на повторную отправку писма
router.post(
	'/verify',
	validateBody(schemas.verifyEmailSchema),
	ctrlWrapper(ctrl.resendEmail)
)

// signIn Login
router.post(
	'/login',
	validateBody(schemas.loginSchema),
	ctrlWrapper(ctrl.login)
)

router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent))

router.get('/logout', authenticate, ctrlWrapper(ctrl.logout))

router.patch(
	'/avatars',
	authenticate,
	upload.single('avatar'),
	// upload.array('avatar', 3),
	ctrlWrapper(ctrl.updateAvatar)
)

module.exports = router

const express = require('express')

const ctrl = require('../../controllers/books')

const { validateBody, isValidId, authenticate } = require('../../middlewares')

const { schemas } = require('../../models/book')

const { ctrlWrapper } = require('../../helpers')

const router = express.Router()

router.get('/', authenticate, ctrlWrapper(ctrl.getAll))

router.get('/:id', authenticate, isValidId, ctrlWrapper(ctrl.getById))
router.post(
	'/',
	authenticate,
	validateBody(schemas.addSchema),
	ctrlWrapper(ctrl.add)
)
// router.post('/', ctrlWrapper(ctrl.add))

router.put(
	'/:id',
	authenticate,
	isValidId,
	validateBody(schemas.addSchema),
	ctrlWrapper(ctrl.updateById)
)

router.patch(
	'/:id/favorite',
	authenticate,
	isValidId,
	validateBody(schemas.updateFavoriteSchema),
	ctrlWrapper(ctrl.updateFavorite)
)
router.patch(
	'/:id/title',
	authenticate,
	isValidId,
	validateBody(schemas.updateTitleSchema),
	ctrlWrapper(ctrl.updateTitle)
)

router.delete('/:id', authenticate, isValidId, ctrlWrapper(ctrl.removeById))

module.exports = router

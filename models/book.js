const { Schema, model } = require('mongoose')
const Joi = require('joi')

const { handleSaveErrors } = require('../helpers')

const genres = ['fantastic', 'love', 'horror']
const isbnRegexp = /^\d{3}-\d-\d{3}-\d{5}-\d$/

const bookSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		author: {
			type: String,
			required: true,
		},
		favorite: {
			//type: [Boolean, 'favorite must be true or false'],
			type: Boolean,
			default: false,
		},
		genre: {
			type: String,
			enum: genres,
			required: true,
		},
		owner: {
			type: Schema.Types.ObjectId,
			//!! важно единственное число не  users !!
			ref: 'user',
			required: true,
		},

		isbn: {
			type: String,
			match: isbnRegexp,
			unique: true,
			required: true,
		},
	},
	{ versionKey: false, timestamps: true }
)

bookSchema.post('save', handleSaveErrors)

const addSchema = Joi.object({
	title: Joi.string().required(),
	author: Joi.string().required(),
	favorite: Joi.boolean(),
	genre: Joi.string()
		.valid(...genres)
		.required(),
	isbn: Joi.string().pattern(isbnRegexp).required(),
})

// created for method patch by favorite!  for every different field we should create Shema -updateTitleSchema
const updateFavoriteSchema = Joi.object({
	favorite: Joi.boolean().required(),
})

const updateTitleSchema = Joi.object({
	title: Joi.string().required(),
})

const schemas = {
	addSchema,
	updateFavoriteSchema,
	updateTitleSchema,
}

const Book = model('book', bookSchema)

module.exports = {
	Book,
	schemas,
}

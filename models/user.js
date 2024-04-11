const { Schema, model } = require('mongoose')
const Joi = require('joi')
const { handleSaveErrors } = require('../helpers')

const emailRegexp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/

const userSchema = new Schema(
	{
		name: {
			type: String,
			require: true,
		},
		email: {
			type: String,
			match: emailRegexp,
			unique: true,
			require: true,
		},
		password: {
			type: String,
			minlength: 6,
			require: true,
		},
		token: {
			type: String,
			default: '',
		},
		avatarURL: {
			type: String,
			required: true,
		},
		// for sending  email
		verify: { type: String, default: false },
		verificationToken: { type: String, default: '' },
	},
	{ versionKey: false, timestamps: true }
)
userSchema.post('save', handleSaveErrors)

const registerSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().pattern(emailRegexp).required(),
	password: Joi.string().min(6).required(),
})
const loginSchema = Joi.object({
	email: Joi.string().pattern(emailRegexp).required(),
	password: Joi.string().min(6).required(),
})
const verifyEmailSchema = Joi.object({
	email: Joi.string().pattern(emailRegexp).required(),
})

const schemas = { registerSchema, loginSchema, verifyEmailSchema }
const User = model('user', userSchema)

module.exports = {
	User,
	schemas,
}

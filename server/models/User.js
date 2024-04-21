/**
 * @file User.js
 * Define the schema for the mongoose model User
 */

const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Must match an email address!'],
	},
	password: {
		type: String,
		required: true,
		minlength: 5,
	},
	sessions: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Session'
		}
	],
});

/* Hash the user-entered password before creating the User */
userSchema.pre('save', async function (next) {
	if (this.isNew || this.isModified('password')) {
		const saltRounds = 10;
		this.password = await bcrypt.hash(this.password, saltRounds);
	}

	next();
});

/* Helper function to validate the entered password for login */
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;

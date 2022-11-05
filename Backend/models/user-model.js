const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	email: {
		type: String,
		require: true
	},
	image: {
		type: String,
		default:
			'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg'
	},
	password: {
		type: String,
		require: true
	},
	firstName: {
		type: String,
		require: true
	},
	lastName: {
		type: String,
		require: true
	},
	address: {
		type: String
	},
	age: {
		type: Number
	},
	mobile: {
		type: String
	},
	gender: {
		type: String,
		default: 'Male'
	},
	role: {
		type: String,
		default: 'user'
	}
	
});

module.exports = mongoose.model('User', UserSchema);

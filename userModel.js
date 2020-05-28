const mlab = require('mongoose');
require('dotenv').config();

const accountShema = new mlab.Schema({
	email: {type: String, required: true, lowercase: true,uinque:true},
	password: {type: String, required: true}
})

const Account = mlab.model('userAccount',accountShema);


module.exports = Account;
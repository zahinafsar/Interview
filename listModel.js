const mongoose = require('mongoose');

const University = mongoose.model(
    'newuniverisity',
    new mongoose.Schema({
       name: { type: String, required: true, trim: true },
    })
);

module.exports = University;

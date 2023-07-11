const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    username: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    },
    country: {
        type: String,
        unique: true,
        required: true
    },
},
    { timestamps: true }
)
module.exports = mongoose.model("User", UserSchema);
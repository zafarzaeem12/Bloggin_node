const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    images: {
        type: Array ,
        // required : true
    },
    videos: {
        type: Array ,
        //required : true
    },
    description: {
        type: String,
        unique: true,
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    Post_creater: {
        type: Boolean,
       default: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
},
    { timestamps: true }
)
module.exports = mongoose.model("Blog", BlogSchema);
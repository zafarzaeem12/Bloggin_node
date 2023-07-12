const mongoose = require('mongoose');

const CommentsSchema = new mongoose.Schema({
   
    comments: {
        type: String,
        required: true
    },
    isLiked: {
        type: Boolean,
       default: false
    },
    blog_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Blog'
    },
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
},
    { timestamps: true }
)
module.exports = mongoose.model("Comment", CommentsSchema);
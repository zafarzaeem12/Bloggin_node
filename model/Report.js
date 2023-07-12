const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    description: {
        type: String,
        unique: true,
        required: true
    },
    isReported : {
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
module.exports = mongoose.model("Report", ReportSchema);
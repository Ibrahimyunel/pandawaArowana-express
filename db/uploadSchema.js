var mongoose = require('mongoose');

const UploadSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    currentDate: {
        type: String,
        required: true,
    },
    currentTime: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model.uploads || mongoose.model('uploads', UploadSchema);
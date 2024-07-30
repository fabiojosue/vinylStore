const mongoose = require('mongoose');

const vinylSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const Vinyl = mongoose.model('Vinyl', vinylSchema);

module.exports = Vinyl;
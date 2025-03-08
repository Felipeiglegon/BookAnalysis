import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    publicationDate: {
        type: Date,
        required: false
    },
    interest: {
        type: String,
        required: false,
        enum: ['Not defined', 'Interested', 'Not interested'],
        default: 'Not defined'
    }
}, {
    timestamps: true
});

bookSchema.index({ isbn: 1 }, { unique: true });

const Book = mongoose.model('Book', bookSchema);
export default Book;
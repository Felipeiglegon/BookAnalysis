import mongoose, { Schema } from "mongoose";

const bookShopSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: false
    },
    contact: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

bookShopSchema.index({ name: 1 }, { unique: true });

const BookShop = mongoose.model('BookShop', bookShopSchema);
export default BookShop;
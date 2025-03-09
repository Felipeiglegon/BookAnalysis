import mongoose, { Schema } from "mongoose";

const searchPageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

const SearchPage = mongoose.model('SearchPage', searchPagesSchema);
export default SearchPage;
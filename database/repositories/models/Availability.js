import mongoose, { Schema } from "mongoose";

const availabilitySchema = new Schema({
    _bookID: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    _searchPageId: {
        type: Schema.Types.ObjectId,
        ref: 'SearchPage',
        required: true
    },
    availability: [{
        _bookShopId: {
            type: Schema.Types.ObjectId,
            ref: 'BookShop',
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        availability: {
            type: Number,
            required: true
        }
    }],
}, {
    timestamps: true,
    virtuals: {
        totalAvailability: {
            get: function () {
                return this.availability.reduce((acc, curr) => acc + curr.availability, 0);
            }
        }
    }
});

const Availability = mongoose.model('Availability', availabilitySchema);
export default Availability;
import BaseRepository from "./BaseRepository.js";
import Availability from "./models/Availability.js"

class AvailabilityRepository extends BaseRepository {
    async findById(id) {
        try {
            return await Availability.findById(id).populate('_bookID').populate('_searchPageId').populate('availability._bookShopId');
        } catch (err) {
            return null;
        }
    }

    async findAll() {
        return Availability.find();
    }

    async create(availabilityData) {
        return (new Availability(availabilityData)).save();
    }

    async update(id, availabilityData) {
        delete bookData.isbn;        
        return await Availability.findByIdAndUpdate(id, availabilityData, { new: true });
    }

    async destroy(id) {
        return (await Availability.findByIdAndDelete(id)) !== null;
    }
}

export default AvailabilityRepository;
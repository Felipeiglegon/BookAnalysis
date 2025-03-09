import BaseRepository from "./BaseRepository.js";
import BookShop from "./models/BookShop.js"

class BookShopRepository extends BaseRepository {
    async findById(id) {
        try {
            return await BookShop.findById(id);
        } catch (err) {
            return null;
        }
    }

    async findAll() {
        return BookShop.find();
    }

    async create(bookShopData) {
        return (new BookShop(bookShopData)).save();
    }

    async update(id, bookShopData) {
        delete bookShopData.isbn;        
        return await BookShop.findByIdAndUpdate(id, bookShopData, { new: true });
    }

    async destroy(id) {
        return (await BookShop.findByIdAndDelete(id)) !== null;
    }

    async findByName(name) {
        try {
            return await BookShop.findOne({ name: { $regex: new RegExp(name, "i") } });
        } catch (err) {
            return null;
        }
    }
}

export default BookShopRepository;
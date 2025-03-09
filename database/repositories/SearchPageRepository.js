import BaseRepository from "./BaseRepository.js";
import SearchPage from "./models/SearchPage.js"

class SearchPageRepository extends BaseRepository {
    async findById(id) {
        try {
            return await SearchPage.findById(id);
        } catch (err) {
            return null;
        }
    }

    async findAll() {
        return SearchPage.find();
    }

    async findByName(name) {
        try {
            return await SearchPage.findOne({ name: { $regex: new RegExp(name, "i") } });
        } catch (err) {
            return null;
        }
    }
}

export default SearchPageRepository;
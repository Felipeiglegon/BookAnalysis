import SearchPageRepository from "../repositories/BookShopRepository.js";

class SearchPageService {
    constructor () {
        this.searchPageRepository = new SearchPageRepository();
    }

    async index() {
        return await this.searchPageRepository.findAll();
    }

    async show(id) {
        return await this.searchPageRepository.findById(id);
    }

    async indexName(name) {
        return await this.searchPageRepository.findByName(name);
    }
}

export default SearchPageService;
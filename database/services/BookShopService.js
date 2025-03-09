import BookShopRepository from "../repositories/BookShopRepository.js";

class BookShopService {
    constructor () {
        this.bookShopRepository = new BookShopRepository();
    }

    async index() {
        return await this.bookShopRepository.findAll();
    }

    async show(id) {
        return await this.bookShopRepository.findById(id);
    }

    async indexName(name) {
        return await this.bookShopRepository.findByName(name);
    }

    async create(data) {
        return this.bookShopRepository.create(data);
    }

    async update(id, data) {
        const book = await this.bookShopRepository.update(id, data);
        if (!book) throw new Error('Book not found');
        return book;
    }

    async destroy(id) {
        const result = await this.bookShopRepository.destroy(id);
        if (!result) throw new Error('Book not found');
        return true;
    }
}

export default BookShopService;
import BookRepository from "../repositories/BookRepository.js";

class BookService {
    constructor () {
        this.bookRepository = new BookRepository();
    }

    async index() {
        return await this.bookRepository.findAll();
    }

    async show(id) {
        return await this.bookRepository.findById(id);
    }

    async indexISBN(isbn) {
        return await this.bookRepository.findByISBN(isbn);
    }

    async create(data) {
        return this.bookRepository.create(data);
    }

    async update(id, data) {
        const book = await this.bookRepository.update(id, data);
        if (!book) throw new Error('Book not found');
        return book;
    }

    async destroy(id) {
        const result = await this.bookRepository.destroy(id);
        if (!result) throw new Error('Book not found');
        return true;
    }
}

export default BookService;
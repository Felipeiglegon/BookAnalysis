import BaseRepository from "./BaseRepository.js";
import Book from "./models/Book.js"

class BookRepository extends BaseRepository {
    async findById(id) {
        try {
            return await Book.findById(id);
        } catch (err) {
            return null;
        }
    }

    async findAll() {
        return Book.find();
    }

    async create(bookData) {
        return (new Book(bookData)).save();
    }

    async update(id, bookData) {
        delete bookData.isbn;        
        return await Book.findByIdAndUpdate(id, bookData, { new: true });
    }

    async destroy(id) {
        return (await Book.findByIdAndDelete(id)) !== null;
    }

    async findByISBN(isbn) {
        try {
            return await Book.findOne({ isbn });
        } catch (err) {
            return null;
        }
    }
}

export default BookRepository;
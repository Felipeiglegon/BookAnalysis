import AvailabilityRepository from "../repositories/AvailabilityRepository.js";

class AvailabilityService {
    constructor () {
        this.availabilityRepository = new AvailabilityRepository();
    }

    async index() {
        return await this.availabilityRepository.findAll();
    }

    async show(id) {
        return await this.availabilityRepository.findById(id);
    }

    async create(data) {
        return this.availabilityRepository.create(data);
    }

    async update(id, data) {
        const book = await this.availabilityRepository.update(id, data);
        if (!book) throw new Error('Book not found');
        return book;
    }

    async destroy(id) {
        const result = await this.availabilityRepository.destroy(id);
        if (!result) throw new Error('Book not found');
        return true;
    }
}

export default AvailabilityService;
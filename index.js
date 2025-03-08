import dotenv from "dotenv"
import { initMongoose, disconnectMongoose } from './database/config.js'
import BookService from './database/services/BookService.js'

const initializeDatabase = async () => {
    let connection
    try {
        connection = await initMongoose()
        console.log('INFO - MongoDB/Mongoose technology connected.')
    } catch (error) {
        console.error(error)
    }
    return connection
}

const disconnectDatabase = async (connection) => {
    try {
        await disconnectMongoose(connection)
        console.log('INFO - MongoDB/Mongoose disconnected.')
    } catch (error) {
        console.error(error)
    }
}
import { chromium } from 'playwright';
import fs from 'fs';

// Function to initialize the browser, page and context
// params: title, author, isbn, editorial

const initBrowser = async (url) => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(url);

    return {
        browser,
        page
    }
}

const baseTtlUrl = 'https://www.todostuslibros.com';
const initTtlBrowser = async ({ title, author, isbn, editorial }) => {
    if (!title && !author && !isbn && !editorial) {
        throw new Error('At least one field must be filled');
    }

    let parameters = '';

    if (title && typeof title !== 'string') {
        throw new Error('Title must be a string');
    } else if (title) {
        title = title.trim().replace(/\s+/g, '+');
        if (!title) throw new Error('Title is empty');
        parameters += `titulo=${title}&`;
    }

    if (author && typeof author !== 'string') {
        throw new Error('Author must be a string');
    } else if (author) {
        author = author.trim().replace(/\s+/g, '+');
        if (!author) throw new Error('Author is empty');
        parameters += `autor=${author}&`;
    }

    if (isbn && typeof isbn !== 'string') {
        throw new Error('ISBN must be a string');
    } else if (isbn) {
        isbn = isbn.trim().replace(/\D/g, '');
        if (!isbn) throw new Error('ISBN is empty');
        if (isbn.length !== 10 && isbn.length !== 13) throw new Error('ISBN must be 10 or 13 digits');
        parameters += `isbn=${isbn}&`;
    }

    if (editorial && typeof editorial !== 'string') {
        throw new Error('Editorial must be a string');
    } else if (editorial) {
        editorial = editorial.trim().replace(/\s+/g, '+');
        if (!editorial) throw new Error('Editorial is empty');
        parameters += `editorial=${editorial}&`;
    }

    var url = baseTtlUrl + "/busquedas?" + parameters.slice(0, -1);
    return await initBrowser(url);
}

const scrapeTtl = async () => {
    const { browser, page } = await initTtlBrowser({ title: 'limitada' });

    var nextPage = baseTtlUrl + await page.locator('ul.pagination > li:nth-last-child(2) > a').getAttribute('href');     // Obten el enlace a la ultima pagina    
    var lastPage = nextPage.split('=').pop();   // Obten el numero de paginas
    nextPage = nextPage.slice(0, -lastPage.length); // Obten el enlace sin el numero de paginas

    for (let i = 1; i <= lastPage; i++) {
        await page.goto(nextPage + i);
        (await page.locator('ul.books > li.book[data-gtm-index]').all()).forEach(getBook);
        // await Promise.all((await page.locator('ul.books > li.book[data-gtm-index]').all()).map(getBook));
        lastPage = (await page.locator('ul.pagination > li:nth-last-child(2) > a').getAttribute('href')).split('=').pop(); // Actualiza el ultimo elemento de la paginacion
    }



    await browser.close();
}

const getBook = async (book) => {
    var title = await book.getAttribute('data-gtm-titulo');

    var normalizedTitle = title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    if (!new RegExp('(edicion|edition|ed\\.)').test(normalizedTitle)) return;

    var isbn = await book.getAttribute('data-gtm-isbn');
    var availability = await book.getAttribute('data-gtm-disponibilidad');
    var url = await book.locator('div.book-details > h2 > a').getAttribute('href');
    var price = "";
    try {
        price = (await book.locator('div.book-action div.book-price > strong').innerText()).replace('€', '').trim();
    } catch (error) {}
    
    console.log({ title, isbn, availability, url, price });
}

// const main = async () => {
//     // Launch a new browser instance
//     const { browser, page } = await initTtlBrowser({ title: 'El principito' });

//     var books = await page.locator('ul.books > li.book[data-gtm-index]').all();
//     books.forEach(async (book) => {
//         const title = await book.getAttribute('data-gtm-titulo');
//         const isbn = await book.getAttribute('data-gtm-isbn');
//         const availability = await book.getAttribute('data-gtm-disponibilidad');
//         const url = await book.locator('div.book-details > h2 > a').getAttribute('href');
//         const price = (await book.locator('div.book-action div.book-price > strong').innerText()).replace('€', '').trim();
//     });
    
//     // obten el penultimo elemento de la paginacion
//     var lastPage = await page.locator('ul.pagination > li:nth-last-child(2) > a').getAttribute('href');
//     console.log(lastPage);
//     await page.goto(baseTtlUrl + lastPage);

//     // wait 5 seconds

//     // Close the browser
//     await browser.close();
// };

scrapeTtl();
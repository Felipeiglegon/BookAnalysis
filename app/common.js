import { chromium } from 'playwright';
import mongoose from 'mongoose';

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

export { initBrowser }
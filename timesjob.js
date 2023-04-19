const puppeteer = require('puppeteer');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;



async function start() {


    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
        userDataDir: "./tmp"
});
    const page = await browser.newPage();
    await page.goto('https://www.timesjobs.com/candidate/job-search.html?searchType=personalizedSearch&from=submit&txtKeywords=testing&txtLocation=');
    //await page.screenshot({ path: 'careerbuilder.png' });
    const dataHandles = await page.$$('.new-joblist');
    const data = [];
    for (const datahandle of dataHandles) {
       try {
    const title = await page.evaluate(el => el.innerText, datahandle);
    data.push({ title });
}   catch (error) { }
}



    const csvWriter = createCsvWriter({
    path: 'careerbuilder.csv',
header: [
{ id: 'title', title: 'Title' },
    ]
});



await csvWriter.writeRecords(data);
console.log('CSV file written successfully');
await browser.close();
}
start();
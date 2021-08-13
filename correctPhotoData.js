const csv = require('csv-parser');
const fs = require('fs');
//  const fastcsv = require('fast-csv');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

let data = [];
const csvWriter = createCsvWriter({
  path: '/Users/portiajones/Downloads/newphotos6.csv',
  header: [
    { id: 'id', title: 'id' },
    { id: 'styleid', title: 'styleid' },
    { id: 'url', title: 'url' },
    { id: 'thumbnail_url', title: 'thumbnail_url' },
  ]
});
console.log('starting to read data');
fs.createReadStream('/Users/portiajones/Downloads/photos-6.csv')
  .pipe(csv())
  .on('data', (row) => {
    //  console.log(row);
    if (row.thumbnail_url.indexOf('\n') === -1) {
      data.push(row);
    }
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
    csvWriter
      .writeRecords(data)
      .then(() => console.log('done'));
  });

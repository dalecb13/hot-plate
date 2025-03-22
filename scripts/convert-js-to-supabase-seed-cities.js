#!/usr/bin/node

const fs = require('fs');

const INITIAL_COLUMNS = [
  'cityName',
  'lat',
  'lng',
  'countryId'
];

const FINAL_COLUMNS = [
  'cityName',
  'cityCoords',
  'countryId'
];

async function parse() {
  var result = [];
  const data = await fs.readFileSync('./data/cities.csv', 'utf8');
  var lines = data.split("\n");

  for (var i = 1; i < lines.length ; i++) {
    const parts = lines[i].split(',');

    const cityName = parts[0];
    const lat = parts[1];
    const long = parts[2];
    const countryId = parts[3];

    const resultLine = `('${cityName.replace("'", "''")}', gis.st_point(${long}, ${lat}), ${countryId})`;
    result.push(resultLine);
  } // end for loop

  const writeableData = result.join(',\n');

  await fs.writeFileSync('./data/cities-sql-snippet.txt', writeableData);
  console.log('Write to cities-sql-snippet.txt');
}

parse();

#!/usr/bin/node

const fs = require('fs');

const NUMBERED_COLUMNS = [
  'lat',
  'lng',
  'population',
  'id',
];

async function read() {
  var result = [];

  const data = await fs.readFileSync('./data/worldcities.csv', 'utf8');
  var lines = data.split("\n");

  const headers = [
    'city',
    'city_ascii',
    'lat',
    'lng',
    'country',
    'iso2',
    'iso3',
    'capital',
    'admin_name',
    'population',
    'id',
  ];

  // for each line
  for (var i = 0; i < lines.length ; i++) {
    var obj = {};
    let currentline = lines[i];
    const cleanedline = currentline.substring(1, lines[i].length - 2)
    const parts = cleanedline
      .split('","');

    for (var j = 0; j < headers.length; j++) {
      let parsed = parts[j];
      obj[headers[j]] = NUMBERED_COLUMNS.includes(headers[j]) ? Number(parsed) : parsed;
    }
    result.push(obj);

  }

  return result;
}

async function extractCountries(csv) {
  const data = await read();
  const uniqueCountriesMap = new Map();

  data.forEach(item => {
    let countryName = item.country;

    if (item.country.includes(',')) {
      const parts = item.country.split(', ')
      countryName = `${parts[1]} ${parts[0]}`;
    }

    const countryDetails = {
      iso2: item.iso2,
      iso3: item.iso3,
      capital: item.capital,
      id: item.id,
    }

    if (!uniqueCountriesMap.has(countryName)) {
      uniqueCountriesMap.set(countryName, countryDetails);
    }
  });

  console.log(`Found ${uniqueCountriesMap.size} countries`);

  let csvData = '';
  csvData += 'countryName,countryIso2,countryIso3,capitalName,ueId';
  
  uniqueCountriesMap.forEach((value, key) => {
    // console.log(value, key)
    const dataString = `\n${key},${value['iso2']},${value['iso3']},${value['capital']},${value['id']}`;
    csvData += dataString;
  });

  await fs.writeFileSync('./data/countries.csv', csvData);

  console.log('wrote countries to ./data/countries.csv');
}

extractCountries('~/Downloads/simplemaps_worldcities_basicv1.77/worldcities.csv')

const extractCities = async () => {
  const data = await read();
}
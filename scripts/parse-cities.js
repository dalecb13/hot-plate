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

const getCountries = async () => {
  const data = await fs.readFileSync('./data/countries_rows.csv', 'utf8');
  var lines = data.split("\n");
  const countriesHeaders = [
    'id',
    'created_at',
    'countryName',
    'capitalName',
    'countryIso2',
    'countryIso3',
    'ueId'
  ];

  const countryNameIdMap = new Map();

  for (var i = 1; i < lines.length ; i++) {
    var obj = {};
    let currentline = lines[i];
    const parts = currentline.split(',');

    for (var j = 0; j < countriesHeaders.length; j++) {
      let parsed = parts[j];
      obj[countriesHeaders[j]] = NUMBERED_COLUMNS.includes(countriesHeaders[j]) ? Number(parsed) : parsed;
    }
    countryNameIdMap.set(parts[2], parts[0])
  }

  return countryNameIdMap;
}

/*
  Given all of the data and countries data + IDs,
  create a CSV for inserting into Supabase with the following columns
  cityName,lat,lng,countryId
*/
const parseCities = async () => {
  // get countries
  const countryIdMap = await getCountries();

  const data = await read();
  const citiesStringArray = data.map(datum => {
    let countryName = datum.country;

    if (countryName.includes(',')) {
      const parts = countryName.split(', ')
      countryName = `${parts[1]} ${parts[0]}`;
    }

    const countryId = countryIdMap.get(countryName);
    return `${datum.city},${datum.lat},${datum.lng},${countryId}`;
  });
  
  let writeableData = `cityName,lat,lng,countryId`;
  citiesStringArray.forEach(line => {
    writeableData += `\n${line}`;
  });

  await fs.writeFileSync('./data/cities.csv', writeableData);
  
    console.log('wrote countries to ./data/cities.csv');
}

parseCities();

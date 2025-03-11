#!/usr/bin/node

const fs = require('fs');

async function read() {
  var result = [];

  const data = await fs.readFileSync('./data/worldcities.csv', 'utf8');
  var lines = data.split("\n");

  var headers = lines[0]
    .split(",")
    .map(l => l.substring(1, l.length - 1));

  for (var i = 1; i < lines.length ; i++) {
    var obj = {};
    var currentline=lines[i]
      .split(",")
      .map(l => l.substring(1, l.length - 1));

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }

  return result;
}

async function getCountries(csv) {
  const data = await read();
  console.log(data[0]);
  console.log(data[1]);
  console.log(data[3]);
  // const unique = [...new Set(data.map(item => item.country))];
  // console.log(unique)
}

getCountries('~/Downloads/simplemaps_worldcities_basicv1.77/worldcities.csv')

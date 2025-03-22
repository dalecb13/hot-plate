#!/usr/bin/node

async function list() {
  const url = "https://the-fork-the-spoon.p.rapidapi.com/restaurants/v3/list";
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-host': 'the-fork-the-spoon.p.rapidapi.com',
        'x-rapidapi-key': '7fdddc4500mshbbe879fa4adc68fp1b1538jsn59255605d96b',
      },
      body: JSON.stringify({
        limit: 15,
        offset: 10,
        cityId: 415144,
        longitude: 2.3513765,
        latitude: 48.8575475,
        date: "2025-02-22T12:30:00+07:00",
        partySize: 2,
        facetFilters: [
          {
            type: "PROMOTION",
            value: 20
          },
          {
            type: "RESTAURANT_TAG",
            value: 445
          }
        ],
        rangeFilters: [
          {
            type: "RATE",
            start: 8.100000381469727
          },
          {
            type: "PRICE",
            start: 10,
            end: 130
          },
          {
            type: "DISTANCE",
            start: 0,
            end: 50
          }
        ],
        booleanFilters: [
          {
            type: "PROMOTION_ONLY",
            value: true
          }
        ],
        sort: {
          type: "PROMOTION",
          direction: "DESC"
        },
      }),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    if (json.errors) {
      let errorMessages = '';
      json.errors.forEach(error => {
        console.log(error.extensions)
      })
      console.warn(errorMessages)
    } else {
      console.log(json);
    }
  } catch (error) {
    console.error(error.message);
  }
}

list();

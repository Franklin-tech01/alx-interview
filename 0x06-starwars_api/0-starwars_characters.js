#!/usr/bin/node

const request = require('request');

const movieId = process.argv[2];

if (!movieId) {
  console.error('Usage: ./0-starwars_characters.js <movieId>');
  process.exit(1);
}

const apiUrl = `https://swapi.dev/api/films/${movieId}/`;

request(apiUrl, (error, response, body) => {
  if (error) {
    console.error('Error:', error);
    process.exit(1);
  }

  if (response.statusCode !== 200) {
    console.error('Invalid response:', response.statusCode);
    process.exit(1);
  }

  const filmData = JSON.parse(body);
  const characters = filmData.characters;

  if (!characters || characters.length === 0) {
    console.error('No characters found for this movie.');
    process.exit(1);
  }

  const fetchCharacterData = (characterUrl) => {
    return new Promise((resolve, reject) => {
      request(characterUrl, (error, response, body) => {
        if (error) {
          reject(error);
        } else if (response.statusCode !== 200) {
          reject(new Error(`Invalid response for character data: ${response.statusCode}`));
        } else {
          const characterData = JSON.parse(body);
          resolve(characterData.name);
        }
      });
    });
  };

  // Use Promise.all to fetch all character data concurrently
  Promise.all(characters.map(fetchCharacterData))
    .then(characterNames => {
      characterNames.forEach(name => {
        console.log(name);
      });
    })
    .catch(error => {
      console.error('Error:', error);
      process.exit(1);
    });
});

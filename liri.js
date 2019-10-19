require('dotenv').config();
var fs = require('fs');
var keys = require('./keys.js');
axios = require('axios');
// moment = require('moment');
var Spotify = require('node-spotify-api');

var spotify = new Spotify(
    keys.spotify
);

var arg = process.argv;

var search = arg[2];

var nameSearch = process.argv.slice(3).join(" ");



var runBit = function(){
    URL = `https://rest.bandsintown.com/artists/${nameSearch}/events?app_id=codingbootcamp`;

    axios.get(URL)
    .then(function(response){
        var data=(response.data)
        console.log(data)
        // name of venue
        // venue location
        // date of event(use moment to format mm/dd/yyyy)
    })
}

var runSpotify = function(){
spotify.search({ type:'track', query: nameSearch})
.then(function(response){
    console.log(response);
    // artist(s)
    // the song's name
    // a preview link of the song from Spotify
    // the album that the song is from
    // if no song is provided then your program will default to 'the sign' by ace of base.
})
.catch(function(err){
    console.log(err);
});
}

var runOMDB = function(){
    axios.get(`http://www.omdbapi.com/?t=${nameSearch}&y=&plot=short&apikey=trilogy`)
    .then(function(response){
        var data = response.data;
        var movieInfo = `
        <--------Search Results-------->

        Title: ${data.Title} 

        Year: ${data.Year}

        IMDB Rating: ${data.Ratings[0].Value}

        Rotten Tomatoes Rating: ${data.Ratings[1].Value}

        Production: ${data.Country}, ${data.Production}

        Language: ${data.Language}

        Plot(short): ${data.Plot}

        Actors: ${data.Actors}
        
        <--------End of Search-------->`;
        console.log(movieInfo);
    })
    .catch(function(err){
        console.log(err);
    })


    // title
    // year
    // imdb rating
    // rotten tomatoes rating
    // country of production
    // language of movie
    // plot of movie
    // actors in movie
}

switch(search){
    case 'concert':
        runBit();
        break;

    case 'song':
        runSpotify();
        break;

    case 'movie':
        console.log(`searching for movie ${nameSearch}...`)
        runOMDB();
        break;

    case 'do-what-it-says':
        runDoinIt();
        break;
}
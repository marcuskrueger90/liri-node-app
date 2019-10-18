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

        console.log(response.data)
        // name of venue
        // venue location
        // date of event(use moment to format mm/dd/yyyy)
    })
}

var runSpotify = function(){
spotify.search({ type:'track', query: nameSearch})
.then(function(response){
    console.log(response);
})
.catch(function(err){
    console.log(err);
});
}

switch(search){
    case 'concert':
        runBit();
        break;

    case 'song':
        runSpotify();
        break;

    case 'movie':
        runOMDB();
        break;

    case 'do-what-it-says':
        runDoinIt();
        break;
}
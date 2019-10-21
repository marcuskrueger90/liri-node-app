require('dotenv').config();
var fs = require('fs');
var keys = require('./keys.js');
axios = require('axios');
moment = require('moment');
var Spotify = require('node-spotify-api');

var spotify = new Spotify(
    keys.spotify, 

);

var arg = process.argv;

var search = arg[2];

var nameSearch = process.argv.slice(3).join(" ");



var runBit = function(){
    URL = `https://rest.bandsintown.com/artists/${nameSearch}/events?app_id=codingbootcamp`;
    
    axios.get(URL)
    .then(function(response){
        var data = response.data[0];
        var data1 = response.data[1];
        var data2 = response.data[2];
        var date = moment(data.datetime).format('MM/DD/YYYY');
        var date1 = moment(data1.datetime).format('MM/DD/YYYY');
        var date2 = moment(data2.datetime).format('MM/DD/YYYY');
        var concertResults = `
        <--------Search Results-------->
        
        Venue: ${data.venue.name}
        
        Venue Location: ${data.venue.city}, ${data.venue.country}
        
        Date of Event: ${date}
        
        <--------------------------->
        
        Venue: ${data1.venue.name}
        
        Venue Location: ${data1.venue.city}, ${data1.venue.country}
        
        Date of Event: ${date1}
        
        <--------------------------->
        
        Venue: ${data2.venue.name}
        
        Venue Location: ${data2.venue.city}, ${data2.venue.country}
        
        Date of Event: ${date2}
        
        <--------End of Search-------->`;
       
        console.log(concertResults);
        fs.appendFile('log.txt', `
        Concert Search: ${nameSearch}
        ${concertResults}
        `, function(err) {
            if (err) {
              return console.log(err);
            }})
    })
}

var runSpotify = function(){
spotify.search({ type:'track', query: nameSearch}, callback)

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
        fs.appendFile('log.txt', `
        Movie Search: ${nameSearch}
        ${movieInfo}
        `, function(err) {
            if (err) {
              return console.log(err);
            }})
    })
    .catch(function(err){
        console.log(err);
    })

}

switch(search){
    case 'concert':
        console.log(`searching for "${nameSearch}" concerts...`)
        runBit();
        break;

    case 'song':
            if(nameSearch===""){
                nameSearch = fs.readFile('random.txt', 'utf8', function(err, data){
                    if(err){
                        return console.log(err);
                    }
                })
               
            }
        console.log(`searching for the song "${nameSearch}"....`)
        runSpotify();
        break;

    case 'movie':
        console.log(`searching for movie "${nameSearch}"...`)
        runOMDB();
        break;

    case 'do-what-it-says':
        runDoinIt();
        break;
}
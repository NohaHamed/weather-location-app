// Foursquare API Info
const clientId = '3P0YCT5L1J0SEIDA4SK2TMYIKIHXBF3WHU1Y2MKKJRC2GSMD';
const clientSecret = 'H2OST1W21YY11Z44R4FRKKHL1XEU4FXTJMPMAQY0YUW2D215';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather Info
const openWeatherKey = '37472390ca691b1e306b6b08fa5fb10c';
const weatherUrl = 'http://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async () => {
const city = $input.val();
const urlToFetch = url+city+ '&limit=10&client_id=' + clientId + '&client_secret=' + clientSecret + "&v=20200730";
try {
const response = await fetch(urlToFetch);
if(response.ok) {
    const jsonResponse = await response.json();
    const venues = jsonResponse.response.groups[0].items.map(item => item.venue);
console.log(venues);
return venues;
}
} catch (error) {
console.log(error);
}
};

const getForecast = async() => {
    
    const urlToFetch = weatherUrl + '?&q=' + $input.val() + '&APPID=' + openWeatherKey;

try {
const response = await fetch(urlToFetch);
if (response.ok) {
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
}
} catch (error) {
    console.log(error);
};
}

// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    // Add your code here:
const venue = venues[index];
const venueIcon = venue.categories[0].icon;
const venueImageSrc = venueIcon.prefix + "bg_67" + venueIcon.suffix;


    let venueContent = createVenueHTML(venue.name, venue.location, venueImageSrc);
    
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (day) => {
  // Add your code here:
  
  const weatherContent = createWeatherHTML(day);
  
  $weatherDiv.append(weatherContent);
};

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();

  $container.css("visibility", "visible");


  getVenues().then(venues =>
       renderVenues(venues));
    
  getForecast().then(forecast => 
        renderForecast(forecast));
  return false;
}

$submit.click(executeSearch);
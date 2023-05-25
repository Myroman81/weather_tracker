var APIkey = "9b8b36e29d3934ff62f1a31ee39ae4cc";
var latitude = "39.952583";
var longitude = "-75.165222";
var searchURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIkey;
var searchURL_2 = `api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIkey}`

var searchForm = document.querySelector('#user-form');
var cityName = document.querySelector("#city");
var temp = document.querySelector("#temperature");
var humidity = document.querySelector("#humidity");
var wind = document.querySelector("#wind-speed");
var day1Date = document.querySelector("#day1Date");
var day2Date = document.querySelector("#day2Date");
var day3Date = document.querySelector("#day3Date");
var day4Date = document.querySelector("#day4Date");
var day5Date = document.querySelector("#day5Date");
var day1Temp = document.querySelector("#day1Temp");
var day2Temp = document.querySelector("#day2Temp");
var day3Temp = document.querySelector("#day3Temp");
var day4Temp = document.querySelector("#day4Temp");
var day5Temp = document.querySelector("#day5Temp");
var day1Humidity = document.querySelector("day1Humidity");
var day2Humidity = document.querySelector("day2Humidity");
var day3Humidity = document.querySelector("day3Humidity");
var day4Humidity = document.querySelector("day4Humidity");
var day5Humidity = document.querySelector("day5Humidity");
var day1Wind = document.querySelector("#day1Wind");
var day2Wind = document.querySelector("#day2Wind");
var day3Wind = document.querySelector("#day3Wind");
var day4Wind = document.querySelector("#day4Wind");
var day5Wind = document.querySelector("#day5Wind");

// var currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`

var city = "Chicago";

searchForm.addEventListener('submit', function(event) {
    console.log("Submitting ...");
    // Prevent that default REFRESH behavior
    event.preventDefault();

    console.log("City Value: ", cityName.value);
    makeRequest(cityName.value);
});

function makeRequest(city) {
    var geocodeURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIkey}`
    // make our API request 
    fetch(geocodeURL)
        .then(response => {
          //  console.log("Response:", response);
            return response.json();
        })
        .then(data => {
         //   console.log("Data: ", data);
         //   console.log("Type: ", typeof data);

            // our data is an ARRAY
            /*  data.forEach(item => {
                  console.log("Name: ", item.name);
                  console.log("City: ", item.address.city);
              })
              */
            // Lets say we NEED some piece of DATA from our FIRST REQUEST

            // If we want to pull our Lat and Lon
            let lon = data[0].lon;
            let lat = data[0].lat;
            console.log("Coord: ", lat, lon);



            // or PASS data to the next calling function   
            getForecast(lat, lon);
            // fetch('https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}')   // FORECATS ENDPOINT
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`)     // CURRENT WEATHER ENDPOINT
                .then(response => response.json())
                .then(data => {
                    console.log("Current Weather Data: ", data)

                    // temp.textContent = data.main.temp;
                    temp.innerHTML = data.main.temp;
                    humidity.innerHTML = data.main.humidity;
                    wind.innerHTML = data.wind.speed;
                })
                .catch(error => {
                    throw error;
                });

        })
        .catch(err => {
            if (err) {
                throw err;
            }
        });
        /*
    for (var i = 0; i < recentSearches.length; i++) {
        var cityNameButton = $("<button>");
        cityNameButton.attr("class", "btn");
        // cityNameButton.removeClass("btn");
        cityNameButton.text(recentSearches[i]);
        $("#language-buttons").append(cityNameButton);

        // code after fetch method
    }
    */
}


function getForecast(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}`)
        .then(res => res.json())
        .then(data => {
            console.log("Forecast Data: ", data);
            // console.error.log(data);
            var validRecords = [];    // temp array to hold our matching time records
            var listData = data.list;
           // console.log("Forecast List: ", listData);
            for(var i = 0; i < listData.length; i++) {
                //console.log("Item: ", listData[i].dt_txt);

                // the given dt_txt value is "24-03-22 12:00:00"
                // lets say we want to find all forecast records that have a dt_txt of "12:00:00"

                // we are convert our STRING into an ARRAY
                var tempArr = listData[i].dt_txt.split(' ');
                //console.log(tempArr)   // --> ['date', 'time'];

                // Now we can filter by our ARRAY item at INDEX 1 --> which is our time part
                if(tempArr[1] === "12:00:00") {
                    console.log("Found Matching Record!") 
                    vaildRecords.push(listData[i])
                }
            }

            console.log("Forecast Records: ", validRecords);

            day1Date.textContent = validRecords[0].dt_txt;
            day1Temp.textContent = validRecords[0].main.temp;
           // day1Humidity.textContent = validRecords[0].main.humidity;
            day1Wind.textContent = validRecords[0].wind.speed;
        })
        .catch(error => {
            throw error;
        });
    };
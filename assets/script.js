var APIkey= "9b8b36e29d3934ff62f1a31ee39ae4cc";
var latitude= "39.952583";
var longitude= "-75.165222";
var searchURL= "https://api.openweathermap.org/data/2.5/forecast?lat="+latitude+"&lon="+longitude+"&appid="+APIkey;
var searchURL_2= `api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIkey}`
var cityLocation;


function makeRequest() {
    // make our API request 
    fetch("")
        .then(response => {
            console.log("Response:", response);
            return response.json();
        })
        .then(data => {
            console.log("Data: ", data);
            console.log("Type: ", typeof data);

            // our data is an ARRAY
            data.forEach(item => {
                console.log("Name: ", item.name);
                console.log("City: ", item.address.city);
            })
            // Lets say we NEED some piece of DATA from our FIRST REQUEST

            // If we want to pull our Lat and Lon
            let lon = 39.952583;
            let lat = -75.165222;
            
            // fetch('https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}')
            //     .then()
            //     .then()
            //     .catch()

             // or PASS data to the next calling function   
            getForecast(lat, lon);
        })
        .catch(err => {
            if(err) {
                throw err;
            }
        });
        
        // code after fetch method
    }
    
    makeRequest();
    
function getForecast(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}`)
        .then(res => res.json())
        .then(data => {
            console.error.log(data);
        })
        .catch()

}
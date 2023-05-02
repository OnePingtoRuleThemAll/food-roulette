
var apiKey = "PEteHRi4pn19m4PkY03i1O2H7ejO7GKDykl2E9931oTFtZfBC5Q_c1ujmEo3rWzyB-OT7GoMwFTmSM_8N2heEa9CJbhivTkR9okeeYvjwIW7Jo_B073-ihddE6tJZHYx";

/*
https://cors-anywhere.herokuapp.com/corsdemo
This API enables cross-origin requests to anywhere
Cross-origin resource sharing (CORS) is a browser security feature that restricts 
cross-origin HTTP requests that are initiated from scripts running in the browser. */


$(function() {
    console.log("---------------------------------------------------");
    console.log("Index.html is now loading");
 
 
  
});

$("#searchButton").click(function(){
    console.log("---------------------------------------------------");
    console.log("Search Button has been clicked")
    //getLocation();
    //getYelpData();
    //goResults();
    getFourData();
    
});

/*
Function should save the data in in local storage using a key named "location data".
Code should save the data in an array. 
KEVIN CODE HERE


KEVIN CODE HERE


KEVIN CODE HERE


KEVIN CODE HERE


KEVIN CODE HERE


KEVIN CODE HERE


KEVIN CODE HERE
*/

async function getFourData() {
    try {
        const searchParams = new URLSearchParams({
          query: 'chicken',
          ll: '33.669445,-117.823059',
          open_now: 'true',
          sort: 'DISTANCE'
        });
        const results = await fetch(
          `https://api.foursquare.com/v3/places/search?${searchParams}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              Authorization: 'fsq3zDEjvKjoSO9dxG9JFZAqj3ezLoE1u/LFiM3vemtNyRQ=',
            }
          }
        );
        const data = await results.json();
        console.log(data);
        localStorage.setItem("fourData", JSON.stringify(data))
        return data;
    } catch (err) {

        console.error(err);
    }
}


function getYelpData(){

    console.log("---------------------------------------------------");
    console.log("Start of function One");

    /*
    savedData = JSON.parse(localStorage.getItem("locationData"));
    console.log(savedData);
    console.log(savedData[0].lon);
    console.log(savedData[0].lat);

    var lat = savedData[0].lon;
    var lon = savedData[0].lat;
    */


    var corsAnywhereUrl = "https://cors-anywhere.herokuapp.com/";
    var yelpApiUrl = "https://api.yelp.com/v3/businesses/search";

    //Irvine CA Latitude and Longitude
    var lat = "33.669445";
    var lon = "-117.823059";
    var category = "Mexican";

    var fetchURL = corsAnywhereUrl + yelpApiUrl + "?latitude=" + lat + "&longitude="+ lon+ "&term=" + category + "&categories=&sort_by=best_match&limit=5";
    
    console.log(fetchURL);

    fetch(fetchURL, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "X-Requested-With": 'XMLHttpRequest',
        },
    })
    .then(function(response){
        console.log(response)
        return response.json();
    })
    .then(function(data){
        console.log(data);
        localStorage.setItem("yelpData", JSON.stringify(data))
      
    });
      
}

function goResults() {
    console.log("goResults function is running");
    window.location.href = "results-page.html" 
  }

/*
function getLocation(){

    console.log("--- Start of getLocation function ---");    
    var fetchURL = "https://geocode.maps.com/search?q=92620";

    
   
    console.log("--- End of getLocation function ---")    
}

*/
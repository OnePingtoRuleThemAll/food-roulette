


var apiKey = "PEteHRi4pn19m4PkY03i1O2H7ejO7GKDykl2E9931oTFtZfBC5Q_c1ujmEo3rWzyB-OT7GoMwFTmSM_8N2heEa9CJbhivTkR9okeeYvjwIW7Jo_B073-ihddE6tJZHYx";

//https://cors-anywhere.herokuapp.com/corsdemo
//This API enables cross-origin requests to anywhere
/*Cross-origin resource sharing (CORS) is a browser security feature that restricts 
cross-origin HTTP requests that are initiated from scripts running in the browser. */


$(function() {
    console.log("Script is now running");
    //getData();
    //getDataToo();
    //getLocation();
  
});

$("#searchButton").click(function(){
    getLocation();
});

function getLocation(){

    console.log("--- Start of getLocation function ---");    
    var fetchURL = "https://geocode.maps.co/search?q=92620";

    console.log(fetchURL);

    fetch(fetchURL, {
    })
    .then(function(response){
        console.log(response)
        return response.json();
    })
    .then(function(data){
        console.log(data);
        var locationLat = data[0].lat;
        console.log("This is the lon values: " + locationLat);

        var locationLon = data[0].lon;
        console.log("This is the lat values: " + locationLon);

        var locationData = [
            {
                lon: locationLat,
                lat: locationLon
            }
        ]

        console.log(locationData);
        localStorage.setItem("locationData", JSON.stringify(locationData));
    });

   
    setTimeout(() => {  
        getDataToo();
    }, 900);  
   
    console.log("--- End of getLocation function ---")    
}



function getDataToo(){

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
    
   
    //var fetchURL = corsAnywhereUrl + "https://api.yelp.com/v3/businesses/search?sort_by=best_match&limit=20"

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
        localStorage.setItem("temp", JSON.stringify(data))
        three();
    });
      
}


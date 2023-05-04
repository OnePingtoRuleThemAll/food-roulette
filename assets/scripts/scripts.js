
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

    var searchValue = $("#search-textbox").val();
    console.log(searchValue);

    
    if (searchValue === ""){
        console.log("search is empty");
        return;
    }
    
 
    var searchValuePlus = searchValue.replace(/\s+/g, "+");

    console.log(searchValuePlus); 

    var cusineType;

    var typeRadio = document.getElementsByName('group1');
    console.log(typeRadio); 
    for( var index = 0 ; index < typeRadio.length; index++){
        if(typeRadio[index].checked){
            cusineType = typeRadio[index].value;
        }
    }
    console.log(cusineType);

    localStorage.setItem("cusineType", JSON.stringify(cusineType));

    var zipCode = "90650"
    getLocation(searchValuePlus);
    //getYelpData();
    
    //getFourData();

    
    setTimeout(() => {  
        goResults();
    }, 3000);  
    
    
});

function getLocation(locationSearch, cusineType){

    console.log("--- Start of getLocation function ---");    
    var fetchURL = "https://geocode.maps.co/search?q=" + locationSearch;

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
                lat: locationLon,
                
            }
        ]
        console.log(locationData);
        localStorage.setItem("locationData", JSON.stringify(locationData));
    });

   
    setTimeout(() => {  
        getFourData()
    }, 600);  
   
    console.log("--- End of getLocation function ---")    
}

async function getFourData() {


    savedData = JSON.parse(localStorage.getItem("locationData"));
    var cusineType = (localStorage.getItem("cusineType"));
    var lat = savedData[0].lon;
    var lon = savedData[0].lat;
    console.log(cusineType);

    try {
        const searchParams = new URLSearchParams({
          query: cusineType,
          //ll: '33.669445,-117.823059',
          ll: lat + "," + lon,
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

function goResults() {
    console.log("goResults function is running");
    window.location.href = "results-page.html" 
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


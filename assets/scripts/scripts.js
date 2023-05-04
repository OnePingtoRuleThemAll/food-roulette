//Start of the Scripts JS code 
$(function() {
    //Test function to test if JS code is linked to HTML
    console.log("---------------------------------------------------");
    console.log("Index.html is now loading");
 
 
  
});

//Search button logic. Function is called when the Search button is pressed. 
$("#searchButton").click(function(){
    console.log("---------------------------------------------------");
    console.log("Search Button has been clicked")

    //Assigns the value in the text box to a value. 
    var searchValue = $("#search-textbox").val();
    //console.log(searchValue);

    //Empty seatch result validation. 
    if (searchValue === ""){
        //console.log("search is empty");
        return;
    }
    
    //Removes spaces from the string and replaces with the + symbol
    var searchValuePlus = searchValue.replace(/\s+/g, "+");

    //console.log(searchValuePlus); 

    //Declares the cusine type that is selected 
    var cusineType;

    //Grabs the ids of the radio buttons on the page
    var typeRadio = document.getElementsByName('group1');
    //console.log(typeRadio); 
    
    //Returns the id of the selected radio button    
    for( var index = 0 ; index < typeRadio.length; index++){
        if(typeRadio[index].checked){
            cusineType = typeRadio[index].value;
        }
    }
    //console.log(cusineType);

    //Stores the value in local storage with the key of cusine type
    localStorage.setItem("cusineType", JSON.stringify(cusineType));

   
    //Calls the getLocation function to gret the lon and lat. 
    getLocation(searchValuePlus);


    //Triggers the next page to load after a set time period. 
    setTimeout(() => {  
        goResults();
    }, 3000);  
    
    
});

//Function to get the location data using the geocode API. 
function getLocation(locationSearch){

    console.log("--- Start of getLocation function ---");    
    //URL constructor
    var fetchURL = "https://geocode.maps.co/search?q=" + locationSearch;

    console.log(fetchURL);

    //Fetch call to get the data from the geocode API. 
    fetch(fetchURL, {
    })
    .then(function(response){
        console.log(response)
        return response.json();
    })
    .then(function(data){
        console.log(data);

        //Sets the data into variables
        var locationLat = data[0].lat;
        console.log("This is the lon values: " + locationLat);

        var locationLon = data[0].lon;
        console.log("This is the lat values: " + locationLon);

        //Creates a json array to be saved in local storage. 
        var locationData = [
            {
                lon: locationLat,
                lat: locationLon,
                
            }
        ]
        console.log(locationData);
        //Data is saved to local storage. 
        localStorage.setItem("locationData", JSON.stringify(locationData));
    });

   //Calls the founchtion to get the four square data. 
    setTimeout(() => {  
        getFourData()
    }, 600);  
   
    console.log("--- End of getLocation function ---")    
}

//Function to get the foursquare data
async function getFourData() {

    //Retrieves the location data from local storage
    savedData = JSON.parse(localStorage.getItem("locationData"));
    //Assigns the cusine type from the value in local storage. 
    var cusineType = (localStorage.getItem("cusineType"));
    //Retrieves the lon and lat from local storage. 
    var lat = savedData[0].lon;
    var lon = savedData[0].lat;
    //console.log(cusineType);

    //Function to grab the foursquare data from the four API
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
        //console.log(data);
        //Saves the data in local storage to be grabbed by the results page. 
        localStorage.setItem("fourData", JSON.stringify(data))
        return data;
    } catch (err) {

        console.error(err);
    }
}

// Function allows the page to go to the next page when the search button is clicked. 
function goResults() {
    console.log("goResults function is running");
    window.location.href = "results-page.html" 
  }


/*

LAGACY YELP CODE
function getYelpData(){

    console.log("---------------------------------------------------");
    console.log("Start of function One");

 
    savedData = JSON.parse(localStorage.getItem("locationData"));
    console.log(savedData);
    console.log(savedData[0].lon);
    console.log(savedData[0].lat);

    var lat = savedData[0].lon;
    var lon = savedData[0].lat;
 


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
*/

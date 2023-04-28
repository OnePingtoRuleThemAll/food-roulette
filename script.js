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

function three(){
    console.log("---------------------------------------------------");
    console.log("Start of function three");

    var savedData = JSON.parse(localStorage.getItem("temp"));
    console.log("--- This is the Value of Saved Data ---");
    console.log(savedData);

    console.log("--- This is the Value of data point 1 in saved Data ---");
    console.log(savedData.businesses[0]);
    console.log("Name: " + savedData.businesses[0].name);
    console.log("Address: " + savedData.businesses[0].location.address1);
    console.log("Phone#: " + savedData.businesses[0].phone)
    console.log("Price: " + savedData.businesses[0].price);
    console.log("Link: " + savedData.businesses[0].url);
    console.log("---------------------------------------------------");
}
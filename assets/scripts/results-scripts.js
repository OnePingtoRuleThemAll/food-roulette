$(function() {
    //Validates that the script is linked to the JS. 
    console.log("Script is now running");
   
    //Sets the first value in the array to be displayed when the page loads. 
    var index = 0;
    loadCardData(index)
  
});


function loadCardData(index){

    console.log("---------------------------------------------------");
    console.log("Start of function loadCardData");

    //Grabs four data from local storage
    var savedData = JSON.parse(localStorage.getItem("fourData"));
    /*
    DEBUGGING CODE
    console.log("--- This is the Value of Saved Data ---");
    console.log(savedData);

    console.log(savedData.results[index]);
    console.log("Name: " + savedData.results[index].name);
    console.log("Address: " + savedData.results[index].location.formatted_address);
    console.log("Link: " + savedData.results[index].fsq_id);

    */
    //link constructor that that sets the link to the locations homepage
    var linkAppend = "https://foursquare.com/v/" + savedData.results[index].fsq_id;
    

    //link constructor that will set the link to the locations menu
    var linkMenuAppend = "https://foursquare.com/v/" + savedData.results[index].fsq_id + "/menu";
    

    //console.log("Link: " + linkAppend);
    //console.log("Link: " + linkMenuAppend);
    //console.log("Link: " + savedData.results[index].geocodes.main.latitude);
    //console.log("Link: " + savedData.results[index].geocodes.main.longitude);


    //grabs the lon and lat data from local storage    
    var latitude = savedData.results[index].geocodes.main.latitude;
    var longitude = savedData.results[index].geocodes.main.longitude;

    //Google Maps constructor that uses the lon and lat. 
    var googlemaplink = "https://www.google.com/maps/search/?api=1&query=" + latitude + "," + longitude;
    //console.log("Link to googleMaps: " + googlemaplink);

    /*
    Sets the resturant name, address and webables to the page. 
    */
    $("#results-card-retaurant").text(savedData.results[index].name);
   
    $("#results-card-address").text("Address:" +savedData.results[index].location.formatted_address);
    
    $("#results-card-website").attr("href",linkAppend);

    $("#results-card-menu").attr("href",linkMenuAppend);

    $("#results-card-maps").attr("href",googlemaplink);


    console.log("---------------------------------------------------");


}

//Function is called when the search button is clicked.
$("#searchAgainButton").click(function(){
    console.log("The spin again button is clicked");

    //Four data retruned is 10 long. Generates a random number and populates the page with a different resturant. 
    var random = Math.floor(Math.random() * 10);
    //console.log(random);
    //Calls the loadCardData function reload the page with new data. 
    loadCardData(random);


});


/*
LAGACY YELP CODE
function loadCardDataOld(index){
    console.log("---------------------------------------------------");
    console.log("Start of function three");

    var savedData = JSON.parse(localStorage.getItem("yelpData"));
    console.log("--- This is the Value of Saved Data ---");
    console.log(savedData);

    console.log("--- This is the Value of data point 1 in saved Data ---");
    console.log(savedData.businesses[index]);
    console.log("Name: " + savedData.businesses[index].name);
 


    console.log("Address: " + savedData.businesses[index].location.address1);
    console.log("Phone#: " + savedData.businesses[index].phone)
    console.log("Price: " + savedData.businesses[index].price);
    console.log("Link: " + savedData.businesses[index].url);


    $("#results-card-resturant").text(savedData.businesses[index].name)
    $("#results-card-phone").text(savedData.businesses[index].phone)
    $("#results-card-address").text(savedData.businesses[index].location.address1)
    $("#results-card-price").text(savedData.businesses[index].price)
    $("#results-card-link").attr("href",savedData.businesses[index].url)

    console.log("---------------------------------------------------");

}

*/
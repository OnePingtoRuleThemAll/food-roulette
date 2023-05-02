


$(function() {
    console.log("Script is now running");
   
    var index = 0;
    loadCardData(index)
  
});

function loadCardData(index){
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

$("#searchAgainButton").click(function(){
    console.log("The spin again button is clicked");

    var random = Math.floor(Math.random() * 4);
    console.log(random);
    loadCardData(index);


});

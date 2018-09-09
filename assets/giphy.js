var topicsArray = ["Cars", "Fail", "Snowboard", "Nod"];
// the array with beginning topics, later they will be pushed to through the search field
renderButtons();

$("#searchButton").on("click", function(event){
    
    event.preventDefault();

    $("#gifDisplay").empty();

    var topic = $("#searchForm").val().trim();

    topicsArray.push(topic);

    findGifs(topic);

    renderButtons();  

});
// the function that listens for a click on the search button, when that happens creates a variable called topic that will be used to 
// populate the topicsArray and as an arguement for the findGifs funtion. lastly it runs the renderButtons function
$(document).on("click", ".gifButton", function(event){
    
    event.preventDefault();

    var name = $(this).attr("data-name")
    
    findGifs(name);
});
// the function that listens for a click on the dynamically created buttons. finds the attribute of data-name, stores it as variable and uses that variable
// as an arguement for findGifs function
$(document).on("click", ".gifImage", function(event){
    
    event.preventDefault();

      var state = $(this).attr("data-state");
      
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
});
// listens for a click on the dynamically created gif images. finds the attribute data-state and depending on what its set at will change the src attribute 
// finally it will change the data-state attribute to the opposite attribute

function renderButtons() {

    
    $("#buttonRow").empty();

        for (var i = 0; i < topicsArray.length; i++) {

        var a = $("<button>");
      
        a.addClass("topic");
      
        a.attr("data-name", topicsArray[i]);
      
        a.text(topicsArray[i]);
      
        $("#buttonRow").append(a);
        
        $(a).attr("class", "gifButton")
        
        $(a).attr("data-name", topicsArray[i]);
    };
};
// render button function, this takes the strings in the array and dynamically creates buttons. it is run everytime the page is loaded and when the 
// user clicks on the search button
function findGifs(gifSearch){
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifSearch + "&api_key=UHiKRz22uEenIdcElrQtM58CUtS0UPP2&limit=10";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        
        var results = response.data;

          
          for (var i = 0; i < results.length; i++) {

            var topicDiv = $("<div>");

            var para = $("<p>").text("Rating: " + results[i].rating);

            var topicImage = $("<img>");

            topicImage.attr("src", results[i].images.fixed_height.url);
            topicImage.attr("data-animate", results[i].images.fixed_height.url)
            topicImage.attr("data-still", results[i].images.fixed_height_still.url)
            topicImage.attr("data-state", "animate")
            topicImage.attr("class", "gifImage");
            
            topicDiv.append(para);
            topicDiv.append(topicImage);

            $("#GifDisplay").prepend(topicDiv);

          }  
    });
}; 
// findGifs funtion. first thing it does is concatinates the url for the giphy api with an argument called gifSearch that will be later used when the user searches 
// for a new topic or clicks on one of the preexisting topics. then calls an ajax funtion. takes the response object's data section eg
//                                                                                                                                     var resulsts = response{
            //                                                                                                                                        data:data
            //                                                                                                                                                }
// from there I dynamically create the div, img and p tags neccesary and assign them to variables. i then assign the attributes need to the img tags. i use
// src and assign it to the fixed_height gif in the JSON response, i do the same with the data-animate attribute. for the data-still attribute i grab the fixed height still
// from the same object. next i create a data state attribute and assign it to animate i use this to inform what happens when the user clicks on a gif image. lastly i create
// a class attribute as gifImage that i use to listen for clicks on the gif images. i then append the img and p tags to the div tag. this goes on in a loop until the limit 
// of gifs called from the api is reached, default is 10.
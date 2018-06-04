var topics = ["lebron james", "james harden", "steph curry", "kevin durant", "kyrie irving", "klay thompson", "chris paul",
"anthony davis", "john wall", "draymond green", "giannis antetokounmpo", "damian lillard", "kobe bryant", "michael jordan",
"magic johnson", "julius erving"];
var result = 10;
function renderButtons() {
    $("#button-view").empty();
    for (i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.addClass("button");
        button.attr("data-player", topics[i]);
        button.text(topics[i]);
        $("#button-view").append(button);
    }
}
renderButtons();
$("#add-player").click(function(event) {
    event.preventDefault();
    var newPlayer = $("#player-input").val().trim();
    topics.push(newPlayer);
    renderButtons();
    $("#player-input").val("");
})
$("#addGif").click(function() {
    event.preventDefault();
    var additionalGifs = parseInt($("#addGif-input").val().trim());
    var player = $(".gifClass").attr("data-player");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + player + "&limit=" + (result + additionalGifs) + "&api_key=F69bsoOpu6aMABu6NcETn4B2hLqJlJgI";
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        for (k = result; k < result + additionalGifs; k++) {
            var a = $("<div>")
            a.addClass("float-left gifClass card");
            a.attr("data-player", player);
            var playerGif = $("<img>")
            playerGif.addClass("picture");
            playerGif.attr("src", response.data[k].images.fixed_height_still.url);
            playerGif.attr("data-motion", response.data[k].images.fixed_height.url);
            playerGif.css({"height": "18rem"});
            a.append(playerGif);
            var cardBody = $("<div>");
            cardBody.addClass("card-body");
            var rating = $("<h5>");
            rating.addClass("rating card-title");
            rating.text("Rating: " + response.data[k].rating);
            rating.css({"width": response.data[k].images.fixed_height.width});
            cardBody.append(rating);
            //downloadButton.css({"width": response.data[j].images.fixed_height.width});
            var download = $("<a>");
            download.attr("href", response.data[k].images.fixed_height.url);
            download.attr("download", true);
            download.text("Download");
            download.addClass("btn btn-primary");
            cardBody.append(download);
            a.append(cardBody);
            $("#gif").append(a);
        }
        result = result + additionalGifs; 
    })
    $("#addGif-input").val("");
})
$("#button-view").on("click", ".button", function() {
    $("#gif").empty();
    var player = $(this).attr("data-player");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + player + "&limit=" + result + "&api_key=F69bsoOpu6aMABu6NcETn4B2hLqJlJgI";
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        for (j = 0; j < result; j++) {
            var a = $("<div>")
            a.addClass("float-left gifClass card")
            a.attr("data-player", player);
            var playerGif = $("<img>")
            playerGif.addClass("picture card-img-top");
            playerGif.attr("src", response.data[j].images.fixed_height_still.url);
            playerGif.attr("data-motion", response.data[j].images.fixed_height.url);
            playerGif.css({"height": "18rem"});
            a.append(playerGif);
            var cardBody = $("<div>");
            cardBody.addClass("card-body");
            var rating = $("<h5>");
            rating.addClass("rating card-title");
            rating.text("Rating: " + response.data[j].rating);
            rating.css({"width": response.data[j].images.fixed_height.width});
            cardBody.append(rating);
            var download = $("<a>");
            download.attr("href", response.data[j].images.fixed_height.url);
            download.attr("download", true);
            download.addClass("btn btn-primary");
            download.text("Download");
            cardBody.append(download);
            a.append(cardBody);
            $("#gif").append(a);
        }
    })
})
var running = false;
$("#gif").on("click", ".picture", function() {
    var motionGif = $(this).attr("src");
    if (running === false) {
        $(this).attr("src", motionGif.replace("_s.gif",".gif"));
        running = true;
    }
    else {
        $(this).attr("src", motionGif.replace(".gif","_s.gif"));
        running = false;
    }

})
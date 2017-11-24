$(document).ready(function() { 

  

      
      var topics = ["Lawrence Taylor", "Michael Jordan", "Jim Brown", "Lebron James", "Julius Peppers", "Kurt Cobain", "Danzig", "Chris Cornell", "JJ Watt", "Pearl Jam"];

      

     
      function renderButtons() {

        
        $("#artists-view").empty();

  
        for (var i = 0; i < topics.length; i++) {

          
          var artistButton = $("<button>");
         
          artistButton.addClass("artist");
         
          artistButton.attr("data-name", topics[i]);
        
          artistButton.text(topics[i]);
         
          $("#artists-view").append(artistButton);

        }
      }

      $("#add-artist").on("click", function(event) {
        event.preventDefault();
        
        var artists = $("#artist-input").val().trim();

        
        topics.push(artists);

        
        renderButtons();
      });

      

      function displayArtistInfo() {

        var category = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + category + "&api_key=dc6zaTOxFJmzC&limit10";

        
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          var results = response.data;
         
          
          $("#gifs-here").empty();

            
          for (var i = 0; i < results.length; i++) {

           
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

            
            var rating = results[i].rating;

            
            var p = $("<p>").text("Rating: " + rating);

            var gifArea = $("<div class='item'>");
            
            
              var gifImage = $("<img>");

           
              gifImage.attr("src", results[i].images.fixed_height.url);
              
              gifImage.attr("data-still", results[i].images.fixed_height_still)
              
              gifImage.attr("data-animate", results[i].images.fixed_height_still)


             
              gifArea.append(p);
              gifArea.append(gifImage);

            
              $("#gif-area").prepend(gifArea);
              }
            }
          })

        }

        
      $(document).on("click", ".artist", displayArtistInfo);

      
      renderButtons();
});




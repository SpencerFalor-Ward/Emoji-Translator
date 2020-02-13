




// Emoji-api
// https://emoji-api.com/emojis - emojis with group, subgroup, name, etc
// https://emoji-api.com/emojis?search=computer - emoji search by keyword (computer in this case)
// https://emoji-api.com/categories - emoji categories
// https://emoji-api.com/categories/travel-places - all emojis within a single category

// an array to populate with emoji names for searching
var emojiArray =[];

// ajax query of the database- can be altered with above parameters
$("#button").click(function() {
  var inputText = $("#inputField").val();
  
  var queryURL = "https://emoji-api.com/emojis" 
  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .then(function(response){
    console.log(response);
  for (let i = 0; i < response.length; i++) {
    // this creates an array of all of the emoji names 
    emojiArray.push(response[i].slug);
    console.log(emojiArray);
  }  
    

  })
})



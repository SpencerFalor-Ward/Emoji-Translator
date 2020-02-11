
// emojidex
// https://www.emojidex.com/api/v1
// auth code 7abcc4a06e110eb981c96ab20eef352a93b099113001a4c5

// var queryURLauth = "https://www.emojidex.com/api/v1/users/authenticate?username=RAntonelli&password=project1"

// $.ajax({
//     url: queryURLauth,
//     method: "GET"
//   })
//   .then(function(response){
//     console.log(response);
    
//   })

// var queryURL = "https://www.emojidex.com/api/v1/categories"
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   })
//   .then(function(response){
//     console.log(response);      
//   })

// ----------------------------------------------------- 

// https://emoji-api.com/emojis - emojis with group, subgroup, name, etc
// https://emoji-api.com/emojis?search=computer - emoji search by keyword (computer in this case)
// https://emoji-api.com/categories - emoji categories
// https://emoji-api.com/categories/travel-places - single category

// ----------------------------------------------------- 

// Datamuse

var queryURLdatamuse = "https://api.datamuse.com/words?ml=cat"
<<<<<<< HEAD
var queryURLdatamuse1 = "https://api.datamuse.com/words?rel_trg=dog"

  $.ajax({
=======
var queryURLdatamuse1 = "https://api.datamuse.com/words?rel_trg=run"

$.ajax({

>>>>>>> cda6223bf58f1180b563948a62e0b376d6321901
    url: queryURLdatamuse1,
    method: "GET"
  })
  .then(function(response){
    console.log(response);      
  })
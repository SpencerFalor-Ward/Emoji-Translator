//textRazor api code
function textRazorAPI() {
  $.ajax({
    url: " https://cors-anywhere.herokuapp.com/https://api.textrazor.com",
    method: "POST",
    timeout: 0,
    headers: {
      "x-textrazor-key":
        "c8a64d61fcc45077687314db86948b8faf8546ee880318cd0d603f5f",
      Type: "application/x-www-form-urlencoded"
    },
    data: {
      extractors: "words,partOfSpeech,param,relations, wikidataId",
      text: $("#inputField")
        .val()
        .trim()
      // "Spain's stricken Bankia expects to sell off its vast portfolio of industrial holdings that includes a stake in the parent company of British Airways and Iberia."
    }
  }).done(function(response) {
    for (var i = 0; i < response.response.sentences[0].words.length; i++) {
      var wordList = [];
      wordList.push(response.response.sentences[0].words[i].token);
      for (
        var i = 0;
        i < response.response.sentences[0].words[0].partOfSpeech.length;
        i++
      ) {
        var wordListPart = [];
        wordListPart.push(
          response.response.sentences[0].words[0].partOfSpeech[i]
        );
        console.log(wordListPart);
      }
      console.log(wordList);
    }
    console.log(response);
  });
}

textRazorAPI();

var emojiArray = [];

// ajax query of the database- can be altered with above parameters
$("#button").click(function() {
  textRazorAPI(inputText);
  var inputText = $("#inputField").val();

  var queryURL = "https://emoji-api.com/emojis";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    for (let i = 0; i < response.length; i++) {
      // this creates an array of all of the emoji names
      emojiArray.push(response[i].slug);
    }
  });
  console.log(emojiArray);
});

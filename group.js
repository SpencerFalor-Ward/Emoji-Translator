var wordList = [];

//the compiled working code is within textRazor to keep scope correct
//textRazor api code
var inputText = $("#inputField")
  .val()
  .trim();

function textRazorAPI() {
  //ajax call to create the word objects from the input field

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
    }
  })
    .done(function(response) {
    
    for (var i = 0; i < response.response.sentences[0].words.length; i++) {
      wordList.push({
        word: response.response.sentences[0].words[i].token,
        part: response.response.sentences[0].words[i].partOfSpeech
      });
    }
    //ajax call currently getting all the emojis
    var queryURL = `https://www.emojidex.com/api/v1/utf_emoji`;
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
      emojiList = JSON.parse(response);
      // an array to populate with emoji names for searching
      var emojiArray = [];
      // here is where both wordList and emojiArray are in scope
      for (let i = 0; i < emojiList.length; i++) {
        // this creates an array of all of the emoji names
        emojiArray.push(emojiList[i].code);
      }
      console.log("emojiArray:", emojiArray);
      console.log("wordList: ", wordList);
      allIndexOf(emojiArray);
    });

    // selects all indexes with text containing words from the text input (needs word slicing functionality on text input to work)
    function allIndexOf(emojiArray) {
      var indices = [];
      var inputText = $("#inputField")
        .val()
        .trim();
      for (let i = 0; i < emojiArray.length; i++) {
        emojiYes = emojiArray[i].search(inputText);
        if (emojiYes > -1) {
          indices.push(i);
        }
      }
      console.log("indices:", indices);
      wordSlicer(indices, emojiArray);
    }

    // creating array with an object for each selected emoji containing split words, enabling a search differentiating "headscarf" from "car"
    function wordSlicer(indices, emojiArray) {
      var words = [];
      console.log("emojiArray.length:", emojiArray.length);
      for (let i = 0; i < indices.length; i++) {
        words[i] = {
          full: emojiArray[indices[i]],
          broken: emojiArray[indices[i]].split(" ")
        };

        console.log("wordSlicerInner:", words);
        var matched = [];
        for (let j = 0; j < words[i].broken.length; j++) {
          var wordMatch = words[i].broken[j];
          // console.log(wordMatch);
          console.log("wordMatch", wordMatch);

          if (wordMatch === inputText) {
            matched.push(indices[i]);
            break;
          }
        }
        console.log("wordSlicerOutter:", indices);
        // emojiPlacer(indices);
        emojiPlacer(matched);
        // selecting items from the indices array which fail to meet the split word critereon and removing them from the array ie. "headscarf" is removed, but "car" remains
        // var wordMatch =[];
        // for (let j = 0; j < words[i].broken.length; j++) {
        //   wordMatch[i] = words[i].broken[j];
        //   if (wordMatch[i] === inputText) {
        //     matched.push(indices[i]);
        //     break;
        //   }

        // }
      }
    }

    function emojiPlacer(matched) {
      var EMOJI = matched[Math.floor(Math.random() * matched.length)];
      console.log(EMOJI);
      var spoon = $("#outputField");
      var emojiIcon = String.fromCodePoint("0x" + emojiList[EMOJI].unicode);

$("#button").click(function(event) {
  // var inputText = $("#inputField").val();
  event.preventDefault();
  textRazorAPI();
});



 
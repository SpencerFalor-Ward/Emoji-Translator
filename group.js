//the compiled working code is within textRazor to keep scope correct
var emojiArray = [];
var currentWord = [];
var masterWordHolder = new Array();

//textRazor api code
function textRazorAPI() {
  var wordList = [];
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
      extractors: "words,param,relations, wikidataId",
      text: $("#inputField")
        .val()
        .trim()
    }
  }).then(function(response) {
    // creates list of individual words from the textInput field
    for (var i = 0; i < response.response.sentences[0].words.length; i++) {
      wordList.push(response.response.sentences[0].words[i].token);
    }
    // removes the extraneous period
    wordList.pop();
    console.log("wordList: ", wordList);
    console.log("wordList[1]", wordList[1]);

    //ajax call getting all the emojis and their data
    var queryURL = `https://www.emojidex.com/api/v1/utf_emoji`;
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(response) {
      emojiList = JSON.parse(response);
      console.log(emojiList);
      // creates an array of all emoji codes
      for (let i = 0; i < emojiList.length; i++) {
        emojiArray.push(emojiList[i].code);
      }
      console.log("emojiArray:", emojiArray);
      console.log("wordlist", wordList);
      wordLooper();

      // iterates through individual words from textInput field
      function wordLooper() {
        for (let k = 0; k < wordList.length; k++) {
          currentWord = wordList[k];
          masterWordHolder.push({ label: k, value: [] });
          // console.log("currentWord:", currentWord);
          emojiWordSplitter(k);
        }
      }

      // iterates through individual words of emoji codes
      function emojiWordSplitter(k) {
        k = k;
        for (let i = 0; i < emojiArray.length; i++) {
          var splitEmoji = emojiArray[i].split(" ");
          // console.log("splitemoji", splitEmoji)
          wordComparer(splitEmoji, k, i);
        }
      }

      // compares individual words from wordList to individual words from emojiArray to find matches
      function wordComparer(splitEmoji, k, i) {
        var finalIndexList = masterWordHolder[k];

        for (let m = 0; m < splitEmoji.length; m++) {
          var currentEmojiWord = splitEmoji[m];

          // console.log("currentEmojiWord:", currentEmojiWord);
          // console.log("currentWord later:", currentWord);

          // console.log("currentWord later:", currentWord);

          // pushes positive results to array
          if (currentEmojiWord === currentWord) {
            finalIndexList.value.push(i);
          }
        }
      }
      console.log("final match list:", masterWordHolder);
      emojiPlacer();
    });
  });
}

function emojiPlacer() {
  // iterates through final matched list
  for (let p = 0; p < masterWordHolder.length; p++) {
    var spoon = $("#outputField");

    // eliminates empty results
    if (masterWordHolder[p].value.length > 0) {
      // selects random result from emojis which have passed all matching tests
      var EMOJI =
        masterWordHolder[p].value[
          Math.floor(Math.random() * masterWordHolder[p].value.length)
        ];
      // creates HTML viable unicode string for emojis
      // console.log(EMOJI);
      console.log(EMOJI);
      console.log(emojiList[EMOJI].unicode);
      var fixedEmoji = emojiList[EMOJI].unicode.substr(0, 5);
      console.log(fixedEmoji);
      var emojiIcon = String.fromCodePoint("0x" + fixedEmoji);
      // console.log(emojiIcon)
      // writes emojis to outputField
      $("<span>")
        .text(emojiIcon)
        .appendTo(spoon);
    } else {
      // alert("empty")
    }
  }
}

function clear() {
  document.location.reload();

  // $('outputField').empty();
}

// initiator
$("#form").submit(function(event) {
  event.preventDefault();

  // clear();

  textRazorAPI();
});

// clear all fields

$("#clearButton").click(function() {
  clear();
});

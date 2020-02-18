

//the compiled working code is within textRazor to keep scope correct
var emojiArray = [];
var currentWord = [];
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
    })
    .then(function(response) {
    // creates list of individual words from the textInput field
      
    for (var i = 0; i < response.response.sentences[0].words.length; i++) {
        wordList.push(response.response.sentences[0].words[i].token);
    }
    
      console.log("wordList: ", wordList);
      console.log("wordList[1]", wordList[1]);
    
    // iterates through all words from inputField  
    

    // --------------------------------------------------    

    //ajax call getting all the emojis and their data
    var queryURL = `https://www.emojidex.com/api/v1/utf_emoji`;
    $.ajax({
      url: queryURL,
      method: "GET"
    })
        
      .then(function(response) {
        emojiList = JSON.parse(response);
          
        // creates an array of all emoji codes
        for (let i = 0; i < emojiList.length; i++) {
            
          emojiArray.push(emojiList[i].code);
        }
        console.log("emojiArray:", emojiArray);
        console.log("wordlist", wordList)
        wordLooper();
        
        // iterates through individual words from textInput field
        function wordLooper() {
          i=i
          // console.log("wordlistb", wordList);
          // console.log("emojiArrayLooper", emojiArray);
          // console.log(emojiArray[0]);
          // console.log(wordList[0]);
          
          for (let k = 0; k < wordList.length; k++) {
            console.log(wordList[k]);
            currentWord = wordList[k];
            console.log("currentWord:", currentWord);
            emojiWordSplitter(k);
          }
        }; 
          
        // iterates through individual words of emoji codes
        function emojiWordSplitter (k) {

          // console.log("wordlistb", wordList);
          // console.log("emojiArrayLooper", emojiArray);
          // console.log(emojiArray[0]);
          // console.log(wordList[0]);
          k = k
          
          for (let i = 0; i < emojiArray.length; i++) {        

            var splitEmoji = emojiArray[i].split(" ");     
            // console.log("splitemoji", splitEmoji)
            wordComparer(splitEmoji, k, i);
          }

        };

        function wordComparer (splitEmoji, k, i) {
          for (let m = 0; m < splitEmoji.length; m++) {
                    
            var currentEmojiWord = splitEmoji[m];
            var emojiYes = currentEmojiWord.search(currentWord);
            var wordHolder;

            console.log("currentEmojiWord", currentEmojiWord);
            console.log("currentWord later", currentWord);
            console.log("emojiYes", emojiYes)
            // pushes positive results to array
            if (emojiYes > -1) {
              wordHolder[k]= i;
              // break;
            }  
            console.log("final wordList", wordHolder)    
          }        
        }
      
      });
  
//  -------------------------------------------------------- 
    
    
    }); 
    
  
  
    
  

    

    
    // function emojiPlacer(emojiArray, wordList) {
    //   // selects random result from emojis which have passed all matching tests
      
      
    //   var emojiOptionsNumber = wordlist[i].
    //   var EMOJI = matched[Math.floor(Math.random() * matched.length)];
    //   console.log(EMOJI);
      
    //   // writes selected emoji to outputField
    //   var spoon = $("#outputField");
    //   var emojiIcon = String.fromCodePoint("0x" + emojiList[EMOJI].unicode);
    //   spoon.text(emojiIcon);
    // }
}




$("#button").click(function(event) {
  // var inputText = $("#inputField").val();
  event.preventDefault();
  textRazorAPI();
});



 
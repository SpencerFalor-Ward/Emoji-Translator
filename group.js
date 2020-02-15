


// an array to populate with emoji names for searching
var emojiArray =[];
var inputText = "red";
var emojiList = [];
// ajax query of the database- can be altered with above parameters
// var inputText is a placeholder until more robust word-sliced input is created

  


// this ajax query calls up all emojis who's name("code") contains the inputField text 
$("#button").click(function(event) {
  // var inputText = $("#inputField").val();
  event.preventDefault();
  var queryURL = `https://www.emojidex.com/api/v1/utf_emoji`
  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .then(function(response){
    emojiList = JSON.parse(response);
    console.log(emojiList);
    for (let i = 0; i < emojiList.length; i++) {
          // this creates an array of all of the emoji names 
          emojiArray.push(emojiList[i].code);            
    }
    console.log(emojiArray)
    allIndexOf(emojiArray);
  })
})

// selects all indexes with text containing words from the text input (needs word slicing functionality on text input to work)
function allIndexOf (emojiArray) {
  var indices = [];
  for (let i = 0; i < emojiArray.length; i++) {
    emojiYes = emojiArray[i].search(inputText);
    if (emojiYes > -1) {
      indices.push(i)
    }
  }
  console.log(indices);
  wordSlicer(indices);

}


// creating array with an object for each selected emoji containing split words, enabling a search differentiating "headscarf" from "car"
function wordSlicer (indices) {
  var words = [];
  for (let i = 0; i < indices.length; i++) {
     words[i] = {full: emojiArray[indices[i]], broken: emojiArray[indices[i]].split(" ")}
    console.log(words);
     // selecting items from the indices array which fail to meet the split word critereon and removing them from the array ie. "headscarf" is removed, but "car" remains
     var wordMatch = [];
     for (let j = 0; j < words[i].broken.length; j++) {
           
         wordMatch[i] = words[i].broken[j]
         if  (wordMatch[i] === inputText){
            indices.splice(i, 1);
          }
          break;

      }
           
     
  } 
  console.log(indices)
  emojiPlacer(indices);
}

// selecting a random index from within the indices array for a final emoji pick


function emojiPlacer (indices) {

  var EMOJI = indices[Math.floor(Math.random() * indices.length)]
  console.log(EMOJI)
  $("<span></span>").text(emojiList[EMOJI].unicode)
  
}





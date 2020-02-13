//textRazor api code
function testAPI() {
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
      extractors: "words,partOfSpeech",
      text:
        "Spain's stricken Bankia expects to sell off its vast portfolio of industrial holdings that includes a stake in the parent company of British Airways and Iberia."
    }
  }).done(function(response) {
    console.log(response);
  });
}
testAPI();

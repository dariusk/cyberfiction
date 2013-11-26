/* global sharing */
var nouns = [],
    verbs = [];

function generate(passage) {
  passage = passage || $('#input').val().replace(/"/g,'');
  var words = new Lexer().lex(passage);
  var taggedWords = new POSTagger().tag(words);
  var result = '';
  for (i in taggedWords) {
      var taggedWord = taggedWords[i];
      var word = taggedWord[0];
      var tag = taggedWord[1];
      console.log(word + " /" + tag);  // if running in a browser, try document.writeln() instead of print() 
      if ((tag === 'NN' || tag === 'NNS') && !word.match(/\W/) && word.length > 4) {
        word = 'cyber' + word;
      }
      result += word + ' ';
  }
  result = result.replace(/ ,/g,',').replace(/ \./g,'.').replace(/ \!/g,'!').replace(/ \?/g,'?');
  console.log(result);
  var generatedText = result;
  var sharedText = passage;
  $('#content').html(generatedText);
  var shareUrl = window.location.href.split('?')[0]+'?passage='+encodeURIComponent(passage);
  $('#share').attr('href', shareUrl);
  $('.twitter-share-button').remove();
  $('#twitterShare').html('<a href="https://twitter.com/share" class="twitter-share-button" data-url="' + shareUrl + '" data-text="' + generatedText.substr(0,110) + '..." data-lang="en">Tweet</a>');
  if (twttr.widgets) {
    twttr.widgets.load();
  }
}


$('#generate').click(function() { generate(); });
if (sharing.gup('passage') === '') {
  generate();
}
else {
  $('#input').val(decodeURIComponent(sharing.gup('passage')));
  generate(decodeURIComponent(sharing.gup('passage')));
}

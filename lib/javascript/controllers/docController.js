define(['jquery','models/docModel'], function($, Doc) {
  return function DocController(){
    //DOCCONTROLLER START CODE
    
    var currentDoc;
    
    this.Save = function(){
      var t = $('#title').html();
      var c = $('#content').html();
      if(currentDoc == undefined){
        currentDoc = new Doc();
      }
      currentDoc.title = t;
      currentDoc.content = c;
      currentDoc.Save();
    }
    
    this.New = function(){
      if($('#title').html().length > 5 || $('#content').html().length > 10){
        alert('Prompt') //TODO option to save dont save or cancel
      }else{
        $('#title').html('');
        $('#content').html('');
        currentDoc = undefined;
      }
    }
    //DOCCONTROLLER END CODE
  }
});
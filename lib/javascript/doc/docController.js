define(['jquery','doc/docModel'], function($, Doc) {
  return function DocController(){
    //DOCCONTROLLER START CODE
    
		var self = this;
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
      $('#title').html('');
      $('#content').html('');
      currentDoc = undefined;
    }
    //DOCCONTROLLER END CODE
  }
});
define(function() {
		return function docsController(){
    
    this.currentDoc;
    
    this.save = function(){
      var t = $('#title').html();
      var c = $('#content').html();
      doc.title = t;
      doc.content = c;
      doc.save();  
    }
    
    
    
    }
});
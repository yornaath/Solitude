define(['jquery', 'util/gears', 'doc/docModel'],
function($, Gears, Doc) {
  return function DocController() {
    //DOCCONTROLLER START CODE
    var self = this;
    var currentDoc;

    this.Save = function() {
      var t = $('#title').html();
      var c = $('#content').html();
      if (currentDoc == undefined) {
        currentDoc = new Doc();
      }
      currentDoc.title = t;
      currentDoc.content = c;
      currentDoc.Save();
    }

    this.New = function() {
      $('#title').html('');
      $('#content').html('');
      currentDoc = undefined;
    }

		this.Index = function() {
			if (currentDoc) {
				return currentDoc.All();
			}else{
				currentDoc = new Doc();
				return currentDoc.All();
			};
		};

		this.Open = function(docId) {
			if(currentDoc) {
				try{
					currentDoc = currentDoc.Find(docId);
				}catch(err){
					Gears.log(err);
				}
			}else{
				try{
					currentDoc = new Doc().Find(docId);
				}catch(err){
					Gears.log(err);
				}
			};
			if(currentDoc){
				$('#title').html(currentDoc.title);
				$('#content').html(currentDoc.content);
			}
		};
    //DOCCONTROLLER END CODE
  }
});
define(['jquery', '../util/gears', '../doc/docModel'],
function($, Gears, Doc) {
  return function DocController() {
    //DOCCONTROLLER START CODE
    var self = this;
    var currentDoc;

    var saved = false;

    this.Save = function() {
      var t = $('#title').html();
      var c = $('#content').html();
      if (currentDoc == undefined) {
        currentDoc = new Doc();
      }
      currentDoc.title = t;
      currentDoc.content = c;
      currentDoc.Save();
      self.saved = true;
    }

    this.New = function() {
      $('#title').html('');
      $('#content').html('');
      self.saved = true;
      currentDoc = undefined;
    }

    this.Index = function() {
      if (currentDoc) {
        return currentDoc.All();
      } else {
        currentDoc = new Doc();
        return currentDoc.All();
      };
    };
    this.Destroy = function(id) {
      if (currentDoc) {
        currentDoc.Destroy(id);
      } else {
        currentDoc = new Doc();
        return currentDoc.Destroy(id);
      };
    };
    this.Open = function(docId) {
      if (currentDoc) {
        try {
          currentDoc = currentDoc.Find(docId);
        } catch(err) {
          Gears.log(err);
        }
      } else {
        try {
          currentDoc = new Doc().Find(docId);
        } catch(err) {
          Gears.log(err);
        }
      };
      if (currentDoc) {
        self.saved = true;
        $('#title').html(currentDoc.title);
        $('#content').html(currentDoc.content);
      }
    };
    //DOCCONTROLLER END CODE
  }
});
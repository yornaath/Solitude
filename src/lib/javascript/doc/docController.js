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
      if (currentDoc.Save()) {
        Gears.warning("Successfully saved");
				self.saved = true;
      } else {
				Gears.warning("Could not save");
			}
    }

    this.New = function() {
      $('#title').html('');
      $('#content').html('');
      self.saved = true;
      currentDoc = undefined;
      Gears.warning("New document");
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
			var success = false
      if (currentDoc) {
        if (currentDoc.Destroy(id)) {
          Gears.warning("Successfully deleted");
					success = true
        } else {
          Gears.warning("Could not delete");
        }
      } else {
        currentDoc = new Doc();
      };
			return success;
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
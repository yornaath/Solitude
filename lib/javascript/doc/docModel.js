define(function() {

  return function Doc() {
    this.id;
    this.title;
    this.content;
    this.tags;
    this.created;
    this.edited;

    this.All = function() {
      var logLength = localStorage.length;
      var allDocs = [];
      for (i = 0; i < logLength; i++) {
        var id = localStorage.key(i);
        if (this.Find(id).id != 'systemData') {;
          allDocs[i] = this.Find(id);
        }
      }
      allDocs.sort(function(a, b) {
        return a.edited.time - b.edited.time;
      });
      return allDocs;
    }

    this.Find = function(id) {
      if (id != 'systemdata') {
        var rawData = localStorage.getItem(id);
        if (rawData) {
          var docArray = JSON.parse(rawData);
          docArray['id'] = id;
          var doc = new Doc();
          doc.id = id;
          doc.title = docArray['title'];
          doc.content = docArray['content'];
          doc.tags = docArray['tags'];
          doc.edited = docArray['edited'];
          doc.created = docArray['created'];
          return doc;
        } else {
          throw 'could not find document with id of: ' + id;
        };
      } else {
        return undefined;
      }
    };

    this.Destroy = function(id) {
      try {
        localStorage.removeItem(id);
      } catch(e) {
        return e;
      }
    };

    this.Save = function() {
      var newDate = new Date();
      if (this.created == undefined) {
        var created = {
          'date': newDate.getDate(),
          'month': newDate.getMonth(),
          'year': newDate.getFullYear(),
          'time': newDate.getTime()
        };
        this.created = created;
      }
      this.edited = {
        'date': newDate.getDate(),
        'month': newDate.getMonth(),
        'year': newDate.getFullYear(),
        'time': newDate.getTime()
      };
      var data = {
        'title': this.title,
        'content': this.content,
        'tags': this.tags,
        'created': this.created,
        'edited': this.edited
      };
      if (this.id == undefined) {
        this.id = newDate.getTime();
      }
      try {
        localStorage.setItem(this.id, JSON.stringify(data));
      } catch(e) {
        switch (e) {
        case NOT_SUPPORTED_ERR:
          Gears.log("exception(" + e + ") thrown on localStorage.setItem(), local storage is not supported");
          break;
        case QUOTA_EXCEEDED_ERR:
          Gears.log("exception(" + e + ") thrown on localStorage.setItem(), local storage is full");
          break;
        default:
          Gears.log("exception(" + e + ") thrown on localStorage.setItem(),");
          break;
        }
      }
    }


  }

});
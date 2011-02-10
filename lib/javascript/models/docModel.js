define(function(){

  return function Doc(){
    this.id;
    this.title;
    this.content;
    this.tags;
    this.created;
    this.edited;
    
    this.All = function(){
      var logLength = localStorage.length;
      var allDocs = [];
      for (i = 0; i < logLength; i++) {
        var id = localStorage.key(i);
        allDocs[i] = this.Find(id);
      }
      allDocs.sort(function(a,b){
        return a.edited.time - b.edited.time; 
      });
      return allDocs;
    }
    
    this.Find = function(id){
      try {
        var rawData = localStorage.getItem(id);
        var docArray = JSON.parse(rawData);
        docArray['id'] = id;
      }catch(e){
        if (e == QUOTA_EXCEEDED_ERR) {
        alert('Storage is full!'); 
        }
      }
      return docArray;
    }
    
    this.Save = function(){
      var newDate = new Date();
      if(this.created == undefined){
        var created = {'date': newDate.getDate(), 'month': newDate.getMonth(), 'year': newDate.getFullYear(), 'time': newDate.getTime()};
        this.created = created;
      }
      this.edited = {'date': newDate.getDate(), 'month': newDate.getMonth(), 'year': newDate.getFullYear(), 'time': newDate.getTime()};
      var data = {'title':this.title, 'content':this.content, 'tags':this.tags, 'created':this.created, 'edited':this.edited};
      if(this.docId == undefined){
        this.docId = newDate.getTime();
      }
      localStorage.setItem(this.docId, JSON.stringify(data));
    }
    
    
  }

});
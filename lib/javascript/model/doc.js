define(function() {
		return function doc(){
			this.docId;
			this.title;
			this.content;
			this.tags;
			this.created;
			this.edited;
			this.save = function(){
				var newDate = new Date();
				if(this.created == undefined){
					this.created = newDate;
				}
				this.edited = newDate;
				var data = {'title':this.title, 'content':this.content, 'tags':this.tags, 'created':this.created, 'edited':this.edited};
				if(this.docId == undefined){
					this.docId = newDate.getTime();
				}
				localStorage.setItem(this.docId, JSON.stringify(data));
			}
			this.get = function(docId){
				var rawData = localStorage.getItem(docId);
				var docArray = JSON.parse(rawData);
				this.title = docArray['title'];
				this.content = docArray['content'];
				this.tags = docArray['tags'];
				this.created = docArray['created'];
				this.edited = docArray['edited'];
				return this;
			}
			this.getLastEditedDoc = function(){
				var logLength = localStorage.length;
				var lastEditedId = 0;
				var i = 0;
				for (i = 0; i <= logLength; i++) {
					var itemKey = localStorage.key(i);
					if(itemKey > lastEditedId){
						lastEditedId = itemKey;
					}
				}
				return this.get(lastEditedId);
			}
		}
	}
);
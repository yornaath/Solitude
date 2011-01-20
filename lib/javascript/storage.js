function documentItem(){
	this.title;
	this.content;
}

function documentItemHandler(){

	var currentDocumentId;

	this.save = function(documentItem){
		if(this.currentDocumentId == undefined){
			var newDate = new Date();
			var itemId = newDate.getTime();
			localStorage.setItem(itemId, JSON.stringify(documentItem));
			this.currentDocumentId = itemId;
		}
		else{
			localStorage.removeItem(this.currentDocumentId);
			var newDate = new Date();
			var itemId = newDate.getTime();
			localStorage.setItem(itemId, JSON.stringify(documentItem));
			this.currentDocumentId = itemId;
		}
	}
	
	this.get = function(itemId){
		d = localStorage.getItem(itemId);
		return d;
	}
	
	this.getLatestDocumentId = function(){
		var logLength = localStorage.length;
		var latest = 0;
		for (i = 0; i <= logLength; i++) {
			var itemKey = localStorage.key(i);
			if(itemKey > latest){
				latest = itemKey;
			}
		}
		return latest;
	}
	
}

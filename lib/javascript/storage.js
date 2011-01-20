

function storageHandler(){
	this.save_document = function(id, document){
		localStorage.setItem(id, document);
	}
}

function document(){
	this.title;
	this.content;
}

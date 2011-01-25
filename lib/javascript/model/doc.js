/*
 * !!TODO: error handling,
*/
define(function() {
		return function doc(){
			this.docId;
			this.title;
			this.content;
			this.tags;
			this.created;
			this.edited;
			
			/*
			 * @Name: doc.save
			 * @Function: saves the current loaded doc to localStorage. If it doesnt have a created date it
			 *            creates a new document, if it has a created date it updates edited date and overwrite old copy with new data 
			 * @Parameters: undefined
			 * @ReturnValue: 
			*/
			this.save = function(){
				var newDate = new Date();
				if(this.created == undefined){
					this.created = newDate;
				}
				this.edited = {'date': newDate.getDate(), 'month': newDate.getMonth(), 'year': newDate.getFullYear()};
				var data = {'title':this.title, 'content':this.content, 'tags':this.tags, 'created':this.created, 'edited':this.edited};
				if(this.docId == undefined){
					this.docId = newDate.getTime();
				}
				localStorage.setItem(this.docId, JSON.stringify(data));
			}
			
			/*
			 * @Name: doc.get
			 * @Function: gets a singel document from localStorage in JSON format by specified Id
			 * @Parameters: (int/timestamp docId)
			 * @ReturnValue: returns an array parsed from JSON
			*/
			this.get = function(docId){
				var rawData = localStorage.getItem(docId);
				var docArray = JSON.parse(rawData);
				return docArray;
			}
			
			/*
			 * @Name: doc.GetAll
			 * @Function: gets all the doc's in JSON form from localStorage 
			 * @Parameters: (int paged) specifies pagination by how many doc's pr page, splices the docs into new arrays, one pr "page"
			 * @ReturnValue: returns an array parsed from JSON
			*/
			this.getAll = function(paged){
				var logLength = localStorage.length;
				var allDocs = [];
				var i = 0;
				for (i = 0; i < logLength; i++) {
					var docId = localStorage.key(i);
					allDocs[i] = this.get(docId);
				}
				if(paged != undefined){
					var pageArray = [];
					var nrOfDocs = logLength;
					var docsPrPage = paged;
					var nrOfPages = Math.floor(nrOfDocs/docsPrPage);
					var lastPageDocNr = nrOfDocs - (docsPrPage*nrOfPages);
					var pI = 0;
					for (i = pI; i < nrOfPages; i++) {
						pageArray[i] = allDocs.splice(0,docsPrPage);
					}
					if(lastPageDocNr > 0){
						var lastPageKey = nrOfPages;
						pageArray[lastPageKey] = allDocs;
					}	
					return pageArray;
				}
				else{
					return allDocs;
				}
			}
			
			/*
			 * @Name: doc.getLastEditedDoc
			 * @Function: gets the doc that was last edited from localStorage
			 * @Parameters: undefined
			 * @ReturnValue: an array parsed from JSON
			*/
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
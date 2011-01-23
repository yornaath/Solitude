define(["model/doc"],
        function (doc) {

			return function docHandler(){
			
				this.currentDocId = this.getLastEditedDocId();
				
				this.getLastEditedDocId = function(){
					var logLength = localStorage.length;
					var lastEditedId = 0;
					for (i = 0; i <= logLength; i++) {
						var itemKey = localStorage.key(i);
						if(itemKey > lastEditedId){
							lastEditedId = itemKey;
						}
					}
					return lastEditedId;
				}
			}
			
       }
    );
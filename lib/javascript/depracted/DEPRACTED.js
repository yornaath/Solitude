var dHandler = new docHandler();
			
			//check if local storage not empty and get the latest document from it if not
			if(localStorage.length > 0){
				var lastEditedDocument = JSON.parse(dHandler.getLastEditedDoc());
				$('#title').val(lastEditedDocument['title']);
				$('#content').val(lastEditedDocument['content']);
			}
			//create new documentItem with the values from text areas and save it to local storage
			$('#save').click(function(){
				var title = $('#title').val();
				var content = $('#content').val();
				var doc = new documentItem();
				doc.title = title;
				doc.content = content;
				dItemHandler.save(doc);
			});
			//saves the document every 5 seconds
			var intervalsave = window.setInterval(function(){
				var title = $('#title').val();
				var content = $('#content').val();
				var doc = new documentItem();
				doc.title = title;
				doc.content = content;
				dItemHandler.save(doc);
			}, 4500);
			$('#new').click(function(){
				$('#title').val('');
				$('#content').val('');
				documentItemHandler.currentDocumentId = undefined;
			});
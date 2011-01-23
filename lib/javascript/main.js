var required_modules = 
	[
		"jquery",
		"model/doc"
	];

require(required_modules, function($, doc) {
    $(function() {
        require.ready(function() {
			
			//MAIN START CODE
			
			
			
			
			doc = new doc();
			var currDoc = doc.getLastEditedDoc();
			$('#title').val(currDoc['title']);
			$('#content').val(currDoc['content']);
			
			$('#save').click(function(){
				var t = $('#title').val();
				var c = $('#content').val();
				doc.title = t;
				doc.content = c;
				doc.save();
			});
			$('#new').click(function(){
				$('#title').val('Untitled');
				$('#content').val('');
				doc.docId = undefined;
			});
			
			//END MAIN CODE
			
		});
    });
})
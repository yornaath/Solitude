var required_modules = 
	[
		"jquery",
		"model/doc",
		"cssAdjust"
	];

require(required_modules, function($, doc) {
    $(function() {
        require.ready(function() {
			
			//MAIN START CODE
			
			doc = new doc();
			
			/*var i = 1;
			for (i = 1; i <= 20; i++) {
			doc.docId = i;
			doc.title = "T"+i;
			doc.content = "C"+i;
			doc.save();
			doc.docId = undefined;
			}*/
			
			var months = {0:"January",1:"February",2:"March",3:"April",4:"May",5:"Jun",6:"July",7:"August",8:"September",9:"October",10:"November",11:"December"};
			/*var currDoc = doc.getLastEditedDoc();
			$('#title').val(currDoc['title']);
			$('#content').val(currDoc['content']);
			*/
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
			
			$('#open').click(function(){
				$("#docBrowser").toggle(0, function(){
					if($("#docBrowser").is(":visible")){
						$("div").not("#docBrowser").css("opacity", "0.6");
						var allDocs = doc.getAll();
						var allDocLength = allDocs.length;
						var docList = "<table>";
						var i = 0;
						for (i = 0; i < allDocLength; i++) {
							docList += "<tr>" +
							"<td>"+allDocs[i].title+"</td>" + 
							"<td>"+allDocs[i].edited['date']+" of "+months[allDocs[i].edited['month']]+" "+allDocs[i].edited['year']+"</td>" +
							"</tr>";
						}
						docList += "</table>";
						$("#docBrowser").html(docList);
					}else{
						$("div").not("#docBrowser").css("opacity", "1");
					}
				});
				
			});
			
			//END MAIN CODE
			
		});
    });
})
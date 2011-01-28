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
			/*var nr = 20;
			for(var i = 1; i < nr; i++){
				doc.docId = undefined;
				doc.title = 'Title of the doc '+i;
				doc.content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sagittis luctus fermentum. Aenean eget magna lacus, ut varius mauris. Proin rhoncus fringilla tortor. Nam vel metus arcu, ornare auctor turpis. Aliquam erat volutpat. Nullam imperdiet sem vel arcu rutrum ut euismod neque dapibus. Sed volutpat sagittis lacus sit amet elementum. Curabitur ac orci quis eros egestas vestibulum. Vivamus condimentum tortor id dui ultrices nec hendrerit purus euismod. Nam eget pharetra augue. Curabitur ut nisi sem, et faucibus felis. Quisque ultricies blandit risus, non accumsan lorem pulvinar id. Nunc mattis mauris sit amet purus gravida at blandit lorem dignissim. Cras at ante lectus, ac vehicula augue. Suspendisse pharetra metus ut lacus dignissim auctor. In hac habitasse platea dictumst. Aliquam erat volutpat. Aliquam nulla erat, placerat faucibus blandit a, lacinia ut tortor. Sed semper diam ut est fermentum convallis.';
				doc.save();
			}*/
			var months = {0:"January",1:"February",2:"March",3:"April",4:"May",5:"Jun",6:"July",7:"August",8:"September",9:"October",10:"November",11:"December"};
			/*var currDoc = doc.getLastEditedDoc();
			$('#title').val(currDoc['title']);
			$('#content').val(currDoc['content']);
			*/
			$('#save').click(function(){
				var t = $('#title').html();
				var c = $('#content').html();
				doc.title = t;
				doc.content = c;
				doc.save();
			});
			$('#new').click(function(){
				$('#title').html('Untitled');
				$('#content').html('');
				doc.docId = undefined;
			});
			
			$('#open').click(function(){
				//switches the state of the docBrowsers display property between visible and hidden
				$("#docBrowser").toggle(0, function(){
					//if the click function makes the docBrowseer visible get alle docs from localStorage and divide into pages(tables)
					if($("#docBrowser").is(":visible")){
						$("div").not("#docBrowser").css("opacity", "0.6");
						var docList = '';
						var allDocs = doc.getAll(13);
						var nrOfPages = allDocs.length;
						for(var p = 0; p < nrOfPages; p++){
							var pageDocs = allDocs[p];
							var pageDocLength = allDocs[p].length;
							docList += "<table id='p"+p+"' class='docBrowserPage'>";
							var i = 0;
							for (i = 0; i < pageDocLength; i++) {
								docList += "<tr id='"+pageDocs[i].docId+"'>" +
								"<td>"+pageDocs[i].title+"</td>" + 
								"<td>"+pageDocs[i].edited['date']+" of "+months[pageDocs[i].edited['month']]+" "+pageDocs[i].edited['year']+"</td>" +
								"</tr>";
							}
							docList += "</table>";
						}
					}else{
						$("div").not("#docBrowser").css("opacity", "1");
					}
					//if there are more than one page with docs introduce a menu for swtching page on the bottom
					//innitialize current page and handle clicks for left and right trough the pages
					if(nrOfPages > 1){
						docList += "<div class='nav'>"+
						"<table><tr>"+
						"<td id='navLeft'></td>"+
						"<td id='navRight'>></td>"+
						"</tr></table>"+
						"</div>";
						$("#docBrowser").html(docList);
						$("#docBrowser").css("min-height", $(this).height());
						$("#docBrowser").css("max-height", $(this).height());
						
						var currPage = 0;
						
						$('.nav td').click(function(){
							$("#docBrowser .nav").css("position","absolute");
							switch($(this).attr('id')){
								case 'navLeft':
									if(currPage != 0){
										currPage--;
										$('#docBrowser > table:visible').hide();
										$('#docBrowser #p'+currPage).show();
									}
									break;
								case 'navRight':
									if(currPage < nrOfPages-1){
										currPage++;
										$('#docBrowser > table:visible').hide();
										$('#docBrowser #p'+currPage).show();
									}
									break;
								default:
									//do nothing.. yet
							}
							if(currPage == 0 || currPage == nrOfPages-1){
								switch(currPage){
									case 0:
										$('.nav #navLeft').html('');
										break;
									case nrOfPages-1:
										$('.nav #navRight').html('');
										break;
								}
							}else{
								$('.nav #navLeft').html('<');
								$('.nav #navRight').html('>');
							}
						});
					}else{
						$("#docBrowser").html(docList);
					}
				});
				//Handles user click on a doc, sets current doc.id to the id of desired doc
				//gets the doc from localStorage and populates textareas with data.
				$('#docBrowser > table tr').click(function(){
					var docId = $(this).attr('id');
					doc.docId = docId;
					var oDoc = doc.get(docId);
					$('#title').html(oDoc.title);
					$('#content').html(oDoc.content);
					
				});
			});
			
			//END MAIN CODE
		});
    });
})
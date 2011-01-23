//clears text areas and unsets currentDocumentId
$('#new').click(function(){
	$('#title').val('');
	$('#content').val('');
	dItemHandler.currentDocumentId = undefined;
});

//create new documentItem with the values from text areas and save it to local storage
$('#save').click(function(){
	var title = $('#title').val();
	var content = $('#content').val();
	var doc = new documentItem();
	doc.title = title;
	doc.content = content;
	dItemHandler.save(doc);
});
//saves the document every 5 seconds
$(document).ready(function(){
var intervalsave = window.setInterval(function(){
	var title = $('#title').val();
	var content = $('#content').val();
	var doc = new documentItem();
	doc.title = title;
	doc.content = content;
	dItemHandler.save(doc);
}, 4500);
});
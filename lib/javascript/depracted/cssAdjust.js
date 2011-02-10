require(['jquery'], function($) {
    $(function() {
        require.ready(function() {
		
		
			//setts the docBrowser panel to the center of the screen depending on the users available screen space
			//$("#docBrowser").css({"margin-left": (screen.availWidth -$("#docBrowser").width())/2});
			$("#docBrowser").draggable();
			$("#docBrowser").resizable();
		
		
		});
  });
})
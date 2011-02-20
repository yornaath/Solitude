var required_modules =
[
"jquery",
"util/gears",
"doc/docController",
"twitterFeed/twitterFeedController"
];

require(required_modules,
function($, Gears, DocController, TwitterFeedController) {
  $(function() {
    require.ready(function() {
      //MAIN START CODE
      var docController = new DocController();
			
			if(!localStorage.getItem('systemdata')){
				Gears.showIntroduction();
				localStorage.setItem('systemdata', "{'userstatus': '!new'}");
			}
			
			
      $('#save').click(function() {
          docController.Save();
      });

      $('#new').click(function() {
          docController.New();
      });

			$('#open').click(function() {
          Gears.docBrowser(docController.Index());	
			});
			
			$('#docBrowserDocs tr td:first-child').live('click', function(){
				var docId = $(this).parent().attr('id');
					docController.Open(docId);
					$('.shadowOverlay').fadeOut(400, function(){
						$(this).remove();
					});
			});
			$("#docBrowserDocs tr .docDestroy").live('click', function(){
				var id = $(this).attr('id');
				docController.Destroy();
				$("#"+id).fadeOut(400, function() {
					docController.Destroy(id);
					$(this).remove();
					if($("#docBrowserDocs tbody").html() == ""){
						$('.shadowOverlay').fadeOut(400, function(){
							$(this).remove();
						});
					}	
				});
			});
			
      var twitterFeedController = new TwitterFeedController();
      //END MAIN CODE
    });
  });
});

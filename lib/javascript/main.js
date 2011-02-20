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
			
      $('#save').click(function() {
          docController.Save();
      });

      $('#new').click(function() {
          docController.New();
      });

			$('#open').click(function() {
          Gears.docBrowser(docController.Index());	
			});
			
			$('#docBrowserDocs tr').live('click', function(){
				var docId = $(this).attr('id');
					docController.Open(docId);
					$('.prompt').remove();
			});
			
      var twitterFeedController = new TwitterFeedController();
      //END MAIN CODE
    });
  });
});

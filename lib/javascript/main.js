var required_modules = 
  [
    "jquery",
    "controllers/docController",
		"controllers/twitterFeedController"
  ];

require(required_modules, function($, DocController, TwitterFeedController) {
  $(function() {
    require.ready(function() {
      //MAIN START CODE
      var docController = new DocController();
      $('#save').click(function(){
        docController.Save();
      });
      $('#new').click(function(){
        docController.New();
      });

			var twitterFeedController = new TwitterFeedController();
      //END MAIN CODE
    });
  });
});

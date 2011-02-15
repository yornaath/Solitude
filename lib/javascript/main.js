var required_modules = 
  [
    "jquery",
		"util/gears",
    "doc/docController",
		"twitterFeed/twitterFeedController"
  ];

require(required_modules, function($, Gears, DocController, TwitterFeedController) {
  $(function() {
    require.ready(function() {
      //MAIN START CODE

			var gears = new Gears();
			
      var docController = new DocController();

      $('#save').click(function(){
				if($('#title').html().length <= 5 || $('#content').html().length < 10){
					var options = {
						"yes": function(){docController.Save();$('.prompt').remove()}
					}
					gears.systemPrompt("That document is very short, do you still want to save it?", options);
				}else{
					docController.Save();
				}
      });

      $('#new').click(function(){
				if($('#title').html().length >= 4 || $('#content').html().length > 10){
					var options = {
						"yes": function(){docController.Save();$('.prompt').remove()},
						"no": function(){
							$('#title').html('');
		        	$('#content').html('');
		        	currentDoc = undefined;
							$('.prompt').remove()
						}
					}
					gears.systemPrompt("The document you are currently editing is not saved, do you want to save it?", options);
	      }else{
					docController.New();
	      }
      });

			var twitterFeedController = new TwitterFeedController();
      //END MAIN CODE
    });
  });
});

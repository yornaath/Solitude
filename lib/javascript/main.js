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
			docController.New();
			
			if(!localStorage.getItem('systemData')){
				Gears.showPopup("<iframe style='border: 0px solid gray; width: 100%; height: 245px;' src='introduction.html'/>");
				var systemDataInitSettings = {"userStatus":"notnew","feedInterval":"12000"};
				localStorage.setItem("systemData", JSON.stringify(systemDataInitSettings));
			}
			
			
      $('#save').click(function() {
          docController.Save();
      });

      $('#new').click(function() {
				if(!docController.saved){
					var options = {
						"yes": function(){
								docController.Save();
								docController.New();
						},
						"no": function(){
							docController.New();
						},
						"cancel": function(){
							//close warning
					}};
					Gears.warning('Thou should save that document?', options);
				}else{
					docController.New();
				}
      });

			$('#open').click(function() {
				if(!docController.saved){
					var options = {
						"yes": function(){
							docController.Save();
							Gears.docBrowser(docController.Index());
						},
						"no": function(){
							Gears.docBrowser(docController.Index());	
						}};
					Gears.warning('Thou should save that document?', options);
				}else{
					Gears.docBrowser(docController.Index());	
				}
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
			
			$('#title').keydown(function(){
				docController.saved = false;
			});
			$('#content').keydown(function(){
				docController.saved = false;
			});
			
			
      var twitterFeedController = new TwitterFeedController();



			$('#oops').click(function(){
				Gears.showPopup("<div><h1>Crap.. :/</h1><p>No worries tough! Leave me a mail at <span style='color: rgba(211/100/59, 0.6);'>solitude@cygnus-group.net</span> or leave a issue on the <a href='https://github.com/andtan/Solitude/issues' target='_blank'>github page</a>. If you want a feature or have an opinion about an existing one feel free to email me. Your contribution to making the app better is much appreciated!</p></div>");
			});
      //END MAIN CODE
    });
  });
});

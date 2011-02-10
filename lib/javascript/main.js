var required_modules = 
  [
    "jquery",
    "controllers/docController"
  ];

require(required_modules, function($, DocController) {
  $(function() {
    require.ready(function() {
      //MAIN START CODE
      
      
      var contentWidth = $('#content').outerWidth();
      $('#menu').css("margin-left", contentWidth+"px");
      
      
      var docController = new DocController();
      $('#save').click(function(){
        docController.Save();
      });
      $('#new').click(function(){
        docController.New();
      });
      //END MAIN CODE
    });
  });
});

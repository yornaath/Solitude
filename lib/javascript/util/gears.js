define(['jquery'],
function($) {

  var Gears = {
		showIntroduction: function(){
			$("body").append("<div class='shadowOverlay'><div id='introduction'></div></div>");
			$('.shadowOverlay').fadeIn(400);
			$('#introduction').html("<div id='closeIntro' style='float: right; cursor: pointer;'>Close</div><iframe style='border: 0px solid gray; width: 100%; height: 230px;' src='introduction.html'/>");
			$("#closeIntro").click(function(){
				$('.shadowOverlay').fadeOut(400, function(){
					$('.shadowOverlay').remove();
				});
			});
		}, 
		monthToString: function(monthInt){
			var months = ["January", "February", "March", "April", "May", "Jun", "July", "August", "September", "October", "November", "December"];
			if(monthInt <= 12 && monthInt >= 1){
				return months[monthInt];
			}else{
				throw monthInt + " is not a month";
			}
		},
		warning: function(message, options){
			options['cancel'] = function(){
				$('#warning').fadeOut(400, function(){
					$('#warning').remove();
				});
			};
			$('#menu').prepend("<div id='warning'></div>");
			$('#warning').fadeIn(400);
			for(key in options){
				$('#warning').append("<span id='"+key+"'>"+key+"</span>");
				$('#'+key).live('click', function(){
					options[$(this).attr('id')]();
					$('#warning').fadeOut(400, function(){
						options['cancel']();
					});
				});
			}
			$('#warning').prepend(message);
		},
		docBrowser: function(allDocs){
			$("body").append("<div class='shadowOverlay'><div id='docbrowser'><table id='docBrowserDocs'></table></div></div>");
			$('.shadowOverlay').fadeIn(400);
			if(allDocs.length != 0){
				for(docN in allDocs){
					$("#docBrowserDocs").append("<tr id='"+allDocs[docN].id+"'>"+
						"<td>"+allDocs[docN].title+"</td>"+
						"<td>"+allDocs[docN].edited.date+" of "+Gears.monthToString(allDocs[docN].edited.month)+"</td>"+
						"<td class='docDestroy' id='"+allDocs[docN].id+"'>delete</td"+
						"</tr>");
				};
			}else{
				$("#docBrowserDocs").append("<p style='width: 100%; text-align: center; cursor: pointer;'>No docs in local storage. Click to close</p>");
				$("#docBrowserDocs p").click(function(){
					$(".shadowOverlay").fadeOut(400, function(){
						$(this).remove();
					});
				});
			}	
		},
    log: function(message) {
      console.log(message);
    }
  }
	
  return Gears;
});
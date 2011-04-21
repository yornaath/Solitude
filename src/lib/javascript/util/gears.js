define(['jquery'],
function($) {

  var Gears = {
    showPopup: function(content) {
      $("#popup").show();
      $('.shadowOverlay').fadeIn(400);
      $('#popup').html("<img id='closePopup' style='float: right; cursor: pointer;' src='style/grphx/x.png'>" + content);
      $("#closePopup").click(function() {
        Gears.closePopup(event);
      });
    },
    closePopup: function(event) {
      var shadowOverlay = $(".shadowOverlay");
      shadowOverlay.fadeOut(400,
      function() {
        $(this).children().each(function() {
          $(this).hide();
        });
      });
    },
    monthToString: function(monthInt) {
      var months = ["January", "February", "March", "April", "May", "Jun", "July", "August", "September", "October", "November", "December"];
      if (monthInt <= 12 && monthInt >= 1) {
        return months[monthInt];
      } else {
        throw monthInt + " is not a month";
      }
    },
    warning: function(message, options) {
			if($("#warning").length == 0){
				$('#menu').prepend("<div id='warning'></div>");
				$('#warning').fadeIn(400);
				$('#warning').prepend(message);
			} else {
				$('#warning').html("");
				$('#warning').prepend(message);
				var oriColor = $('#warning').css("background-color");
				$('#warning').animate({
					'background-color': '#D87144'
				}, 200, function() {
					$(this).animate({
						'background-color': oriColor
					}, 200, function() {

					});
				});
			}
      if (!options) {
				if(!this.removeTimer){
					this.removeTimer = setTimeout(function() {
	          Gears.removeWarning();
	        },
	        2000);
				} else {
					clearTimeout(this.removeTimer);
					this.removeTimer = setTimeout(function() {
	          Gears.removeWarning();
	        },
	        2000);
				}
      } else {
				if(this.removeTimer) clearTimeout(this.removeTimer);
        options['cancel'] = function() {
          Gears.removeWarning();
        };
        for (key in options) {
          $('#warning').append("<span id='" + key + "' class='option'>" + key + "</span>");
        }
        $('.option').live('click',
        function() {
          options[$(this).attr('id')]();
          Gears.removeWarning();
					$('.option').die('click');
        });
      }
    },
		removeWarning: function() {
			$('#warning').fadeOut(400,
      function() {
        $(this).remove();
      });
		},
    docBrowser: function(allDocs) {
      $("#docbrowser").draggable();
      $("#docbrowser").show();
      $("#docBrowserDocs").html("");
      $('.shadowOverlay').fadeIn(400);
      if (allDocs.length != 0) {
        for (docN in allDocs) {
          $("#docBrowserDocs").append("<tr id='" + allDocs[docN].id + "'>" +
          "<td>" + allDocs[docN].title + "</td>" +
          "<td>" + allDocs[docN].edited.date + " of " + Gears.monthToString(allDocs[docN].edited.month) + " " + allDocs[docN].edited.year + "</td>" +
          "<td class='docDestroy' id='" + allDocs[docN].id + "'></td" +
          "</tr>");
        };
      } else {
        $("#docBrowserDocs").append("<p style='width: 100%; text-align: center; cursor: pointer;'>No docs in local storage. Click to close</p>");
        $("#docBrowserDocs p").click(function(event) {
          Gears.closePopup(event);
        });
      }
    },
    log: function(message) {
      console.log(message);
    }
  }

  return Gears;
});
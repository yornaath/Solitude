define(['jquery'],
function($) {

  var Gears = {
    showPopup: function(content) {
      $("body").append("<div class='shadowOverlay'><div id='popup'></div></div>");
      $('.shadowOverlay').fadeIn(400);
      $('#popup').html("<img id='closePopup' style='float: right; cursor: pointer;' src='style/grphx/x.png'>" + content);
      $("#closePopup").click(function() {
        $('.shadowOverlay').fadeOut(400,
        function() {
          $('.shadowOverlay').remove();
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
      $('#menu').prepend("<div id='warning'></div>");
      $('#warning').fadeIn(400);
      $('#warning').prepend(message);
      if (!options) {
        setTimeout(function() {
          $('#warning').fadeOut(400,
          function() {
            $('#warning').remove();
          });
        },
        2000);
      } else {
        options['cancel'] = function() {
          $('#warning').fadeOut(400,
          function() {
            $('#warning').remove();
          });
          $('.option').die('click');
        };
        for (key in options) {
          $('#warning').append("<span id='" + key + "' class='option'>" + key + "</span>");
        }
        $('.option').live('click',
        function() {
          options[$(this).attr('id')]();
          $('#warning').fadeOut(400,
          function() {
            options['cancel']();
          });
        });
        if (!options) {
          $('#warning').fadeOut(400,
          function() {
            $('#warning').remove();
          });
          $('.option').die('click');
        }
      }
    },
    docBrowser: function(allDocs) {
      $('.shadowOverlay').remove();
      $("body").append("<div class='shadowOverlay'><div id='docbrowser'><table id='docBrowserDocs'></table></div></div>");
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
        $("#docBrowserDocs p").click(function() {
          $(".shadowOverlay").fadeOut(400,
          function() {
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
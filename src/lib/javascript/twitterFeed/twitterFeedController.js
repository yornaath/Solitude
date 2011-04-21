define(['jquery', 'twitterFeed/twitterFeed'],
function($, TwitterFeed) {
  return function twitterFeedController() {

    var tf = new TwitterFeed();

    $('#tagInput').blur(function() {
      if ($(this).val()) {
        var query = $(this).val();
        tf.twitterSearch(query);
      }
    });

    $('#tagInput').keyup(function(key) {
      if (key.keyCode == '13') {
        $(this).blur();
      }
    });

    $('aside #status_stream p').live('click',
    function() {
      var currentPosition = $(this).position();
      var wantedPosition = $('aside #status_hold').position();
      $(this).css({
        'position': 'absolute',
        'top': currentPosition.top,
        'left': currentPosition.left
      });
      $(this).removeClass($(this).attr('class')).addClass('transitionStatus');
      $(this).animate({
        'top': wantedPosition.top,
        'left': wantedPosition.left
      },
      400,
      function() {
        $(this).detach();
        $(this).bind('click',
        function() {
          $(this).css({
            'z-index': 100
          });
          $(this).animate({
            'margin-left': -400,
            'opacity': 0
          },
          400,
          function() {
            $(this).remove();
          });
        });
        $(this).removeClass($(this).attr('class')).addClass('lockedStatus');
        $(this).css({
          'position': 'relative',
          'left': '0px',
          'top': '0px'
        });
        $('aside #status_hold').prepend($(this));
      });
    });
  };

});
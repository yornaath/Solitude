define(['jquery'],
function($) {
  return function TwitterFeed() {
    var self = this;
    //capturing this classobject as var
    self.streamUpdateInterval = 8000;
    //the interval in wich the que is checked for new statuses
    self.requestsPrSearch = 10;
    //number of statuses to fetch per api call
    self.statusQue = [];
    //array holding qued statuses
    self.streamer;
    //captures the started setInterval in runStreamer()
    self.query;
    //holds the raw query the user types
    self.sinceId;
    //the newest statuses id, discriminate on this to find new statuses
    //starts the streamer
    self.runStreamer = function() {
      //sets a interval in wich the statusque is checked
      self.streamer = setInterval(function() {
        if (self.statusQue.length > 0) {
          //checkes that statusque has statuses
          self.renderStatus(self.statusQue.pop());
          //TRUE: pops status from end of array and renders to stream
        } else if (self.query) {
          //FALSE: if query is set
          self.twitterSearch();
          //TRUE: new twitterSearch()
        }
      },
      self.streamUpdateInterval);
    };

    //takes a status and renders it to stream
    self.renderStatus = function(status) {
      var statusView;
      status.text = (unescape(encodeURIComponent(status.text))).toLowerCase();
      var queryWords = (self.query.replace(",", " ")).split(" ");
      var qwi;
      for (qwi = 0; qwi < queryWords.length; qwi++) {
        status.text = status.text.replace(queryWords[qwi], "<span class='queryHighlight'>" + queryWords[qwi] + "</span>")
      }
      statusView = "<p class='activeStatus' id='" + status.id + "'>" + status.text + "</p>";
      $('aside #status_stream').prepend(statusView);
      $('aside #status_stream p:hidden').fadeIn(3000);
    }

    //sets query, clears que, removes hidden ellements in stream, clears sinceId since it is useless on new search,
    //generates url, calls twitter api and restarts streamer
    self.twitterSearch = function(query) {
      if (query) {
        self.query = query;
      }
      self.statusQue = [];
      $('aside #status_stream p:hidden').remove();
      if (self.streamer) {
        clearInterval(self.streamer);
      }
      self.sinceId = undefined;
      var url = self.generateUrl(self.query);
      self.apiCall(url);
      self.runStreamer();
    };

    //takes the users query and generates a url used to query the twitter search api with
    self.generateUrl = function(query) {
      var url = "http://search.twitter.com/search.json?&rpp=10&result_type=recent";

      query = (query.toLowerCase()).replace("#", "%23");
      var queryParams = query.split(",");
      var qi;
      url += "&q=";
      for (qi = 0; qi < queryParams.length; qi++) {
        url += queryParams[qi];
        if (qi < queryParams.length - 1) {
          url += "+";
        }
      }
      if (self.sinceId) {
        url += "&since_id=" + $('aside #status_stream p:first-child').atr('id');
      }
      return url;
    }


    self.apiCall = function(url) {
      $.ajax({
        url: url,
        crossDomain: true,
        dataType: "jsonp",
        success: function(response) {
          var statuses = response['results'];
          if (statuses) {
            statuses = self.filterRetweets(statuses);
            var si;
            for (si = 0; si < statuses.length; si++) {
              self.statusQue.push(statuses[si]);
              self.sinceId = statuses[si].id;
            }
            self.renderStatus(self.statusQue.pop());
          }
        }
      });
    };

    self.filterRetweets = function(statuses) {
      var si;
      var sii;
      var filteredStatuses = [];
      for (si = 0; si < statuses.length; si++) {
        for (sii = 0; sii < statuses.length; sii++) {
          if (statuses[si].text == statuses[sii].text && si != sii) {
            statuses.splice(si, 1);
          }
        }
      }
      return statuses;
    };
  };
});
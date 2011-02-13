function twitterTagFeed(){
              
  var self = this;

  self.apiCallInterval = 15000;
  self.query;
  self.sinceId;
  self.main;
  self.subMain = [];
  self.state;
  self.states = {1:'running', 2:'paused', 3:'stopped'};

  self.run = function(){
    var firstUrl = self.generateUrl(self.query);
    self.apiCall(firstUrl);
    var mp = setInterval(function(){
      if(self.state == 1){
        var url = self.generateUrl(self.query);
        self.apiCall(url);
      }
    }, self.apiCallInterval);
    self.main = mp;
  };

  self.pause = function(){
    self.state = 2;
    if(self.subMain.length > 0){
      var si;
      for(si = 0; si < self.subMain.length; si++){
        clearTimeout(self.subMain[si]);
      }
    }
    $('aside #status_stream p:hidden').remove();
  };

  self.generateUrl = function(query){
    var url = "http://search.twitter.com/search.json?&rpp=10&result_type=recent";
    
    query = query.toLowerCase();
    var queryParams = query.split(",");
    var qi;
    url += "&q=";
    for(qi = 0; qi < queryParams.length; qi++){
      url += queryParams[qi];
      if(qi < queryParams.length -1){
        url += "+";
      }
    }
    if(self.sinceId){
      url += "&since_id="+$('aside div p:first-child').atr('id');
    }
    return url;
  };

  self.apiCall = function(url){
    $.ajax({
      url: url,
      crossDomain: true,
      dataType: "jsonp",
      success: function(response){
        var feedData = response['results'];
        if(feedData){
          feedData = self.filterRetweets(feedData);
          self.statusRenderer(feedData.reverse());
        }
      }
    });
  };

  self.filterRetweets = function(statuses){
    var si;
    var sii;
    var filteredStatuses = [];
    for(si = 0; si < statuses.length; si++){
      for(sii = 0; sii < statuses.length; sii++){
        if(statuses[si].text == statuses[sii].text && si != sii){
          statuses.splice(si,1);
        }
      }
    }
    return statuses;
  };

  self.statusRenderer = function(feedData){
    var statIt;
    var interValSpeed = (self.apiCallInterval / feedData.length)-300;
    for(statIt = 0; statIt < feedData.length; statIt++){
      var status = unescape(encodeURIComponent(feedData[statIt].text));
      status = status.toLowerCase();
      var queryWords = (self.query.replace(",", " ")).split(" ");
      var qwi;
      for(qwi = 0; qwi < queryWords.length; qwi++){
        status = status.replace(queryWords[qwi], "<span class='queryHighlight'>"+queryWords[qwi]+"</span>")
      }
      $('aside #status_stream').prepend("<p id='"+feedData[statIt].id+"'>"+status+"</p>");
      if((statIt+1) == feedData.length){
      }
    }
    $($('aside #status_stream p:hidden').get().reverse()).each(function(index, stat){
        var to = setTimeout(function(){
          $(stat).fadeIn(3700);
        }, interValSpeed * index);
        self.subMain.push(to);
    });
  }

}




<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml"> 
    <head> 
        <link rel="shortcut icon" href="static/grphx/icon.ico"/> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
        <title>Solitude</title>
        <link rel="stylesheet" type="text/css" href="style/css/yui_reset.css"/>
		    <link rel="stylesheet" type="text/css" href="style/css/solitude_main.css"/>
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script> 
		    <script src="lib/javascript/jquery.ui.js"></script>
        <STYLE type="text/css">
          aside{
            position: relative;
            width: 23%;
            border: 1px solid gray;
            margin-left: 630px;
            margin-top: 200px;
            min-height: 400px;
          }
        </STYLE> 
        
        <script type="text/javascript" >
          $(document).ready(function(){ 
          
            
            function twitterTagFeed(){
            
              
              this.states = {1:'running', 2:'stopped', 3:'paused'};
              this.state = 2;
              this.apiCallInterval = 10000;
              this.query;
              this.lastId;
              
              this.run = function(){
                var urlGenerator = this.generateUrl();
                var apiCaller = this.apiCall();
                var url = urlGenerator(this.query);
                
                apiCaller(url);
                setInterval(function(){
                  
                  url = urlGenerator(this.query);
                  apiCaller(url);
                
                }, this.apiCallInterval);
              };
              
              this.generateUrl = function(query){
              
                return function(query){
                  var url = "http://search.twitter.com/search.json?lang=en&rpp=5";
                  var qi;
                  if(this.lastId){
                    url += "&since_id="+this.lastId;
                  }
                  url += "&q=";
                  var queryParams = query.split(",");
                  for(qi = 0; qi < queryParams.length; qi++){
                    url += "%23"+queryParams[qi];
                    if(qi < queryParams.length -1){
                      url += "&";
                    }
                  }
                  url = url.split(' ').join('');
                  return url;
                };
              };
              
              this.apiCall = function(url){
                var renderer = this.renderStatus();
                
                return function(url, renderer){
                  $.ajax({
                    url: url,
                    crossDomain: true,
                    dataType: "jsonp",
                    success: function(response){
                      var feedData = response['results'];
                      renderer(feedData);
                    }
                  });
                };
              };
              
              this.renderStatus = function(feedData){
              
                return function(feedData){
                  var utf8Ei;
                  for(utf8Ei = 0; utf8Ei < feedData.length; utf8Ei++){
                    feedData[utf8Ei].text = unescape(encodeURIComponent(feedData[utf8Ei].text));
                  }
                  $('aside').prepend("<p style='border-bottom: 1px solid black; width: 100%'>"+feedData[0].text+"</p>");
                  var statusesLeft = feedData.length - 1;
                  var statusIterator = 1;
                  var updateInterval = Math.floor(9800 / statusesLeft);
                  var updateIntervalAction = setInterval(function(){
                    if(statusIterator <= statusesLeft){
                      $('aside').prepend("<p style='border-bottom: 1px solid black; width: 100%'>"+feedData[statusIterator].text+"</p>");
                      statusIterator++;
                    }else{
                      clearInterval(updateIntervalAction);
                    }
                  },updateInterval);
                }
              };
            }
            
            var tf = new twitterTagFeed();
            tf.query = "ruby";
            tf.run();
            
          });
        </script> 
    
    </head> 

    <body>
    
    <aside>
    </aside>
    
    
    
    
    </body>

</html>

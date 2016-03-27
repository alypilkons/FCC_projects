var twitchCoders = ["freecodecamp", "storbeck", "terakilobyte","habathcx","RobotCaleb","thomasballinger", "MedryBW", "noobs2ninjas","beohoff", "comster404", "solidJakeGG", "brunofin", "asdfjklo"];

var streamsURL = "https://api.twitch.tv/kraken/streams?channel=", userURL = "https://api.twitch.tv/kraken/users/",
current;

 var getStreamingStatus = function(current) {
$.ajax({
  dataType: 'json',
  url: streamsURL+current+"&callback=?",
  success: function(data) {
    if (data.streams.length > 0) {
    var icon = data.streams[0].channel.logo, 
        game = data.streams[0].channel.status, 
        viewers = data.streams[0].viewers;  
    $("#"+current).html("<div class='streamer active'><h1 style='color:black;text-decoration:none;'>"+current+"</h1><p><strong>Streaming now!</strong></p><p style='color:black;'>"+ game +"</p><p style='color:black;'>Number of viewers: "+ viewers + "</p><img src='"+icon+"'</img></div>");
  }
   else {
    getUserInfo(current);
  }  
  }});
};

for (var i = 0; i < twitchCoders.length; i++) {
  current = twitchCoders[i];
  getStreamingStatus(current);
}
  
var getUserInfo = function(current) {
$.ajax({
  dataType: 'json',
  url: userURL+current,
  success: function(stuff) {
    if (stuff.updated_at.charAt(3) < 5) {
       $("#"+current).html("<div class='streamer unavailable'><h1 style='color:black;'>"+current+"</h1><p style='color:black;'>No account available</p>");
    }
    else if (stuff.logo != undefined){
    var logo = stuff.logo;
      $("#"+current).html("<div class='streamer offline'><h1 style='color:black;'>"+current+"</h1><p style='color:black;'>Not currently streaming.</p><img src='" +logo+"'</img>");
    }
    else {
      $("#"+current).html("<div class='streamer offline'><h1 style='color:black;'>"+current+"</h1><p style='color:black;'>Not currently streaming.</p><img src='http://www.ccsdut.org/imageGallery/AJenson423/face_unavailable.jpg'</img>")
    }
  }
});
};
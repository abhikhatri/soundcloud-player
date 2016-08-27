// initialize soundcloud API with key
SC.initialize({
    client_id: "77451b925d14d2b740acdd9826103e2b"
});

// This is the track that will play
var TRACK = "/tracks/278556380";

$(document).ready(function(){

  var progressTracker;
  var trackDuration;
  
  var updatePosition = function(currentTrack){
    var currentPosition = currentTrack.currentTime();
    console.log('Current: '+ currentPosition);
    $("#sc-progress-fill").css('width', ((currentPosition / trackDuration) * 100) + '%');
  };

  SC.get(TRACK).then(function(track){
    trackDuration = track.duration;
    var artwork = track.artwork_url;
    artwork = artwork.replace('-large', '-crop');
    $('#sc-artwork').prepend('<img src="'+ artwork +'" />');
    
    $('#playsCount').append(track.playback_count);
    $('#likesCount').append(track.favoritings_count);
    $('#commentsCount').append(track.comment_count);

  });


  SC.stream(TRACK).then(function(player){

    $('#sc-artwork').on('click', '#mediaBtn.paused', function(){
      $('#mediaBtn').removeClass('paused').addClass('playing');
      player.play();
      progressTracker = setInterval( function(){ updatePosition(player); }, 1000);
    });

    $('#sc-artwork').on('click', '#mediaBtn.playing', function(){
      $('#mediaBtn').removeClass('playing').addClass('paused');
      player.pause();
      clearInterval(progressTracker);
    });

    player.on('finish', function(){
      clearInterval(progressTracker);
      $('#mediaBtn').removeClass('playing').addClass('paused');
    });

    $('.sc-progress-bar').on('click', function(event){
      var x = event.pageX - $(this).offset().left;
      var width = $(this).width();
      player.seek((x / width) * trackDuration);
      updatePosition(player);
    });

  });

});


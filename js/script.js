// initialize soundcloud API with key
SC.initialize({
    client_id: "77451b925d14d2b740acdd9826103e2b"
});

// This is the track that will play
var TRACK = "/tracks/278556380";

$(document).ready(function(){

  SC.get(TRACK).then(function(track){
    console.log(track);
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
    });

    $('#sc-artwork').on('click', '#mediaBtn.playing', function(){
      $('#mediaBtn').removeClass('playing').addClass('paused');
      player.pause();
    });
  });

});


$('#opciones').click(function(e) {
  
    $('#section-datos').css('display', 'none');
    $('#section-leaderboard').css('display','none');
    $('#section-opciones').css('display','block');
});
$('#datos').click(function(e){
  $('#section-opciones').css('display','none');
  $('#section-datos').css('display','block');
$('#section-leaderboard').css('display','none');
});
$('#leaderboard').click(function(e){
    $('#section-leaderboard').css('display','block');
    $('#section-opciones').css('display','none');
    $('#section-datos').css('display','none');
})
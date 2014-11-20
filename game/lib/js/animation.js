$(function () {

    var playBtn = $('#play');
    var playMusic = true;
    var song = new Audio('lib/sound/song.mp3');
    song.volume=0.1;
    var soundBtn = $('#sound');
    var bubble1 = $('#bubble1');
    var bubble2 = $('#bubble2');
    var bubble3 = $('#bubble3');
    var bubble4 = $('#bubble4');

    animate(bubble1);
    animate(bubble2);
    animate(bubble3);
    animate(bubble4);

    function animate(bubble) {
        bubble.css('width', '400px');
        bubble.css('height', '400px');

        bubble.animate({
            opacity: 'toggle',
            height: 'toggle',
            width: 'toggle'
        }, 5000, function () {
            animate(bubble);
        });
    }

    // Music
    playBtn.click(function () {

        if (playMusic) {
            song.play();
            song.volume = 0.2;
        }

        $('.bubble').remove();
    });

    soundBtn.click(function () {

    });

});
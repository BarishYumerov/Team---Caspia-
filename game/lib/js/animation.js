$(function () {

    var stopSound = false;
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
            //left: "-=5",
            //top: "-=20",
            height: 'toggle',
            width: 'toggle'
        }, 5000, function () {
            // Animation complete.
            animate(bubble);
        });
    }

    if (!stopSound) {
        new Audio('lib/sound/song.mp3').play();
    }

    soundBtn.click(function () {

    });

    // Sound
    


});
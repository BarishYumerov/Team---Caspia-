// Interface

// Wait for document ready
$(function () {

    // Declare variables
    var playBtn = $('#play');
    var canvas = $('#canvas');
    var logo = $('#logo');

    // Play button event handler
    playBtn.click(function () {
        playBtn.hide();
        logo.hide();
        canvas.show();

        // Start Game Loop
        init();
        
    });
});

// Game Logic

var canvas, ctx, cWidth, cHeight;
var peshoPic = new Image();
peshoPic.src = 'lib/images/player_run.png';
var barrelPic = new Image();
barrelPic.src = 'lib/images/barrel.png';
var rocks = [];

var yPesho = 270;
var xBarrel = 1000;
var fast = 40;
var rnd = [];

for (var i = 0 ; i < 1000; i++) {
    rnd[i] = Math.floor(Math.random() * (500 - 106 + 1) + 306);
}

function pesho() {
    ctx.drawImage(peshoPic, 20, yPesho, 120, 150);
}

function jump() {
    ctx.save();
    ctx.drawImage(barrelPic, x, 100, 25, 25);
    ctx.restore();

}

function barrel() {
    ctx.save();
    for (var i = 0; i < 1000 ; i++) {
        rocks[i] = ctx.drawImage(barrelPic, xBarrel + i * rnd[i], 360, 50, 50);
    }
    ctx.restore();
    xBarrel -= 5;
}

function background() {
    grd = ctx.createLinearGradient(0, 0, 0, cHeight);
    grd.addColorStop(0.339, 'rgba(7, 35, 63, 1.000)');
    grd.addColorStop(0.792, 'rgba(6, 6, 61, 1.000)');
    grd.addColorStop(0.797, 'rgba(43, 22, 2, 1.000)');
    grd.addColorStop(0.904, 'rgba(25, 9, 9, 1.000)');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, cWidth, cHeight);
}

function clear() {
    ctx.clearRect(0, 0, cWidth, cHeight);
}

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    cWidth = canvas.width;
    cHeight = canvas.height;
    ctx.save();
    clear();
    background();
    pesho();
    barrel();
    ctx.restore();
    var loopTimer = setTimeout('init(' + ')', fast);

    if (fast > 10) {
        fast -= 0.02;
    }
}

// Calling the init from play event handler "Start Game Loop"
//window.addEventListener('load', init);
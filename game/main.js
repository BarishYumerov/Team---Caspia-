var canvas, ctx, cWidth, cHeight;
var peshoPic = new Image();
peshoPic.src='images/pesho-1.png';
var barrelPic = new Image();
barrelPic.src = 'images/barrel.png';
<<<<<<< HEAD
var x = 1000;

function pesho() {
    ctx.drawImage(peshoPic, 20, 270, 120, 150);
}

function barrel() {
=======
var rocks = [];

var yPesho=90;
var xBarrel = 300;
var fast = 40;
var rnd = [];
for( var i = 0 ; i < 1000; i++){
    rnd[i] = Math.floor(Math.random()*(80-16+1)+16);
}

function pesho() {
    ctx.drawImage(peshoPic, 20, yPesho, 35, 35);
}
function jump(){
>>>>>>> 46cbe583e0659e53dcdcf51e3977c645b8d51a0a
    ctx.save();
    ctx.drawImage(barrelPic, x, 360, 50, 50);
    ctx.restore();
<<<<<<< HEAD
    x -= 2;
}
=======

}
function barrel(){
    ctx.save();
    for( var i = 0; i < 1000 ; i++){
        rocks[i] = ctx.drawImage(barrelPic, xBarrel + i*rnd[i], 110, 15, 15);
    }
    ctx.restore();
    xBarrel -= 2;
}
>>>>>>> 46cbe583e0659e53dcdcf51e3977c645b8d51a0a

function background() {
    grd = ctx.createLinearGradient(0,0,0, cHeight);
    grd.addColorStop(0.339, 'rgba(7, 35, 63, 1.000)');
    grd.addColorStop(0.792, 'rgba(6, 6, 61, 1.000)');
    grd.addColorStop(0.797, 'rgba(43, 22, 2, 1.000)');
    grd.addColorStop(0.904, 'rgba(25, 9, 9, 1.000)');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, cWidth, cHeight);
}

function clear() {
    ctx.clearRect(0,0, cWidth,cHeight);
}

function init() {
    canvas=document.getElementById('game');
    ctx=canvas.getContext('2d');
    cWidth=canvas.width;
    cHeight=canvas.height;
    ctx.save();
    clear();
    background();
    pesho();
    barrel();
    ctx.restore();
    var loopTimer = setTimeout('init('+')',fast);
    if(fast > 10) {
        fast -= 0.02;
    }

}

window.addEventListener('load', init);

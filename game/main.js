var canvas, ctx, cWidth, cHeight;
var peshoPic = new Image();
peshoPic.src='images/pesho-1.png';
var barrelPic = new Image();
barrelPic.src = 'images/barrel.png';

function pesho() {
    ctx.drawImage(peshoPic, 20, 70, 60, 60);
}
function barrel(){
    ctx.drawImage(barrelPic, 220, 100, 25, 25);
}
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
    background();
    pesho();
    barrel();
}

window.addEventListener('load', init);
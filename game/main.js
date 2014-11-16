var canvas, ctx, cWidth, cHeight;
var peshoPic = new Image();
peshoPic.src='images/pesho-1.png';
var barrelPic = new Image();
barrelPic.src = 'images/barrel.png';

var yPesho=70;
var xBarrel = 300;

function pesho() {
    ctx.drawImage(peshoPic, 20, yPesho, 60, 60);
}
function jump(){
    ctx.save();
    ctx.drawImage(barrelPic, x, 100, 25, 25);
    ctx.restore();

}
function barrel(){
    ctx.save();
    ctx.drawImage(barrelPic, xBarrel, 100, 25, 25);
    for( var i = 0; i < 100 ; i++){
        ctx.drawImage(barrelPic, xBarrel + i*50, 100, 25, 25);
    }
    ctx.restore();
    xBarrel -= 2;


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
    ctx.save();
    clear();
    background();
    pesho();
    barrel();
    ctx.restore();
    var loopTimer = setTimeout('init('+')',10);
}

window.addEventListener('load', init);

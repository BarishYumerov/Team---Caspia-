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

var peshoJumpPic = new Image();
peshoJumpPic.src = 'lib/images/player_jump.png';

var barrelPic = new Image();
barrelPic.src = 'lib/images/barrel.png';
var barrels = [];

var moonPic = new Image();
moonPic.src = 'lib/images/Moon.png';

var starsPic = new Image();
starsPic.src = 'lib/images/Stars.png';


var drunkTextPic = new Image();
drunkTextPic.src = 'lib/images/text-drunk.png';

var successPic = new Image();
successPic.src = 'lib/images/approved.jpg';

var failPic = new Image();
failPic.src = 'lib/images/fail.jpg';

var xBarrel = 1000;
var fast = 40;
var isInJump = false;
var hits = 0;

var playerScore = 0;

var player = {
	x: 100,
	y: 270,
	width: 120,
	height: 150,
	img: peshoPic,
	jumpingImg: peshoJumpPic,
	isDrunk: false
};

function displayPlayer() {
	var playerDisplayImg = player.img,
		currentPlayerY = player.y;
    if (isInJump) {
    	playerDisplayImg = player.jumpingImg;
    	currentPlayerY -= 100;
    }
    
    ctx.drawImage(playerDisplayImg, player.x, currentPlayerY, player.width, player.height);
}

function updateBarrels() {
    //create barrells
    if (barrels.length < 4) {
    	var rand = Math.random() * (Math.random() * 3245);
    	var barrelX = parseInt(xBarrel + rand);
    	barrels.push({
    		x: barrelX,
    		y: 360,
    		initialX: barrelX,
    		hasHitPlayer: false,
            counted: false
    	});
    }

    //update barrels position
    for (var i = 0, length = barrels.length; i < length; i++) {
    	if ((barrels[i].x + 50) < 0) {
    		var rand = Math.random() * (Math.random() * 3532);
    		barrels[i].x = barrels[i].initialX + parseInt(rand);
    		barrels[i].hasHitPlayer = false;
            barrels[i].counted = false;
    		continue;
    	}

    	barrels[i].x -= 4;
    }
}

function calculateScore(){
    if (barrels.length === 0){
        return;
    }
    for (var i = 0, length = barrels.length; i < length; i++){
        if ((barrels[i].x + 50) < player.x){
            if (!barrels[i].counted){
                if (!barrels[i].hasHitPlayer){
                    playerScore += 100;
                    barrels[i].counted = true;
                }
            }
        }
    }
}

function drawBarrels() {
	for (var i = 0, length = barrels.length; i < length; i++) {
    	ctx.drawImage(barrelPic, barrels[i].x, barrels[i].y, 50, 50);
    }
}

function checkForCollisions() {
	for (var i = 0, length = barrels.length; i < length; i++) {
		if (barrels[i].x <= (player.x + player.width - 50)) {
			if (barrels[i].x - 10 > player.x) {
				if (!isInJump) {
					if (!barrels[i].hasHitPlayer) {
						hits++;
						barrels[i].hasHitPlayer = true;
					}
				}
			}
		}
	}

	if (hits == 3) {
		player.isDrunk = true;
	}
}
function success(){
	ctx.drawImage(successPic, 0,0,1000,500);
}
function fail(){
	ctx.drawImage(failPic, 0,0,1000,500);
}

function background() {
    grd = ctx.createLinearGradient(310.170, 0.000, 322.830, 534.000);
    grd.addColorStop(0.000, 'rgba(8, 21, 112, 1.000)');
    grd.addColorStop(0.505, 'rgba(0, 127, 127, 1.000)');
    grd.addColorStop(0.756, 'rgba(0, 191, 191, 1.000)');
    grd.addColorStop(0.758, 'rgba(51, 51, 51, 1.000)');
    grd.addColorStop(0.864, 'rgba(25, 25, 25, 1.000)');
    grd.addColorStop(0.958, 'rgba(0, 0, 0, 1.000)');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, cWidth, cHeight);
}

function drawSky(){
    ctx.drawImage(moonPic, 250, 50, 120, 120);
    ctx.drawImage(starsPic, 300, -50, 400, 400);
    ctx.drawImage(starsPic, 650, -50, 400, 400);
    ctx.drawImage(drunkTextPic, 400, 70, 550, 130);
}

function clear() {
    ctx.clearRect(0, 0, cWidth, cHeight);
}

function jump() {
    if (!isInJump) {
        isInJump = true;
        setTimeout(land, 1000);
    }
}

function land() {
    isInJump = false;
}

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    cWidth = canvas.width;
    cHeight = canvas.height;
    ctx.save();
    clear();

    //draw
    background();
    displayPlayer();
    drawBarrels();
    drawSky();
    ctx.font = "bold 30px Comic Sans MS";
    ctx.fillStyle = "#755417";
    ctx.fillText("Score: " + playerScore, 40, 60);
    //game logic and objects update
    updateBarrels();
    checkForCollisions();
    calculateScore();
	if(hits >= 3){
		clear();
		fail();
		ctx.fillText("Score: " + playerScore, 40, 60);
	}
	if(playerScore >= 500){
		clear();
		success();
		ctx.fillText("Score: " + playerScore, 40, 60);
	}
// blur effect
    if(hits<=3){
    (function(e){e.fn.foggy=function(t){var n={opacity:.8,blurRadius:2,quality:16,cssFilterSupport:true};var r={opacity:1,blurRadius:0};var i;if(t==false){i=e.extend(n,r)}else{i=e.extend(n,t)}var s=function(e,t,n,r){this.content=e;this.position=t;this.offset=n;this.opacity=r};s.prototype.render=function(t){e("<div/>",{html:this.content,"class":"foggy-pass-"+this.position}).css({position:this.position,opacity:this.opacity,top:this.offset[0],left:this.offset[1]}).appendTo(t)};var o=function(e){this.radius=e};o.prototype.includes=function(e,t){if(Math.pow(e,2)+Math.pow(t,2)<=Math.pow(this.radius,2)){return true}else{return false}};o.prototype.points=function(){var e=[];for(var t=-this.radius;t<=this.radius;t++){for(var n=-this.radius;n<=this.radius;n++){if(this.includes(t,n)){e.push([t,n])}}}return e};var u=function(e,t){this.element=e;this.settings=t};u.prototype.calculateOffsets=function(t,n){var r=e.grep((new o(t)).points(),function(e){return e[0]!=0||e[1]!=0});var i;if(r.length<=n){i=r}else{var s=r.length-n;var u=[];for(var a=0;a<s;a++){u.push(Math.round(a*(r.length/s)))}i=e.grep(r,function(t,n){if(e.inArray(n,u)>=0){return false}else{return true}})}return i};u.prototype.getContent=function(){var t=e(this.element).find(".foggy-pass-relative")[0];if(t){return e(t).html()}else{return e(this.element).html()}};u.prototype.render=function(){var t=this.getContent();e(this.element).empty();var n=e("<div/>").css({position:"relative"});var r=this.calculateOffsets(this.settings.blurRadius*2,this.settings.quality);var i=this.settings.opacity*1.2/(r.length+1);(new s(t,"relative",[0,0],i)).render(n);e(r).each(function(e,r){(new s(t,"absolute",r,i)).render(n)});n.appendTo(this.element)};var a=function(e,t){this.element=e;this.settings=t};a.prototype.render=function(){var t=(""+i.opacity).slice(2,4);var n=this.settings.blurRadius;e(this.element).css({"-webkit-filter":"blur("+n+"px)",opacity:i.opacity})};return this.each(function(e,t){if(i.cssFilterSupport&&"-webkit-filter"in document.body.style){(new a(t,i)).render()}else{(new u(t,i)).render()}})}})(jQuery)
    $('canvas').foggy({
        blurRadius: 2*hits,          // In pixels.
        opacity: 1-hits*0.003,           // Falls back to a filter for IE.
        cssFilterSupport: true  // Use "-webkit-filter" where available.
    });
    }
    //debug section
    //if (hits !== 0) {
    //	console.log("Hit " + hits);
    //}

    //if (player.isDrunk) {
    //	console.log("Player is DEAD.")
    //	player.isDrunk = false;
    //	hits = 0;
    //}
    //end of debug section

    ctx.restore();
    var loopTimer = setTimeout('init(' + ')', fast);

    if (fast > 10) {
        fast -= 0.002;
    }
}

document.addEventListener("keydown", function(event){
    var keyCode = event.keyCode;
    if (keyCode == 32) {
        jump();
    }
});

// Calling the init from play event handler "Start Game Loop"
//window.addEventListener('load', init);
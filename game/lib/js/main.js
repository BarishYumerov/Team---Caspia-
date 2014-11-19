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

var xBarrel = 1000;
var fast = 40;
var isInJump = false;
var hits = 0;

var player = {
	x: 100,
	y: 270,
	width: 120,
	height: 150,
	img: peshoPic,
	jumpingImg: peshoJumpPic,
	isAlive: true
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
    		hasHitPlayer: false
    	});
    }

    //update barrels position
    for (var i = 0, length = barrels.length; i < length; i++) {
    	if ((barrels[i].x + 50) < 0) {
    		var rand = Math.random() * (Math.random() * 3532);
    		barrels[i].x = barrels[i].initialX + parseInt(rand);
    		barrels[i].hasHitPlayer = false;
    		continue;
    	}

    	barrels[i].x -= 4;
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
		player.isAlive = false;
	}
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
    ctx.font = "bold 12px Comic Sans MS";
    ctx.fillStyle = "red";
    ctx.fillText("fps: TEST TEST", 10, 10);
    //game logic and objects update
    updateBarrels();
    checkForCollisions();

    //debug section
    //if (hits !== 0) {
    //	console.log("Hit " + hits);
    //}

    //if (!player.isAlive) {
    //	console.log("Player is DEAD.")
    //	player.isAlive = true;
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
var bg, backgroundImg;
var platformImage, platformGroup;
var ironMan, ironManImage;

function preload() {
	backgroundImg = loadImage("images/bg.jpg");
	ironManImage = loadImage('images/iron.png');
	platformImage = loadImage('images/stone.png');
}

function setup() {
	createCanvas(1000, 600);
	bg = createSprite(580, 300);
	bg.addImage(backgroundImg);
	bg.scale = 2;
	bg.velocityY = 8;

	ironMan = createSprite(500, 200);
	ironMan.addImage('running', ironManImage);
	ironMan.scale = 0.3;
	ironMan.setCollider("rectangle", 100, 0, 200, 400)
	platformGroup = new Group();
}

function draw() {
	if (bg.y > 700) {
		bg.y = bg.height / 15;
	}
	if (keyDown('up') || keyDown('w')) {
		ironMan.velocityY = -10;
	}
	if (keyDown('left')) {
		ironMan.x = ironMan.x - 5;
	}
	if (keyDown('right')) {
		ironMan.x = ironMan.x + 5;
	}

	ironMan.velocityY = ironMan.velocityY + 0.5;

	generatePlatforms();

	for (var i = 0; i < platformGroup.length; i++) {
		var temp = platformGroup.get(i);

		if (temp.isTouching(ironMan)) {
			ironMan.collide(temp);
		}
	}

	drawSprites();
}

function generatePlatforms() {
	if (frameCount % 60 === 0) {
		var brick = createSprite(1200, 0);
		brick.setCollider('rectangle', 0, 0, 220, 40);
		brick.x = random(50, 850);
		brick.addImage(platformImage);
		brick.velocityY = 5;
		brick.lifetime = 200;
		platformGroup.add(brick);
	}
}

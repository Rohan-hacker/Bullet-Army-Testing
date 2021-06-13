
var wall, wallImage, wallImage2, thickness;
var bullet, bullet2, bulletImage, bulletImage2,speed, weight;
var gun, gunImage;
var viswall,viswall2;

function preload(){
	gunImage=loadImage("ak47 png.png");
	bulletImage=loadImage("bullet.png");
	bulletImage2=loadImage("bullet_cracked.png");
	wallImage=loadImage("wall.png");
	wallImage2=loadImage("wall_cracked.png");
}

function setup() {
  createCanvas(windowWidth, 400);

  speed=random(23,71)
  weight=random(30,52)

  thickness=random(6,28)
	
	gun=createSprite(100,217,50,15);
	gun.velocityX=0;
	gun.addImage("gun",gunImage);
	gun.scale=0.3;
	
    bullet=createSprite(175, 200, 50,15);  
    bullet.velocityX = 0;
    bullet.shapeColor=color("blue");
	bullet.addImage("bullet",bulletImage);
	bullet.scale=0.05;
	bullet.visible=false;

	bullet2=createSprite(175, 200, 50,15);  
    bullet2.velocityX = 0;
    bullet2.shapeColor=color("blue");
	bullet2.addImage("bullet2",bulletImage2);
	bullet2.scale=0.05;
	bullet2.visible=false;
	
    wall=createSprite(windowWidth-100, 200, thickness, height/2);  
	wall.debug=true;
    wall.shapeColor=color(230,230,230);
	
	viswall=createSprite(windowWidth-100,200);
	viswall.addImage("viswall",wallImage);

	viswall2=createSprite(windowWidth-100,200);
	viswall2.addImage("viswall2",wallImage2);
	viswall2.depth=viswall.depth-10;

  //wall.shapeColor=color(80,80,80)
}


function draw() {
  background(0);  
  //bullet.sprite.collide(wall.sprite,calculateDeformation)

  bullet2.x=bullet.x;
  bullet2.y=bullet.y;

  if(keyDown("space")){
	  bulletSpeed();
  } 

  if(hasCollided(bullet, wall))
  {
	bullet.x=(wall.x-50);
  	bullet.velocityX=0;
  	var damage=0.5 * weight * speed* speed/(thickness *thickness *thickness);

  	
	if(damage>10)
	{
		wall.shapeColor=color(255,0,0);
		textSize(32);
		fill("yellow");
		text("Yay! You Broke the Wall 🥳", windowWidth/3, 100);
		fill("yellow");
		text("You can now use this Bullet in the War Tomorrow", windowWidth/5, 200);
		fill("violet");
		text("Press 'Ctrl+R' to Test another Bullet", windowWidth/3-50, 300);
		viswall2.addImage("viswall2",wallImage2);
		viswall2.depth=viswall2.depth+50
	}

	

	if(damage<10)
	{
		wall.shapeColor=color(0,255,0);
		textSize(32);
		fill("yellow");
		text("You didn't Break the Wall 😰", windowWidth/3, 100);
		fill("yellow");
		text("Throw this Bullet away as this is a WASTE OF TIME", windowWidth/5, 200);
		fill("violet");
		text("Press 'Ctrl+R' to Test another Bullet", windowWidth/3-50, 300);
		viswall.addImage("viswall",wallImage);
		viswall.depth=viswall.depth+50;
		bullet2.addImage(bulletImage2)
		bullet2.visible=true;
	}
	
	if(keyDown("R")){
		bullet.x=50;
		bullet.y=200;
		bullet.velocityX=0;
	}

  } else {
	  textSize(32);
	  fill("cyan")
	  text("Press 'Space' to Launch the Bullet", windowWidth/3,windowHeight/2);
  }


  drawSprites();
 
}


function hasCollided(lbullet, lwall)
{
	bulletRightEdge=lbullet.x +lbullet.width;
	wallLeftEdge=lwall.x;
	if (bulletRightEdge>=wallLeftEdge)
	{
		return true
	}
	return false;
}

function bulletSpeed(){
	bullet.visible=true;
	bullet.velocityX = speed;
}

function bulletReturn(){
	bullet.x=50;
}


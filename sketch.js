var city
var city1
var invisibleGround
var spidermanImg,spiderman
var ground
var droneimg,drone
var droneGroup
var spiderimg,spider
var spiderGroup
var boy,boyimg
var vicspiderman
var cup,cupimg
var endimg,end
var life=3
var score=0
var PLAY=1
var END=0
var gameState=1

function preload(){
city=loadImage("city picture.png");
cupimg=loadImage("win cup.png")
vicspiderman=loadAnimation("victory spiderman.png")
ground_image=loadImage("ground.png")
spidermanImg=loadAnimation("spiderman.png","spiderman image 2.png","spiderman image 4.png","spiderman.png")
droneimg=loadImage("drone.png")
spiderimg=loadImage("spider image.png")
boyimg=loadImage("scared boy.png")
endimg=loadImage("end image.png")
}

function setup() {
 createCanvas(windowWidth, windowHeight)

 
 invisibleGround = createSprite(width/2,height+6,width,1);  
 invisibleGround.addImage(ground_image)
 invisibleGround.x = width/2
 invisibleGround.velocityX=-3

 spiderman = createSprite(105,height-99,50)
spiderman.addAnimation("spiderman",spidermanImg)
spiderman.scale=0.3
spiderman.setCollider("circle",0,0,50)
spiderman.debug=true

boy=createSprite(width-100,height-200,20,30)
boy.addImage(boyimg)
boy.scale=0.1
boy.visible=false




ground=createSprite(width/2,height+20,width,50)
ground.visible=false

droneGroup=new Group()
spiderGroup=new Group()

}

function draw() 
{
 background(city);

 textSize(20)
fill("red")
 text("Life points:  "+life,30,50)

 fill("blue")
text("Score:  "+score,30,74)

if(gameState ===PLAY){


 if (invisibleGround.x < 0){
    invisibleGround.x = invisibleGround.width/2;
  }
spiderman.collide(ground)
if(keyDown("space")){
spiderman.velocityY=-5
}
spiderman.velocityY=spiderman.velocityY+0.8


spawnDrone()
spiderSymbol()

score=score+Math.round(getFrameRate()/60)
if(score===1000){
boy.visible=true
boy.velocityX=-4


}

if(spiderman.isTouching(boy)){

spiderman.addAnimation("spiderman",vicspiderman)
droneGroup.destroyEach()
spiderman.x=400
spiderman.y=200
spiderman.velocityY=0
boy.velocityX=0
cup=createSprite(600,300,30,20)
cup.addImage("cup",cupimg)
invisibleGround.velocityX=0

}
if(spiderGroup.isTouching(spiderman)){
  spiderGroup.destroyEach()
  life=life+1

}

if(droneGroup.isTouching(spiderman)){
  droneGroup.destroyEach()
  life=life-1
  if(life>0){
gameState=PLAY
  }
  else{
gameState=END
droneGroup.destroyEach()
spiderman.x=400
spiderman.y=200
spiderman.velocityY=0
end=createSprite(width-600,height-400,20,20)
end.addImage(endimg)
invisibleGround.velocityX=0

  }
}
}



drawSprites();

}

function spawnDrone(){
  if(frameCount%150 === 0){
drone=createSprite(width+20,height-500,20,30)
drone.addImage(droneimg)
drone.velocityX=-2
drone.scale=0.2
drone.y=Math.round(random(100,600))
droneGroup.add(drone)
  }
}

function spiderSymbol(){
  if(frameCount%1000 === 0){
spider=createSprite(width+21,height-200,15,20)
spider.addImage(spiderimg)
spider.velocityX=-2
spider.scale=0.007
spider.y=Math.round(random(99,450))
spiderGroup.add(spider)
  }
}

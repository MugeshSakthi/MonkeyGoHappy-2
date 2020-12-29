var PLAY=0;
var END=1;
var monkey,monkey_running;
var ground;
var obstacle,obstaclesGroup,obstacleImage;
var banana,bananaImage;
var backGround,backGroundImage;
var score=0;
var survivalTime=0;

function preload(){
  monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
obstacleImage=loadImage("obstacle.png");
bananaImage=loadImage("banana.png"); 
backGroundImage=loadImage("jungle.jpg"); 
  
  
}



function setup() {
  
  gameState=PLAY;
  
  backGround=createSprite(200,200,400,400);
  backGround.velocityX=-4;
  backGround.addImage(backGroundImage);
  
  
  
  monkey=createSprite(30,370,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  
  ground=createSprite(200,375,1000,5);
  ground.velocityX=-4;
  
  
  
  obstaclesGroup=new Group();
  bananaGroup=new Group();
  
  
}


function draw() {
  background("white");
  
  
    
    
  
  if(gameState === PLAY){
    monkey.collide(ground);
    ground.visible=false;
    
    spawnobstacles();
    spawnbananas();
    
    
    
  if(keyDown("space") && monkey.y >= 200){
     monkey.velocityY=-10;
    
     
     }
    
    survivalTime=survivalTime +Math.round(getFrameRate()/1)
    
  }
  
  
  
  if(gameState === END){
     background("red");
     textFont("algerian");
     textSize(20);
     fill("black");
     text("Your Score:"+score,125,150);
     
     textFont("arialblack");
     fill("black");
     textSize(20);
     text("GameOver",150,200);
    
     textFont("arialblack");
     fill("black");
     textSize(20); 
     text("Survival Time:"+survivalTime,150,300);
    
     ground.velocityX=0;
     bananaGroup.velocityX=0;
     obstaclesGroup.velocityX=0;
     score.visible=false;
     survivalTime.visible=false;
     ground.visible=false;
     monkey.visible=false;
     obstacle.visible=false;
     banana.visible=false;
     backGround.visible=false;
     }
  monkey.velocityY= monkey.velocityY + 0.9
  
  
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if(backGround.x<300){
     backGround.x=backGround.width/2;
     }
  
if(obstaclesGroup.isTouching(monkey) && monkey.scale === 0.1){
   monkey.scale=0.05
   obstaclesGroup.destroyEach();
   }
  
  if(obstaclesGroup.isTouching(monkey) && monkey.scale === 0.05){
   gameState=END;
   }
  
  if(monkey.isTouching(bananaGroup)){
     bananaGroup.destroyEach();
    score=score+1;
     }
  
  
  drawSprites();
  
    fill("blue");
    text("Score:"+score,320,30);
  
    fill("black");
    text("Survival Time:"+survivalTime,200,50);
}
function spawnobstacles(){
  if(frameCount%100 === 0){
  obstacle=createSprite(550,341.9,20,20)
  obstacle.addImage(obstacleImage);
  obstacle.velocityX=Math.round(random(-8,-10));
  obstacle.scale=0.2;
  obstaclesGroup.add(obstacle);
} 
}

function spawnbananas(){
  if (frameCount%120 === 0){
  banana=createSprite(530,200,20,20);
  banana.y=Math.round(random(150,200));
  banana.addImage(bananaImage);
  banana.scale=0.1;
  banana.velocityX=-9;
  bananaGroup.add(banana);  
}
}
 
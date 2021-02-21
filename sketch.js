var dog,dogimg,happyDog,database,foodS,foodStock;
var feed, addFood,fedTime,lastFed, foodObj;

function preload()
{
	dogimg=loadImage("images/dogImg.png")
  happyDog=loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(1000, 700);
  database=firebase.database();
  dog= createSprite(200,300)
  dog.scale= 0.2;
  dog.addImage(dogimg);
  foodStock=database.ref("food")
  foodStock.on("value",readStock);
  foodObj= new Food();
  feed= createButton("feed the dog");
  feed.position(500,100);
  feed.mousePressed(feedDog)
  addFood= createButton("add food")
  addFood.position(700,100);
  addFood.mousePressed(addFoods);
}


function draw() {  
 background("green");
 //if(keyWentDown("UP_ARROW")){
  // writeStock(foodS)
   //dog.addImage(happyDog)
// }
  drawSprites();
  
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed: "+ lastFed%12 + " PM",350,30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed : "+ lastFed + " AM",350,30)
  }

  //add styles here
  foodObj.display();
  fedTime= database.ref("feedTime")
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
}
function readStock(data){
  foodS= data.val();
  foodObj.updateFoodStock(foodS);
}
function feedDog(){
  dog.addImage(happyDog)
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref("/").update({
    food: foodObj.getFoodStock(),
    feedTime: hour()
  })
}
function addFoods(){
  foodS++
  database.ref('/').update({
    food:foodS
  })
}
 
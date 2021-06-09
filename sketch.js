

var ground, groundImage, level1GrdImg;
var man1, man2, man3, man;
var manAnimation, manImg2;
var coin, coinImage, coinImage2;
var invisibleGround;
var coinCount = 0;
var coin2, coin2Group, coinGroup;
var gameLevel = 0;
var level1, level1Img;
var tiger, buffalo, tigerImg, buffaloImg, tigerGroup, buffaloGroup;
var animalCount;
var bullet, bulletImg, bulletGroup;

function preload() {
  groundImage = loadImage("images/ground2.jpg");
  level1GrdImg = loadImage("images/NatureBg.jpg");

  man1 = loadImage("images/man1.png");
  man2 = loadImage("images/man2.png");
  man3 = loadImage("images/man3.png");
  manAnimation = loadAnimation("images/man1.png", "images/man2.png");
  // manImg2 = loadImage("images/man_gun.png");

  coinImage = loadImage("images/goldCoin.jpg");
  coinImage2 = loadImage("images/th.jpg");

  level1Img = loadImage("images/Level1.jpg");

  tigerImg = loadImage("images/Tiger.jpg");
  buffaloImg = loadImage("images/Buffalo.jpg");

  bulletImg = loadImage("images/bullet.png");
}





function setup() {
  createCanvas(800, 400);

  ground = createSprite(400, 390, 800, 10);
  ground.addImage(groundImage);
  ground.scale = 0.2;
  ground.velocityX = -1;

  invisibleGround = createSprite(0, 395, 1200, 05);
  //invisibleGround.visible = false;

  man = createSprite(100, 300, 20, 50);
  man.addAnimation("walking", manAnimation);
  man.scale = 0.2;
  man.debug = true;
  man.setCollider("circle", 0, 80, 150);

  level1 = createSprite(camera.position.x, 200);
  level1.addImage(level1Img);
  level1.visible = false;
  level1.scale = 0.5;

  coinGroup = new Group();
  coin2Group = new Group();

  tigerGroup = new Group();
  buffaloGroup = new Group();

  bulletGroup = new Group();

}

function draw() {
  background("lightblue");

  camera.position.x = man.x;
  camera.position.x = invisibleGround.x;
  // camera.position.y=man.y;


  if (gameLevel === 0) {
    if (ground.x < 0) {
      ground.x = 300;
    }

    if (keyDown("space")) {
      man.velocityY = -10;

    }

    if (keyDown("left")) {
      man.x = man.x - 5;

    }


    if (keyDown("right")) {
      man.x = man.x + 5;

    }


    man.velocityY = man.velocityY + 0.8;
    spawnCoins();

    if (coinGroup.isTouching(man)) {
      coinGroup.destroyEach();
      coinCount = coinCount + 1;
    }

    if (coin2Group.isTouching(man)) {
      coin2Group.destroyEach();
      coinCount = coinCount + 1;
    }


    if (coinCount >= 2) {
      gameLevel = gameLevel + 1;

      level1.visible = true;
      coinCount = 0;
    }
    man.collide(invisibleGround);

    text("coins " + coinCount, camera.position.x + 300, 50);

  }

  if (gameLevel === 1) {

    level1.visible = false;
    ground.addImage(level1GrdImg);
    ground.scale = 3;

    // man.addImage(manImg2);
    //man.scale = 0.2;

    if (ground.x < 0) {
      ground.x = 300;
    }

    if (keyDown("space")) {
      man.velocityY = -10;

    }

    if (keyDown("left")) {
      man.x = man.x - 5;

    }


    if (keyDown("right")) {
      man.x = man.x + 5;

    }

    if (keyDown("p")) {
      gunShoot();
    }

    man.velocityY = man.velocityY + 0.8;
    spawnAnimals();

    if (bulletGroup.isTouching(tigerGroup)) {
      tigerGroup.destroyEach();
      bulletGroup.destroyEach();
      animalCount = animalCount + 1;
    }

    if (bulletGroup.isTouching(buffaloGroup)) {
      buffaloGroup.destroyEach();
      bulletGroup.destroyEach();
      animalCount = animalCount + 1;
    }


    
    if (animalCount >= 2) {
      gameLevel = gameLevel + 1;
      level1.visible = true;
    }
    man.collide(invisibleGround);

    text("Animals Shot" + animalCount, camera.position.x + 300, 50);
  }

  drawSprites();
}




function spawnCoins() {
  if (frameCount % 250 === 0) {
    coin = createSprite(800, 200, 30, 30);
    coin.debug = true;
    coin.velocityX = -4;
    coin.addImage(coinImage);
    coin.scale = 0.1;
    coin.y = Math.round(random(10, 200));
    coinGroup.add(coin);
  }

  if (frameCount % 300 === 0) {
    coin2 = createSprite(800, 200, 30, 30);
    coin2.debug = true;
    coin2.velocityX = -4;
    coin2.addImage(coinImage2);
    coin2.scale = 0.1;
    coin2.y = Math.round(random(10, 200));
    coin2Group.add(coin2);
  }
}

function spawnAnimals() {
  if (frameCount % 250 === 0) {
    tiger = createSprite(800, 380, 30, 30);
    tiger.debug = true;
    tiger.velocityX = -4;
    tiger.addImage(tigerImg);
    tiger.scale = 0.06;
    tiger.collide(invisibleGround);
    tigerGroup.add(coin);
  }

  if (frameCount % 300 === 0) {
    buffalo = createSprite(800, 380, 30, 30);
    buffalo.debug = true;
    buffalo.velocityX = -4;
    buffalo.addImage(buffaloImg);
    buffalo.scale = 0.06;
    buffalo.collide(invisibleGround);
    buffaloGroup.add(coin2);
  }
}

function gunShoot() {
  bullet = createSprite(200, 200, 5, 5);
  bullet.addImage(bulletImg);
  bullet.scale = 0.1;
  bullet.y = man.y;
  bullet.velocityX = 3;
  bullet.lifetime = 800;
  bulletGroup.add(bullet);

}
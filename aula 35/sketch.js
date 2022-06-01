var hypnoticBall, database;
var position;


function setup(){
  database = firebase.database(); //chamar o firebase no sketch
  console.log(database);
  createCanvas(500,500);

  hypnoticBall = createSprite(250,250,10,10);
  hypnoticBall.shapeColor = "red";

//ele pega com referencia a tabela que criamos no banco de dados
  var hypnoticBallPosition = database.ref('ball/position');
  //ele fala o que está acontecendo no firebase e mostra no visual studio
  hypnoticBallPosition.on("value", readPosition, showError);
}

function draw(){
  background("white");
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
  
}
//um comando para gravar as informações na tela
function writePosition(x,y){
 database.ref('ball/position').set({
   'x':position.x + x,
   'y':position.y + y
 })
}
//função de leitura da posição da bola 
function readPosition(data){
  position = data.val(); // ele le os valores do banco de dados e salva na posição da bola
  console.log(position.x);
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}

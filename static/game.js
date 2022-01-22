var config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1500,
  height: 900,
  
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 0 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
}


var game = new Phaser.Game(config)

function preload() {
  
}
var self =0
function create() {

    this.socket = io()

    let x =100
    let y =100
    let size =3
    self =this

    lose =this.add.text(900, 400, '', { font: '45px Courier', fill: '#00ff00' });
    win =this.add.text(900, 400, '', { font: '45px Courier', fill: '#00ff00' });
    
    waiting =this.add.text(900, 50, '', { font: '25px Courier', fill: '#00ff00' });
    turn =this.add.text(320, 150, '', { font: '25px Courier', fill: '#00ff00' });
    identity  = this.add.text(200, 50, 'Your Identity is ', { font: '25px ',fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
    for(let i =0; i<9;i++)
    {
      this.add.rectangle(x*size,y*size,64*size,64*size,0xffffff)
        .setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP,()=>
        {
         
          this.socket.emit('playerClicked',i,this.socket.id)
          
        })
        
       x=x+64+5
       if(i==2 || i==5)
       {
         x=100
         y=y+64+5
       }
    }
    text1 = this.add.text(430, 200, '', { font: '200px Courier', fill: '#00ff00' });
    text0 = this.add.text(240, 200, '', { font: '200px Courier', fill: '#00ff00' });
    text2 = this.add.text(640, 200, '', { font: '200px Courier', fill: '#00ff00' });
    text3 = this.add.text(240, 400, '', { font: '200px Courier', fill: '#00ff00' });
    text4 = this.add.text(430, 410, '', { font: '200px Courier', fill: '#00ff00' });
    text5 = this.add.text(650, 400, '', { font: '200px Courier', fill: '#00ff00' });
    text6 = this.add.text(240, 600, '', { font: '200px Courier', fill: '#00ff00' });
    text7 = this.add.text(450, 600, '', { font: '200px Courier', fill: '#00ff00' });
    text8 = this.add.text(650, 600, '', { font: '200px Courier', fill: '#00ff00' });
 

   this.socket.on('CurrentPlayers',function(players)
   {
    Object.keys(players).forEach(function (id) {
     
      console.log(players[id].playerNo)
      if ((players[id].playerId === self.socket.id)&&(players[id].playerNo==1)) {
        identity.setText('Your Identity is  :   X');
         identity.setColor('#0000FF');
         waiting.setText('Waiting for another player !!!!');
       
      }
      else
      {
        identity.setText('Your Identity is  :   O');
         identity.setColor('#0000FF');
      }
    })
   })
   hide = this.add.rectangle(500,500,1000,1000,0x0ff000)
   .setAlpha(0)

}

function AddStar(i)
{
  switch(i)
  {
    case 0:
      
      text0.setText('X');
      text0.setColor('#0000FF');
        break;
    case 1:
   
      text1.setText('X');
      text1.setColor('#0000FF');
      break;

    case 2:
      
      text2.setText('X');
      text2.setColor('#0000FF');
      break;

    case 3:
      
      text3.setText('X');
      text3.setColor('#0000FF');
      break;

    case 4:
      
      text4.setText('X');
      text4.setColor('#0000FF');
      break;

    case 5:
    
      text5.setText('X');
      text5.setColor('#0000FF');
      break;

    case 6:
      
      text6.setText('X');
      text6.setColor('#0000FF');
      break;

    case 7:
      
      text7.setText('X');
      text7.setColor('#0000FF');
      break;

    case 8:
     
      text8.setText('X');
      text8.setColor('#0000FF');
      break;

    
    

  }

 
}

function AddCircle(i)
{
  switch(i)
  {
    case 0:
      
      text0.setText('O');
      text0.setColor('#0000FF');
      break;

    case 1:
      
      text1.setText('O');
      text1.setColor('#0000FF');
      break;

    case 2:
      
      text2.setText('O');
      text2.setColor('#0000FF');
      break;

    case 3:
      
      text3.setText('O');
      text3.setColor('#0000FF');
      break;

    case 4:
      
      text4.setText('O');
      text4.setColor('#0000FF');
      break;

    case 5:
      
      text5.setText('O');
      text5.setColor('#0000FF');
      break;

    case 6:
      
      text6.setText('O');
      text6.setColor('#0000FF');
      break;

    case 7:
      
      text7.setText('O');
      text7.setColor('#0000FF');
      break;

    case 8:
      
      text8.setText('O');
      text8.setColor('#0000FF');
      break;

    
 
}
} 
playercolor =0;
function update() {
 

  this.socket.on('turn',function(players){
   turn.setText('This is your turn')
   
  
  })
  this.socket.on('waiting',function(players){
   
      waiting.setText('')
    
  })
  this.socket.on('win',function(){
    console.log("I  Won the match")
    win.setText('You won the match')
    hide.setAlpha(0)
    text1.setText('')
    text0.setText('')
    text2.setText('')
    text3.setText('')
    text4.setText('')
    text5.setText('')
    text6.setText('')
    text7.setText('')
    text8.setText('')
    identity.setText('')
    turn.setText('')
  })
  this.socket.on('lose',function(){
    console.log("I  Loose the match")
    lose.setText('You lose the match')
    hide.setAlpha(0)
    hide.setAlpha(0)
    text1.setText('')
    text0.setText('')
    text2.setText('')
    text3.setText('')
    text4.setText('')
    text5.setText('')
    text6.setText('')
    text7.setText('')
    text8.setText('')
    identity.setText('')
    turn.setText('')
  })
  this.socket.on('StateChanged',function(i,value){

  // console.log(players)
 
  
   
      if(value==1)
      {
        
        playercolor=5;
        AddStar(i)
        turn.setText('')
        
        
      }
      else if(value ==2)
      {
        playercolor=10;
        AddCircle(i)
        turn.setText('')
        
      
    }
  })

   
}
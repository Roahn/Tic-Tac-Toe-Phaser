
const express = require('express')
const http = require('http')
const path = require('path')
const socketIO = require('socket.io')

const app = express()
var players = {}
var count = 0;
var playerturn = 1;
var historyid = 8;
var server = http.Server(app)
var io = socketIO(server, {
  pingTimeout: 60000,
})

app.set('port', 5000)
app.use('/static', express.static(__dirname + '/static'))

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, 'index.html'))
})


server.listen(5000, function () {
  console.log('Server started at http://localhost:5000/')
})

const Array = [0, 0, 0,
  0, 0, 0,
  0, 0, 0
]

NumberofPlayers = 0
io.on('connection', function (socket) {
  console.log('player [' + socket.id + '] connected')

  NumberofPlayers += 1
  players[socket.id] = {

    playerId: socket.id,
    playerNo: NumberofPlayers,


  }
  console.log("number of players are :" + Object.keys(players).length)

  if (Object.keys(players).length == 2) {
    console.log("Room is full")
    for (let i = 0; i < 9; i++) {
      Array[i] = 0
    }
    io.emit('waiting', players)
  }
  if (Object.keys(players).length == 0) {
    playerturn = 1;
  }
  socket.emit('CurrentPlayers', players)
  Object.keys(players).forEach(function (id) {
    if(players[id].playerNo==1)
    {
      io.to(id).emit('turn');
    }

  })


  socket.on('playerClicked', function (i, id) {
    console.log("Player clicked " + i)
    playerturn = playerturn ^ 1
    console.log(playerturn)

    if (historyid == id) {
      console.log("Same")
      console.log(Array)
      playerturn = playerturn ^ 1
      return;
    }
    var enter = 1
    if (playerturn == 0) {
      console.log("Player 1")
      enter = 1
    }
    else if (playerturn == 1) {
      console.log("Player2 ")
      enter = 2
    }

    if (Array[i] == 0) {
      Array[i] = enter
      console.log(Array)
      historyid = id
      if (Object.keys(players).length == 2) {
        // if (count == 0 && players.playerNo == 1) {

        // }
        // else {

        // }
        io.emit('StateChanged', i, enter)
      }

    }
    if(enter ==2)
    {
      Object.keys(players).forEach(function (id) {
        if(players[id].playerNo==1)
        {
          io.to(id).emit('turn');
        }

      })
      
    }
    else
    {
      Object.keys(players).forEach(function (id) {
        if(players[id].playerNo==2)
        {
          io.to(id).emit('turn');
        }

      })
    }


    if( (   (   (Array[0]===Array[1])  && (Array[0]===Array[2])   )   &&       ( (Array[0]===1)||(Array[0]===2)  ) )   ||
        (   (   (Array[3]===Array[4])  && (Array[3]===Array[5])   )   &&       ( (Array[3]===1)||(Array[3]===2)  ) )   ||
        (   (   (Array[6]===Array[7]) &&  (Array[6]===Array[8])   )   &&       ( (Array[6]===1)||(Array[6]===2)  ) )   ||
        (   (   (Array[0]===Array[3])  && (Array[0]===Array[6])   )   &&       ( (Array[0]===1)||(Array[0]===2)  ) )   ||
        (   (   (Array[1]===Array[4]) &&  (Array[1]===Array[7])   )   &&       ( (Array[1]===1)||(Array[1]===2)  ) )   ||
        (   (   (Array[2]===Array[5])  && (Array[2]===Array[8])   )   &&       ( (Array[2]===1)||(Array[2]===2)  ) )   ||
        (   (   (Array[0]===Array[4])  && (Array[0]===Array[8])   )   &&       ( (Array[0]===1)||(Array[0]===2)  ) )   ||
        (   (   (Array[2]===Array[4])  && (Array[2]===Array[6])   )   &&       ( (Array[2]===1)||(Array[2]===2)  ) )
  )
  {
    console.log("Someone has Won the game")
    io.to(id).emit('win');
    Object.keys(players).forEach(function (loser) {
      if(players[loser].playerId==id)
      {
       
      }
      else
      {
         io.to(loser).emit('lose');
      }

    })
  }
// console.log(  ((Array[0]===Array[1])&&(Array[0]===Array[2])) && ( (Array[0]===1)||(Array[0]===2)  ))
// console.log((Array[0]===Array[1]===Array[2]))
// console.log(( (Array[0]===1)||(Array[0]===2)  ))
  })

    


  socket.on('disconnect', function () {
    console.log('player [' + socket.id + '] disconnected')
    delete players[socket.id]
    NumberofPlayers = NumberofPlayers - 1
    console.log("number of players are :" + Object.keys(players).length)
  })


})


/**
 * MemoryGame es la clase que representa nuestro juego. Contiene un array con la cartas del juego,
 * el número de cartas encontradas (para saber cuándo hemos terminado el juego) y un texto con el mensaje
 * que indica en qué estado se encuentra el juego
 */
var MemoryGame = MemoryGame || {};
that1 = "";
// FIXME:  requestAnimationFrame(callback)
/**
 * Constructora de MemoryGame
 */
MemoryGame = function(gs) {
  that = this;
  that1 = this;
  this.cardsFound = 0;
  this.state = "Playing!";

  this.keyCards = ["8-ball", "potato", "dinosaur", "kronos", "rocket", "unicorn", "guy", "zeppelin"];
  this.cardsPannel = [];
  this.first = -1;
  this.second = -1;


  this.initGame = function() {
    var it = 0;

    for (var i = 0; i < this.keyCards.length; i++) {
      var random = Math.floor(Math.random() * 16);
      var accepted = false;

      while (!accepted) {
        if (this.cardsPannel[random] === undefined) {
          this.cardsPannel[random] = new MemoryGameCard(this.keyCards[i]);
          accepted = true;
        } else {
          random = Math.floor(Math.random() * 16);
        }
      }

      if (it % 2 == 0)
        i--;

      it++;
    }

    requestAnimationFrame(this.loop);
  };

  this.draw = function() {
    if (this.cardsFound === this.cardsPannel.length)
      this.state = "You win!";

    for (var i in this.cardsPannel)
      this.cardsPannel[i].draw(gs, i);

    gs.drawMessage(this.state);
  };

  this.loop = function(dt) {
      that.draw();
      requestAnimationFrame(that.loop);
  };

  this.onClick = function (cardPos) {
    if(this.cardsPannel[cardPos].fnd !== true){
      if(this.first === -1){
        this.first = cardPos;
        this.cardsPannel[this.first].flip();
      } else if (this.second === -1) {
        this.second = cardPos;
        this.cardsPannel[this.second].flip();
        if (this.cardsPannel[this.first].compareTo(this.cardsPannel[this.second])) {
          this.cardsPannel[this.first].found();
          this.cardsPannel[this.second].found();
          this.cardsFound += 2;
          this.first = this.second = -1;
        } else {
          this.state = "Try again!";
          setTimeout( function(){
            console.log();
            game.cardsPannel[game.first].flip();
            game.cardsPannel[game.second].flip();
            game.first = game.second = -1;
            game.state = "";

          },2000);
        }
      }
    }
  };
};

//// FIXME: Cómo funciona la clase? como hago el constructor? id y sprite que es????

/**
 * Constructora de las cartas del juego. Recibe como parámetro el nombre del sprite que representa la carta.
 * Dos cartas serán iguales si tienen el mismo sprite.
 * La carta puede guardar la posición que ocupa dentro del tablero para luego poder dibujarse
 * @param {string} id Nombre del sprite que representa la carta
 */
MemoryGameCard = function(id) {
  var that = this;
  this.name = id;
  this.fnd = false;
  this.flipped = false;

  this.draw = function(gs, pos) {
    if (this.fnd) {
      gs.draw(this.name, pos);
    } else if (this.flipped) {
      gs.draw(this.name, pos);
    } else {
      gs.draw("back", pos);
    }
  };

  this.flip = function() {
    if(this.flipped) {
      this.flipped = false;
    } else {
      this.flipped = true;
    }
  };

  this.found = function() {
    this.fnd = true;
  };

  this.compareTo = function(otherCard) {
    return (otherCard.name === this.name && this != otherCard) ? true : false;
  };
};

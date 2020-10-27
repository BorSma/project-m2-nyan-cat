// We create an instance of the Engine class. Looking at our index.html,
// we see that it has a div with an id of `"app"`
const gameEngine = new Engine(document.getElementById('app'));

// keydownHandler is a variable that refers to a function. The function has one parameter
// (does the parameter name matter?) which is called event. As we will see below, this function
// will be called every time the user presses a key. The argument of the function call will be an object.
// The object will contain information about the key press, such as which key was pressed.
const keydownHandler = (event) => {
  // event.code contains a string. The string represents which key was press. If the
  // key is left, then we call the moveLeft method of gameEngine.player (where is this method defined?)
  if ((event.code === 'ArrowLeft') && ( lives > 0 )) {
    gameEngine.player.moveLeft();
  }

  // If `event.code` is the string that represents a right arrow keypress,
  // then move our hamburger to the right
  if ((event.code === 'ArrowRight') && ( lives > 0 )) {
    gameEngine.player.moveRight();
  }

  if ((event.code === 'ArrowUp') && ( lives > 0 )) {
    console.log("Up");
    gameEngine.player.moveUp();
  }

  if ((event.code === 'ArrowDown') && ( lives > 0 )) {
    console.log("Down");
    gameEngine.player.moveDown();
  }

  //If the event.code is Enter then we restart the game after a life loss.
  if ((event.code === 'Enter') && ( lives > 0 ) && ( lives !== maxLives)) {
    gameEngine.clearElements();
    gameEngine.levelStart();
  }

  //If the event.code is Enter then we restart the game.
  if ((event.code === 'Enter') && ( lives === 0 )) {
    gameEngine.clearElements();
    gameEngine.restartGame();
  }

  // //If the event.code is Space and you have max lives you start the game
  // if ((event.code === 'Enter') && ( lives === maxLives )) {
  //   gameEngine.levelOne();
  // }

  //If the event.code is Ctrl and you have max lives you start the game
  if (event.code === 'Space' && gameRun === 1) {
    let shotLoc = 0;
    const shotSpots = GAME_WIDTH / SHOT_WIDTH;
    switch(gameEngine.player.x){
    case 0:
      shotLoc = 0;
      break;
    case 75:
      shotLoc = 1;
      break;
    case 150:
      shotLoc = 2;
      break;
    case 225:
      shotLoc = 3;
      break;
    case 300:
      shotLoc = 4;
      break;
    case 375:
      shotLoc = 5;
      break;
    case 450:
      shotLoc = 6;
      break;  
    case 525:
      shotLoc = 7;
      break;
    case 600:
      shotLoc = 8;
      break;       
    case 675:
      shotLoc = 9;
      break;  
    }
    gameEngine.shots.push(new Shot(document.getElementById('app'), shotLoc));
  }
};

// We add an event listener to document. document the ancestor of all DOM nodes in the DOM.
document.addEventListener('keydown', keydownHandler);

// We call the gameLoop method to start the game



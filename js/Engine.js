// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time


class Engine {
  // The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
  // You need to provide the DOM node when you create an instance of the class
  constructor(theRoot) {
    // We need the DOM element every time we create a new enemy so we
    // store a reference to it in a property of the instance.
    this.root = theRoot;
    // We create our hamburger.
    // Please refer to Player.js for more information about what happens when you create a player
    this.player = new Player(this.root);
    // Initially, we have no enemies in the game. The enemies property refers to an array
    // that contains instances of the Enemy class
    this.enemies = [];
    // Initially, we have no shots in the game. The shots property refers to an array
    // that contains instances of the Shot class
    this.shots = [];
    // Initially, we have no asteroids in the game. The shots property refers to an array
    // that contains instances of the asteroid class
    this.asteroids = [];
    // Initially, we have no bonuses in the game. The shots property refers to an array
    // that contains instances of the bonus class
    this.bonuses = [];
    // We add the background image to the game
    addBackground(this.root);
  }

  // The gameLoop will run every few milliseconds. It does several things
  //  - Updates the enemy positions
  //  - Detects a collision between the player and any enemy
  //  - Removes enemies that are too low from the enemies array
  gameLoop = () => {
    gameRun = 1;
    gameSpeed++;
    // This code is to see how much time, in milliseconds, has elapsed since the last
    // time this method was called.
    // (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.
   

    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();
    // We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
    // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
    });
    this.asteroids.forEach((asteroid) => {
      asteroid.update(timeDiff);
    });
    this.bonuses.forEach((bonus) => {
      bonus.update(timeDiff);
    });
    // We use the number of milliseconds since the last call to gameLoop to update the shot positions.
    // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Shot.js)
    this.shots.forEach((shot) => {
      shot.update(timeDiff);
    });

    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the asteroid class.
    this.asteroids = this.asteroids.filter((asteroid) => {
      return !asteroid.destroyed;
    });

    this.bonuses = this.bonuses.filter((bonus) => {
      return !bonus.destroyed;
    });

    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the Enemy class.
    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });

    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the Enemy class.
    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.collision;
    });

    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the Enemy class.
    this.shots = this.shots.filter((shot) => {
      return !shot.destroyed;
    });

    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the Enemy class.
    this.shots = this.shots.filter((shot) => {
      return !shot.collision;
    });

    // We need to perform the addition of enemies until we have enough enemies.
    while (this.enemies.length < MAX_ENEMIES) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
    }

    while (this.asteroids.length < MAX_ASTEROIDS) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spot = nextEnemySpot(this.asteroids);
      this.asteroids.push(new Asteroid(this.root, spot));
    }

    while (this.bonuses.length < MAX_BONUSES) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spot = nextEnemySpot(this.bonuses);
      this.bonuses.push(new Bonus(this.root, spot));
    }

    // We check if the player is dead. If he is, we alert the user
    // and return from the method (Why is the return statement important?)
    
    if (this.isPlayerDead()) {
     if ( lives > 0 ) {
       lives=lives-1; 
       gameRun = 0;
       announcement.update(`Press Enter to Restart!`);
      }
      lifeText.update(`Lives:${lives}`);
     clearTimeout;
     if (lives === 0) announcement.update(`GAME OVER!\n Press 'Y' to play again`);
     return;
    }

    if (this.enemyPass()) {
      //Get Points by Shooting the Nyan Cats!
      //score = score + enemyPassPoints
      //scoreText.update(`Score:${score}`);
    }

    if (this.collisionCat()) {
      
      score = score + enemyPassPoints
      scoreText.update(`Score:${score}`);
    }

    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    setTimeout(this.gameLoop, 20);

  };

  isPlayerDead = () => {
    let dead = 0;
    this.enemies.forEach(enemy => {
      if ((enemy.x === this.player.x) && (Math.round(enemy.y) > (GAME_HEIGHT - 4*PLAYER_HEIGHT))) {
        dead = 1;
        return true;
      }   
    })
    this.asteroids.forEach(asteroid => {
      if ((asteroid.x === this.player.x) && (Math.round(asteroid.y) > (GAME_HEIGHT - 3*PLAYER_HEIGHT))) {
        dead = 1;
        return true;
      }   
    })
    if (dead) return true;
    else return false;
  };
  

  enemyPass = () =>{
    let passCheck = 0;
    this.enemies.forEach(enemy => {
    if ((enemy.y >= (GAME_HEIGHT-10)) && enemy.scored === false) {
      passCheck = 1;
    }
    });
    if (passCheck === 1) return true;
  }

  collisionCat = () => {
    let colCheck = 0;
    this.enemies.forEach(enemy => {
      this.shots.forEach(shot=> {
        if ((enemy.x === shot.x) && (shot.y < (enemy.y+ENEMY_HEIGHT/2)) && (enemy.collision === false)) {
          enemy.collision = true;
          shot.collision = true;
          explosion(this.root, enemy.x, enemy.y);
          colCheck = 1;
        }
      });
      });  
      if (colCheck === 1) return true;
       
    };
  
    //This method restarts the game after a life lost.
  restart = () => {
    this.enemies.forEach(enemy => {
      enemy.clear = true;
    })
    this.asteroids.forEach(asteroid => {
      asteroid.clear = true;
    })
      gameEngine.gameLoop();
  }


}

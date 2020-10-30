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
    this.ranking = new Ranking(this.root);
    addBackground(this.root);
    this.randomInterval =  Math.floor(Math.random() * (max - min + 1) + min);
    
    
  }

  // The gameLoop will run every few milliseconds. It does several things
  //  - Updates the enemy positions
  //  - Detects a collision between the player and any enemy
  //  - Removes enemies that are too low from the enemies array
  gameLoop = () => {
    announcement.update(``);
    gameWait = 0;
    gameRun = 1;
    

    // This code is to see how much time, in milliseconds, has elapsed since the last
    // time this method was called.
    // (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.

    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
      this.bonusStartTime = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();
    // We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
    // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
    });
    // We use the number of milliseconds since the last call to gameLoop to update the shot positions.
    // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Shot.js)
    this.shots.forEach((shot) => {
      shot.update(timeDiff);
    });

    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the asteroid class.

    //ASTEROID STUFF
    if (level >= 3){
    this.asteroids = this.asteroids.filter((asteroid) => {
      return !asteroid.destroyed;
    });
    this.asteroids.forEach((asteroid) => {
      asteroid.update(timeDiff);
    });
    while (this.asteroids.length < MAX_ASTEROIDS) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spot = nextEnemySpot(this.asteroids);
      this.asteroids.push(new Asteroid(this.root, spot));
    }
    }

    // BONUS STUFF
    if (level >= 5){
    this.bonuses = this.bonuses.filter((bonus) => {
      return !bonus.destroyed;
    });
    this.bonuses.forEach((bonus) => {
      bonus.update(timeDiff);
    });
      // Calclate Time difference between 
    
      let bonusEndTime = new Date().getTime();
      const bonusTimeDifference = bonusEndTime-this.bonusStartTime;
      if (this.randomInterval <= bonusTimeDifference && this.bonuses.length < MAX_BONUSES){
        const spot = nextEnemySpot(this.bonuses);
        this.bonuses.push(new Bonus(this.root, spot));
        this.randomInterval =  Math.floor(Math.random() * (max - min + 1) + min);
      }
  }
    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the Enemy class.
    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
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
    // We check if the player is dead. If he is, we alert the user
    // and return from the method (Why is the return statement important?)

    if (this.levelUp()) {
      level++;
      this.clearElements();
      this.levelStart();
      return;
    }

    if (this.isPlayerDead()) {
      if (lives > 0) {
        lives = lives - 1;
        gameRun = 0;
        announcement.update(`Too Slow! \n\n Press 'Enter' to Continue!`);
      }

      if (lives === 0) {
        gameRun = 0;
        if (score > gameEngine.ranking.highscore3.score) {
          announcement.update(`GAME OVER!\n Type your name in and press 'Enter' to play again! \n\n Best Scores:
        \n 1. ${gameEngine.ranking.highscore1.name}: ${gameEngine.ranking.highscore1.score} pts
        \n 2. ${gameEngine.ranking.highscore2.name}: ${gameEngine.ranking.highscore2.score} pts
        \n 3. ${gameEngine.ranking.highscore3.name}: ${gameEngine.ranking.highscore3.score} pts
        \n Enter your name:`);
          gameEngine.ranking.enterHighScore();
        } else {
          announcement.update(`GAME OVER!\n Press 'Enter' to play again! \n\n Best Scores:
           \n 1. ${gameEngine.ranking.highscore1.name}: ${gameEngine.ranking.highscore1.score} pts
           \n 2. ${gameEngine.ranking.highscore2.name}: ${gameEngine.ranking.highscore2.score} pts
           \n 3. ${gameEngine.ranking.highscore3.name}: ${gameEngine.ranking.highscore3.score} pts`);
        }
      }
      lifeText.update(`Lives:${lives}`);
      return;
    }

    if (this.enemyPass()) {
      //Get Points by letting Nyan Cats pass!
      //score = score + enemyPassPoints
      //scoreText.update(`Score:${score}`);
    }

    if (this.bonusScore()) {
      //Get Points by getting bonuses!
      score = score + bonusPoints;
      lives++;
      lifeText.update(`Lives: ${lives}`);
      scoreText.update(`Score: ${score}`);
      this.bonusStartTime = new Date().getTime();
    }

    if (this.collisionCat()) {
      score = score + enemyPassPoints;
      scoreText.update(`Score: ${score}`);
    }

    if (this.collisionAsteroid()) {
      //score = score + enemyPassPoints
      //scoreText.update(`Score:${score}`);
    }

    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    setTimeout(this.gameLoop, 20);
  };

  isPlayerDead = () => {
    let dead = 0;
    this.enemies.forEach((enemy) => {
      if (
        enemy.x === this.player.x &&
        Math.round(enemy.y) > this.player.y - ENEMY_HEIGHT + 10 &&
        Math.round(enemy.y) < this.player.y + PLAYER_HEIGHT
      ) {
        dead = 1;
        return true;
      }
    });
    this.asteroids.forEach((asteroid) => {
      if (
        asteroid.x === this.player.x &&
        Math.round(asteroid.y) > this.player.y - asteroid_HEIGHT + 40 &&
        Math.round(asteroid.y) < this.player.y + PLAYER_HEIGHT
      ) {
        dead = 1;
        return true;
      }
    });
    if (dead) {
      return true;
    } else return false;
  };

  enemyPass = () => {
    let passCheck = 0;
    this.enemies.forEach((enemy) => {
      if (enemy.y >= GAME_HEIGHT - 10 && enemy.scored === false) {
        passCheck = 1;
      }
    });
    if (passCheck === 1) return true;
  };

  bonusScore = () => {
    let bonusCheck = 0;
    this.bonuses.forEach((bonus) => {
      if (
        bonus.x === this.player.x &&
        Math.round(bonus.y) > this.player.y - bonus_HEIGHT + 10 &&
        Math.round(bonus.y) < this.player.y + bonus_HEIGHT &&
        bonus.scored === false
      ) {
        bonusCheck = 1;
        bonus.collision = true;
        bonus.scored = true;
      }
    });
    if (bonusCheck === 1) return true;
  };

  collisionCat = () => {
    let colCheck = 0;
    this.enemies.forEach((enemy) => {
      this.shots.forEach((shot) => {
        if (
          enemy.x === shot.x &&
          shot.y < enemy.y + ENEMY_HEIGHT / 1.5 &&
          gameEngine.player.y > enemy.y &&
          enemy.collision === false
        ) {
          enemy.collision = true;
          shot.collision = true;
          explosion(this.root, enemy.x, enemy.y);
          colCheck = 1;
          enemiesDestroyed++;
        }
      });
    });
    if (colCheck === 1) return true;
  };

  collisionAsteroid = () => {
    let colAstCheck = 0;
    this.asteroids.forEach((asteroid) => {
      this.shots.forEach((shot) => {
        if (
          asteroid.x === shot.x &&
          shot.y < asteroid.y + asteroid_HEIGHT &&
          gameEngine.player.y > asteroid.y &&
          asteroid.collision === false
        ) {
          shot.collision = true;
          explosionAsteroid(this.root, asteroid.x, asteroid.y);
          colAstCheck = 1;
        }
      });
    });
    if (colAstCheck === 1) return true;
  };

  //This method restarts the game after a life lost.
  clearElements = () => {
    announcement.update(``);

    this.enemies.forEach((enemy) => {
      enemy.clear = true;
    });
    this.asteroids.forEach((asteroid) => {
      asteroid.clear = true;
    });
    this.shots.forEach((shot) => {
      shot.clear = true;
    });
    this.bonuses.forEach((bonus) => {
      bonus.clear = true;
    });
    this.shots.forEach((shot) => {
      shot.update(0);
    });
    this.shots = this.shots.filter((shot) => {
      return !shot.destroyed;
    });
    this.enemies.forEach((enemy) => {
      enemy.update(0);
    });
    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });
    this.bonuses.forEach((bonus) => {
      bonus.update(0);
    });
    this.bonuses = this.bonuses.filter((bonus) => {
      return !bonus.destroyed;
    });

    this.asteroids.forEach((asteroid) => {
      asteroid.update(0);
    });
    this.asteroids = this.asteroids.filter((asteroid) => {
      return !asteroid.destroyed;
    });
  };

  levelOne = () => {
    addTopBar(this.root);
    gameEngine.player.centerPlayer();
    gameRun = 0;
    gameWait = 1;
    level = 1;
    lifeText.update(`Lives: ${lives}`);
    scoreText.update(`Score: ${score}`);
    levelText.update(`Level: ${level}`);
    announcement.update(
      `Level ${level}\n\n Get Ready! \n\n Eradicate the viruses!`
    );
    setTimeout(gameEngine.gameLoop, 3000);
  };

  levelStart = () => {
    gameEngine.player.centerPlayer();
    gameRun = 0;
    gameWait = 1;
    lifeText.update(`Lives: ${lives}`);
    scoreText.update(`Score: ${score}`);
    levelText.update(`Level: ${level}`);
    switch (level) {
      case 1:
        announcement.update(`Level ${level}\n\n Get Ready!`);
        console.log(MAX_ASTEROIDS);
        break;
      case 3:
        announcement.update(
          `Level ${level}\n\n Get Ready!\n\n Dodge the Super Viruses!`
        );
        console.log(MAX_ASTEROIDS);
        break;
      case 5:
        announcement.update(
          `Level ${level}\n\n Get Ready!\n\n Collect the Vaccines for Bonus Points!`
        );
        console.log(MAX_ASTEROIDS);
      case 6:
        announcement.update(`Level ${level}\n\n Get Ready!`);
        MAX_ASTEROIDS = 3;
        MAX_ENEMIES = 3;
        console.log(MAX_ASTEROIDS);
        break;
      case 8:
        announcement.update(`Level ${level}\n\n Get Ready!`);
        break;
      case 10:
        announcement.update(`Level ${level}\n\n Get Ready!`);
        MAX_ASTEROIDS = 4;
        MAX_ENEMIES = 4;
        console.log(MAX_ASTEROIDS);
        break;
      default:
        announcement.update(`Level ${level}\n\n Get Ready!`);
    }
    setTimeout(gameEngine.gameLoop, 3000);
  };

  restartGame = () => {
    announcement.update(``);
    lives = maxLives;
    score = 0;
    level = 1;
    enemiesDestroyed = 0;
    scoreText.update(`Score: ${score}`);
    lifeText.update(`Lives: ${lives}`);
    levelText.update(`Level: ${level}`);
    gameEngine.levelOne();
  };

  levelUp = () => {
    gameWait = 1;
    let tarCheck = 0;
    if (enemiesDestroyed === level * 11) {
      tarCheck = 1;
    }
    if (tarCheck === 1) return true;
  };
}

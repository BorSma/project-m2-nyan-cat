// The HighScore
class Ranking {
 
  constructor(theRoot, bonusSpot) {
   
    this.root = theRoot;
    this.x = 0;
    this.y = GAME_HEIGHT/1.4;
    
    this.highscore1 = {name: 'Any', score: 7500};
    this.highscore2 = {name: 'Bob', score: 1200};
    this.highscore3 = {name: 'CHA', score: 250};
     
    this.domElement = document.createElement('input');
    this.domElement.setAttribute("class", "input");
    this.domElement.setAttribute("name", "highscore");
    this.domElement.setAttribute("type", "text");
    this.domElement.setAttribute("maxlength", "3");
    this.domElement.setAttribute("autofocus", "autofocus");
    this.domElement.style.position = 'absolute';
    this.domElement.style.font = '30px Impact';
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = `${this.y}px`;
    this.domElement.style.zIndex = 11;
    
  }

  enterHighScore() {
    this.root.appendChild(this.domElement);
    highScoreCheck = true;
  }

  removeHighScore() {
    if (highScoreCheck === true) {
      if (score > gameEngine.ranking.highscore1.score){
        gameEngine.ranking.highscore3.name = gameEngine.ranking.highscore2.name;
        gameEngine.ranking.highscore3.score = gameEngine.ranking.highscore2.score;
        gameEngine.ranking.highscore2.name = gameEngine.ranking.highscore1.name;
        gameEngine.ranking.highscore2.score = gameEngine.ranking.highscore1.score;
        gameEngine.ranking.highscore1.name = this.domElement.value;
        gameEngine.ranking.highscore1.score = score;
      }
      else if (score > gameEngine.ranking.highscore2.score){
        gameEngine.ranking.highscore3.name = gameEngine.ranking.highscore2.name;
        gameEngine.ranking.highscore3.score = gameEngine.ranking.highscore2.score;
        gameEngine.ranking.highscore2.name = this.domElement.value;
        gameEngine.ranking.highscore2.score = score;
          }
      else if (score > gameEngine.ranking.highscore3.score){
        gameEngine.ranking.highscore3.name = this.domElement.value;
        gameEngine.ranking.highscore3.score = score;
          }
    announcement.update(``);
    this.root.removeChild(this.domElement);
    highScoreCheck = false;
    }
  }

  
}

// In this file we have some data that the other source files will use.
// Most of this data is stored in constants.
// Constants are just variables that never change. By convention,
// We write constants with upper case letters.

// The GAME_WIDTH and GAME_HEIGHT constants denote the size
// of the game area in pixels and is used in engine-utilities.js.
//const GAME_WIDTH = 375;
const GAME_WIDTH = 750;
const GAME_HEIGHT = 800;

// These constants represent the width and height of an enemy in pixels
// as well as the maximum number of enemies on screen at any given time.
const ENEMY_WIDTH = 75;
//const ENEMY_HEIGHT = 156;
const ENEMY_HEIGHT = 74;
let MAX_ENEMIES = 2;
let MAX_ASTEROIDS = 2;
const MAX_BONUSES = 1;

// These constants represent the player width and height.
const PLAYER_WIDTH = 75;
//const PLAYER_HEIGHT = 54;
const PLAYER_HEIGHT = 77;

const SHOT_WIDTH = 75; 
const SHOT_HEIGHT = 45;
//const SHOT_HEIGHT = 74;

const asteroid_WIDTH = 75;
const asteroid_HEIGHT = 110;

const bonus_WIDTH = 75;
const bonus_HEIGHT = 67;
let bonusPoints = 100;

let enemiesDestroyed = 0;

let maxLives=3;
let lives = 0;

let score = 0;
let enemyPassPoints = 10;

let gameRun = 0;
let gameWait = 0;

let level = 1;

let highScoreCheck = false;

//time between bonuses
let max = 20000;
let min = 15000;
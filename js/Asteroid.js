// The asteroid class will contain information about the asteroid such as
// its position on screen. It will also provide methods for updating
// and destroying the asteroid.
class Asteroid {
  // The constructor takes 2 arguments.
  // - theRoot refers to the parent DOM element.
  //   We need a way to add the DOM element we create in this constructor to our DOM.
  // - asteroidSpot is the position of the asteroid (either 0, 1, 2, 3 or 4)
  // Since the constructor takes 2 parameters
  // and the 2 parameters provide important information, we must supply 2 arguments to "new" every time we
  // create an instance of this class.
  constructor(theRoot, asteroidSpot) {
    // When we create an asteroid instance, for example, new asteroid(someRoot, 3)
    // A new object is created and the constructor of the asteroid class is called. The context (the \`this\` keyword) is going
    // to be the new object. In these lines of code we see how to add 2 properties to this object: spot, root and gameHeight.
    // We do this because we want to access this data in the other methods of the class.
    // - We need the root DOM element so that we can remove the asteroid when it is no longer needed. This will be done at a later time.
    // - We need to keep track of the asteroid spot so that we don't place two enemies in the same spot.
    this.root = theRoot;
    this.spot = asteroidSpot;

    // The x position of the asteroid is determined by its width and its spot. We need this information for the lifetime
    // of the instance, so we make it a property of the instance. (Why is this information needed for the lifetime of the instance?)
    this.x = asteroidSpot * asteroid_WIDTH;

    // The y position is initially less than 0 so that the enemies fall from the top. This data is stored as a property
    // of the instance since it is needed throughout its lifetime. The destroyed property will indicate whether this asteroid
    // is still in play. It is set to true whenever the asteroid goes past the bottom of the screen.
    // It is used in the Engine to determine whether or not an asteroid is in a particular column.
    this.y = -asteroid_HEIGHT;
    
    this.destroyed = false;

    //Scored is used when the asteroid passes the bottom of the screen. Not really used anymore...remove?
    this.scored = false;

    //Collision is used when there is a collission between the shot and the asteroid.
    this.collision = false;

    //Clear is used when restarting the game. This flags the asteroid for removal.
    this.clear = false;
    
    

    // We create a new DOM element. The tag of this DOM element is img. It is the DOM node that will display the asteroid image
    // to the user. When the asteroid is no longer needed, we will use a reference to this DOM node to remove it from the game. This
    // is why we create a property that refers to it.
    this.domElement = document.createElement('img');

    // We give it a src attribute to specify which image to display.
    this.domElement.src = './images/asteroid.png';
    // We modify the CSS style of the DOM node.
    this.domElement.style.position = 'absolute';
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = `${this.y}px`;
    this.domElement.style.zIndex = 5;

    // Show that the user can actually see the img DOM node, we append it to the root DOM node.
    theRoot.appendChild(this.domElement);
    //this.speed = Math.random() / 2 + 0.25 + level/100;
    this.speed = Math.random() / 1.25;
  }

  // We set the speed property of the asteroid. This determines how fast it moves down the screen.
  // To make sure that every asteroid has a different speed, we use Math.random()
  // this method will be called on the asteroid instance every few milliseconds. The parameter
  // timeDiff refers to the number of milliseconds since the last update was called.
  update(timeDiff) {
    //console.log(`The asteroid X is: ${this.x}`);
    // We update the y property of the instance in proportion of the amount of time
    // since the last call to update. We also update the top css property so that the image
    // is updated on screen
    this.y = this.y + timeDiff * this.speed;
    this.domElement.style.top = `${this.y}px`;

    // If the y position of the DOM element is greater than the GAME_HEIGHT then the asteroid is at the bottom
    // of the screen and should be removed. We remove the DOM element from the root DOM element and we set
    // the destroyed property to indicate that the asteroid should no longer be in play
    if ((this.y > (GAME_HEIGHT)) || (this.collision === true) || (this.clear === true)) {
      this.root.removeChild(this.domElement);
      this.destroyed = true;
    }
  }
}

// This class is not used in the project yet.
class Text {
  // The constructor has three parameters. Here is an example of how you would create
  // an instance of this class
  constructor(root, xPos, yPos, width) {
    // We create a DOM element, set its CSS attributes then append it to the parent DOM element. We also
    // set the \`domElement\` property of the instance to the newly created DOM element so we can update it later
    const div = document.createElement('div');

    div.style.position = 'absolute';
    div.style.left = xPos;
    div.style.top = yPos;
    div.style.width = width;
    div.style.textAlign = 'center';
    div.style.color = 'white';
    div.style.font = 'bold 30px Impact';
    div.style.zIndex = 2000;
    div.setAttribute("class","text");

    root.appendChild(div);

    this.domElement = div;
  }

  // This method is used to update the text displayed in the DOM element
  update(txt) {
    this.domElement.innerText = txt;
  }
}

//Initialize banner at the top and set to number of lives available.
let lifeText = new Text(document.getElementById('app'), GAME_WIDTH*0.05,20);
let scoreText = new Text(document.getElementById('app'), GAME_WIDTH*0.7,20);
let levelText = new Text(document.getElementById('app'), GAME_WIDTH*0.44,20);
let announcement = new Text(document.getElementById('app'), 0, GAME_HEIGHT/3.25, GAME_WIDTH);
announcement.update(`Press Enter to Start!\n\nControls:\n ↑ - Up \n↓ - Down\n← - Left\n→ - Right\n Spacebar - Cheese Slice Launcher`);



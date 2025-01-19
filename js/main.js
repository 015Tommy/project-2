// shows what grid has a ship
let board = [
  [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

// will count when you hit a ship
let hitCount = 0;

// get the box divs on the 
const boxes = document.querySelectorAll('.box');

// will check the boxes
function check(event) {
  const clickedBox = event.target; // lets see what box it cilks
  
  // get the row and colunm form the html div en checks aslo if it has box in calss
  if (clickedBox.classList.contains('box')) {
    const row = parseInt(clickedBox.getAttribute('data-row'));
    const col = parseInt(clickedBox.getAttribute('data-col'));
    
    // checks the box if it has 0 in it
    if (board[row][col] === 0) {
      clickedBox.classList.add('miss'); //if its is miss then they add class miss
      board[row][col] = 3;          // put it as miss
    }
    // checks the box if it has 0 in it
    else if (board[row][col] === 1) {
      clickedBox.classList.add('hit');  //put class hit on the box
      board[row][col] = 2;          // put it as miss
      hitCount++;

      // If all ships have been hit
      if (hitCount === 17) {
        alert("You win");
      }
    }
  }
}

// Add click event
document.querySelector('.board').addEventListener('click', check);

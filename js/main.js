const divs = document.querySelectorAll('div');

for (let i = 0; i < divs.length; i++) {
    const div = divs[i];
     if (div.classList.contains('boxes')) {
        console.log('Found a boxes div:', div);
    }
}


const ships = document.querySelectorAll('.ships1, .ships2, .ships3, .ships4, .ships5, .ships6, .ships7, .ships8');

ships.forEach(ship => {
  let offsetX, offsetY, isDragging = false;


  ship.addEventListener('mousedown', function (e) {
    isDragging = true;
    offsetX = e.clientX - ship.getBoundingClientRect().left;
    offsetY = e.clientY - ship.getBoundingClientRect().top;
    ship.style.cursor = 'grabbing';
  });

  
  document.addEventListener('mousemove', function (e) {
    if (isDragging) {
      ship.style.position = 'absolute'; 
      ship.style.left = e.clientX - offsetX + 'px';
      ship.style.top = e.clientY - offsetY + 'px';
    }
  });

 
  document.addEventListener('mouseup', function () {
    isDragging = false;
    ship.style.cursor = 'move';
  });
});
const divs = document.querySelectorAll('div');

for (let i = 0; i < divs.length; i++) {
    const div = divs[i];
     if (div.classList.contains('boxes')) {
        console.log('Found a boxes div:', div);
    }
}


const hamburger = document.querySelector('.hamburger-menu');
const container = document.querySelector('.container');
const links = document.querySelectorAll('.link');



// add and remove class active on the container everytime u click on hamburger-menu to add animations
hamburger.addEventListener("click", () => {
    container.classList.toggle('active');


});


// add variations on links animation delay -starts with 0.15 then add 0.05 to the next one and so on
let count = 0.15;
for (let i = 0; i < links.length; i++) {
    count += 0.05;
    links[i].style.animationDelay = `${count}s`;


    // add event listener to links if u click on them
    links[i].addEventListener("click", () => {
        container.classList.remove('active');

    })
}


// make the links delay when i click on them until the animation on main ends
function delay(URL) {
    setTimeout(function () { window.location = URL }, 400);
}









//type writer effect
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];

        // Check if deleting
        if (this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Initial Type Speed
        let typeSpeed = 300;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        // If word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}


// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
}





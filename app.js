'use strict';
// const errorMessage = document.getElementById('h2');
const listResults = document.getElementById('listResults');
const viewResults = document.getElementById('results');
const imgContainer = document.getElementById('container');
let item1 = document.querySelector('section img:first-child');
let item2 = document.querySelector('section img:nth-child(2)');
let item3 = document.querySelector('section img:nth-child(3)');
let choices = [];
let clicks = 0;
const clicksAllowed = 25;

// Display 3 product images
// Create a constructor function that has the following properties: Name of product, file path, times image has been shown
// Create algorithm that will randomly generate 3 images and display them side-by-side-by-side
// For set of 3 images, increment its property of times it has been shown by one
// Add event listener t othe section of the HTML page where images are
// On click, generate a set of new images.
// Inside of the constructor function, define a property to hold the number of times a product has been clicked
// after each selection by a user, update the newly added property to reflect if it was clicked
// 25 rounds of voting before session is ended
// Keep number of rounds in a variable
// Create a property attached to the constructor that keeps track of all the products that are currently being considered
// After voting rounds have been completed, remove event listeners
// Add a button with the text "view results"
// Displayed product names should match the file name

function Items(name, fileExtension = 'jpeg') {
  this.name = name;
  this.src = `images/${name}.${fileExtension}`;
  this.likes = 0;
  this.views = 0;
  choices.push(this);
}

new Items('bag');
new Items('banana');
new Items('bathroom');
new Items('boots');
new Items('breakfast');
new Items('bubblegum');
new Items('chair');
new Items('cthulhu');
new Items('dog-duck');
new Items('dragon');
new Items('pen');
new Items('pet-sweep');
new Items('scissors');
new Items('shark');
new Items('sweep');
new Items('tauntaun');
new Items('unicorn');
new Items('water-can');
new Items('wine-glass');

function randomChoice() {
  return Math.floor(Math.random() * choices.length);
}

function renderChoices() {
  let choice1 = randomChoice();
  let choice2 = randomChoice();
  let choice3 = randomChoice();
  //   while (choice1 === choice2 || choice1 === choice3 || choice2 === choice3) {
  //     choice2 === randomChoice();
  //     choice3 === randomChoice();
  //   }
  item1.src = choices[choice1].src;
  item1.alt = choices[choice1].name;
  choices[choice1].views++;
  item2.src = choices[choice2].src;
  item2.alt = choices[choice2].name;
  choices[choice2].views++;
  item3.src = choices[choice3].src;
  item3.alt = choices[choice3].name;
  choices[choice3].views++;
}

function handleClick(e) {
  if (e.target === imgContainer) {
    alert('You must select an item');
  }
  clicks++;
  let clickedChoice = e.target.alt;
  for (let i = 0; i < choices.length; i++) {
    if (clickedChoice === choices[i].name) {
      choices[i].likes++;
      break;
    }
  }
  renderChoices();
  if (clicks === clicksAllowed) {
    imgContainer.removeEventListener('click', handleClick);
    viewResults.addEventListener('click', handleResults);
  }
}

function handleResults() {
  for (let i = 0; i < choices.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${choices[i].name} had ${choices[i].views} and was clicked ${choices[i].likes} times.`;
    listResults.appendChild(li);
  }
}

imgContainer.addEventListener('click', handleClick);

renderChoices();

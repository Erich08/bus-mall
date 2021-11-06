'use strict';
const clicksAllowed = 25;
const imgContainer = document.getElementById('container');
let item1 = document.querySelector('section img:first-child');
let item2 = document.querySelector('section img:nth-child(2)');
let item3 = document.querySelector('section img:nth-child(3)');
let choices = [];
let clicks = 0;
let uniqueNumbers = [];



function Items(name, fileExtension = 'jpeg') {
  this.name = name;
  this.src = `images/${name}.${fileExtension}`;
  this.likes = 0;
  this.views = 0;
  this.viewsLikes = JSON.parse(localStorage.getItem(this.name)) || {
    views: [],
    likes: []
  };
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

Items.prototype.storedData = function() {
  this.viewsLikes.likes.push(this.likes);
  this.viewsLikes.views.push(this.views);
  localStorage.setItem(this.name, JSON.stringify(this.viewsLikes));
}


// Generates a random number between 0-18
function randomChoice() {
  return Math.floor(Math.random() * choices.length);
}

// Produces 6, non-repeating, numbers to ensure the user doesn't see a duplicate item after each selection.
function renderChoices() {
  while (uniqueNumbers.length < 6) {
    let rand = randomChoice();
    if (!uniqueNumbers.includes(rand)) {
      uniqueNumbers.push(rand);
    }
  }
  
  let choice1 = uniqueNumbers.shift();
  let choice2 = uniqueNumbers.shift();
  let choice3 = uniqueNumbers.shift();

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
    
    for(let i = 0; i < choices.length; i++) {
      choices[i].storedData();
    }
    barGraph();
    
  }
}


function barGraph() {
  let productNames = [];
  let productViews = [];
  let productLikes = [];
  for (let i = 0; i < choices.length; i++) {
    
    productNames.push(choices[i].name);
    let likeSum = 0;
    let viewsSum = 0;
    for (let j = 0; j < choices[i].viewsLikes.likes.length; j++) {
      likeSum += choices[i].viewsLikes.likes[j];
      viewsSum += choices[i].viewsLikes.views[j];
    }

    productViews.push(viewsSum);
    productLikes.push(likeSum);
  }

  
  const data = {
    labels: productNames,
    datasets: [
      {
        label: 'Views',
        data: productViews,
        backgroundColor: ['rgba(255, 255, 255)'],
        borderColor: ['rgb(0, 0, 0)'],

        borderWidth: 1,
      },
      {
        label: 'Likes',
        data: productLikes,
        backgroundColor: ['rgba(0, 0, 0)'],
        borderColor: ['rgb(255, 255, 255)'],
        borderWidth: 1,
      },
    ],
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };
  let canvasChart = document.getElementById('myChart');
  const myChart = new Chart(canvasChart, config);
}



imgContainer.addEventListener('click', handleClick);

renderChoices();


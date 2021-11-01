// Declare local variables relating to DOM
const counterElement = document.getElementById('counter');
const likeList = document.querySelector('.likes');
const commentList = document.getElementById('list');
const commentForm = document.getElementById('comment-form');
const plusButton = document.getElementById('plus');
const minusButton = document.getElementById('minus');
const heartButton = document.getElementById('heart');
const pauseButton = document.getElementById('pause');
const submitButton = document.getElementById('submit');

// Declare global variables
let currentNumber = 0;
const likeTrackerArray = [];
let interval;

// Declare listeners
plusButton.addEventListener('click', plusHandler);
minusButton.addEventListener('click', miunusHandler);
heartButton.addEventListener('click', likeHandler);
pauseButton.addEventListener('click', pauseHandler);
commentForm.addEventListener('submit', commentHandler);

// Updates timer text content
function updateTimerText() {
  counterElement.textContent = currentNumber;
}

// Starts timer from current number
function startTimer() {
  interval = setInterval(counterIncrementer, 1000, currentNumber);
}

// Timer increment function, adds one to timer number every second
function counterIncrementer() {
  currentNumber ++;
  updateTimerText();
}

// Manual increase function, adds one to timer when clicked
function plusHandler() {
  currentNumber ++;
  updateTimerText();
}

// Manual decrease function, subtracts one from timer when clicked
function miunusHandler() {
  currentNumber --;
  updateTimerText();
}

// Master like handler, adds a number with a quantity of likes to the record
function likeHandler() {
  likeTrackerArray.push(currentNumber);
  if (checkLikes() === 1) {
    let newLi = document.createElement('li');
    newLi.setAttribute('id', currentNumber.toString());
    newLi.textContent = `${currentNumber} has been liked 1 time.`;
    likeList.appendChild(newLi);
  } else {
    let replaceLi = document.getElementById(currentNumber.toString());
    replaceLi.textContent = `${currentNumber} has been liked ${numberOfLikes} times.`;
  }
}

// Checks list of numbers that have previously been liked
function checkLikes() {
  const likeCheck = likeTrackerArray.filter(item => item === currentNumber)
  return likeCheck.length;
}

// Pause handler master
function pauseHandler() {
  if (!interval) {
    pauseButton.textContent = 'pause';
    startTimer();
  } else {
    pauseButton.textContent = 'resume'
    clearInterval(interval);
    interval = null;
  }
  buttonToggle();
}

// Toggles buttons on and off with pause and resume
function buttonToggle() {
  plusButton.disabled = !plusButton.disabled;
  minusButton.disabled = !minusButton.disabled;
  heartButton.disabled = !heartButton.disabled;
  submitButton.disabled = !submitButton.disabled;
}

// Handles comment submission
function commentHandler(e) {
  e.preventDefault();
  addComment(e.target.comment_input.value);
  commentForm.reset();
}

// Adds a comment
function addComment(comment) {
  let newP = document.createElement('p');
  newP.textContent = comment;
  commentList.appendChild(newP);
}

// Initialize timer incrementing
startTimer();
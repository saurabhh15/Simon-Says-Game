let gameSeq = [];
let userSeq = [];

let btns = ['red','green','yellow','blue'];

let started = false;
let level = 0;

let h2 = document.querySelector('h2');

let highScore = localStorage.getItem('highScore') || 0; // Get the high score from localStorage
let h3 = document.querySelector('h3'); // New element to display high score

// Set the initial high score on page load
h3.innerText = `High Score: ${highScore}`;

function startGame() {
    if (started == false) {
      console.log('Game started');
      started = true;
      levelUp();
    }
  }
  
  // Start game on key press or screen tap
  document.addEventListener('keypress', startGame);
  document.addEventListener('touchstart', startGame); // For mobile devices

function btnFlash(btn){
    btn.classList.add('flash');
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);

}

function levelUp(){
    userSeq = [];

    level++;
    h2.innerText = `Level ${level}`;
    
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    // console.log(randIdx);
    console.log("Random Color: ",randColor);
    // console.log(randBtn);
    
    btnFlash(randBtn);
    gameSeq.push(randColor);
    console.log("Game sequence: ",gameSeq);
}


function checkAns(idx){

    if (userSeq[idx] == gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    }else{
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;

        document.querySelector('body').style.backgroundColor = 'red';
        setTimeout(() => {
            document.querySelector('body').style.backgroundColor = 'white';
        }, 200);

        // Check and update high score
        if (level > highScore) {
        highScore = level;
        localStorage.setItem('highScore', highScore); // Save new high score to localStorage
        h3.innerText = `High Score: ${highScore}`; // Update high score display
      }

        reSet();
    }
}

function btnPress(){
    let btn = this; //here 'this'->  is which button was pressed
    btnFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    console.log("User Sequence: ",userSeq);

    checkAns(userSeq.length - 1);
}   

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns){
    btn.addEventListener('click',btnPress);
}

function reSet(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

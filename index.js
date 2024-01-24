let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("reset-btn");
let winner = document.querySelector(".winner");
let msg = document.querySelector(".msg");
let playAgain = document.querySelector(".play-again");
let reset = document.querySelector(".reset-btn");
let main = document.querySelector("main");
let cup = document.querySelector("img");
let turnO = false;
let count = 0;
let flag= false;
let arr = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

function disableAllBtn() {
  for (box of boxes) {
    box.disabled = true;
  }
}

function enableAllBtn() {
  for (box of boxes) {
    box.disabled = false;
    box.innerHTML = "";
  }
  turnO = false;
  count = 0;
  flag=false;
}
function play() {
  msg.classList.add("hide");
  main.classList.remove("hide");
  enableAllBtn();
}
function showWinner(row) {

  confetti({
    particleCount: 100,
    spread:180,
    shapes: ["star"],
    colors:["#FFD700"],
  });

  boxes[row[0]].classList.remove("boxGreen");
  boxes[row[0]].classList.add("a");
  boxes[row[1]].classList.remove("boxGreen");
  boxes[row[1]].classList.add("a");
  boxes[row[2]].classList.remove("boxGreen");
  boxes[row[2]].classList.add("a");
  winner.innerHTML = `Congratulations, Player ${boxes[row[0]].innerHTML} won!!`;
  cup.setAttribute("src", "winner-cup.svg");
  disableAllBtn();
  msg.classList.remove("hide");
  main.classList.add("hide");
}
function draw() {
  boxes.forEach((box) => {
    box.classList.remove("boxRed");
    box.classList.add("a");
  })
  winner.innerHTML = `Match Draw!!`;
  disableAllBtn();
  msg.classList.remove("hide");
  main.classList.add("hide");
  console.log(cup);
  cup.setAttribute("src", "looser.svg");
}
function checkWin() {
  for (let row of arr) {
    if (boxes[row[0]].innerHTML !== "" && boxes[row[1]].innerHTML !== "" && boxes[row[2]].innerHTML !== ""  ) {
      if (boxes[row[0]].innerHTML === boxes[row[1]].innerHTML && boxes[row[1]].innerHTML === boxes[row[2]].innerHTML) {
        function sleep(ms) {
          return new Promise((resolve) => setTimeout(resolve, ms));
        }
        disableAllBtn();
        flag=true;
        boxes[row[0]].classList.remove("a");
        boxes[row[0]].classList.add("boxGreen");
        boxes[row[1]].classList.remove("a");
        boxes[row[1]].classList.add("boxGreen");
        boxes[row[2]].classList.remove("a");
        boxes[row[2]].classList.add("boxGreen");
        // boxes[row[1]].style.backgroundColor = "green";
        // boxes[row[2]].style.backgroundColor = "green";
        // boxes[row[0]].style.color = "#FDF0D1";
        // boxes[row[1]].style.color = "#FDF0D1";
        // boxes[row[2]].style.color = "#FDF0D1";
        sleep(1500).then(() => {
          showWinner(row);
        });
        
      }
    }
  }
}
boxes.forEach((box) => {
  box.addEventListener("click", () =>
  {
    console.log(box.disabled);
    box.disabled = true;
    console.log(box.disabled);
    if (turnO) {
      box.innerHTML = "O";
      turnO = false;
    } 
    else {
      box.innerHTML = "X";
      turnO = true;
    }
    checkWin();
    count++;
    if(!flag)
    {
      if (count == 9) {
        console.log(count);
        function sleep(ms) {
          return new Promise((resolve) => setTimeout(resolve, ms));
        }
        disableAllBtn();
        boxes.forEach((box) => {
          box.classList.remove("a");
          box.classList.add("boxRed")
        })
        sleep(1500).then(() => {
          draw();
        });
      }
    }
  });
});

// play again
playAgain.addEventListener("click", play);

// reset
reset.addEventListener("click", enableAllBtn);

let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnX = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const resetGame = () => {
    enableBoxes();
    turnX = true;
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if(turnX){ // Player  X
            box.innerText = "X";
            box.style.color = "#e0413f";
            turnX = false;
            count++;
        }
        else{ // Player O
            box.innerText = "O";
            box.style.color = "#a0413f";
            turnX = true;
            count++;
        }
        box.disabled = true;

        checkWinner();
    });
});

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const showDraw = (winner) => {
    disableBoxes();
    msg.innerText = "The game is draw";
    msgContainer.classList.remove("hide");
};

const showWinner = (winner) => {
    disableBoxes();
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
};

const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 === pos2 && pos2 === pos3){
                console.log("Winner", pos1);
                showWinner(pos1);
            }
            else{
                if(count === 9){
                    showDraw();
                }
            }
        }
    }
};

newBtn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);

const boxes = document.querySelectorAll(".box");
const gameinfo = document.querySelector(".game-info");
const button = document.querySelector(".btn");


let currentPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
]
function initGame(){
    currentPlayer = "X";
    gameinfo.innerText = `Current Player - ${currentPlayer}`;
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        
        box.classList = `box box${index+1}`;
    })
}
initGame();
function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O"
    }
    else{
        currentPlayer="X";
    }
    gameinfo.innerText=`Current Player - ${currentPlayer}`;
}
function checkIfWin(){
    let ans = "";
    winningPosition.forEach(position=>{
        if((gameGrid[position[0]]!="" || gameGrid[position[1]]!="" || gameGrid[position[2]] !="") && 
          (gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[1]]===gameGrid[position[2]])){

            if(gameGrid[position[0]]=="X"){
                ans="X";
            }
            else{
                ans="O";
            }
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
            
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })

        }
         // if all the values are equal and not empty
        

        if(ans!=""){
            gameinfo.innerText=`The Winner is ${ans}`;
            button.classList.add("active");
        }

        let fillCount = 0;
        gameGrid.forEach((box)=>{
            if(box!=""){
                fillCount++;
            }
            if(fillCount===9){
                gameinfo.innerText = "game is a tie !";
                button.classList.add("active");
            }
        })
    })
   
        
}

function handleClick(index){
    if(gameGrid[index]==""){
        gameGrid[index] = currentPlayer;
        boxes[index].innerText = currentPlayer;
         boxes[index].style.pointerEvents="none";
        swapTurn();
        checkIfWin()
    }
}
boxes.forEach((box,index)=>{
    box.addEventListener('click',()=>
        handleClick(index)
    );
})
button.addEventListener('click',initGame);
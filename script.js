const GameObject = (() => {

    let gameBoard = Array(9).fill('');
    //this populates the gameboard with 9 '' in an array.
    let currentTurn;
    //starts off blank until selected

    const selectTurn = (player) => {
        if (player === ''){
            console.log('Symbol not chosen yet!')
        } else if (player === 'x'){
            console.log(player + ' will become x');
            player = 'x';
            return currentTurn = 'x';
        } else if (player === 'o'){
            console.log(player + ' will become o');
            player = 'o';
            return currentTurn = 'o';
        }
    };

    const toggleTurn = (player) =>{
        if(player === 'x'){
            player = 'o';
            currentTurn = 'o';
        }else if (player === 'o'){
            player = 'x';
            currentTurn = 'x';
        }
        console.log("Current TURN IS " + currentTurn);
        return currentTurn;   
    }


    const getGameBoard = () => {
        return gameBoard;
        //returns the current state of the board
    };

    const getCurrentTurn = () => {
        return currentTurn;
        //returns the current turn of the player
    };    

    const printGameBoard = () => {
        console.log(gameBoard);
    }

    return {
        currentTurn,
        gameBoard,
        selectTurn,
        toggleTurn,
        getGameBoard,
        getCurrentTurn,
        printGameBoard
    };

})();



const Xselector = document.getElementById('X_selection');
const Oselector = document.getElementById('O_selection');
const Reset = document.getElementById('reset');

Xselector.addEventListener('click', choseSelector);
Oselector.addEventListener('click', choseSelector);
Reset.addEventListener('click', restart);

//GameObject.currentTurn = 'x';

function choseSelector (event){
    const player = event.target.textContent;
    GameObject.selectTurn(player);
    console.log('Player has chosen ' + player);
}

function restart(){
   
    for(let k = 0; k < GameObject.gameBoard.length; k++){
            GameObject.gameBoard[k] = '';
    }
    
        // Clear the text content of all the squares
    const squares = document.getElementsByClassName("square");
    for (let i = 0; i < squares.length; i++) {
        squares[i].textContent = '';
        squares[i].removeEventListener('click', vsAi);
    }

    gameOver = false;
    //need to be add because the restart function did not set gameOver to false so it would not trigger the alerts anymore
    console.log('Game has restarted! Choose X or O!');
}


const squares = document.getElementsByClassName("square");
console.log(squares)
//replace the text value of the div into X or O vice-versa
for(let i = 0; i < squares.length; i++){
    squares[i].addEventListener('click', toggleOn);
}

//how do i test if it has already has a textContent value in the square?
//how do i improve?
function toggleOn(event) {
    const square = event.target;
    if(square.textContent === ""){

     
        square.textContent = GameObject.getCurrentTurn();
        //make textContent equal to the currentTurn
        
        
        //this changes X to O and O to X
        
        for(let i = 0; i < GameObject.gameBoard.length; i++){
            if(GameObject.gameBoard[i] === ''){
                GameObject.gameBoard[i] = square.textContent;
                
                break;
            }
        }
            
        GameObject.currentTurn = GameObject.toggleTurn(GameObject.getCurrentTurn());
        console.log(GameObject.currentTurn + ' is now this? vs '+ GameObject.getCurrentTurn() );
       
        checkThreeInARow();
        
    } 

}



//conditions for winning
const topLeft = document.getElementById('topLeft');
const topMiddle = document.getElementById('topMiddle');
const topRight = document.getElementById('topRight');

const middleLeft = document.getElementById('middleLeft');   
const middleMiddle = document.getElementById('middleMiddle');
const middleRight = document.getElementById('middleRight');

const bottomLeft = document.getElementById('bottomLeft');
const bottomMiddle = document.getElementById('bottomMiddle');
const bottomRight = document.getElementById('bottomRight');

let gameOver = false;




function checkThreeInARow(){
    let winner = false;
    
    /*

    TL TM TR straight row
    TL ML BL straigh column
    

    ML MM MR straight row
    TM MM BM straight column
    TL MM BR Diagonal 
    BL MM TR Diagonal

    BL BM BR straight row
    BR MR TR straight column

        
    */
    


    if ((topLeft.textContent === topMiddle.textContent && topMiddle.textContent === topRight.textContent) || 
        (topLeft.textContent === middleLeft.textContent && middleLeft.textContent === bottomLeft.textContent)
        ){
       if(topLeft.textContent !== ''){
        //console.log('WE HAVE A WINNER!! top row, the winner is ' + topLeft.textContent);
        winner = true;      
        }
   
    }

    if ((middleLeft.textContent === middleMiddle.textContent && middleMiddle.textContent === middleRight.textContent) ||
        (topMiddle.textContent === middleMiddle.textContent && middleMiddle.textContent === bottomMiddle.textContent) ||
        (bottomLeft.textContent === middleMiddle.textContent && middleMiddle.textContent === topRight.textContent) ||
        (topLeft.textContent === middleMiddle.textContent && middleMiddle.textContent === bottomRight.textContent)
        ){
        if(middleMiddle.textContent !== ''){
        //console.log('WE HAVE A WINNER!! mid row, the winner is ' + middleLeft.textContent);
        winner = true;
        }
    }

    if ( 
        (bottomRight.textContent === middleRight.textContent && middleRight.textContent === topRight.textContent) ||
        (bottomRight.textContent === bottomMiddle.textContent && bottomMiddle.textContent === bottomLeft.textContent)    
        ){
        if(bottomRight.textContent !== ''){
        //console.log('WE HAVE A WINNER!! bot row, the winner is ' +bottomLeft.textContent);
        winner = true;
        }
    }
    
    if(winner === true){
        let realWinner = ''; 
       
        
        function conversion() {
            if(GameObject.currentTurn === 'x'){
                return realWinner = 'O';
            } else if (GameObject.currentTurn === 'o'){
                return realWinner = 'X';
            }
        }

    
        conversion();

        if(gameOver === false){
            setTimeout(() => {
                
            alert('WE HAVE A WINNER!! The winner is ' + realWinner);
            }, 800);

            gameOver = true;
        }

        
        //gameEnd(gameOver);
        console.log('Game over is ' + gameOver);

        
    }

    checkForDraw(winner);
}




function checkForDraw(winner){
    let checkSquares = [];
    if(winner === false){
        for(let k = 0; k < GameObject.gameBoard.length; k++){
            if(GameObject.gameBoard[k] !== ''){
                checkSquares.push(k);
            }
        }
    }

    if(checkSquares.length === GameObject.gameBoard.length){
        console.log('This is a draw!');
        alert('Draw! Click Reset!')
        gameOver = true;
    }

    
}


// function gameEnd(over){
//    return over = true;
// }


// Example usage:
//console.log(GameObject.getGameBoard()); // Access game board
//console.log(GameObject.getCurrentTurn()); // Access current turn
//GameObject.toggleTurn(); // Toggle the turn
//GameObject.printGameBoard(); // Log the game board


//how to build an ai for this
//after player selects X or O and hits 1 square. 
//maybe check if current turn is X or O
//randomly hit another square but not the one that the player has hit.

const aiPlayer = document.getElementById('ai');

aiPlayer.addEventListener('click', connectAi);

function connectAi() {
        for(let n = 0; n < squares.length; n++){
            squares[n].addEventListener('click', vsAi);
        }

}

let currentPlayer = 'player';

function vsAi(){
    
    function countX0s() {
        const xCount = GameObject.gameBoard.filter(cell => cell === 'x'|| cell ==='o').length;
        return xCount;
    }
          
    

    if(currentPlayer === 'player' && !gameOver){
        let currentTurnCount = countX0s();
        console.log(currentTurnCount + ' is the current count')
        if(currentTurnCount % 2 !== 0 ){
            //console.log(GameObject.getCurrentTurn())
            
            setTimeout(()=> {
                currentPlayer = 'ai';
                aiMove();
                checkThreeInARow();
                aiTurn();
            }, 690);

            
        }
        //currentPlayer = 'player'
        
    }



}

function aiMove() {
    if (!gameOver && currentPlayer === 'ai') {
        // Create an array of empty square elements
        const emptySquares = Array.from(document.getElementsByClassName("square")).filter((square) => square.textContent === '');

        if (emptySquares.length > 0) {
            // Randomly select an empty square
            const randomIndex = Math.floor(Math.random() * emptySquares.length);
            const squareElement = emptySquares[randomIndex];
            
            // Simulate a click on the selected square
            squareElement.click();
            currentPlayer = 'player'; // Set the player's turn
        }
    }
}





function aiTurn () {
    if(currentPlayer === 'ai'){
        currentPlayer = 'player';
        console.log('CurrentPlayer is now ' + currentPlayer)
    }
}








const GameObject = (() => {

    let gameBoard = Array(9).fill('');
    //this populates the gameboard with 9 '' in an array.
    let currentTurn = ' ';
    //starts off blank until selected

    const toggleTurn = () => {
        currentTurn = currentTurn === 'x' ?  'o' : 'x';
        //this checks the current turn if it's equal to X or O, if it's
        //if blank will set the intial value to x
    };

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
        toggleTurn,
        getGameBoard,
        getCurrentTurn,
        printGameBoard
    };

})();



const Xselector = document.getElementById('X_selection');
const Oselector = document.getElementById('O_selection');



Xselector.addEventListener('click', choseSelector);
Oselector.addEventListener('click', choseSelector);

GameObject.currentTurn = 'x';

function choseSelector (event){
    GameObject.currentTurn = event.target.textContent.toLowerCase();
    console.log(GameObject.currentTurn)
    console.log('Player has chosen '+ GameObject.currentTurn);
}


const squares = document.getElementsByClassName("square");
console.log(squares)
//replace the text value of the div into X or O vice-versa
for(let i = 0; i < squares.length; i++){
    squares[i].addEventListener('click', toggleOn);
}

//how do i test if it has already has a textContent value in the square?
//how do i improve?
function toggleOn (event){
    //console.log(event)
    //console.log('sqaure is clicked');
    const square = event.target;

    if(!square.textContent){
        GameObject.toggleTurn();
        square.textContent = GameObject.getCurrentTurn();
    }

    console.log(GameObject.getGameBoard());
    const squareIndex = Array.from(square.parentElement.children).indexOf(square);
    GameObject.getGameBoard()[squareIndex] = GameObject.getCurrentTurn();
    
}






// Example usage:
console.log(GameObject.getGameBoard()); // Access game board
console.log(GameObject.getCurrentTurn()); // Access current turn
//GameObject.toggleTurn(); // Toggle the turn
console.log(GameObject.getCurrentTurn()); // Check the updated turn
GameObject.printGameBoard(); // Log the game board

















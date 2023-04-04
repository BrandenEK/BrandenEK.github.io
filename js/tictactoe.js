$(function(){
    // Startup
    console.log("Loaded js")
    $(".tttBox").click(clickBox);
    $("#resetBtn").click(clickReset);
});

function clickBox()
{
    let $child = $(this).children();
    if (gameState == 0 && $child.text().trim() == "")
    {
        // If player's turn, fill the box
        console.log("Box clicked!");
        $child.text("X");
        $child.css("color", "blue");

        gameState = 1;
        turnOver();
        
        // Set as computer's turn
        if (gameState != 2)
        {
            gameState = 1;
            setTimeout(computerMove, 1000);
        }
    }
}

function computerMove()
{
    let validBoxes = [];
    // For each box, check if its valid
    $(".tttBox p").each(function(){
        if ($(this).text().trim() == "")
            validBoxes.push($(this));
    });

    // Pick random valid box to go in
    let randIdx = Math.floor(Math.random() * validBoxes.length);
    validBoxes[randIdx].text("O");
    validBoxes[randIdx].css("color", "red");

    gameState = 0;
    turnOver();
}

function turnOver()
{
    currentMoves++;
    // Check for winner
    let winner = checkForWinner(0, 1, 2);
    if (winner == "") winner = checkForWinner(3, 4, 5);
    if (winner == "") winner = checkForWinner(6, 7, 8);
    if (winner == "") winner = checkForWinner(0, 3, 6);
    if (winner == "") winner = checkForWinner(1, 4, 7);
    if (winner == "") winner = checkForWinner(2, 5, 8);
    if (winner == "") winner = checkForWinner(0, 4, 8);
    if (winner == "") winner = checkForWinner(2, 4, 6);

    if (winner == "X")
    {
        xWins++;
        updateWinsText(winner);
    }
    else if (winner == "O")
    {
        oWins++;
        updateWinsText(winner);
    }
    else if (currentMoves == 9)
    {
        ties++;
        updateWinsText(winner);
    }
}

function checkForWinner(one, two, three)
{
    let $boxes = $(".tttBox p");
    let char = $($boxes[one]).text().trim();
    if (char === $($boxes[two]).text().trim() && char === $($boxes[three]).text().trim())
        return char;
    return "";
}

function clickReset()
{
    console.log("Resetting board!");
    $(".tttBox p").text("");
    $("#resultText").addClass("hidden");
    gameState = 0;
    currentMoves = 0;
}

function updateWinsText(winner)
{
    gameState = 2;
    $("#winsText").text(`Player wins: ${xWins}, Computer wins: ${oWins}, Draws: ${ties}`);
    $("#resultText").text(winner == "X" ? "The player won the game!" : (winner == "O" ? "The computer won the game!" : "The game ended in a draw!"));
    $("#resultText").removeClass("hidden");
}

let xWins = 0;
let oWins = 0;
let ties = 0;

// Game state (0 = player turn, 1 = comp turn, 2 = game over)
let gameState = 0;
let currentMoves = 0;
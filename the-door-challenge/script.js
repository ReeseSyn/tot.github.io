
const doors = [
    document.getElementById("door1"),
    document.getElementById("door2"),
    document.getElementById("door3")
];

let winningDoor;
let roundActive = true;
let stage2WinningDoor;
let currentPrize = 10;
let successfulPlays = 0;
let totalPrize = 0;

// Randomly assign the winning door
function resetRound() {
    winningDoor = Math.floor(Math.random() * 3) + 1;

    doors.forEach((door, index) => {
        door.textContent = "Door " + (index + 1);
        door.disabled = false;
    });

    roundActive = true;
}

// Handle the player's selection
function chooseDoor(doorNumber) {

    if (!roundActive) return;

    const answer = confirm(
        "Are you sure you want to choose Door " + doorNumber + "?"
    );

    if (!answer) return;

    roundActive = false;

    // Find doors the host is allowed to reveal
    const losingOptions = [1, 2, 3].filter(number =>
        number !== doorNumber && number !== winningDoor
    );

    // Randomly select a losing door to reveal
    const revealedDoor = losingOptions[
        Math.floor(Math.random() * losingOptions.length)
    ];

    doors[revealedDoor - 1].textContent = "LOSER!";
    doors[revealedDoor - 1].disabled = true;

    alert(
        "The host reveals Door " + revealedDoor +
        ". It is a losing door!"
    );

    // Ask the player whether to switch
    const switchChoice = confirm(
        "Would you like to switch doors?\n\n" +
        "OK = Switch doors\n" +
        "Cancel = Keep your original door"
    );

    let finalDoor;

    if (switchChoice) {
        finalDoor = [1, 2, 3].find(number =>
            number !== doorNumber && number !== revealedDoor
        );
    } else {
        finalDoor = doorNumber;
    }

    // Determine the outcome
   if (finalDoor === winningDoor) {
    alert("CONGRATULATIONS! You chose the winning door!");

    document.getElementById("game-area").style.display = "none";
    document.getElementById("stage2-area").style.display = "block";

    stage2WinningDoor = Math.floor(Math.random() * 2) + 1;
    } else {
        alert("Pfffft 🫢...I mean, sorry. That door was incorrect. Try again! 😁");
    }

    // Start a new round
    resetRound();
}

// Connect each door to the game
doors.forEach((door, index) => {
    door.addEventListener("click", function() {
        chooseDoor(index + 1);
    });
});
// Handle Stage 2 door selections

function chooseStage2Door(doorNumber) {
    const answer = confirm(
        "Are you sure you want to choose Door " + doorNumber + "?"
    );

    if (!answer) return;

    // Determine the prize behind the selected door
    let prizeWon;

    if (doorNumber === stage2WinningDoor) {
        prizeWon = currentPrize;
    } else {
        prizeWon = currentPrize / 2;
    }

   successfulPlays++;

totalPrize += prizeWon;

alert(
    "Congratulations! You won $" + prizeWon + "!"
);

// Check whether the player completed all three plays
if (successfulPlays === 3) {
    document.getElementById("stage2-area").style.display = "none";
    document.getElementById("game-area").style.display = "none";

    document.getElementById("final-reward").style.display = "block";

    // Display the final congratulations message
    document.querySelector("#final-reward h2").textContent =
        "CONGRATULATIONS! You completed the game and won a final prize of $" + totalPrize + "! 💝";

    return;
}

    // Double the prize for the next successful play
    currentPrize *= 2;

    // Return to Stage 1
    document.getElementById("stage2-area").style.display = "none";
    document.getElementById("game-area").style.display = "block";

    resetRound();
}
// Connect the two Stage 2 doors
document.getElementById("stage2-door1").addEventListener("click", function() {
    chooseStage2Door(1);
});

document.getElementById("stage2-door2").addEventListener("click", function() {
    chooseStage2Door(2);
});

// Start the first round
resetRound();

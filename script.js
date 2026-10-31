
function playGame() {

  let chance = Math.random();

  if (chance < 0.15) {

    document.getElementById("message").innerHTML =
      "💀 TRICK! You get NOTHING! Just kidding! Try again!";

    document.getElementById("myButton").innerHTML =
      "TRY AGAIN!";

  } else {

    let number = Math.floor(Math.random() * 26) + 25;

    document.getElementById("message").innerHTML =
      "🎃 TREAT! You got " + number + "!";

    document.getElementById("myButton").innerHTML =
      "PLAY AGAIN!";
  }

}

document.getElementById("myButton").addEventListener("click", playGame);

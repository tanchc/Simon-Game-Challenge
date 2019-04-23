var buttonColours = ["red", "blue", "yellow", "green"];
var gamePattern = [];
var userClickedPattern = [];
var firstTime = true;
var level = 0;

$(document).keydown(function() {
  if (firstTime) {
    $("h1").text("Level " + level);
    nextSequence();
    firstTime = false;
  }
})

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

  level++;
  $("h1").text("Level " + level);
}

$("div.btn").on("click", function(event) {
  var userChosenColour = this.id;
  animatePress(userChosenColour);
  playSound(userChosenColour);
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
})

function playSound(name) {
  var gameAudio = new Audio("sounds/" + name + ".mp3");
  promise = gameAudio.play();
  if (promise !== undefined) {
    promise.then(_=> {
      gameAudio.play();
    }).catch(error => {
      alert("Autoplay must be enabled");
    })
  }
  gameAudio.play();
}

function animatePress(currentColour) {
  $("div." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("div." + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (gamePattern.length - 1 === userClickedPattern.length - 1) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong")
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
      $("h1").text("Game Over, Press Any Key to Continue");
    }, 200);
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  firstTime = true;
}

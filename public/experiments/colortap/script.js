function colorButtonClickAnimation() {
    $(".normal").click(function() {
        success.play();
        $(this).addClass("controlledNormalButtons");
        setTimeout(function() {
            $(".normal").removeClass("controlledNormalButtons");
        }, 150);
    })
}

var colorTapGame = {
    colors: ["Red", "Blue", "Green", "Yellow", "Black"],
}
var score = 0;
var gameOverBoolean = false;
const success = new Audio("select.wav");
const wrong = new Audio("wrong.mp3");
var spaceCheck = false;
var timeOut;

function settingTimeOut(presentScore) {
    timeOut = setTimeout(function() {
        gameOverBoolean = true;
        gameOverCheck();
    }, levelCheck(presentScore))
}

function removingTimeOut() {
    clearTimeout(timeOut);
}

function randomNumberGenerator(numberOfRandomNumber) {
    return Math.floor(Math.random() * numberOfRandomNumber);
}

function changingColorHeading() {
    $("h1").text(colorTapGame["colors"][randomNumberGenerator(4)]);
    $("h1").css("color", colorTapGame["colors"][randomNumberGenerator(5)]);
}

function gameOverCheck() {
    if (gameOverBoolean) {
        $(".timeOut").css("animation-name", "none")
        $("h1").css("color", "black")
        $("h1").text("Game Over !");
        // $(".message").css("visibility", "hidden")
        $(".normal").click(colorButtonClickAnimation);
        $("body").addClass("gameOverbody");
        setTimeout(function() {
            $("body").removeClass("gameOverbody");
        }, 150)
        wrong.play();
        // $(".footerMessage").css("font-size", "")
        // $(".footerMessage").text("Refresh,to play Again ! ")
    }
}

function levelCheck(scoreNow) {
    if (scoreNow <= 10) {

        return 2500;
    } else if (scoreNow > 10 && scoreNow <= 20) {
        return 2000;
    } else if (scoreNow > 20 && scoreNow <= 40) {
        return 1500;
    } else {
        return 1000;
    }
}

function textCheck(button) {
    if ($("h1").css("color") === 'rgb(0, 0, 0)') {
        if ($("h1").text() === $(button).text()) {
            return true;
        }
    }
}

function playGame() {
    $(".play").click(function() {
        var started = Date.now();
        gamePlay(started);

    })
}

function animatingTimeOut(time) {
    // console.log(String(time));
    $(".timeOut").css({ "animation-name": "timeOutAnimation", "animation-duration": String(time) + "ms" });
}

function gamePlay(dateStored) {
    animatingTimeOut(levelCheck(score)) // animating the timeLimit 
    settingTimeOut(score) // gameOver display after certain time
    $(".play").css("display", "none")
    changingColorHeading();
    $(".normal").click(function() {
        $(".timeOut").css("animation-name", "none");
        console.log($(".timeOut").css("animation-name"));
        animatingTimeOut(levelCheck(score))
        removingTimeOut();
        if (Date.now() - dateStored <= levelCheck(score)) {
            $("button").blur();
            // checking rgb values of heading and buttons
            if (!gameOverBoolean) {
                if (($("h1").css("color") === $(this).css("background-color")) || textCheck(this)) {

                    score++;
                    $(".messageButton").text((levelCheck(score) / 1000) + "sec").fadeIn(100).fadeOut(100).fadeIn(100)
                    success.play();
                    $(".score").text(score);
                    changingColorHeading();
                    dateStored = Date.now();
                    settingTimeOut(score);

                } else {
                    gameOverBoolean = true;
                }
            }
        } else {
            gameOverBoolean = true;

        }
        gameOverCheck();
    })
}
colorButtonClickAnimation();
playGame();
$(".refresh").click(function()
{
    window.location.reload("Refresh");
})
// $(".messageButton").click(function() {
//     $(".messageButton").addClass("messageButtonTransition");
// })
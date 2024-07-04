var userClickedPattern=[];
var gamePattern=[];
var buttonColours=["red","blue","green","yellow"];
var level=0;
var started=false;

$("html").on("keydown",function(){
    if(started===false){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
})
function nextSequence(){
    //userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    var temp="#"+randomChosenColour;
    $(temp).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); //flash
    playSound(randomChosenColour);
}

$(".btn").on("click",function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1); // last index
})

function playSound(randomChosenColour){
    if(randomChosenColour==="red"){
        var audio=new Audio("./sounds/red.mp3");
        audio.play();
    }
    else if(randomChosenColour==="blue"){
        var audio=new Audio("./sounds/blue.mp3");
        audio.play();
    }
    else if(randomChosenColour==="green"){
        var audio=new Audio("./sounds/green.mp3");
        audio.play();
    }
    else if(randomChosenColour==="yellow"){
        var audio=new Audio("./sounds/yellow.mp3");
        audio.play();
    }
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    //     console.log("success");
        if(userClickedPattern.length===gamePattern.length){
            // empty
            userClickedPattern=[];
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        var audio=new Audio("./sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();

        
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
    userClickedPattern=[];
}


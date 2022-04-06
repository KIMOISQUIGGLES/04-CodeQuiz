//CREATE AN ARRAY FOR MY QUESTIONS
//EACH QUESTION IS AN OBJECT
var questionArray = [
    {
        question:"Question 1: Which card has the longest rules text in the game?", 
        answer: {a:"Bureaucracy", b:"Master of the Hunt", c:"Dance of the Dead", d:"Illusionary Mask"}, 
        correctAnswer: "Bureaucracy",
        bgImage: "url('./images/beauro.webp')"
    },
    {
        question:"Question 2: What is the most reprinted card in Magic History?", 
        answer: {a:"Llanowar Elves", b:"Giant Growth", c:"Serra Angel", d:"Disenchant"}, 
        correctAnswer: "Giant Growth",
        bgImage: "url('./images/giantGrowth.png')"
    },
    {
        question:"Question 3: Which card name was the original working title for Magic the Gathering?", 
        answer: {a:"Mystic War", b:"Force of Will", c:"Urza's Saga", d:"Mana Clash"}, 
        correctAnswer: "Mana Clash",
        bgImage: "url('./images/manaClash.jpg')"
    },
    {
        question:"Question 4: What is the name of the card game by Wizards of the Coast released in Japan in order to teach children Magic the Gathering?", 
        answer: {a:"Yu-Gi-Oh!", b:"Duel Masters", c:"Weiss Schwarz", d:"Cardfight!! Vanguard"}, 
        correctAnswer: "Duel Masters",
        bgImage: "url('./images/duelMas.jpg')"
    },
    {
        question:"Question 5: Which of the following is not a Magic card name?", 
        answer: {a:"Asmoranomardicadaistinaculdacar", b:"Quick-Stick Lick Trick", c:"Harvarr, Trader of Shiny Things", d:"Alexander Clamilton"}, 
        correctAnswer: "Harvarr, Trader of Shiny Things",
        bgImage: "url('./images/quickLick.webp')"
    },
    {
        question:"Question 6: Which set bore an unfortunate resemblance to 'Avengers: End Game' and was released at the same time as the movie in question?", 
        answer: {a:"Mirrodin Beseiged", b:"War of the Spark", c:"Hour of Devastation", d:"Oath of the Gatewatch"}, 
        correctAnswer: "War of the Spark",
        bgImage: "url('./images/warofthespark.webp')"
    },
    {
        question:"Question 7: Artist Jason Felix was accused of plagiarizing art from a fan artist on DeviantArt for which card?", 
        answer: {a:"Hour of Promise", b:"Faithless Looting", c:"KABOOM!", d:"Crux of Fate"}, 
        correctAnswer: "Crux of Fate",
        bgImage: "url('./images/cruxofFate.webp')"
    },
    {
        question:"Question 8: What is the name of the card that has been blacklisted from all records of Magic's history?", 
        answer: {a:"Invoke Calamity", b:"Invoke Justice", c:"Invoke Prejudice", d:"Invoke Despair"}, 
        correctAnswer: "Invoke Prejudice",
        bgImage: "url('./images/invokeCalamity.jpg')"
    },
    

]

var highScores = JSON.parse(localStorage.getItem("highScores")) || []

//OTHER VARIABLES
var isPlaying = false;
var isWin = false;
var timer;
var playerScore = 0;
var isCorrect = false;
var submitAnswer = "";
var questionCount = 0;

//QUERY HTML ELEMENTS
var setBg = document.querySelector(".gameInfo");
var scoreName = document.querySelector(".scoreName");
var amtCorrect = document.querySelector(".correct");
var amtQuestions = document.querySelector(".totalQuestions");
var scoreEntry = document.querySelector(".scoresList");
var timePenalty = document.querySelector("#timePenalty");
var plusOne = document.querySelector("#plusOne");


//QUERY QUIZ ELEMENTS
var quizQuestion = document.querySelector("#questionPrompt");
var quizAnswer1 = document.querySelector("#answer1");
var quizAnswer2 = document.querySelector("#answer2");
var quizAnswer3 = document.querySelector("#answer3");
var quizAnswer4 = document.querySelector("#answer4");
var correctAnswer = document.querySelector("#correctAnswer");
var homeScreen = document.querySelector("#homeScreen");
var gameScreen = document.querySelector("#gameScreen");
var endScreen = document.querySelector("#endScreen");

//BUTTONS
var startButton = document.querySelector("#startButton")
var submitButton = document.querySelector(".submit");
var homeNav = document.querySelector("#homeNav");
var scoreNav = document.querySelector("#scoreNav");
var clearScores = document.querySelector("#clearScores");

//QUERY SCORE BAR ELEMENTS
var timeRemaining = document.querySelector(".gameTimer");
var currentScore = document.querySelector(".currentPoints");

//NICE
var timeLeft = 69;

//INITIALIZE ON PAGE LOAD
function init() {
}

//START GAME WHEN I PUSH "GAME START"
function startGame() {
    homeScreen.style.display = "none";
    gameScreen.style.display = "flex";
    isPlaying = true;
    timeLeft= 69;
    playerScore = 0;
    questionCount = 0;
    startButton.disabled = true;
    startTimer();
    gamePlay();
}

//EVENT LISTENER TO START GAME
startButton.addEventListener("click", startGame);

//RUNS GAME
function gamePlay() {


    if (questionCount < questionArray.length){
        quizQuestion.innerText = questionArray[questionCount].question;
        console.log(quizQuestion);
    
        quizAnswer1.innerText = questionArray[questionCount].answer.a;
        console.log(quizAnswer1);
        quizAnswer1.addEventListener("click", checkAnswer);
    
        quizAnswer2.innerText = questionArray[questionCount].answer.b;
        console.log(quizAnswer2);
        quizAnswer2.addEventListener("click", checkAnswer);
    
        quizAnswer3.innerText = questionArray[questionCount].answer.c;
        console.log(quizAnswer3);
        quizAnswer3.addEventListener("click", checkAnswer);
    
        quizAnswer4.innerText = questionArray[questionCount].answer.d;
        console.log(quizAnswer4);
        quizAnswer4.addEventListener("click", checkAnswer);
        
        setBg.style.backgroundImage = questionArray[questionCount].bgImage;
        setBg.style.backgroundSize = "cover";
        plusOne.innerText = ""
        timePenalty.innerText = "";

    } else{
        gameScreen.style.display = "none";
        endScreen.style.display = "flex";
        amtCorrect.innerHTML = playerScore;
        amtQuestions.innerHTML = questionArray.length;
        
    }


}



function checkAnswer(event) {
    
    if (questionArray[questionCount].correctAnswer === event.target.innerText){
        playerScore++;
        currentScore.innerText = playerScore;
        plusOne.innerText = "+1!  woo hoo!"
        console.log("CORRECT");
        questionCount++;
        gamePlay();
    } else {
        console.log("INCORRECT");
        questionCount++;
        timePenalty.innerText = "-5!  OOF!"
        timeLeft = timeLeft - 5;
        gamePlay();
    }
}



//STARTS AND STOPS TIMER
function startTimer() {
    timer = setInterval(function(){
        timeLeft--;
        timeRemaining.innerText = timeLeft;
        if (timeLeft >=0 || timeLeft === 0){
            if (isWin && timeLeft > 0){
                clearInterval(timer);
                
            }
        }
        if (timeLeft === 0){
            clearInterval(timer);
            gameScreen.style.display = "none";
            endScreen.style.display = "flex";
            amtCorrect.innerHTML = playerScore;
            amtQuestions.innerHTML = questionArray.length;
        }
    }, 1000);
}

//STORES SUBMITTED NAME AND SCORE IN LOCAL STORAGE AFTER GAME
submitButton.addEventListener("click", function(){

    var finalScore = {
        name: scoreName.value,
        score: playerScore,
        remainingTime: timeLeft
    }
    highScores.push(finalScore);
    localStorage.setItem("highScores", JSON.stringify(highScores))
    console.log(finalScore);
    enterScoreBoard();

})

//OPENS SCORE BOARD
function enterScoreBoard(){
    gameScreen.style.display = "none";
    endScreen.style.display = "none";
    scoreBoard.style.display = "flex";
    homeScreen.style.display = "none";
    for (i=0; i<highScores.length;i++){
        var liEl = document.createElement("li");
        liEl.textContent = highScores[i].name + ": " + highScores[i].score + " / " + questionArray.length + " correct, time remaining: " + highScores[i].remainingTime + "s";
        scoreEntry.appendChild(liEl);

    }
}

//FUNCTIONS FOR NAV BAR
homeNav.addEventListener("click", function(){
    gameScreen.style.display = "none";
    endScreen.style.display = "none";
    scoreBoard.style.display = "none";
    homeScreen.style.display = "flex";
    location.reload();


})

scoreNav.addEventListener("click", function(){
    enterScoreBoard();

})

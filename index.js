let begin = document.getElementById("begin-btn")
console.log(begin)
let next = document.getElementById("next-btn")
console.log(next)

let scoreUpdate = document.getElementById("score-update")

let questionsNote = document.getElementById("questions-note")

let stageCounterText = document.getElementById("stage-change");
console.log(stageCounterText)

let scoreCounterText = document.getElementById("score-change");

let questionHeading = document.getElementById("questions")
console.log(questionHeading)

let questionHolder = document.getElementById("questions-holder")
console.log(questionHolder)

const allAnswers = Array.from(document.getElementsByClassName("btn-select"));

let availableQuestions = [];
let presentQuestion = {};
let rightAnswers = true;
let stageCounter = 0
let score = 0

// buttons id selector
let button1 = document.getElementById("answer-1");
let button2 = document.getElementById("answer-2");
let button3 = document.getElementById("answer-3");
let button4 = document.getElementById("answer-4");
console.log(button1,button2,button3,button4)

// quiz questions in array in object
let quizQuestions = [{question : "Who is Arsenal Football Clubs highest goal Scorer?",
       choice1 : "henry",
       choice2 : "bergkamp",
       choice3 : "wright",
       choice4 : "kanu",

       correctAnswer : 1
},
{question : "Which club was the first to score 1,000 goals?",
       choice1 : "Manchester united",
       choice2 : "Arsenal",
       choice3 : "Liverpool",
       choice4 : "Newcastle",

       correctAnswer : 1
},

{question : "Which of these teams did not win a title during 1992/93 - 2007/08?",
       choice1 : "Blackburn",
       choice2 : "Arsenal",
       choice3 : "Liverpool",
       choice4 : "Chelsea",

       correctAnswer : 3
},

{question : "What is the main component of the body of the EPL trophy?",
       choice1 : "Gold",
       choice2 : "Bronze",
       choice3 : "Platinum",
       choice4 : "Silver",

       correctAnswer : 4
},

{question : "Who was the first of these EPL superstars to score 260 goals in the Premier League?",
       choice1 : "Henry",
       choice2 : "Rooney",
       choice3 : "Shearer",
       choice4 : "York",

       correctAnswer : 3
},]

const correctChoice = 10;
const totalQuestions = 5;


     // adding event listener to our begin button so we can reveal quiz
     begin.addEventListener("click",    function (){
       questionHolder.classList.remove("hide")
       next.classList.remove("hide")
       begin.classList.add("hide")
       scoreUpdate.classList.add("hide")
       questionsNote.classList.add("hide")
       console.log(quizQuestions)
       console.log(allAnswers)
       stageCounter = 0
       score = 0
       availableQuestions = [...quizQuestions];
       nextQuestion()
})

    




nextQuestion = () => {
       if (availableQuestions.length === 0 || stageCounter >= totalQuestions) {
         localStorage.setItem("Score", score);
         questionHolder.classList.add("hide")
         questionsNote.classList.remove("hide")
         next.classList.add("hide")
        begin.classList.remove("hide")
        scoreUpdate.classList.remove("hide")
        scoreUpdate.innerText = " you had a total score of " + score + " points"
         return  questionsNote.innerText = "please restart the quiz "
       } 
       stageCounter++;
       stageCounterText.innerText = `${stageCounter} of ${totalQuestions}`;
     
       const questionIndex = Math.floor(Math.random() * availableQuestions.length);
       presentQuestion = availableQuestions[questionIndex];
       questionHeading.innerText = presentQuestion.question;
     
       allAnswers.forEach((choice) => {
         const number = choice.dataset["number"];
         choice.innerText = presentQuestion["choice" + number];
       });
       availableQuestions.splice(questionIndex, 1);
       rightAnswers = true;
     };

//      main issues area
allAnswers.forEach((choice) => {
       choice.addEventListener("click", (e) => {
         if (!rightAnswers) return;
     
         rightAnswers = false;
         const selectedOption = e.target;
         const selectedAnswer = selectedOption.dataset["number"];
     
         const classToApply = 
         selectedAnswer == presentQuestion.correctAnswer ? "correct" : "incorrect";
     
         if (classToApply === "correct") {
           increaseScore(correctChoice);
           selectedOption.classList.add(classToApply);
         } else {
           selectedOption.classList.add(classToApply);
     
           if (presentQuestion.correctAnswer === 1) {
             button1.classList.add("correct");
           } else if (presentQuestion.correctAnswer === 2) {
             button2.classList.add("correct");
           } else if (presentQuestion.correctAnswer === 3) {
             button3.classList.add("correct");
           } else if (presentQuestion.correctAnswer === 4) {
             button4.classList.add("correct");
           }
         }
       });
     });

     next.addEventListener("click", (event) => {
       nextQuestion();
            button1.classList.remove("correct");
           button2.classList.remove("correct");
           button3.classList.remove("correct");
           button4.classList.remove("correct");

           button1.classList.remove("incorrect");
           button2.classList.remove("incorrect");
           button3.classList.remove("incorrect");
           button4.classList.remove("incorrect");
           selectedOption.classList.remove(classToApply);
       
     });
     
     increaseScore = (num) => {
       score += num;
       scoreCounterText.innerText = score;
     };
     
     startQuiz();

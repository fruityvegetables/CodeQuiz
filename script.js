
// start timer at two minutes
var timerText = 120;

// create function to determine time at any given moment
var timerId = setInterval(function(){
  document.getElementById('timerText').innerHTML=timerText;
  timerText--;
  if (timerText <= -1){
    clearInterval(timerId);
    document.getElementById('timerText').innerHTML='Done';
    
    alert("✨✨You're out of time!✨✨");
  } 
}, 1000);

// create global variables hooking into HTML 
var quizBox = document.getElementById('quiz');
var resultsBox = document.getElementById('results');
var submitButton = document.getElementById('submit');

// first step: alert the user to the start of their quiz
alert("✨✨Hi! Once you close this alert box, your timed quiz will begin!\n You will have two minutes to answer ten questions over web development!✨✨");

// function to give the results back to the user
function giveResults(questions, quizBox, resultsBox){
        
    // collects all answers from the quiz
    var answerContainers = quizBox.querySelectorAll('.answers');
    
    // keeps track of all answers user has given
    var userAnswer = '';
    var numCorrect = 0;
    
    // for loop to display each question and run logic vv
    for(var i = 0; i < questions.length; i++){

        // finds the answer within the question...
        userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
        
        // if answer is correct
        if (userAnswer === questions[i].correctAnswer){
            // add to the number of correct answers
            numCorrect++;
            
            // color the answers green
            answerContainers[i].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else {
            // color the answers red
            answerContainers[i].style.color = 'red';
            // subtract 5 seconds for each wrong answer
            timerText-=5;
            
        }
    }

    // displays results out of a total that is derived from the length of the questions array
    resultsBox.innerHTML = numCorrect + ' out of ' + questions.length;
}
// generates a quiz
makeQuiz(myQuestions, quizBox, resultsBox, submitButton);

// function to generate a quiz
function makeQuiz(questions, quizBox, resultsBox, submitButton){
    // function to start displaying questions in the quizBox
    function displayQuestions(questions, quizBox){
        // variables to store output and user answers
        var output = [];
        var answers;

        // for each question displayed:
        for(var i = 0; i < questions.length; i++){
            
            // reset answers variable to null
            answers = [];

            // for all possible answers in the array,
            for(letter in questions[i].answers){

                // display an html radio button the user can select
                answers.push(
                    '<label>'
                        + '<input type="radio" name="question'+i+'" value="'+letter+'">'
                        + letter + ': '
                        + questions[i].answers[letter]
                    + '</label><br>'
                );
            }

            // give the question and answer to output
            output.push(
                '<div class="question">' + questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
            );
        }

        // combine the outputs into html and display 
        quizBox.innerHTML = output.join('');
    }


    

    // this will first display our questions
    displayQuestions(questions, quizBox);
    
    // on submit, show results
    submitButton.onclick = function(){
        giveResults(questions, quizBox, resultsBox);
        
    }

}
var timerText = 180;
var timerId = setInterval(function(){
  document.getElementById('timerText').innerHTML=timerText;
  timerText--;
  if (timerText <= -1){
    clearInterval(timerId);
    document.getElementById('timerText').innerHTML='Done';
    // or...
    alert("You're out of time!");
  }
}, 1000);

var myQuestions = [
    {
        question: "What does HTML stand for?",
        answers: {
            a: 'Hot Toddies Make you Loose',
            b: 'Hypertext Markup Language',
            c: 'Hilarious Toddlers Making Languages',
            d: 'How The Mainframe Learns'
            
        },
        correctAnswer: 'b'
    },
    {
        question: "What does CSS stand for?",
        answers: {
            a: 'Constant Site Supplies',
            b: 'Creative Style Sites',
            c: 'Cascading Style Sheets',
            d: 'Crazy Sexy Squares'
        },
        correctAnswer: 'c'
    },
    {
        question: "What is Javascript primarily used for?",
        answers: {
            a: 'To define the content of web pages',
            b: 'To program the behavior of web pages',
            c: 'To specify the layout of web pages',
            d: 'To communicate with the back-end database only'
            
        },
        correctAnswer: 'b'
    },
    {
        question: "Which of these accurately describes jQuery?",
        answers: {
            a: 'A Javascript library designed to simplify HTML DOM traversal and manipulation',
            b: 'A Javascript library designed to assist in adding links and images to websites',
            c: 'A Javascript function that queries the user for some set of information',
            d: 'A Javascript function that queries the back-end database for some set of information'
            
        },
        correctAnswer: 'a'
    },
    {
        question: "Which of these methods adds plain text to an element in vanilla Javascript?",
        answers: {
            a: '.appendChild()',
            b: '.prependChild()',
            c: '.textContent()',
            d: '.innerhtml()'
            
        },
        correctAnswer: 'c'
    },
    // this is where I used the \<br>\, just for reference. vv 
    {
        question: "There is a very important piece of information to remember in regards to changing CSS through Javascript/jQuery methods.\<br>\ Which of these is something you shouldn't forget?",
        answers: {
            a: '.animate() is used to move elements with CSS properties',
            b: '.fadeIn() and .fadeOut() should be used often to show and hide elements',
            c: 'All property names must be camel-cased when used with these methods',
            d: '.click() is deprecated and should never be used'
            
        },
        correctAnswer: 'c'
    },
    // and another spot where I used \ to escape the "" marks vv 
    {
        question: "Another way to increment a variable instead of \"i = i + 1\" or \"i++\" is which of these?",
        answers: {
            a: 'i+',
            b: 'Math.add(i+1)',
            c: 'i.length + 1',
            d: 'i += 1'
            
        },
        correctAnswer: 'd'
    },
    {
        question: "Which of these Javascript/jQuery methods can be used to prevent a form submission?",
        answers: {
            a: 'event.setDefault()',
            b: 'event.getClear()',
            c: 'event.setClear()',
            d: 'event.preventDefault()'
            
        },
        correctAnswer: 'd'
    },
    {
        question: "In the following lines of code, assume that \"demo\" refers to a p or div tag element.\<br>\<br>var x = 10;\r\nvar y = \"10\";\<br>document.getElementById(\"demo\").innerHTML = Boolean(x == y);\<br>\<br>Which of these will display in the demo element when the function is ran?(When the page is loaded)",
        answers: {
            a: '10',
            b: 'true',
            c: 'x',
            d: 'y'
            
        },
        correctAnswer: 'b'
    },
    {
        question: "In the following lines of code, assume that \"demo\" refers to a p or div tag element.\<br>\<br>var x = 10;\r\nvar y = \"10\";\<br>document.getElementById(\"demo\").innerHTML = Boolean(x === y);\<br>\<br>Which of these will display in the demo element when the function is ran?(When the page is loaded)",
        answers: {
            a: 'false',
            b: 'x',
            c: 'y',
            d: '10'
            
        },
        correctAnswer: 'a'
    }
];

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

    function showQuestions(questions, quizContainer){
        // we'll need a place to store the output and the answer choices
        var output = [];
        var answers;

        // for each question...
        for(var i=0; i<questions.length; i++){
            
            // first reset the list of answers
            answers = [];

            // for each available answer...
            for(letter in questions[i].answers){

                // ...add an html radio button
                answers.push(
                    '<label>'
                        + '<input type="radio" name="question'+i+'" value="'+letter+'">'
                        + letter + ': '
                        + questions[i].answers[letter]
                    + '</label><br>'
                );
            }

            // add this question and its answers to the output
            output.push(
                '<div class="question">' + questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
            );
        }

        // finally combine our output list into one string of html and put it on the page
        quizContainer.innerHTML = output.join('');
    }


    function showResults(questions, quizContainer, resultsContainer){
        
        // gather answer containers from our quiz
        var answerContainers = quizContainer.querySelectorAll('.answers');
        
        // keep track of user's answers
        var userAnswer = '';
        var numCorrect = 0;
        
        // for each question...
        for(var i=0; i<questions.length; i++){

            // find selected answer
            userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
            
            // if answer is correct
            if(userAnswer===questions[i].correctAnswer){
                // add to the number of correct answers
                numCorrect++;
                
                // color the answers green
                answerContainers[i].style.color = 'lightgreen';
            }
            // if answer is wrong or blank
            else{
                // color the answers red
                answerContainers[i].style.color = 'red';
            }
        }

        // show number of correct answers out of total
        resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
    }

    // show questions right away
    showQuestions(questions, quizContainer);
    
    // on submit, show results
    submitButton.onclick = function(){
        showResults(questions, quizContainer, resultsContainer);
    }

}
$(document).ready(function() {

	//variables/questions
	var count = -1;
  var timeleft = 20; //inital time value
	var intervalId;
  var correctAnswers = 0;
  var wrongAnswers = 0;
  var unAnsweredQuestions = 0;

	//questions - first answer in each set is true
	var questions = {
   q1: {
    txt: "What color is the sky?", 
    answers: ["orange","red","blue","magenta"],
   	correct: "blue",
    name: "q1",
    ind: 0
   },
   q2: {
    txt: "How many days are in a year?",
    answers: ["123","444","365","333"],
 		correct: "365",
    name: "q2",
    ind: 1
  },
   q3: {
    txt: "How many ounces are in a pound?", 
    answers: ["8","3","1","16"],
 		correct: "16",
    name: "q3",
    ind: 2
 	},
   q4: {
    txt: "When was the Declaration of Independence created?", 
    answers: ["1793","1774","1775","1776"],
 		correct: "1776",
    name: "q4",
    ind: 3
 	},
   q5: {
    txt: "Are bananas veggies?", 
    answers: ["mmmm","yes","no","elaphant"],
 		correct: "no",
    name: "q5",
    ind: 4
 	  }
	};

  var questionsArr = [questions.q1, questions.q2, questions.q3, questions.q4, questions.q5]

  //user's answers are recorded in this object
  var userResponse = {
    q1: 'unanswered', 
    q2: 'unanswered', 
    q3: 'unanswered', 
    q4: 'unanswered', 
    q5: 'unanswered'
  };

	//timing mechanics
	function start() {
      intervalId = setInterval(countDown, 1000); //counts by 1 second
    };

  function countDown () {
    timeleft--; //decrements by 1
    $(".timer-content").html("<h2>Time left: " + timeleft + " Seconds</h2>");
    if (timeleft === 0) {
      stop();
    }
  };

  //ends game, stops timer, initiates grading 
  function stop() {
    clearInterval(intervalId);
    if (count +1 < questionsArr.length) {
      showAnswer();
      timeleft = 20;
    }
    else {
      gradeGame();
    }
  };

	//populating the page w/ questions
	function showQuestion(){
		if (count < questionsArr.length){
      count++;
      var thisClass = questionsArr[count].name;
      var newDiv = $('<div>');
      newDiv.html('<h3>' + questionsArr[count].txt + '</h3>').addClass(thisClass).appendTo('.question-content');
      populateQuestions(newDiv);
		}
    else {
      stop();
    };
  };

  function populateQuestions(val){
    //adds questions
      var questionsText = questionsArr[count].answers;
      $.each(questionsText , function (index, value){
        var newButton = $('<button type="submit" value="' + value + '"></button>');
        newButton.text(value).addClass('btn btn-default game-btn');
        $(val).append(newButton);
      });
      $(".game-btn").on("click", function(){
        var btnValue = this.value;
        var parent = $(this).parent();
        var parentClass = parent.prop('className');
        console.log("btnValue: " + btnValue);
        console.log("parentClass: " + parentClass);
        userResponse[parentClass] = btnValue;
        stop();
    });
  };

  function showAnswer(){
    $('.question-content').html('<div class="answer-text">Correct answer is: ' + questionsArr[count].correct + '</div>');
    setTimeout(showNext, 3000);
  }

  //grades the player's answers
  function gradeGame(){
    for (var x = 1; x <= questionsArr.length; x++){
      var string = 'q' + x;
      if (questions[string]['correct'] === userResponse[string]) {
        correctAnswers++;
      }
      else if (userResponse[string] === 'unanswered'){
        unAnsweredQuestions++;
        wrongAnswers++;
      }
      else {
        wrongAnswers++;
      }
    };
    showScore();
  };

  function showNext (){
    $('.answer-text').empty();
    start();
    showQuestion();
  };

  //displays player's final score on the page
  function showScore(){
    $('.question-content').empty();
    var newSection = $('div');
    $(".game-main-section").append($('<h2>Correct Answers: ' + correctAnswers + '</h2>'));
    $(".game-main-section").append($('<h2>Wrong Answers: ' + wrongAnswers + '</h2>'));
    $(".game-main-section").append($('<h2>Unanswered Questions: ' + unAnsweredQuestions + '</h2>'));
    $(".game-main-section").append($('<button class="btn btn-primary btn-lg restart-game">Restart Game</button>'));
    $('.restart-game').on("click", restartGame);
  };

  function restartGame(){
    console.log("Hi!")
  }

	//onclick - starts game
  $(".start-game-btn").on("click", function(){
   	$(".start-game-btn").replaceWith('<div class="timer-content text-center"><h2>Time left: ' + timeleft + '</h2></div>'); //hides button
  	showNext ();

    //the following stores a value in the userResponse object for scoring at end of game

  }) //end of on click

}); //end of application
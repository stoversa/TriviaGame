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
    img: "./assets/images/sky.jpg"
   },
   q2: {
    txt: "How many days are in a year?",
    answers: ["123","444","365","333"],
 		correct: "365",
    name: "q2",
    img: "./assets/images/calendar.jpg"
  },
   q3: {
    txt: "How many ounces are in a pound?", 
    answers: ["8","3","1","16"],
 		correct: "16",
    name: "q3",
    img: "./assets/images/scale.jpg"
 	},
   q4: {
    txt: "When was the Declaration of Independence created?", 
    answers: ["1793","1774","1775","1776"],
 		correct: "1776",
    name: "q4",
    img: "./assets/images/declaration.jpg"
 	},
   q5: {
    txt: "Are bananas veggies?", 
    answers: ["mmmm","yes","no","elaphant"],
 		correct: "no",
    name: "q5",
    img: "./assets/images/banana.jpg"
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
    showTimer();
    timeleft--; //decrements by 1
    if (timeleft === 0) {
      stop();
    }
  };

  function showTimer(){
    $(".timer-content").html("<h2>Time left: " + timeleft + " Seconds</h2>");
  };
  //ends game, stops timer, initiates grading 
  function stop() {
    clearInterval(intervalId);
    if (count +1 < questionsArr.length) {
      $(".timer-content").html("<h2></h2>");
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
      showTimer();
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
    var answerStatus;
    var tempString = 'q' + (count + 1);
    if (userResponse[tempString] === questionsArr[count].correct){
      answerStatus = "Correct! <br/> It is ";
    }
    else if (userResponse[tempString] === "unanswered") {
      answerStatus = "No answer provided! The answer is: ";
    }
    else {
      answerStatus = "Incorrect! The correct answer is: ";
    };
    $('.question-content').html('<div class="answer-text"><h2>'+ answerStatus + questionsArr[count].correct + '</h2></div>');
    $('.answer-text').append('<div><img src="' + questionsArr[count].img + '" height=400 width=600/></div>')
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
    $(".score-button").append($('<h2>Correct Answers: ' + correctAnswers + '</h2>'));
    $(".score-button").append($('<h2>Wrong Answers: ' + wrongAnswers + '</h2>'));
    $(".score-button").append($('<h2>Unanswered Questions: ' + unAnsweredQuestions + '</h2>'));
    $(".score-button").append($('<button class="btn btn-primary btn-lg restart-game">Restart Game</button>'));
    $('.restart-game').on("click", restartGame);
  };

  function restartGame(){
    $(".score-button").empty();
    count = -1;
    timeleft = 20; //inital time value
    correctAnswers = 0;
    wrongAnswers = 0;
    unAnsweredQuestions = 0;
    userResponse = {
      q1: 'unanswered', 
      q2: 'unanswered', 
      q3: 'unanswered', 
      q4: 'unanswered', 
      q5: 'unanswered'
    };
    showNext ();
  }

	//onclick - starts game
  $(".start-game-btn").on("click", function(){
   	$(".start-game-btn").replaceWith('<div class="timer-content text-center"><h2>Time left: ' + timeleft + ' Seconds</h2></div>'); //hides button
  	showNext ();

    //the following stores a value in the userResponse object for scoring at end of game

  }) //end of on click

}); //end of application
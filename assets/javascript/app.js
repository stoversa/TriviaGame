$(document).ready(function() {

	//variables/questions
	var timeleft = 30; //iniital time value
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
 		correct: "yes",
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
    $(".timer-content").html("<h2>Time left: " + timeleft + "</h2>");
    if (timeleft === 0) {
      stop();
    }
  };

  function stop () {
    clearInterval(intervalId);
    $('.question-content').hide();
    $('.score-button').hide();
    $('.timer-content').hide();
    gradeGame();
  };

	//populating the page w/ questions
	function populate(){
		for (var x = 0; x < questionsArr.length; x++){
      var thisClass = questionsArr[x].name;
      var questionsText = questionsArr[x].answers;
      var newDiv = $('<div>');
      newDiv.html('<h3>' + questionsArr[x].txt + '</h3>').addClass(thisClass).appendTo('.question-content');
      $.each(questionsText , function (index, value){
        var newButton = $('<button type="submit" value="' + value + '"></button>');
        newButton.text(value).addClass('btn btn-default game-btn');
        $(newDiv).append(newButton);
      });
		};
    $('.score-button').html($('<div class="text-center"><a class="btn btn-primary btn-lg end-game-btn" href="#" role="button">Score Answers</a></div>'));
    };

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

  function showScore(){
    $(".game-main-section").append($('<h2>Correct Answers: ' + correctAnswers + '</h2>'));
    $(".game-main-section").append($('<h2>Wrong Answers: ' + wrongAnswers + '</h2>'));
    $(".game-main-section").append($('<h2>Unanswered Questions: ' + unAnsweredQuestions + '</h2>'));
  };

	//onclick - starts game
  $(".start-game-btn").on("click", function(){
   	$(".start-game-btn").replaceWith('<div class="timer-content text-center"><h2>Time left: ' + timeleft + '</h2></div>'); //hides button
  	start();
    populate();

    //the following stores a value in the userResponse object for scoring at end of game
    $(".game-btn").on("click", function(){
        var btnValue = this.value;
        var parent = $(this).parent();
        var parentClass = parent.prop('className');
        userResponse[parentClass] = btnValue;
        parent.children('.btn').css( "background-color", "#464545");
        $(this).css("background-color", "#375a7f");
    });

    //this allows users to end the game early if they click the Score Answers button
    $('.end-game-btn').on("click", function(){
      stop();
    });
  }) //end of on click


    

}); //end of application

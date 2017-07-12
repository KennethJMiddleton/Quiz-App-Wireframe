'use strict';

const QUIZ = [
	{
		question: 'What is the name of Maleficent’s pet raven?',
		answers: [
			{answer: 'Edgar', correct: false},
			{answer: 'Iago', correct: false},
			{answer: 'Diablo', correct: true},
			{answer: 'Steve', correct: false}
		]
	},
	{
		question: 'According to Lilo, who controls the weather in Hawaii?',
		answers: [
			{answer: 'Pudge, the fish', correct: true},
			{answer: 'Maui, shapeshifter, demigod of the wind and sea', correct: false},
			{answer: 'Scuttle, the seagull', correct: false},
			{answer: 'Ursula, the sea witch', correct: false}
		]
	},
	{
		question: 'Which franchise is not owned by the Walt Disney Company?',
		answers: [
			{answer: 'Marvel', correct: false},
			{answer: 'Star Wars', correct: false},
			{answer: 'Muppets', correct: false},
			{answer: 'Lord of the Rings', correct: true}
		]
	},
	{
		question: 'In what year did Walt Disney World open in Orlando, Florida?',
		answers: [
			{answer: '1963', correct: false},
			{answer: '1967', correct: false},
			{answer: '1971', correct: true},
			{answer: '1975', correct: false}
		]
	},
	{
		question: 'Which film became the first animated film to be nominated for the Academy Award for Best Picture?',
		answers: [
			{answer: 'Toy Story', correct: false},
			{answer: 'Beauty and the Beast', correct: true},
			{answer: 'Snow White and the Seven Dwarfs', correct: false},
			{answer: 'Up', correct: false}
		]
	},
	{
		question: 'Which Pixar Easer Egg is first seen in Toy Story?',
		answers: [
			{answer: 'Luxo’s Ball', correct: false},
			{answer: 'A113', correct: false},
			{answer: 'Zurg’s Spaceship', correct: false},
			{answer: 'The Pizza Planet Truck', correct: true}
		]
	},
	{
		question: 'What is the name of the Demon in Fantasia’s segment entitled “Night on Bald Mountain”?',
		answers: [
			{answer: 'Malefisto', correct: false},
			{answer: 'Beelzebub', correct: false},
			{answer: 'Chernabog', correct: true},
			{answer: 'Hecate', correct: false}
		]
	},
	{
		question: 'The Horned King is the villain in which Disney animated cult classic?',
		answers: [
			{answer: 'The Black Cauldron', correct: true},
			{answer: 'The Sword in the Stone', correct: false},
			{answer: 'Quest for Camelot', correct: false},
			{answer: 'Brave', correct: false}
		]
	},
	{
		question: 'What does EPCOT stand for?',
		answers: [
			{answer: 'Expected Progression of Civilization Orientation Trends', correct: false},
			{answer: 'Empire of Popular Cartoons Observed Today', correct: false},
			{answer: 'Experimental Prototype Community Of Tomorrow', correct: true},
			{answer: 'Every Person Comes Out Tired', correct: false}
		]
	},
	{
		question: 'Which Character, originally created by Walt Disney, was owned by Universal for 80 years before returning to the Walt Disney Company in 2006?',
		answers: [
			{answer: 'Spiderman', correct: false},
			{answer: 'Chewbacca', correct: false},
			{answer: 'Professor Owl', correct: false},
			{answer: 'Oswald the Lucky Rabbit', correct: true}
		]
	}
];


var QUESTION_COUNTER = 0;
var CORRECT_ANSWER_COUNTER = 0;

function runQuiz() {
  handleStartButtonClick();
  handleQuestionButtonClick();
  handleCorrectAnswerButtonClick();
  handleWrongAnswerButtonClick();
  handleNoAnswerButtonClick();
  handleEndButtonClick();
}

function handleStartButtonClick(){
  $('.start-button').on('click', function(event){
    event.preventDefault();
    $('.Start-Page').addClass("hidden");
    $('.Question-Page').removeClass('hidden');
    renderQuestion(QUESTION_COUNTER);
  });
}

function handleQuestionButtonClick(){
  $('.quiz').submit(function (event){
    event.preventDefault();
    var clickedAnswer = $('input[name=answer]:checked', '.quiz').val()
    console.log(clickedAnswer);
    $('.Question-Page').addClass('hidden');
    if (clickedAnswer) {
      const accuracy = checkAnswer(QUESTION_COUNTER,clickedAnswer);
      if (accuracy){
        $('.Correct-Answer-Page').removeClass('hidden');
        renderCorrectAnswer(QUESTION_COUNTER);
      }
      else {
        $('.Wrong-Answer-Page').removeClass('hidden');
        renderWrongAnswer(QUESTION_COUNTER);
      }
    }
    else {
      $('.No-Answer-Page').removeClass('hidden');
    }
  });
}

function handleCorrectAnswerButtonClick(){
  $('.c-answer-button').on('click', function(event){
    event.preventDefault();
    if (QUESTION_COUNTER === 10){
      $('.Correct-Answer-Page').addClass('hidden');
      $('.End-Page').removeClass('hidden');
      renderEnd(CORRECT_ANSWER_COUNTER);
    }
    else {
      $('.Correct-Answer-Page').addClass('hidden');
      $('.Question-Page').removeClass('hidden');
      renderQuestion(QUESTION_COUNTER);
    }
  });
}

function handleWrongAnswerButtonClick(){
   $('.w-answer-button').on('click', function(event){
    event.preventDefault();
    if (QUESTION_COUNTER === 10){
      $('.Wrong-Answer-Page').addClass('hidden');
      $('.End-Page').removeClass('hidden');
      renderEnd(CORRECT_ANSWER_COUNTER);
    }
    else{
      $('.Wrong-Answer-Page').addClass('hidden');
      $('.Question-Page').removeClass('hidden');
      renderQuestion(QUESTION_COUNTER);
    }
  });
}

function handleNoAnswerButtonClick() {
  $('.no-answer-button').on('click', function(event){
    event.preventDefault();
    $('.No-Answer-Page').addClass('hidden');
    $('.Question-Page').removeClass('hidden');
    renderQuestion(QUESTION_COUNTER);
  });  
}

function handleEndButtonClick(){
  $('.end-button').on('click', function(event){
    event.preventDefault();
    reset();
    $('.End-Page').addClass('hidden');
    $('.Start-Page').removeClass("hidden");
  });
}

function renderQuestion(num) {
 const ans = QUIZ[num].answers.map((item, key) => {
   return (`<li><input type="radio" name="answer" id={ans-${key}} value=${item.answer}><label for={ans-${key}} class="answer">${item.answer}</label></li>`);
 });
 $('.question').html(QUIZ[num].question);
 $('.answer-list').html(ans);
 console.log(ans);
}

function checkAnswer(num,ans) {
  const id = $('input[name=answer]:checked', '.quiz').attr('id');
  const index = id[5];
  return QUIZ[num].answers[index].correct;
  
}

function renderCorrectAnswer(num) {
  const id = $('input[name=answer]:checked', '.quiz').attr('id');
  const index = id[5];
  const theirAns = QUIZ[num].answers[index].answer;
  $('.Their-Answer').html(theirAns+".");
	CORRECT_ANSWER_COUNTER++;
	QUESTION_COUNTER++;
	
}

function renderWrongAnswer(num) {
  const id = $('input[name=answer]:checked', '.quiz').attr('id');
  const index = id[5];
  const theirAns = QUIZ[num].answers[index].answer;
  $('.Their-Answer').html(theirAns+".");
  $('.Correct-Answer').html(QUIZ[num].answers.find(answer => answer.correct).answer+'.');
	QUESTION_COUNTER++;
}

function renderEnd(num) {
  $('.Correct-Count').html(num);
}

function reset() {
	QUESTION_COUNTER = 0;
	CORRECT_ANSWER_COUNTER = 0;
}



$(runQuiz);
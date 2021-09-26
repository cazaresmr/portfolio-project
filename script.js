const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()

}

function setNextQuestion(question) {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])

}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.remove('hide')
  while(answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide') 
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
  nextButton.classList.remove('hide')
}

function setStatusClass (element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
      element.classList.remove('correct')
      element.classList.remove('wrong')
}


const questions = [
	{
		question: "What is the sum of 9 and 7 ?",
		answers: [
			{ text: "16", correct: true },
			{ text: "-16", correct: false },
			{ text: "17", correct: false },
			{ text: "18", correct: false },
		],
	},
	{
		question: "What is the difference of 9 and 7 ?",
		answers: [
			{ text: "-2", correct: false },
			{ text: "-16", correct: false },
			{ text: "2", correct: true },
			{ text: "16", correct: false },
		],
	},
	{
		question: "What is the product of 9 and 7 ?",
		answers: [
			{ text: "-63", correct: false },
			{ text: "-56", correct: false },
			{ text: "56", correct: false },
			{ text: "63", correct: true },
		],
	},
	{
		question: "What is the quotient of 56 and 7 ?",
		answers: [
			{ text: "63", correct: false },
			{ text: "51", correct: false },
			{ text: "8", correct: true },
			{ text: "-8", correct: false },
		],
	},
]
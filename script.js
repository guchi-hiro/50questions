const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let currentQuestionIndex
let answer = ''

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion(e) {
  resetState()
  console.log("Q: " + currentQuestionIndex + " A: " + answer)
  showQuestion(questions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.classList.add('btn')
    button.dataset.value = answer.value
    button.innerHTML = answer.image
	button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
	
  console.log(e.target.parentNode.tagName)
  
  const tagName = e.target.parentNode.tagName
  let selectedButton

  if (tagName == 'BUTTON') {
      selectedButton = e.target.parentNode
  } else {
      selectedButton = e.target
  }	  
  const value = selectedButton.dataset.value
  answer = value
  setStatusClass(selectedButton)

  if (questions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'DONE!!'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element) {
  element.classList.add('selected')
}

function clearStatusClass(element) {
  element.classList.remove('selected')
}

const questions = [
  {
    question: '東京メトロといえば?',
    answers: [
      { value: "ginza" , image: "<img src ='q1/ginza.png'>"},
	  { value: "maru" , image: "<img src ='q1/maru.png'>"},
	  { value: "hibiya" , image: "<img src ='q1/hibiya.png'>"},
	  { value: "tohzai" , image: "<img src ='q1/tohzai.png'>"},
	  { value: "yuraku" , image: "<img src ='q1/yuraku.png'>"},
	  { value: "fuku" , image: "<img src ='q1/fuku.png'>"},
	  { value: "hanzo" , image: "<img src ='q1/hanzo.png'>"},
	  { value: "chiyoda" , image: "<img src ='q1/chiyoda.png'>"},
	  { value: "namboku" , image: "<img src ='q1/namboku.png'>"}
    ]
  },
  {
    question: 'SNSといえば?',
    answers: [
      { value: "facebook" , image: "<img src ='q2/facebook.png'>"},
	  { value: "twitter" , image: "<img src ='q2/twitter.png'>"},
	  { value: "insta" , image: "<img src ='q2/insta.png'>"},
	  { value: "line" , image: "<img src ='q2/line.png'>"},
	  { value: "tiktok" , image: "<img src ='q2/tiktok.png'>"},
	  { value: "youtube" , image: "<img src ='q2/youtube.png'>"}
    ]
  },
  {
    question: 'この中で一番必要ないキーは?',
    answers: [
      { value: "down" , image: "<strong class=label>Page Down</strong>"},
	  { value: "up" , image: "<strong class=label>Page Up</strong>"},
	  { value: "insert" , image: "<strong class=label>Insert</strong>"},
	  { value: "del" , image: "<strong class=label>Delete</strong>"},
	  { value: "numlock" , image: "<strong class=label>Num Lock</strong>"},
	  { value: "home" , image: "<strong class=label>Home</strong>"},
	  { value: "capslock" , image: "<strong class=label>Caps Lock</strong>"},
	  { value: "end" , image: "<strong class=label>End</strong>"},
	  { value: "pause" , image: "<strong class=label>Pause</strong>"}
    ]
  },
  {
    question: 'あなたのスマホの色は?',
    answers: [
      { value: "white" , image: "<img src ='q4/white.png'>"},
	  { value: "black" , image: "<img src ='q4/black.png'>"},
	  { value: "blue" , image: "<img src ='q4/blue.png'>"},
	  { value: "red" , image: "<img src ='q4/red.png'>"},
	  { value: "yellow" , image: "<img src ='q4/yellow.png'>"},
	  { value: "green" , image: "<img src ='q4/green.png'>"},
	  { value: "purple" , image: "<img src ='q4/purple.png'>"},
	  { value: "pink" , image: "<img src ='q4/pink.png'>"},
	  { value: "orange" , image: "<img src ='q4/orange.png'>"}
    ]
  },
  {
    question: 'プログラミング言語といえば?',
    answers: [
      { value: "java" , image: "<img src ='q5/java.png'>"},
	  { value: "c" , image: "<img src ='q5/c.png'>"},
	  { value: "c++" , image: "<img src ='q5/cplus.png'>"},
	  { value: "python" , image: "<img src ='q5/python.png'>"},
	  { value: "php" , image: "<img src ='q5/php.png'>"},
	  { value: "ruby" , image: "<img src ='q5/ruby.png'>"},
	  { value: "js" , image: "<img src ='q5/js.png'>"}
    ]
  },
]
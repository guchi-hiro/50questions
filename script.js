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
      { value: "ginza" , image: "<img src ='q1/ginza.png' alt='Ginza Line'>"},
	  { value: "maru" , image: "<img src ='q1/maru.png' alt='Marunouchi Line'>"},
	  { value: "hibiya" , image: "<img src ='q1/hibiya.png' alt='Hibiya Line'>"},
	  { value: "tohzai" , image: "<img src ='q1/tohzai.png' alt='Tohzai Line'>"},
	  { value: "yuraku" , image: "<img src ='q1/yuraku.png' alt='Yurakucho Line'>"},
	  { value: "fuku" , image: "<img src ='q1/fuku.png' alt='Fukutoshin Line'>"},
	  { value: "hanzo" , image: "<img src ='q1/hanzo.png' alt='Hanzo Line'>"},
	  { value: "chiyoda" , image: "<img src ='q1/chiyoda.png' alt='Chiyoda Line'>"},
	  { value: "namboku" , image: "<img src ='q1/namboku.png' alt='NamBolu Line'>"}
    ]
  },
  {
    question: 'SNSといえば?',
    answers: [
      { value: "facebook" , image: "<img src ='q2/facebook.png' alt='Facebook'>"},
	  { value: "twitter" , image: "<img src ='q2/twitter.png' alt='Twitter'>"},
	  { value: "insta" , image: "<img src ='q2/insta.png' alt='Insta'>"},
	  { value: "line" , image: "<img src ='q2/line.png' alt='LINE'>"},
	  { value: "tiktok" , image: "<img src ='q2/tiktok.png' alt='Tiktok'>"},
	  { value: "youtube" , image: "<img src ='q2/youtube.png' alt='Youtube'>"}
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
      { value: "white" , image: "<img src ='q4/white.png' alt='White'>"},
	  { value: "black" , image: "<img src ='q4/black.png' alt='Black'>"},
	  { value: "blue" , image: "<img src ='q4/blue.png' alt='Blue'>"},
	  { value: "red" , image: "<img src ='q4/red.png' alt='Red'>"},
	  { value: "yellow" , image: "<img src ='q4/yellow.png' alt='Yellow'>"},
	  { value: "green" , image: "<img src ='q4/green.png' alt='Green'>"},
	  { value: "purple" , image: "<img src ='q4/purple.png' alt='Purple'>"},
	  { value: "pink" , image: "<img src ='q4/pink.png' alt='Pink'>"},
	  { value: "orange" , image: "<img src ='q4/orange.png' alt='Orange'>"}
    ]
  },
  {
    question: 'プログラミング言語といえば?',
    answers: [
      { value: "java" , image: "<img src ='q5/java.png' alt='Java'>"},
	  { value: "c" , image: "<img src ='q5/c.png' alt='C'>"},
	  { value: "c++" , image: "<img src ='q5/cplus.png' alt='C++'>"},
	  { value: "python" , image: "<img src ='q5/python.png' alt='Python'>"},
	  { value: "php" , image: "<img src ='q5/php.png' alt='php'>"},
	  { value: "ruby" , image: "<img src ='q5/ruby.png' alt='Ruby'>"},
	  { value: "js" , image: "<img src ='q5/js.png' alt='Java Script'>"}
    ]
  },
]

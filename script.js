const labelName = document.getElementById('label-name')
const inputName = document.getElementById('name')
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let currentQuestionIndex
let answer = ''
let name = ''
let selectedButton

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  if (inputName.value == '') {
    alert('Please input your name')

  } else {
  labelName.classList.add('hide')
  inputName.classList.add('hide')
  startButton.classList.add('hide')

  currentQuestionIndex = 0
  name = inputName.value
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
  }
}

function setNextQuestion(e) {
  resetState()
  console.log("Name: " + name + "Q: " + currentQuestionIndex + " A: " + answer)
  showQuestion(questions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = "Q: " + currentQuestionIndex + "  " + question.question
  questionElement.style.fontSize = "26px"
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.classList.add('btn')
    button.dataset.value = answer.value

    imageIndex = currentQuestionIndex + 1
    if (answer.image) {
      button.innerHTML = "<img src ='q" + imageIndex + "/" + answer.value + ".png ' decoding='async'>"
    } else {
      button.innerHTML = '<strong class=label>' + answer.value + '</strong>'
    }
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
  if (selectedButton != null) {
      clearStatusClass(selectedButton)
  }
  console.log(e.target.parentNode.tagName)
  const tagName = e.target.parentNode.tagName

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
      { value: "ginza" , image: true },
	  { value: "maru" , image: true},
	  { value: "hibiya" , image: true},
	  { value: "tohzai" , image: true},
	  { value: "yuraku" , image: true},
	  { value: "fuku" , image: true},
	  { value: "hanzo" , image: true},
	  { value: "chiyoda" , image: true},
	  { value: "namboku" , image: true}
    ]
  },
  {
    question: 'SNSといえば?',
    answers: [
      { value: "facebook" , image: true},
	  { value: "twitter" , image: true},
	  { value: "insta" , image: true},
	  { value: "line" , image: true},
	  { value: "tiktok" , image: true},
	  { value: "youtube" , image: true}
    ]
  },
  {
    question: 'Keyboardの中で一番必要ないと思うKeyは?',
    answers: [
      { value: "down" , image: false},
	  { value: "up" , image: false},
	  { value: "insert" , image: false},
	  { value: "del" , image: false},
	  { value: "numlock" , image: false},
	  { value: "home" , image: false},
	  { value: "capslock" , image: false},
	  { value: "end" , image: false},
	  { value: "Other" , image: false}
    ]
  },
  {
    question: 'あなたのスマホの色は?',
    answers: [
      { value: "white" , image: true},
	  { value: "black" , image: true},
	  { value: "blue" , image: true},
	  { value: "red" , image: true},
	  { value: "yellow" , image: true},
	  { value: "green" , image: true},
	  { value: "purple" , image: true},
	  { value: "pink" , image: true},
	  { value: "orange" , image: true}
    ]
  },
  {
    question: 'プログラミング言語といえば?',
    answers: [
      { value: "java" , image: true},
	  { value: "c" , image: false},
	  { value: "c++" , image: false},
	  { value: "python" , image: true},
	  { value: "php" , image: true},
	  { value: "ruby" , image: true},
	  { value: "js" , image: true}
    ]
  },
  {
    question: 'GW何してた?',
    answers: [
      { value: "自宅" , image: false},
    { value: "国内旅行" , image: false},
    { value: "海外旅行" , image: false},
    { value: "Others" , image: false}
    ]
  },
  {
    question: 'よく行くコーヒーチェーンは?',
    answers: [
      { value: "Starbucks" , image: false},
    { value: "DOUTOR COFFEE" , image: false},
    { value: "TULLY's COFFEE" , image: false},
    { value: "コメダ珈琲店" , image: false},
    { value: "上島珈琲店" , image: false},
    { value: "ルノアール" , image: false},
    { value: "カフェベローチェ" , image: false},
    { value: "サンマルクカフェ" , image: false},
    { value: "PRONTO" , image: false},
    { value: "エクセルシオール" , image: false}
    ]
  },
  {
    question: '好きなお寿司のネタは?',
    answers: [
      { value: "はまち" , image: false},
    { value: "えんがわ" , image: false},
    { value: "赤エビ" , image: false},
    { value: "マグロ" , image: false},
    { value: "ホタテ" , image: false},
    { value: "中とろ" , image: false},
    { value: "鯖" , image: false},
    { value: "サーモン" , image: false},
    { value: "玉子" , image: false}
    ]
  },
  {
    question: '好きなお酒は?',
    answers: [
      { value: "ビール" , image: false},
    { value: "ワイン" , image: false},
    { value: "焼酎" , image: false},
    { value: "ウイスキー" , image: false},
    { value: "カクテル" , image: false},
    { value: "そのほか" , image: false},
    { value: "飲みません" , image: false}
    ]
  },
  {
    question: 'ストレス解消法は?',
    answers: [
      { value: "寝る" , image: false},
    { value: "運動" , image: false},
    { value: "飲酒" , image: false},
    { value: "カラオケ" , image: false},
    { value: "買い物" , image: false},
    { value: "そのほか" , image: false}
    ]
  },
  {
    question: '好きな山手線の駅は?',
    answers: [
      { value: "新宿" , image: false},
    { value: "渋谷" , image: false},
    { value: "池袋" , image: false},
    { value: "上野" , image: false},
    { value: "新橋" , image: false},
    { value: "東京" , image: false},
    { value: "品川" , image: false},
    { value: "秋葉原" , image: false},
    { value: "そのほか" , image: false}
    ]
  },
  {
    question: '?',
    answers: [
      { value: "" , image: false},
    { value: "" , image: false},
    { value: "" , image: false},
    { value: "" , image: false},
    { value: "" , image: false},
    { value: "" , image: false},
    { value: "" , image: false},
    { value: "" , image: false},
    { value: "" , image: false}
    ]
  },
]

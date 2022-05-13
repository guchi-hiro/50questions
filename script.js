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

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  labelName.classList.add('hide')
  inputName.classList.add('hide')
  startButton.classList.add('hide')
  currentQuestionIndex = 0
  name = inputName.value
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion(e) {
  resetState()
  console.log("Name: " + name + "Q: " + currentQuestionIndex + " A: " + answer)
  showQuestion(questions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  questionElement.style.fontSize = "26px"
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
      { value: "ginza" , image: "<img src ='q1/ginza.png' alt='Ginza Line' decoding='async'>"},
	  { value: "maru" , image: "<img src ='q1/maru.png' alt='Marunouchi Line' decoding='async'>"},
	  { value: "hibiya" , image: "<img src ='q1/hibiya.png' alt='Hibiya Line' decoding='async'>"},
	  { value: "tohzai" , image: "<img src ='q1/tohzai.png' alt='Tohzai Line' decoding='async'>"},
	  { value: "yuraku" , image: "<img src ='q1/yuraku.png' alt='Yurakucho Line' decoding='async'>"},
	  { value: "fuku" , image: "<img src ='q1/fuku.png' alt='Fukutoshin Line' decoding='async'>"},
	  { value: "hanzo" , image: "<img src ='q1/hanzo.png' alt='Hanzo Line' decoding='async'>"},
	  { value: "chiyoda" , image: "<img src ='q1/chiyoda.png' alt='Chiyoda Line' decoding='async'>"},
	  { value: "namboku" , image: "<img src ='q1/namboku.png' alt='NamBolu Line' decoding='async'>"}
    ]
  },
  {
    question: 'SNSといえば?',
    answers: [
      { value: "facebook" , image: "<img src ='q2/facebook.png' alt='Facebook' decoding='async'>"},
	  { value: "twitter" , image: "<img src ='q2/twitter.png' alt='Twitter' decoding='async'>"},
	  { value: "insta" , image: "<img src ='q2/insta.png' alt='Insta' decoding='async'>"},
	  { value: "line" , image: "<img src ='q2/line.png' alt='LINE' decoding='async'>"},
	  { value: "tiktok" , image: "<img src ='q2/tiktok.png' alt='Tiktok' decoding='async'>"},
	  { value: "youtube" , image: "<img src ='q2/youtube.png' alt='Youtube' decoding='async'>"}
    ]
  },
  {
    question: 'Keyboardの中で一番必要ないと思うKeyは?',
    answers: [
      { value: "down" , image: "<strong class=label>Page Down</strong>"},
	  { value: "up" , image: "<strong class=label>Page Up</strong>"},
	  { value: "insert" , image: "<strong class=label>Insert</strong>"},
	  { value: "del" , image: "<strong class=label>Delete</strong>"},
	  { value: "numlock" , image: "<strong class=label>Num Lock</strong>"},
	  { value: "home" , image: "<strong class=label>Home</strong>"},
	  { value: "capslock" , image: "<strong class=label>Caps Lock</strong>"},
	  { value: "end" , image: "<strong class=label>End</strong>"},
	  { value: "Other" , image: "<strong class=label>Others ..</strong>"}
    ]
  },
  {
    question: 'あなたのスマホの色は?',
    answers: [
      { value: "white" , image: "<img src ='q4/white.png' alt='White' decoding='async'>"},
	  { value: "black" , image: "<img src ='q4/black.png' alt='Black' decoding='async'>"},
	  { value: "blue" , image: "<img src ='q4/blue.png' alt='Blue' decoding='async'>"},
	  { value: "red" , image: "<img src ='q4/red.png' alt='Red' decoding='async'>"},
	  { value: "yellow" , image: "<img src ='q4/yellow.png' alt='Yellow' decoding='async'>"},
	  { value: "green" , image: "<img src ='q4/green.png' alt='Green' decoding='async'>"},
	  { value: "purple" , image: "<img src ='q4/purple.png' alt='Purple' decoding='async'>"},
	  { value: "pink" , image: "<img src ='q4/pink.png' alt='Pink' decoding='async'>"},
	  { value: "orange" , image: "<img src ='q4/orange.png' alt='Orange' decoding='async'>"}
    ]
  },
  {
    question: 'プログラミング言語といえば?',
    answers: [
      { value: "java" , image: "<img src ='q5/java.png' alt='Java' decoding='async'>"},
	  { value: "c" , image: "<strong class=label>C言語</strong>"},
	  { value: "c++" , image: "<strong class=label>C++</strong>"},
	  { value: "python" , image: "<img src ='q5/python.png' alt='Python' decoding='async'>"},
	  { value: "php" , image: "<img src ='q5/php.png' alt='php' decoding='async'>"},
	  { value: "ruby" , image: "<img src ='q5/ruby.png' alt='Ruby' decoding='async'>"},
	  { value: "js" , image: "<img src ='q5/js.png' alt='Java Script' decoding='async'>"}
    ]
  },
  {
    question: 'GW何してた?',
    answers: [
      { value: "自宅" , image: "<strong class=label>自宅</strong>"},
    { value: "国内旅行" , image: "<strong class=label>国内旅行</strong>"},
    { value: "海外旅行" , image: "<strong class=label>海外旅行</strong>"},
    { value: "Others" , image: "<strong class=label>Others ..</strong>"}
    ]
  },
  {
    question: 'よく行くコーヒーチェーンは?',
    answers: [
      { value: "Starbucks" , image: "<strong class=label>Starbucks</strong>"},
    { value: "DOUTOR COFFEE" , image: "<strong class=label>DOUTOR</strong>"},
    { value: "TULLY's COFFEE" , image: "<strong class=label>TULLY's</strong>"},
    { value: "コメダ珈琲店" , image: "<strong class=label>コメダ珈琲店</strong>"},
    { value: "上島珈琲店" , image: "<strong class=label>上島珈琲店</strong>"},
    { value: "ルノアール" , image: "<strong class=label>ルノアール</strong>"},
    { value: "カフェベローチェ" , image: "<strong class=label>カフェベローチェ</strong>"},
    { value: "サンマルクカフェ" , image: "<strong class=label>サンマルクカフェ</strong>"},
    { value: "PRONTO" , image: "<strong class=label>PRONTO</strong>"},
    { value: "エクセルシオール" , image: "<strong class=label>エクセルシオール</strong>"}
    ]
  },
  {
    question: '好きなお寿司のネタは?',
    answers: [
      { value: "はまち" , image: "<strong class=label>はまち</strong>"},
    { value: "えんがわ" , image: "<strong class=label>えんがわ</strong>"},
    { value: "赤エビ" , image: "<strong class=label>赤エビ</strong>"},
    { value: "マグロ" , image: "<strong class=label>マグロ</strong>"},
    { value: "ホタテ" , image: "<strong class=label>ホタテ</strong>"},
    { value: "中とろ" , image: "<strong class=label>中とろ</strong>"},
    { value: "鯖" , image: "<strong class=label>鯖</strong>"},
    { value: "サーモン" , image: "<strong class=label>サーモン</strong>"},
    { value: "玉子" , image: "<strong class=label>玉子</strong>"}
    ]
  },
  {
    question: '好きなお酒は?',
    answers: [
      { value: "ビール" , image: "<strong class=label>ビール</strong>"},
    { value: "ワイン" , image: "<strong class=label>ワイン</strong>"},
    { value: "焼酎" , image: "<strong class=label>焼酎</strong>"},
    { value: "ウイスキー" , image: "<strong class=label>ウイスキー</strong>"},
    { value: "カクテル" , image: "<strong class=label>カクテル</strong>"},
    { value: "そのほか" , image: "<strong class=label>そのほか</strong>"},
    { value: "飲みません" , image: "<strong class=label>飲みません</strong>"}
    ]
  },
  {
    question: 'ストレス解消法は?',
    answers: [
      { value: "寝る" , image: "<strong class=label>寝る</strong>"},
    { value: "運動" , image: "<strong class=label>運動</strong>"},
    { value: "飲酒" , image: "<strong class=label>飲酒</strong>"},
    { value: "カラオケ" , image: "<strong class=label>カラオケ</strong>"},
    { value: "買い物" , image: "<strong class=label>買い物</strong>"},
    { value: "そのほか" , image: "<strong class=label>そのほか</strong>"}
    ]
  },
  {
    question: '好きな山手線の駅は?',
    answers: [
      { value: "新宿" , image: "<strong class=label>新宿</strong>"},
    { value: "渋谷" , image: "<strong class=label>渋谷</strong>"},
    { value: "池袋" , image: "<strong class=label>池袋</strong>"},
    { value: "上野" , image: "<strong class=label>上野</strong>"},
    { value: "新橋" , image: "<strong class=label>新橋</strong>"},
    { value: "東京" , image: "<strong class=label>東京</strong>"},
    { value: "品川" , image: "<strong class=label>品川</strong>"},
    { value: "秋葉原" , image: "<strong class=label>秋葉原</strong>"},
    { value: "そのほか" , image: "<strong class=label>そのほか</strong>"}
    ]
  },
  {
    question: '?',
    answers: [
      { value: "" , image: "<strong class=label></strong>"},
    { value: "" , image: "<strong class=label></strong>"},
    { value: "" , image: "<strong class=label></strong>"},
    { value: "" , image: "<strong class=label></strong>"},
    { value: "" , image: "<strong class=label></strong>"},
    { value: "" , image: "<strong class=label></strong>"},
    { value: "" , image: "<strong class=label></strong>"},
    { value: "" , image: "<strong class=label></strong>"},
    { value: "" , image: "<strong class=label></strong>"}
    ]
  },
]

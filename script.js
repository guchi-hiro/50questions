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
    question: '旅行に行くなら?',
    answers: [
      { value: "北米" , image: false},
    { value: "南米" , image: false},
    { value: "アジア" , image: false},
    { value: "ヨーロッパ" , image: false},
    { value: "オセアニア" , image: false}
    ]
  },
  {
    question: 'プライベートで使用するブラウザは?',
    answers: [
      { value: "IE Edge" , image: false},
    { value: "Google Chrome" , image: false},
    { value: "Firefox" , image: false},
    { value: "Opera" , image: false},
    { value: "Safari" , image: false},
    { value: "Brave" , image: false},
    { value: "Others" , image: false}
    ]
  },
  {
    question: '老後移住するならどこ?',
    answers: [
      { value: "北海道" , image: false},
    { value: "東北" , image: false},
    { value: "北陸" , image: false},
    { value: "関東甲信" , image: false},
    { value: "東海" , image: false},
    { value: "中国" , image: false},
    { value: "四国" , image: false},
    { value: "九州" , image: false},
    { value: "沖縄" , image: false}
    ]
  },
  {
    question: 'クラウドといえば?',
    answers: [
      { value: "AWS" , image: false},
    { value: "Azure" , image: false},
    { value: "GCP" , image: false},
    { value: "IBM Cloud" , image: false},
    { value: "Alibaba" , image: false},
    { value: "Others" , image: false}
    ]
  },
  {
    question: '好きな枕の種類は?',
    answers: [
      { value: "高反発" , image: false},
    { value: "低反発" , image: false},
    { value: "ラテックス" , image: false},
    { value: "ファイバー" , image: false},
    { value: "羽根" , image: false},
    { value: "そばがら" , image: false},
    { value: "ウール" , image: false},
    { value: "Others" , image: false}
    ]
  },
  {
    question: '外食するなら?',
    answers: [
      { value: "和食" , image: false},
    { value: "イタリアン" , image: false},
    { value: "中華" , image: false},
    { value: "フレンチ" , image: false},
    { value: "エスニック" , image: false},
    { value: "アメリカ" , image: false},
    { value: "Others" , image: false}
    ]
  },
  {
    question: 'どのくらい走れる?',
    answers: [
      { value: "1km未満" , image: false},
    { value: "1km" , image: false},
    { value: "2km" , image: false},
    { value: "5km" , image: false},
    { value: "10km" , image: false},
    { value: "20km" , image: false},
    { value: "50km" , image: false},
    { value: "50km以上" , image: false}
    ]
  },
  {
    question: '好きな球団は?',
    answers: [
      { value: "読売" , image: false},
    { value: "広島" , image: false},
    { value: "中日" , image: false},
    { value: "阪神" , image: false},
    { value: "横浜" , image: false},
    { value: "ヤクルト" , image: false},
    { value: "オリックス" , image: false},
    { value: "ソフトバンク" , image: false},
    { value: "楽天" , image: false},
    { value: "日本ハム" , image: false},
    { value: "ロッテ" , image: false},
    { value: "西部" , image: false}
    ]
  },
  {
    question: 'サザエさん一家で好きなキャラクターは?',
    answers: [
      { value: "サザエ" , image: false},
    { value: "マスオ" , image: false},
    { value: "波平" , image: false},
    { value: "フネ" , image: false},
    { value: "カツオ" , image: false},
    { value: "ワカメ" , image: false},
    { value: "タラちゃん" , image: false},
    { value: "タマ" , image: false}
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

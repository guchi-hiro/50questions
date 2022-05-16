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
    { value: "西武" , image: false}
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
    question: 'ディズニーランドといえば?',
    answers: [
      { value: "スペースマウンテン" , image: false},
    { value: "ビッグサンダーマウンテン" , image: false},
    { value: "プーさんのハニーハント" , image: false},
    { value: "イッツ・ア・スモールワールド" , image: false},
    { value: "スプラッシュマウンテン" , image: false},
    { value: "ジャングルクルーズ" , image: false},
    { value: "ホーンテッドマンション" , image: false},
    { value: "Others" , image: false}
    ]
  },
  {
    question: 'ディズニーシーといえば?',
    answers: [
      { value: "タワーオブテラー" , image: false},
    { value: "センターオブジアース" , image: false},
    { value: "海底二万マイル" , image: false},
    { value: "インディ・ジョーンズ" , image: false},
    { value: "タートル・トーク" , image: false},
    { value: "トイ・ストーリー・マニア" , image: false},
    { value: "シンドバッド" , image: false},
    { value: "マジックランプシアター" , image: false},
    { value: "Others" , image: false}
    ]
  },
  {
    question: 'ジブリ映画といえば?',
    answers: [
      { value: "となりのトトロ" , image: false},
    { value: "ハウルの動く城" , image: false},
    { value: "もののけ姫" , image: false},
    { value: "崖の上のポニョ" , image: false},
    { value: "魔女の宅急便" , image: false},
    { value: "天空の城ラピュタ" , image: false},
    { value: "風の谷のナウシカ" , image: false},
    { value: "千と千尋の神隠し" , image: false},
    { value: "借りぐらしのアリエッティ" , image: false},
    { value: "Others" , image: false}
    ]
  },
  {
    question: '好きなスイーツは?',
    answers: [
      { value: "ケーキ" , image: false},
    { value: "大福" , image: false},
    { value: "かき氷" , image: false},
    { value: "ドーナツ" , image: false},
    { value: "プリン" , image: false},
    { value: "チョコレート" , image: false},
    { value: "どら焼き" , image: false},
    { value: "アイスクリーム" , image: false},
    { value: "Others" , image: false}
    ]
  },
  {
    question: '好きなおにぎりの具は?',
    answers: [
      { value: "ツナマヨ" , image: false},
    { value: "梅干し" , image: false},
    { value: "鮭" , image: false},
    { value: "昆布" , image: false},
    { value: "明太子" , image: false},
    { value: "おかか" , image: false},
    { value: "エビマヨ" , image: false},
    { value: "すじこ" , image: false},
    { value: "塩" , image: false},
    { value: "Others" , image: false}
    ]
  },
  {
    question: 'アニメのキャラクターといえば?',
    answers: [
      { value: "ピカチュー" , image: false},
    { value: "ドラえもん" , image: false},
    { value: "サザエさん" , image: false},
    { value: "孫悟空" , image: false},
    { value: "コナン" , image: false},
    { value: "ルパン" , image: false},
    { value: "ルフィー" , image: false},
    { value: "桜木花道" , image: false},
    { value: "プリキュア" , image: false},
    { value: "Others" , image: false}
    ]
  },
  {
    question: '習得したい言語は?',
    answers: [
      { value: "フランス語" , image: false},
    { value: "ドイツ語" , image: false},
    { value: "中国語" , image: false},
    { value: "韓国語" , image: false},
    { value: "イタリア語" , image: false},
    { value: "ロシア語" , image: false},
    { value: "スペイン語" , image: false},
    { value: "ポルトガル語" , image: false}
    ]
  },
  {
    question: 'どんぶりといえば?',
    answers: [
      { value: "親子丼" , image: false},
    { value: "海鮮丼" , image: false},
    { value: "牛丼" , image: false},
    { value: "かつ丼" , image: false},
    { value: "天丼" , image: false},
    { value: "うな丼" , image: false},
    { value: "鉄火丼" , image: false},
    { value: "豚丼" , image: false},
    { value: "Others" , image: false}
    ]
  },
  {
    question: '武道or格闘技習うなら何を習う?',
    answers: [
      { value: "柔道" , image: false},
    { value: "ボクシング" , image: false},
    { value: "テコンドー" , image: false},
    { value: "カンフー" , image: false},
    { value: "ムエタイ" , image: false},
    { value: "剣道" , image: false},
    { value: "相撲" , image: false},
    { value: "総合格闘技" , image: false},
    { value: "Others" , image: false}
    ]
  },
  {
    question: '好きなハンバーガーブランドは?',
    answers: [
      { value: "マクドナルド" , image: false},
    { value: "モスバーガー" , image: false},
    { value: "フレッシュネスバーガー" , image: false},
    { value: "ウェンディーズ" , image: false},
    { value: "バーガーキング" , image: false},
    { value: "ロッテリア" , image: false},
    { value: "クア・アイナ" , image: false},
    { value: "ケンタッキー" , image: false},
    { value: "ファーストキッチン" , image: false},
    { value: "Others" , image: false}
    ]
  },
  {
    question: 'PCといえば?',
    answers: [
      { value: "Apple" , image: false},
    { value: "IBM" , image: false},
    { value: "NEC" , image: false},
    { value: "Fujitsu" , image: false},
    { value: "Lenovo" , image: false},
    { value: "Sony" , image: false},
    { value: "Panasonic" , image: false},
    { value: "DELL" , image: false},
    { value: "ASUS" , image: false},
    { value: "hp" , image: false},
    { value: "Others" , image: false}
    ]
  },
  {
    question: 'ファミリーレストランといえば?',
    answers: [
      { value: "ガスト" , image: false},
    { value: "サイゼリヤ" , image: false},
    { value: "デニーズ" , image: false},
    { value: "ジョナサン" , image: false},
    { value: "バーミヤン" , image: false},
    { value: "ロイヤルホスト" , image: false},
    { value: "とんでん" , image: false},
    { value: "びっくりドンキー" , image: false},
    { value: "ビッグボーイ" , image: false},
    { value: "Others" , image: false}
    ]
  },
  {
    question: 'この中で一番苦手な食べ物は?',
    answers: [
      { value: "納豆" , image: false},
    { value: "ホルモン" , image: false},
    { value: "パクチー" , image: false},
    { value: "唐辛子" , image: false},
    { value: "くさや" , image: false},
    { value: "しいたけ" , image: false},
    { value: "グリーンピース" , image: false},
    { value: "セロリ" , image: false},
    { value: "全部好き" , image: false}
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

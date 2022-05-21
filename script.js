const labelName = document.getElementById('label-name')
const inputName = document.getElementById('name')
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const uploadButton = document.getElementById('upload-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const langs = document.getElementsByName('langs')
const langsRadio = document.getElementById('langsRadio')


let currentQuestionIndex
let answer = ''
let name = ''
let selectedButton
let output_json = ''
let lang = 'jp'

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})
uploadButton.addEventListener('click', uploadFile)

function uploadFile() {

  console.log(JSON.stringify(output_json))
  const data = btoa(unescape(encodeURIComponent((JSON.stringify(output_json)))))
  const xhr = new XMLHttpRequest()

  xhr.onreadystatechange = function() {
      switch ( xhr.readyState ) {
          case 0:
              // 未初期化状態.
              console.log( 'uninitialized!' );
              break;
          case 1: // データ送信中.
              console.log( 'loading...' );
              break;
          case 2: // 応答待ち.
              console.log( 'loaded.' );
              break;
          case 3: // データ受信中.
              console.log( 'interactive... '+xhr.responseText.length+' bytes.' );
              break;
          case 4: // データ受信完了.
              if( xhr.status == 200 || xhr.status == 304 ) {
                  var data = xhr.responseText; // responseXML もあり
                  alert( 'COMPLETE! :'+data );
              } else {
                  alert( 'Failed. Please try it later. HttpStatus: '+xhr.statusText );
              }
              break;
      }
  };

  xhr.open('POST', 'http:///app/post_data')
  xhr.setRequestHeader('content-type', 'text/plain')

  xhr.send(data)
}



function startGame() {
  if (inputName.value == '') {
    alert('Please input your name')

  } else {

  for (let i = 0; i < langs.length; i++){
      if (langs.item(i).checked){
          lang = langs.item(i).value;
      }
      //langsRadio.item(i).classList.add('hide')
  }

  console.log(lang);

  langsRadio.classList.add('hide')
  labelName.classList.add('hide')
  inputName.classList.add('hide')
  startButton.classList.add('hide')


  currentQuestionIndex = 0
  name = inputName.value
  output_json = {'name': name, 'answers':[]}

  questionContainerElement.classList.remove('hide')
  setNextQuestion()
  }
}

function setNextQuestion(e) {
  resetState()
  if (currentQuestionIndex != 0) {
      output_json.answers[currentQuestionIndex-1] = {'id': currentQuestionIndex, 'answer': answer}
      console.log(JSON.stringify(output_json))
  }
  showQuestion(questions[currentQuestionIndex])
}

function showQuestion(question) {
  index = currentQuestionIndex+1

  question_title = (lang == 'jp') ? question.question : question.questionEG;
  questionElement.innerText = "Q: " + index + "  " + question_title
  questionElement.style.fontSize = "26px"

  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.classList.add('btn')
    button.dataset.value = answer.value

    answer_title = (lang == 'jp') ? answer.value : answer.valueEG

    button.innerHTML = (answer.image) ? "<img src ='q" + index + "/" + answer.value + ".png ' decoding='async'>" : '<strong class=label>' + answer_title + '</strong>'
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
    output_json.answers[currentQuestionIndex-1] = {'id': currentQuestionIndex, 'answer': answer}
    console.log(JSON.stringify(output_json))
    uploadButton.classList.remove('hide')
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
      { value: "Ginza-line" , image: true },
	  { value: "Marunouchi-line" , image: true},
	  { value: "Hibiya-line" , image: true},
	  { value: "Tohzai-line" , image: true},
	  { value: "Yurakucho-line" , image: true},
	  { value: "Fukutoshin-line" , image: true},
	  { value: "Hanzomon-line" , image: true},
	  { value: "Chiyoda-line" , image: true},
	  { value: "Namboku-line" , image: true}
    ]
  },
  {
    question: 'SNSといえば?',
    answers: [
      { value: "Facebook" , image: true},
	  { value: "Twitter" , image: true},
	  { value: "Instagram" , image: true},
	  { value: "LINE" , image: true},
	  { value: "TikTok" , image: true},
	  { value: "Youtube" , image: true}
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
	  { value: "Others" , image: false}
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
	  { value: "c#" , image: false},
	  { value: "COBOL" , image: false},
	  { value: "python" , image: true},
	  { value: "php" , image: true},
	  { value: "ruby" , image: true},
	  { value: "js" , image: true},
    { value: "Others" , image: false}
    ]
  },
  {
    question: '休日何してる?',
    answers: [
      { value: "寝る" , image: false},
    { value: "読書" , image: false},
    { value: "運動" , image: false},
    { value: "習い事" , image: false},
    { value: "ネット" , image: false},
  　{ value: "家事" , image: false},
　  { value: "人と会う" , image: false},
　  { value: "勉強" , image: false},
　  { value: "仕事" , image: false},
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
    { value: "Others" , image: false},
    { value: "飲みません" , image: false}
    ]
  },
  {
    question: 'ストレス解消法は?',
    answers: [
      { value: "寝る" , image: false},
    { value: "運動" , image: false},
    { value: "瞑想" , image: false},
    { value: "飲酒" , image: false},
    { value: "カラオケ" , image: false},
    { value: "買い物" , image: false},
    { value: "Others" , image: false}
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
    { value: "有楽町" , image: false},
    { value: "日暮里" , image: false},
    { value: "神田" , image: false},
    { value: "Others" , image: false}
    ]
  },
  {
    question: '旅行に行くなら?',
    answers: [
      { value: "北米" , image: false},
    { value: "南米" , image: false},
    { value: "アジア" , image: false},
    { value: "ヨーロッパ" , image: false},
    { value: "オセアニア" , image: false},
    { value: "北極・南極" , image: false}
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
    question: '初めて買ったPCは?',
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
    question: '好きなスポーツは?',
    answers: [
      { value: "サッカー" , image: false},
    { value: "野球" , image: false},
    { value: "バスケットボール" , image: false},
    { value: "ラグビー" , image: false},
    { value: "バレーボール" , image: false},
    { value: "ゴルフ" , image: false},
    { value: "スキー・スノーボード" , image: false},
    { value: "テニス" , image: false},
    { value: "卓球" , image: false},
    { value: "陸上" , image: false},
    { value: "Others" , image: false}
    ]
  },
  {
    question: '人生やり直すなら?',
    answers: [
      { value: "小学校前" , image: false},
    { value: "小学校" , image: false},
    { value: "中学校" , image: false},
    { value: "高校" , image: false},
    { value: "大学" , image: false},
    { value: "社会人1年目" , image: false},
    { value: "社会人1年目以降" , image: false},
    { value: "Others" , image: false}
    ]
  },
  {
    question: 'どのような本を読む?',
    answers: [
      { value: "純文学" , image: false},
    { value: "大衆文学" , image: false},
    { value: "ビジネス書" , image: false},
    { value: "専門書" , image: false},
    { value: "学習参考書" , image: false},
    { value: "雑誌" , image: false},
    { value: "漫画" , image: false},
    { value: "Others" , image: false}
    ]
  },
  {
    question: 'タイムワープするなら?',
    answers: [
      { value: "原始（縄文・弥生）" , image: false},
    { value: "古代（飛鳥・奈良）" , image: false},
    { value: "中世（鎌倉・戦国）" , image: false},
    { value: "近世（江戸）" , image: false},
    { value: "近代（明治・大正）" , image: false},
    { value: "現代（昭和・平成）" , image: false}
    ]
  },
  {
    question: '好きなおでんの具は?',
    answers: [
      { value: "玉子" , image: false},
    { value: "大根" , image: false},
    { value: "ちくわぶ" , image: false},
    { value: "牛すじ" , image: false},
    { value: "はんぺん" , image: false},
    { value: "昆布" , image: false},
    { value: "ごぼう天" , image: false},
    { value: "しらたき" , image: false},
    { value: "豆腐" , image: false},
    { value: "こんにゃく" , image: false},
    { value: "Others" , image: false}
    ]
  },
  {
    question: '好きな音楽のジャンルは?',
    answers: [
      { value: "JPOP" , image: false},
    { value: "KPOP" , image: false},
    { value: "洋楽" , image: false},
    { value: "クラシック" , image: false},
    { value: "ジャズ" , image: false},
    { value: "ヘビーメタル" , image: false},
    { value: "ロック" , image: false},
    { value: "演歌" , image: false},
    { value: "HipPop" , image: false},
    { value: "Others" , image: false}
    ]
  },
  {
    question: 'コンビニといえば?',
    answers: [
      { value: "セブンイレブン" , image: false},
    { value: "ローソン" , image: false},
    { value: "ファミリーマート" , image: false},
    { value: "ミニストップ" , image: false},
    { value: "セイコーマート" , image: false},
    { value: "スリーエフ" , image: false},
    { value: "ポプラ" , image: false},
    { value: "ローソンストア100" , image: false},
    { value: "ナチュラルローソン" , image: false},
    { value: "Others" , image: false}
    ]
  },
  {
    question: 'ペット飼うなら?',
    answers: [
      { value: "犬" , image: false},
    { value: "猫" , image: false},
    { value: "鳥" , image: false},
    { value: "魚" , image: false},
    { value: "ハムスター" , image: false},
    { value: "カメ" , image: false},
    { value: "ハリネズミ" , image: false},
    { value: "ヘビ" , image: false},
    { value: "ウサギ" , image: false},
    { value: "Others" , image: false}
    ]
  },
  {
    question: '好きなExcel関数は?',
    answers: [
      { value: "SUM" , image: false},
    { value: "VLOOKUP" , image: false},
    { value: "COUNT" , image: false},
    { value: "ROUND" , image: false},
    { value: "IF,IFS" , image: false},
    { value: "MAX,MIN" , image: false},
    { value: "IFERROR" , image: false},
    { value: "Others" , image: false}
    ]
  },
  {
    question: '好きな映画のジャンルは?',
    answers: [
      { value: "ミステリー" , image: false},
    { value: "恋愛" , image: false},
    { value: "ドキュメンタリー" , image: false},
    { value: "SF" , image: false},
    { value: "アクション" , image: false},
    { value: "アニメ" , image: false},
    { value: "コメディ" , image: false},
    { value: "ホラー" , image: false},
    { value: "Others" , image: false}
    ]
  },
  {
    question: '好きな月は?',
    answers: [
      { value: "1月" , image: false},
    { value: "2月" , image: false},
    { value: "3月" , image: false},
    { value: "4月" , image: false},
    { value: "5月" , image: false},
    { value: "6月" , image: false},
    { value: "7月" , image: false},
    { value: "8月" , image: false},
    { value: "9月" , image: false},
    { value: "10月" , image: false},
    { value: "11月" , image: false},
    { value: "12月" , image: false}
    ]
  },
  {
    question: '目玉焼きには何をかける?',
    answers: [
      { value: "何もかけない" , image: false},
    { value: "醤油" , image: false},
    { value: "ウスターソース" , image: false},
    { value: "ケチャップ" , image: false},
    { value: "マヨネーズ" , image: false},
    { value: "塩コショウ" , image: false},
    { value: "とんかつソース" , image: false},
    { value: "Others" , image: false}
    ]
  },
  {
    question: '根岸PNとご飯に行くなら?',
    answers: [
      { value: "お寿司" , image: false},
    { value: "バー" , image: false},
    { value: "居酒屋" , image: false},
    { value: "イタリアン" , image: false},
    { value: "フレンチ" , image: false},
    { value: "懐石" , image: false},
    { value: "Others" , image: false}
    ]
  },
  {
    question: '私用のPC・スマホ・タブレットあわせて何台持ってる?',
    answers: [
      { value: "1台" , image: false},
    { value: "2台" , image: false},
    { value: "3台" , image: false},
    { value: "4台" , image: false},
    { value: "5台" , image: false},
    { value: "6台" , image: false},
    { value: "7台" , image: false},
    { value: "8台" , image: false},
    { value: "9台" , image: false},
    { value: "10台" , image: false},
    { value: "10台以上" , image: false}
    ]
  },
  {
    question: '藤PNが飼っているペットは?',
    answers: [
      { value: "犬" , image: false},
    { value: "猫" , image: false},
    { value: "鳥" , image: false},
    { value: "魚" , image: false},
    { value: "ハムスター" , image: false},
    { value: "カメ" , image: false},
    { value: "ハリネズミ" , image: false},
    { value: "ヘビ" , image: false},
    { value: "ウサギ" , image: false}
    ]
  },
  {
    question: '好きな業界は?',
    answers: [
      { value: "メーカー" , image: false},
    { value: "小売" , image: false},
    { value: "サービス" , image: false},
    { value: "ソフトウェア・通信" , image: false},
    { value: "商社" , image: false},
    { value: "金融" , image: false},
    { value: "マスコミ" , image: false},
    { value: "官公庁" , image: false},
    { value: "Others" , image: false}
    ]
  },
  {
    question: '学生時代やっていた部活は？',
    answers: [
      { value: "武道系（剣道など）" , image: false},
    { value: "球技系（野球など）" , image: false},
    { value: "非球技系（陸上など）" , image: false},
    { value: "音楽系（吹奏楽など）" , image: false},
    { value: "文科系" , image: false},
    { value: "芸術系" , image: false},
    { value: "帰宅部" , image: false}
    ]
  }
]

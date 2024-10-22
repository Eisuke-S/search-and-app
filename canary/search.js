var input = document.getElementById("input");//必須
var button = document.getElementById("button");//必須
var startBtn = document.getElementById("start-btn");




const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'ja-JP';
recognition.continuous = true;
recognition.interimResults = true;

let isRecognizing = false;  // 音声認識が動作中かどうかを示すフラグ
let timeout;  // 自動停止のためのタイマー

recognition.onresult = function(event) {
    clearTimeout(timeout);  // 結果を受け取ったらタイマーをクリア
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
            transcript += event.results[i][0].transcript;
        } else {
            transcript += event.results[i][0].transcript + ' ';
        }
    }
    input.value = transcript.trim();

    // 2秒後に自動的に認識を停止する処理
    timeout = setTimeout(function() {
        recognition.stop();
        isRecognizing = false;
        startBtn.style.animation = 'none';  // アニメーションを停止
        
        // 音声認識が自動停止した場合の処理
        var buttonurl = button.dataset.url;
        var buttonafterurl = button.dataset.afterUrl;
        var query = input.value;
        sessionStorage.setItem('inputText', '');
        input.value = "";
        var url = buttonurl + query + buttonafterurl;
        
        window.open(url, "_blank");

        // データをセッションストレージに保存する
        sessionStorage.setItem('inputText', query);
    }, 2000);
};



// 音声認識が停止されたときの処理（手動/自動両方）
recognition.onend = function() {
    if (!isRecognizing) {
        startBtn.style.animation = 'none';  // 自動停止時にアニメーションを停止
    }
};

function addParagraph() {
    // 入力フィールドからテキストを取得
    var history_place = document.getElementById("history_place");
    var text = input.value;
    if (text === "") {
      return;
    }
    // 新しいpタグを作成し、テキストを設定
    historyElement = document.createElement("p");
    historyElement.innerText = text;
    // pタグにクラスを追加
    historyElement.classList.add("history");
    // 新しいボタンタグを作成
    var history_btn = document.createElement("button");
    history_btn.setAttribute("id", "history_btn");
    // 新しいダイブタグを作成
    var history_box = document.createElement("div");
    history_box.setAttribute("id", "history_box");
    history_box.classList.add("history-box");
    var history_box_2 = document.createElement("div");
    history_box_2.setAttribute("id", "history_box_2");
    // pタグとボタンタグをダイブタグの中にまとめる
    var history_place = document.getElementById("history_place");
    var firstChild = history_place.firstChild; // 既存の最初の子要素を取得
    history_place.insertBefore(history_box_2, firstChild);
    history_box_2.appendChild(history_box);
    history_box.appendChild(historyElement);
    history_box.appendChild(history_btn);
    var history_btn_img = document.createElement("img");
    history_btn_img.setAttribute("src", "images/button/history_btn.webp");
    history_btn_img.setAttribute("id", "history_btn_img");
    history_btn.appendChild(history_btn_img);
    // ボタンがクリックされたときの動作を設定
    history_btn.onclick = function() {
        // ボタンが含まれるダイブタグを取得
        var parentDiv = this.parentElement;
        // ダイブタグ内のpタグの内容を取得
        var paragraphContent = parentDiv.querySelector("p").innerText;
        input.value = "";
        // インプットタグにpタグの内容を書き加える
        document.getElementById("input").value += paragraphContent;
    };   
    var history_Color = getCookie('history_color');
    if (history_Color !== null && history_Color !== "") {
      var history_box = document.querySelectorAll('.history-box');
      history_box.forEach(function(history_box) {
        historyElement.style.color = history_Color;
      });  
    }
    history_boxes = document.querySelectorAll('.history-box');
    var historystyle = localStorage.getItem('history_mode');
    if (historystyle !== null && historystyle !== "") {
      history_boxes.forEach(function(history_box_iteam) {
        history_box_iteam.style.display = historystyle;
      });  
    } 
}
document.addEventListener('DOMContentLoaded', function() {
    var buttons = document.querySelectorAll('button');
    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            if (this.id === 'clear') {
                input.blur(); 
                input.value = "";
                sessionStorage.setItem('inputText', '');
            } else if (this.id === 'myBtn') {
                btn.style.animation = 'zoomout 0.3s ease-in-out forwards';
                setTimeout(function() {
                    modal.style.display = "block";
                    modal.style.animation = 'fadein 0.3s ease-in-out forwards';
                    modalContent.style.display = "block";
                    modalContent.style.animation = "fadein 0.3s ease-in-out forwards";
                }, 300);
            } else if (this.id === 'settingbtn') {
                settingbtn.style.animation = 'zoomout 0.3s ease-in-out forwards';
                setTimeout(function() {
                    setting.style.display = "block";
                    setting.style.animation = 'fadein 0.3s ease-in-out forwards';
                    settingContent.style.display = "block";
                    settingContent.style.animation = 'fadein 0.3s ease-in-out forwards';
                }, 300);
            } else if (this.id === 'start-btn') {
                if (isRecognizing) {
                    // 音声認識が動作中の場合、停止する
                    recognition.stop();
                    clearTimeout(timeout);  // 手動停止時にタイマーをクリア
                    isRecognizing = false;
                    startBtn.style.animation = 'none';  // アニメーションを停止
                } else {
                    // 音声認識が停止している場合、開始する
                    recognition.start();
                    isRecognizing = true;
                    startBtn.style.animation = 'poyopoyo 0.3s infinite'; // アニメーションを実行
                }
            } else if (this.id === 'a-note') {
                var unitNumber = unit.value;
                window.open("https://douga.sing.co.jp/tyu/engwork/tosho-noteHA/3nen/unit" + unitNumber, "_blank");
            } else {
                addParagraph();
                var buttonurl = this.dataset.url;
                var buttonafterurl = this.dataset.afterUrl;
                var query = input.value;
                sessionStorage.setItem('inputText', '');
                input.value = "";
                var url = buttonurl + query + buttonafterurl;
                window.open(url, "_blank");
            }
        });
    });
});
input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // デフォルトのEnterキーの挙動を無効化
      addParagraph()
      var buttonurl = button.dataset.url;
      var buttonafterurl = button.dataset.afterUrl;
      var query = input.value;
      sessionStorage.setItem('inputText', '');
      input.value = "";
      var url = buttonurl + query + buttonafterurl;
      
      window.open(url, "_blank");
    }
    // データをセッションストレージに保存する
    var text = input.value;
    sessionStorage.setItem('inputText', text);
  });
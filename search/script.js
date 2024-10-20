var input = document.getElementById("input");//必須
var button = document.getElementById("button");//必須
var aiButton = document.getElementById("ai");
var clear = document.getElementById("clear");
var photo = document.getElementById("photo");
var body = document.getElementById("body");//必須
var selectElement = document.getElementById("background-image");
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
var line = document.getElementById("line");
var line_1 = document.getElementById("line_1");
var line_2 = document.getElementById("line_2");
var historyElement; // グローバルスコープで定義
var setting = document.getElementById("setting");
var settingbtn = document.getElementById("settingbtn");
var settingContent = document.getElementById("setting-content");
var modalContent = document.getElementById("modal-content"); 
var historycolor = document.getElementById("historycolor");
var searchengine = document.getElementById("searchengine");
var startBtn = document.getElementById("start-btn");
var historymode = document.getElementById("historymode");
var fileInput = document.getElementById('image-upload');
var unit = document.getElementById("unit");
var aNote = document.getElementById("a-note");
var outsideInput = document.getElementById("outside-input");
var bigInput = document.getElementById("biginput");
var prvDiv = document.getElementById("prv-div");
var prvback = document.getElementById("prvback");
var prvchild = prvDiv.children;
var prvurl = document.getElementById("prvurl");
var prvPage = document.getElementById("prvPage");
var prvsetting = document.getElementById("prvsetting");
var urlfileinput = document.getElementById("urlfileinput");
var currentHeight = window.getComputedStyle(input).height;
let history_boxes;
//// クッキーを設定する関数
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
// クッキーから値を取得する関数
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function loadingData() {
  var imageUrl = localStorage.getItem('background_image');
  if (imageUrl !== null && imageUrl !== "") {
    body.style.backgroundImage = "url('" + imageUrl + "')";
  }
  var imageaspectRatio = localStorage.getItem('backgroundaspectRatio');
  if (imageaspectRatio == '1') {
    body.style.backgroundSize = "auto 100%"
  }
  if (imageaspectRatio == '2') {
    body.style.backgroundSize = "100% auto"
  }
  var textstorage = sessionStorage.getItem('inputText');
  if (textstorage !== null && textstorage !== "") {
    input.value = textstorage;
  }
  var searchEngine = getCookie('search_engine');
  if (searchEngine !== null && searchEngine !== "") {
    var searchButton = document.getElementById('button');
    // ボタンのdata-url属性を選択された検索エンジンのURLに変更
    searchButton.setAttribute('data-url', searchEngine);
  }
  var prvweblink = localStorage.getItem('prvsettingweburl');
  if (prvweblink !== null && prvweblink !== "") {
    prvPage.src = prvweblink;
  }
  var unitnumber = localStorage.getItem('unit_number');
  if (unitnumber !== null && unitnumber !== "") {
    unit.value = unitnumber;
  }
  
};
// 背景画像と縦横比を更新する関数
function updateBackgroundSize() {
  var imageUrl = localStorage.getItem('background_image');
  if (imageUrl !== null && imageUrl !== "") {
    body.style.backgroundImage = "url('" + imageUrl + "')";
  }

  var BackgroundaspectRatio = localStorage.getItem('backgroundaspectRatio');
  if (BackgroundaspectRatio) {
    const img = new Image();
    img.src = imageUrl;
    img.onload = function() {
      const imgWidth = img.width;
      const imgHeight = img.height;
      const imgAspectRatio = imgWidth / imgHeight;
      
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const screenAspectRatio = screenWidth / screenHeight;

      if (imgAspectRatio > screenAspectRatio) {
        body.style.backgroundSize = 'auto 100%';
        localStorage.setItem('backgroundaspectRatio', "1");
      } else {
        body.style.backgroundSize = '100% auto';
        localStorage.setItem('backgroundaspectRatio', "2");
      }
    };
  }
}

// ページ読み込み時に背景サイズを更新
window.addEventListener('load', function() {
  var loadingScreen = document.getElementById('loading-screen');
  loadingScreen.style.animation = 'fadeout 1s ease-in-out forwards';
  setTimeout(function() {
    loadingScreen.style.display = 'none';
    updateInputHeight();
    updateBackgroundSize(); // 背景サイズの初期更新
  }, 1000); // 1秒後に実行
});

// 画面サイズ変更や向き変更時に背景サイズを更新
window.addEventListener('resize', updateBackgroundSize);
window.addEventListener('orientationchange', updateBackgroundSize);

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'ja-JP';
recognition.continuous = true;
recognition.interimResults = true;

let timeout;

recognition.onresult = function(event) {
    clearTimeout(timeout);
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
            transcript += event.results[i][0].transcript;
        } else {
            transcript += event.results[i][0].transcript + ' ';
        }
    }
    input.value = transcript.trim();
    timeout = setTimeout(function() {
        recognition.stop();
        startBtn.style.animation = 'none';
        button.click();
    }, 2000);
};


// ページが読み込まれたら、ローディング画面をけし、データ、音声認識機能を読み込む
window.addEventListener('load', function() {
  var loadingScreen = document.getElementById('loading-screen');
  loadingScreen.style.animation = 'fadeout 1s ease-in-out forwards';
  setTimeout(function() {
    loadingScreen.style.display = 'none';
    // ページ読み込み後の追加の処理をここに記述する
    updateInput()
    
  }, 1000); // 1秒後に実行
  loadingData()
});



function updateInput() {
  // フォーカスイベントの設定
  input.addEventListener('focus', function() {
    input.classList.remove('input-box');
    input.classList.add('modified-input');
    bigInput.classList.add("modified-biginput");
    bigInput.classList.remove("biginput");
    outsideInput.style.display = "block";
    input.placeholder = "meet the internet again.";
     // クラス名が 'bidsearch' の要素をすべて取得
    var bigsearchbtn = document.querySelectorAll(".bidsearch");

    // すべての要素に対して透明度を設定
    bigsearchbtn.forEach(function(searchbtn) {  
      bigsearchbtn.style.opacity = "0"; // 50%透明にする
    });
  });

  input.addEventListener('blur', function() {
    hideinput()
  });

  // タッチイベントの設定
  input.addEventListener('touchstart', function() {
    input.classList.remove('input-box');
    input.classList.add('modified-input');
    bigInput.classList.add("modified-biginput");
    bigInput.classList.remove("biginput");
    outsideInput.style.display = "block";
    input.placeholder = "meet the internet again.";
     // クラス名が 'bidsearch' の要素をすべて取得
    var bigsearchbtn = document.querySelectorAll(".bidsearch");

    // すべての要素に対して透明度を設定
    bigsearchbtn.forEach(function(searchbtn) {  
      bigsearchbtn.style.opacity = "0"; // 50%透明にする
    });

  });

  // タッチが終了またはキャンセルされた時の処理
  document.addEventListener('touchend', function(event) {
    if (event.target !== input) {
      hideinput()
    }
  });

  document.addEventListener('touchcancel', function(event) {
    if (event.target !== input) {
      hideinput()
    }
  });
}


function hideinput() {
  input.classList.remove('modified-input');
  bigInput.classList.remove("modified-biginput");
  bigInput.classList.add("biginput");
  outsideInput.style.display = "none";
  input.classList.add('input-box');
  input.placeholder = "";
  // ここに処理を書く
  // クラス名が 'bidsearch' の要素をすべて取得
  var bigsearchbtn = document.querySelectorAll(".bidsearch");

  // すべての要素に対して透明度を設定
  bigsearchbtn.forEach(function(searchbtn) {  
    bigsearchbtn.style.opacity = "1"; // 50%透明にする
  });
}

outsideInput.addEventListener('click', hideinput);
outsideInput.addEventListener('touchstart', hideinput);



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


// いずれかのボタンが押されたときの処理
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
                  // 1秒後に実行したいコードをここに記述する
                }, 300);
            } else if (this.id === 'settingbtn') {
                settingbtn.style.animation = 'zoomout 0.3s ease-in-out forwards';
                setTimeout(function() {
                  setting.style.display = "block";
                  setting.style.animation = 'fadein 0.3s ease-in-out forwards';
                  settingContent.style.display = "block";
                  settingContent.style.animation = 'fadein 0.3s ease-in-out forwards';
                  // 1秒後に実行したいコードをここに記述する
                }, 300);
            } else if (this.id === 'start-btn') {
                recognition.start(); // 音声認識を開始する
                startBtn.style.animation = 'poyopoyo 0.3s infinite'; // 音声認識が実行されるときにアニメーションを再生する
            } else if (this.id === 'a-note') {
                var unitNumber = unit.value;
                window.open("https://douga.sing.co.jp/tyu/engwork/tosho-noteHA/3nen/unit" + unitNumber, "_blank");
              
            }else {
                addParagraph()
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
//ポップアップ
function hidecontent() {
  btn.style.animation = 'zoomin 0.3s ease-in-out forwards'; 
  modal.style.animation = 'fadeout 0.3s ease-in-out forwards';
  modalContent.style.animation = 'fadeout 0.3s ease-in-out forwards';
  setTimeout(function() {
    modal.style.display = "none";
    modalContent.style.display = "none";
    return;                  
  }, 300); 
};
function hidesettingcontent() {
  settingbtn.style.animation = 'zoomin 0.3s ease-in-out forwards'; 
  setting.style.animation = 'fadeout 0.3s ease-in-out forwards';
  settingContent.style.animation = 'fadeout 0.3s ease-in-out forwards';
  setTimeout(function() {
    setting.style.display = "none";
    settingContent.style.display = "none";                  
  }, 300); 
};

setting.addEventListener('click', hidesettingcontent);
setting.addEventListener('touchstart', hidesettingcontent);
modal.addEventListener('click', hidecontent);
modal.addEventListener('touchstart', hidecontent);


//設定
unit.addEventListener('keydown', function() {
  var unitNumber = unit.value;
  localStorage.setItem('unit_number',unitNumber);
});
selectElement.addEventListener('change', () => {
  // 現在選択されているオプションの値を取得
  var selectedValue = selectElement.value;
  // 背景画像を変更します
  body.style.backgroundImage = "url('" + selectedValue + "')";
  // クッキーに背景画像のURLを設定
  localStorage.setItem('background_image', selectedValue);
});

// ファイル選択時の処理
fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
          const imageUrl = event.target.result;
          setBackgroundImage(imageUrl);
      };
      reader.readAsDataURL(file);
  }
});

// URL入力ボタンがクリックされた時
urlfileinput.addEventListener('keydown', () => {
  const imageUrl = urlfileinput.value;
  if (imageUrl) {
      setBackgroundImage(imageUrl);
  }
});

// 背景画像を設定する関数
function setBackgroundImage(imageUrl) {
    // 背景画像を設定
    body.style.backgroundImage = `url('${imageUrl}')`;
    
    // 画像の縦横比を計算
    const img = new Image();
    img.onload = function() {
        const imgWidth = img.width;
        const imgHeight = img.height;
        const imgAspectRatio = imgWidth / imgHeight;
        
        // 画面の縦横比を計算
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const screenAspectRatio = screenWidth / screenHeight;

        // 縦横比を比較し、画像の方が縦長であればbackground-sizeをauto 100%に設定
        if (imgAspectRatio > screenAspectRatio) {
            body.style.backgroundSize = 'auto 100%';
            localStorage.setItem('backgroundaspectRatio' , '1');
        } else {
            body.style.backgroundSize = '100% auto';
            localStorage.setItem('backgroundaspectRatio' , '2');
        }

        // 画像のURLをローカルストレージに保存
        localStorage.setItem('background_image', imageUrl);
    };
    img.src = imageUrl;
}


// セレクトボックスの要素を取得
var searchEngineSelect = document.getElementById('searchengine');
// セレクトボックスの値が変更されたときのイベントリスナーを追加
searchEngineSelect.addEventListener('change', function() {
    // 選択された検索エンジンのURLを取得
    var selectedOption = searchEngineSelect.options[searchEngineSelect.selectedIndex];
    var searchUrl = selectedOption.getAttribute('data-url');
    // ボタン要素を取得
    var searchButton = document.getElementById('button');
    // ボタンのdata-url属性を選択された検索エンジンのURLに変更
    searchButton.setAttribute('data-url', searchUrl);
    setCookie('search_engine', searchUrl, 30); 
});
historycolor.addEventListener('input', function() {
  var historyElements = document.querySelectorAll('.history');
  var selectedHistoryColor = historycolor.value;
  setCookie('history_color', selectedHistoryColor, 30);  
  historyElements.forEach(function(historyElement) {
    historyElement.style.color = selectedHistoryColor;
  });
});
prvsetting.addEventListener('keydown', function() {
  var prvsettingurl = prvsetting.value;

  localStorage.setItem('prvsettingweburl', prvsettingurl);  
  prvPage.src = prvsettingurl;
});
historymode.addEventListener('change', function() {
  var mode = historymode.value;
  if (mode === 'display') {
    history_boxes.forEach(function(history_box_iteam) {
      history_box_iteam.style.display = "flex";
      localStorage.setItem('history_mode' , 'flex');
    });
  } else if (mode === 'none') {
    history_boxes.forEach(function(history_box_iteam) {
      history_box_iteam.style.display = "none";
      localStorage.setItem('history_mode' , 'none');
    }); 
  } else if (mode === 'clear') {
    // 履歴要素をすべて削除する
    history_boxes.forEach(function(history_box_iteam) {
      history_box_iteam.remove();
    });
  }
}); 

function displayprv() {
  prvDiv.style.animation = "up 0.3s ease-in-out forwards";
  prvback.style.display = "block";  
  prvback.style.animation = 'fadein 0.3s ease-in-out forwards';
  setTimeout(function() {
    prvDiv.style.height = "90vh";
  }, 300);
  for (var i = 0; i < prvchild.length; i++) {
    prvchild[i].style.display = "block"; // すべての子要素を表示にする
  }
};
function hideprv() {
  prvDiv.style.animation = "down 0.3s ease-in-out forwards";
  prvback.style.animation = 'fadeout 0.3s ease-in-out forwards';
  prvDiv.style.animation = "down 0.3s ease-in-out forwards";
  setTimeout(function() {
    prvback.style.display = "none";
    prvDiv.style.height = "5vh";
  }, 300);
  for (var i = 0; i < prvchild.length; i++) {
    prvchild[i].style.display = "none"; // すべての子要素を非表示にする
  }
  
};
prvDiv.addEventListener('click', displayprv);
prvDiv.addEventListener('touchstart', displayprv);
prvback.addEventListener('click', hideprv)
prvback.addEventListener('touch', hideprv)
prvurl.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    prvlink = prvurl.value;
    prvPage.src = prvlink;
  }
});

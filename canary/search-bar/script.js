// 親要素を取得
const buttonContainer = document.querySelector('.button-container');

// 親要素内のクリックイベントを処理
buttonContainer.addEventListener('click', function(event) {
  // クリックされた要素がボタンかどうかを確認（ボタンまたはその子要素）
  const clickedButton = event.target.closest('button'); // 最も近いbutton要素を取得

  if (clickedButton) {
    // 押されたボタンのdata-input-field属性を取得
    const dataInputField = clickedButton.getAttribute('data-input-field');
    
    // すでに開いている入力フィールドがあれば、それを閉じる
    const openInputField = document.querySelector('.input-field');
    if (openInputField && openInputField !== document.getElementById(dataInputField)) {
      openInputField.classList.remove('input-field');
      openInputField.classList.add('hidden');
      const openButton = buttonContainer.querySelector(`[data-input-field="${openInputField.id}"]`);
      openButton.classList.remove('hidden');
    }
    
    // 対応するinputフィールドを取得
    const inputField = document.getElementById(dataInputField);
    
    // inputフィールドを表示
    inputField.classList.remove('hidden');
    inputField.classList.add('input-field');
    
    // ボタンを非表示
    clickedButton.classList.add('hidden');
    
    // inputフィールドにフォーカスを設定
    inputField.focus();
  }
});

// 各inputフィールドにblurイベントを追加（フォーカスが外れた時にボタンを再表示）
const inputFields = document.querySelectorAll('.input-field');

inputFields.forEach(inputField => {
  inputField.addEventListener('blur', function() {
    // inputフィールドを非表示に
    inputField.classList.remove('input-field');
    inputField.classList.add('hidden');
    
    // 対応するボタンを再表示
    const button = buttonContainer.querySelector(`[data-input-field="${inputField.id}"]`);
    button.classList.remove('hidden');
  });
});


document.getElementById("search-field").addEventListener("keydown", function(event) {
  // エンターキーが押されたとき
  if (event.key === "Enter") {
      const query = this.value.trim(); // 入力値を取得し、余分な空白を削除
      if (query) {
          const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
          const newTab = window.open("about:blank", "_blank"); // about:blank で新しいタブを開く
          newTab.location.href = googleUrl; // 新しいタブでGoogle検索結果を表示
      }
  }
});

document.getElementById("video-field").addEventListener("keydown", function(event) {
  // エンターキーが押されたとき
  if (event.key === "Enter") {
      const query = this.value.trim(); // 入力値を取得し、余分な空白を削除
      if (query) {
          const youtubeUrl = `https://youtube.com/search?q=${encodeURIComponent(query)}`;
          const newTab = window.open("about:blank", "_blank"); // about:blank で新しいタブを開く
          newTab.location.href = youtubeUrl; // 新しいタブでGoogle検索結果を表示
      }
  }
});

document.getElementById("translate-field").addEventListener("keydown", function(event) {
  // エンターキーが押されたとき
  if (event.key === "Enter") {
      const query = this.value.trim(); // 入力値を取得し、余分な空白を削除
      if (query) {
          const chatgptUrl = `https://chatgpt.com/?q="${encodeURIComponent(query)}"を翻訳してください`;
          const newTab = window.open("about:blank", "_blank"); // about:blank で新しいタブを開く
          newTab.location.href = chatgptUrl; // 新しいタブでGoogle検索結果を表示
      }
  }
});
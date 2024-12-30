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

// DOMが完全に読み込まれてから実行
document.addEventListener('DOMContentLoaded', function() {
  // ページ読み込み時に選択された検索エンジンを復元
  const savedSearchEngine = localStorage.getItem('searchEngine');
  if (savedSearchEngine) {
    // localStorageから取得したURLを選択肢に反映
    document.getElementById('search-engine').value = savedSearchEngine;
  }

  // 検索エンジンが変更されたときにlocalStorageに保存
  document.getElementById('search-engine').addEventListener('change', function() {
    localStorage.setItem('searchEngine', this.value); // 変更された値を保存
  });

  // 検索フィールドでエンターキーが押されたときに検索を実行
  document.getElementById("search-field").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      const query = this.value.trim(); // 入力値を取得し、余分な空白を削除
      if (query) {
        const searchEngineUrl = document.getElementById('search-engine').value; // 選択されている検索エンジンのURLを取得
        const searchUrl = `${searchEngineUrl}${encodeURIComponent(query)}`; // 検索URLを作成
        window.open(searchUrl, '_blank'); // 新しいタブで検索結果を表示
      }
    }
  });
});

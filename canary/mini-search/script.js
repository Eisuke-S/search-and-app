var input = document.getElementById("input");
var button = document.getElementById("button");

// 検索機能
function search() {
  var query = input.value.trim();
  if (query) {
    var searchUrl = "https://google.com/search?q=" + query;
    window.open(searchUrl, "_blank");
  }
}

// ボタンクリックで検索
button.addEventListener('click', search);

// エンターキーで検索
input.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // デフォルトのEnterキーの挙動を無効化
    search(); // 検索実行
  }
});

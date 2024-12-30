//クッキーを設定する関数
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
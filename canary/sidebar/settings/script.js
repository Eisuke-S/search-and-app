const themeColorPicker = document.getElementById('theme-color'); // テーマカラーのinput要素を取得
themeColorPicker.addEventListener('input', () => {
    const themeColor = themeColorPicker.value; // ユーザーが選んだ色を取得
    localStorage.setItem('themeColor', themeColor); // ローカルストレージに保存
    document.documentElement.style.setProperty('--light-main-color', themeColor); // CSS変数を変更
});
const darkThemeColorPicker = document.getElementById('dark-theme-color'); // テーマカラーのinput要素を取得
darkThemeColorPicker.addEventListener('input', () => {
    const darkthemeColor = darkThemeColorPicker.value; // ユーザーが選んだ色を取得
    localStorage.setItem('darkthemeColor', darkthemeColor); // ローカルストレージに保存
    document.documentElement.style.setProperty('--dark-main-color', darkthemeColor); // CSS変数を変更
});
const lightSvgColorPicker = document.getElementById('light-svg-color'); // テーマカラーのinput要素を取得
lightSvgColorPicker.addEventListener('input', () => {
    const lightsvgColor = lightSvgColorPicker.value; // ユーザーが選んだ色を取得
    localStorage.setItem('lightSvgColor', lightsvgColor); // ローカルストレージに保存
    document.documentElement.style.setProperty('--light-svg-color', lightsvgColor); // CSS変数を変更
});

const darkSvgColorPicker = document.getElementById('dark-svg-color'); // テーマカラーのinput要素を取得
darkSvgColorPicker.addEventListener('input', () => {
    const darksvgColor = darkSvgColorPicker.value; // ユーザーが選んだ色を取得
    localStorage.setItem('darkSvgColor', darksvgColor); // ローカルストレージに保存
    document.documentElement.style.setProperty('--dark-svg-color', darksvgColor); // CSS変数を変更
});

const backgroundFileInput = document.getElementById("upload-background");
backgroundFileInput.addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const fileData = e.target.result;
  
        // bodyの背景画像として設定
        body.style.backgroundImage = `url(${fileData})`;
  
        // ローカルストレージに保存
        localStorage.setItem("backgroundImage", fileData);
      };
      reader.readAsDataURL(file);
    }
});

const backgroundurl = document.getElementById("upload-background-url");
backgroundurl.addEventListener("keydown", function() {
    const url = backgroundurl.value;
    body.style.backgroundImage = `url(${url})`;
    localStorage.setItem("backgroundImage", url);
});





// ページ読み込み時にローカルストレージから色を読み込み、適用
window.addEventListener('load', function() {
    const themeColor = localStorage.getItem('themeColor');
    if (themeColor) {
        themeColorPicker.value = themeColor; // 保存されている色を適用
        document.documentElement.style.setProperty('--light-main-color', themeColor); // CSS変数を変更
    }
    const darkthemeColor = localStorage.getItem('darkthemeColor');
    if (darkthemeColor) {
        darkThemeColorPicker.value = darkthemeColor; // 保存されている色を適用
        document.documentElement.style.setProperty('--dark-main-color', darkthemeColor); 
    }
    const lightsvgColor = localStorage.getItem('lightSvgColor');
    if (lightsvgColor) {
        lightSvgColorPicker.value = lightsvgColor; // 保存されている色を適用
        document.documentElement.style.setProperty('--light-svg-color', lightsvgColor); 
    }
    const darksvgColor = localStorage.getItem('darkSvgColor');
    if (darksvgColor) {
        darkSvgColorPicker.value = darksvgColor; // 保存されている色を適用
        document.documentElement.style.setProperty('--dark-svg-color', darksvgColor); 
    }
    const savedBackground = localStorage.getItem("backgroundImage");
    if (savedBackground) {
      body.style.backgroundImage = `url(${savedBackground})`;
    }
});
const resetButton = document.getElementById('clear-strage');
resetButton.addEventListener('click', function() {
    const excludeKey = 'speedDials'; // 残したいキー]
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        // 特定のキー以外を削除
        if (key !== excludeKey) {
            localStorage.removeItem(key);
        }
    }
    location.reload(true);
});

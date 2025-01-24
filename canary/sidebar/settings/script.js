const themeColorPicker = document.getElementById('theme-color'); // テーマカラーのinput要素を取得
themeColorPicker.addEventListener('input', () => {
    const themeColor = themeColorPicker.value; // ユーザーが選んだ色を取得
    localStorage.setItem('lightMainColor', themeColor); // ローカルストレージに保存
    document.documentElement.style.setProperty('--light-main-color', themeColor); // CSS変数を変更
});
const darkThemeColorPicker = document.getElementById('dark-theme-color'); // テーマカラーのinput要素を取得
darkThemeColorPicker.addEventListener('input', () => {
    const darkthemeColor = darkThemeColorPicker.value; // ユーザーが選んだ色を取得
    localStorage.setItem('darkMainColor', darkthemeColor); // ローカルストレージに保存
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
//設定を適用
const backgroundurl = document.getElementById("upload-background-url");
backgroundurl.addEventListener("keydown", function() {
    const url = backgroundurl.value;
    body.style.backgroundImage = `url(${url})`;
    localStorage.setItem("backgroundImage", url);
});

const themeColor = localStorage.getItem('lightMainColor');
if (themeColor) {
    themeColorPicker.value = themeColor; // 保存されている色を適用
    document.documentElement.style.setProperty('--light-main-color', themeColor); // CSS変数を変更
}

const darkthemeColor = localStorage.getItem('darkMainColor');
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


//以下ダークテーマの適用

const root = document.documentElement;
// それぞれのカスタムプロパティの値を取得
const darkBackground = getComputedStyle(root).getPropertyValue('--dark-background').trim();
saveToLocalStorage('darkBackground', darkBackground);
const darkMainColor = getComputedStyle(root).getPropertyValue('--dark-main-color').trim();
saveToLocalStorage('darkMainColor', darkMainColor);
const darkColor = getComputedStyle(root).getPropertyValue('--dark-color').trim();
saveToLocalStorage('darkColor', darkColor);
const darkSvgColor = getComputedStyle(root).getPropertyValue('--dark-svg-color').trim();
saveToLocalStorage('darkSvgColor', darkSvgColor);
const darkItemColor = getComputedStyle(root).getPropertyValue('--dark-item-color').trim();
saveToLocalStorage('darkItemColor', darkItemColor);

const lightBackground = getComputedStyle(root).getPropertyValue('--light-background').trim();
saveToLocalStorage('lightBackground', lightBackground);
const lightMainColor = getComputedStyle(root).getPropertyValue('--light-main-color').trim();
saveToLocalStorage('lightMainColor', lightMainColor);
const lightColor = getComputedStyle(root).getPropertyValue('--light-color').trim();
saveToLocalStorage('lightColor', lightColor);
const lightSvgColor = getComputedStyle(root).getPropertyValue('--light-svg-color').trim();
saveToLocalStorage('lightSvgColor', lightSvgColor);
const lightItemColor = getComputedStyle(root).getPropertyValue('--light-item-color').trim();
saveToLocalStorage('lightItemColor', lightItemColor);

// ルート要素からカスタムプロパティの値を取得して保存する関数
function saveToLocalStorage(label, value) {
    if (!localStorage.getItem(label)) {  // すでに保存されていない場合に保存
        localStorage.setItem(label, value);
    }
}
// ラジオボタンの変更を監視
const radioButtons = document.querySelectorAll('input[name="theme"]');
radioButtons.forEach(radio => {
  radio.addEventListener('change', () => {
    const theme = document.querySelector('input[name="theme"]:checked').value;;
    localStorage.setItem('theme', theme);
    if (theme === 'light') {
        localStorage.getItem('lightBackground', lightBackground);
        localStorage.getItem('lightMainColor', lightMainColor);
        localStorage.getItem('lightColor', lightColor);
        localStorage.getItem('lightSvgColor', lightSvgColor);
        localStorage.getItem('lightItemColor', lightItemColor);

        root.style.setProperty('--dark-background', lightBackground);
        root.style.setProperty('--dark-main-color', lightMainColor);
        root.style.setProperty('--dark-color', lightColor);
        root.style.setProperty('--dark-svg-color', lightSvgColor);
        root.style.setProperty('--dark-item-color', lightItemColor);
        root.style.setProperty('--light-background', lightBackground);
        root.style.setProperty('--light-main-color', lightMainColor);
        root.style.setProperty('--light-color', lightColor);
        root.style.setProperty('--light-svg-color', lightSvgColor);
        root.style.setProperty('--light-item-color', lightItemColor);
    }
    if (theme === 'dark') {
        localStorage.getItem('darkBackground', darkBackground);
        localStorage.getItem('darkMainColor', darkMainColor);
        localStorage.getItem('darkColor', darkColor);
        localStorage.getItem('darkSvgColor', darkSvgColor);
        localStorage.getItem('darkItemColor', darkItemColor);

        root.style.setProperty('--dark-background', darkBackground);
        root.style.setProperty('--dark-main-color', darkMainColor);
        root.style.setProperty('--dark-color', darkColor);
        root.style.setProperty('--dark-svg-color', darkSvgColor);
        root.style.setProperty('--dark-item-color', darkItemColor);
        root.style.setProperty('--light-background', darkBackground);
        root.style.setProperty('--light-main-color', darkMainColor);
        root.style.setProperty('--light-color', darkColor);
        root.style.setProperty('--light-svg-color', darkSvgColor);
        root.style.setProperty('--light-item-color', darkItemColor);
    }
    if (theme === 'auto') {
        localStorage.getItem('darkBackground', darkBackground);
        localStorage.getItem('darkMainColor', darkMainColor);
        localStorage.getItem('darkColor', darkColor);
        localStorage.getItem('darkSvgColor', darkSvgColor);
        localStorage.getItem('darkItemColor', darkItemColor);
        localStorage.getItem('lightBackground', lightBackground);
        localStorage.getItem('lightMainColor', lightMainColor);
        localStorage.getItem('lightColor', lightColor);
        localStorage.getItem('lightSvgColor', lightSvgColor);
        localStorage.getItem('lightItemColor', lightItemColor);

        root.style.setProperty('--dark-background', darkBackground);
        root.style.setProperty('--dark-main-color', darkMainColor);
        root.style.setProperty('--dark-color', darkColor);
        root.style.setProperty('--dark-svg-color', darkSvgColor);
        root.style.setProperty('--dark-item-color', darkItemColor);
        root.style.setProperty('--light-background', lightBackground);
        root.style.setProperty('--light-main-color', lightMainColor);
        root.style.setProperty('--light-color', lightColor);
        root.style.setProperty('--light-svg-color', lightSvgColor);
        root.style.setProperty('--light-item-color', lightItemColor);
        
    }
  });
});
// ページ読み込み時に保存されているテーマを適用
const theme = localStorage.getItem('theme');
if (theme) {
    if (theme === 'light') {
        // "ライト"テーマを選択
        document.querySelector('input[type="radio"][name="theme"][value="light"]').checked = true;

        localStorage.getItem('lightBackground', lightBackground);
        localStorage.getItem('lightMainColor', lightMainColor);
        localStorage.getItem('lightColor', lightColor);
        localStorage.getItem('lightSvgColor', lightSvgColor);
        localStorage.getItem('lightItemColor', lightItemColor);

        root.style.setProperty('--dark-background', lightBackground);
        root.style.setProperty('--dark-main-color', lightMainColor);
        root.style.setProperty('--dark-color', lightColor);
        root.style.setProperty('--dark-svg-color', lightSvgColor);
        root.style.setProperty('--dark-item-color', lightItemColor);
        root.style.setProperty('--light-background', lightBackground);
        root.style.setProperty('--light-main-color', lightMainColor);
        root.style.setProperty('--light-color', lightColor);
        root.style.setProperty('--light-svg-color', lightSvgColor);
        root.style.setProperty('--light-item-color', lightItemColor);
    }
    if (theme === 'dark') {
        // "ダーク"テーマを選択
        document.querySelector('input[type="radio"][name="theme"][value="dark"]').checked = true;
        localStorage.getItem('darkBackground', darkBackground);
        localStorage.getItem('darkMainColor', darkMainColor);
        localStorage.getItem('darkColor', darkColor);
        localStorage.getItem('darkSvgColor', darkSvgColor);
        localStorage.getItem('darkItemColor', darkItemColor);

        root.style.setProperty('--dark-background', darkBackground);
        root.style.setProperty('--dark-main-color', darkMainColor);
        root.style.setProperty('--dark-color', darkColor);
        root.style.setProperty('--dark-svg-color', darkSvgColor);
        root.style.setProperty('--dark-item-color', darkItemColor);
        root.style.setProperty('--light-background', darkBackground);
        root.style.setProperty('--light-main-color', darkMainColor);
        root.style.setProperty('--light-color', darkColor);
        root.style.setProperty('--light-svg-color', darkSvgColor);
        root.style.setProperty('--light-item-color', darkItemColor);
    }
    if (theme === 'auto') {
        localStorage.getItem('darkBackground', darkBackground);
        localStorage.getItem('darkMainColor', darkMainColor);
        localStorage.getItem('darkColor', darkColor);
        localStorage.getItem('darkSvgColor', darkSvgColor);
        localStorage.getItem('darkItemColor', darkItemColor);
        localStorage.getItem('lightBackground', lightBackground);
        localStorage.getItem('lightMainColor', lightMainColor);
        localStorage.getItem('lightColor', lightColor);
        localStorage.getItem('lightSvgColor', lightSvgColor);
        localStorage.getItem('lightItemColor', lightItemColor);

        root.style.setProperty('--dark-background', darkBackground);
        root.style.setProperty('--dark-main-color', darkMainColor);
        root.style.setProperty('--dark-color', darkColor);
        root.style.setProperty('--dark-svg-color', darkSvgColor);
        root.style.setProperty('--dark-item-color', darkItemColor);
        root.style.setProperty('--light-background', lightBackground);
        root.style.setProperty('--light-main-color', lightMainColor);
        root.style.setProperty('--light-color', lightColor);
        root.style.setProperty('--light-svg-color', lightSvgColor);
        root.style.setProperty('--light-item-color', lightItemColor);
        
    }

}



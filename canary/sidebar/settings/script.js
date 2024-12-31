const themeColorPicker = document.getElementById('theme-color'); // テーマカラーのinput要素を取得

// 色が変更されるたびにローカルストレージに保存
themeColorPicker.addEventListener('input', function() {
    const themeColor = themeColorPicker.value; // ユーザーが選んだ色を取得
    localStorage.setItem('themeColor', themeColor); // ローカルストレージに保存
    changethemeColor(); // SVG
    
});

function changethemeColor() {
    // .logo クラス内のすべての要素を取得
    const logoElements = document.querySelectorAll('.logo *'); 
    logoElements.forEach(element => {
      element.style.fill = themeColorPicker.value;
    });
    changeSvgHoverColor();
    
}
// 色を変更する関数
function changeSvgHoverColor() {
    // ページ内のすべてのSVG要素を取得
    const svgs = document.querySelectorAll('svg');

    // ローカルストレージからテーマカラーを取得
    const themeColor = localStorage.getItem('themeColor');

    // テーマカラーが存在する場合に色を変更
    if (themeColor) {
        // 各SVG要素に対してhover時の色を変更
        svgs.forEach(svg => {
            const style = document.createElement('style');
            style.innerHTML = `
                svg:hover {
                    fill: ${themeColor} !important; /* ローカルストレージから取得した色を適用 */
                }
            `;
            document.head.appendChild(style);
        });
    }
}



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
        changethemeColor();
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
    location.reload();
});

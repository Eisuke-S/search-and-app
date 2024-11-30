// メニュー表示/非表示のトグル
const menuButton = document.getElementById('menu');
const menuWindow = document.getElementById('menu-window');
const menuBackground = document.getElementById('menu-window-background');

// メニューボタンがクリックされたとき
menuButton.addEventListener('click', () => {
    // アニメーション開始前に表示を変更
    menuWindow.style.display = 'block';
    menuBackground.style.display = 'block';

    // クラス追加でアニメーションを適用
    setTimeout(() => {
        menuWindow.classList.add('show');
        menuBackground.classList.add('show');
    }, 10); // 少しだけ遅らせてクラスを追加
});

// メニューバックグラウンドがクリックされたとき
menuBackground.addEventListener('click', () => {
    // 非表示にする前にアニメーションを実行
    menuWindow.classList.remove('show');
    menuBackground.classList.remove('show');

    // 非表示アニメーションのクラスを追加
    menuWindow.classList.add('hide');
    menuBackground.classList.add('hide');

    // アニメーション後にdisplayを変更
    setTimeout(() => {
        menuWindow.style.display = 'none';
        menuBackground.style.display = 'none';
        // 'hide' クラスを削除して次回表示に備える
        menuWindow.classList.remove('hide');
        menuBackground.classList.remove('hide');
    }, 500); // アニメーションの完了時間に合わせて非表示に
});

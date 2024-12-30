// script.js
const sidebar = document.getElementById('sidebar');
const sidebarButton = document.getElementById('sidebar-button');

const toggleSidebarVisibility = () => {
    if (sidebar.style.transform === 'translateX(-100%)' || !sidebar.style.transform) {
        sidebar.style.transform = 'translateX(0)';
        sidebarButton.style.opacity = '0';
        sidebarButton.style.pointerEvents = 'none';
    } else {
        sidebar.style.transform = 'translateX(-100%)';
        sidebarButton.style.opacity = '1';
        sidebarButton.style.pointerEvents = 'auto';
    }
};

// ボタンのクリックとホバーでサイドバーの表示/非表示を切り替え
sidebarButton.addEventListener('click', toggleSidebarVisibility);
sidebarButton.addEventListener('mouseenter', toggleSidebarVisibility);

// サイドバーが閉じられたときにボタンを再表示
sidebar.addEventListener('mouseleave', () => {
    sidebar.style.transform = 'translateX(-100%)';
    sidebarButton.style.opacity = '1';
    sidebarButton.style.pointerEvents = 'auto';
});

//apps
const settingButton = document.getElementById("setting-button");
settingButton.addEventListener("click", function(){
    const appGrid = document.getElementById("app-grid");
    appGrid.style.display = "none";
    const settings = document.getElementById("settings");
    settings.style.display = "block";

});

//apps
const appButton = document.getElementById("app-button");
appButton.addEventListener("click", function(){
    const appGrid = document.getElementById("app-grid");
    appGrid.style.display = "grid";
    const settings = document.getElementById("settings");
    settings.style.display = "none";
});

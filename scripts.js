document.addEventListener('DOMContentLoaded', function () {
    const hasSeenAnimation = localStorage.getItem('hasSeenAnimation');
    const enterButton = document.getElementById('enter-button');
    const welcomeScreen = document.getElementById('welcome-screen');
    const welcomeText = document.getElementById('welcome-text');
    const headerBar = document.getElementById('header-bar');
    const footerBar = document.getElementById('footer-bar');

    const mainContent = document.getElementById('main-content');

    let headerTimer;
    let footerTimer;

    const hideNavContent = (element) => {
        element.classList.add('hidden');
    };

    const showNavContent = (element) => {
        element.classList.remove('hidden');
    };

    const startTimer = (element, timer) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            hideNavContent(element);
        }, 2000);
        return timer;
    };


    if (!hasSeenAnimation) {
        // 首次访问，显示开场动画

        // 点击按钮事件处理
        enterButton.addEventListener("click", function () {
            // 使用 CSS 动画实现欢迎文字、页眉和页脚的滑出动画
            welcomeText.style.animation = 'slide-out-welcome-text 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
            headerBar.style.animation = 'slide-out-bars 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
            footerBar.style.animation = 'slide-out-bars 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';

            // 逐渐降低欢迎屏幕的透明度
            welcomeScreen.style.opacity = 0;
            setTimeout(() => {
                welcomeScreen.style.display = 'none';
            }, 1000);

            // 标记已看过动画
            localStorage.setItem('hasSeenAnimation', 'true');

            // 显示页眉导航栏和主页内容
            const header = document.getElementById('header');
            const mainContent = document.getElementById('main-content');
            header.style.opacity = 1;
            header.style.transform = 'translateY(0)';
            mainContent.style.opacity = 1;

              // 开始计时隐藏导航内容
            headerTimer = startTimer(header, headerTimer);
            footerTimer = startTimer(footer, footerTimer);
        });
    } else {
        // 非首次访问，直接显示主页
        welcomeScreen.style.display = 'none';
        const header = document.getElementById('header');
        const mainContent = document.getElementById('main-content');
        header.style.opacity = 1;
        header.style.transform = 'translateY(0)';
        mainContent.style.opacity = 1;

        // 开始计时隐藏导航内容
        headerTimer = startTimer(header, headerTimer);
        footerTimer = startTimer(footer, footerTimer);
    }

    
    // 鼠标进入导航栏事件
    header.addEventListener('mouseenter', () => {
        showNavContent(header);
        clearTimeout(headerTimer);
    });

    // 鼠标离开导航栏事件
    header.addEventListener('mouseleave', () => {
        headerTimer = startTimer(header, headerTimer);
    });

    // 鼠标进入页脚事件
    footer.addEventListener('mouseenter', () => {
        showNavContent(footer);
        clearTimeout(footerTimer);
    });

    // 鼠标离开页脚事件
    footer.addEventListener('mouseleave', () => {
        footerTimer = startTimer(footer, footerTimer);
    });

    
    // 点击 Logo 返回首页
    const logoContainer = document.getElementById('logo-container');
    if (logoContainer) {
        logoContainer.addEventListener("click", function () {
            window.location.href = window.location.origin;
        });
    }
});
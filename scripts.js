document.addEventListener('DOMContentLoaded', function() {
    const hasSeenAnimation = localStorage.getItem('hasSeenAnimation');

    if (!hasSeenAnimation) {
        const tl = gsap.timeline();

        // 1. 欢迎文字滑动进入
        tl.to("#welcome-text", {
            opacity: 1,
            x: 0,
            duration: 1.5,
            ease: "power4.out"
        });

        // 2. Enter 按钮滑动进入
        tl.to("#enter-button", {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power4.out"
        }, "-=0.5");

        // 3. 用户点击按钮
        document.getElementById("enter-button").addEventListener("click", function() {
            // 其他元素淡出
            tl.to(".fade-part, #enter-button", {
                opacity: 0,
                duration: 1,
                ease: "power4.out"
            });

            // 同时移动开屏动画的 cccouo 和导航栏的 cccouo 到左上角
            tl.to("#main-text, #nav-cccouo", {
                x: -window.innerWidth / 2 + 50, // 移动到左上角
                y: -window.innerHeight / 2 + 50,
                scale: 0.5,
                duration: 2,
                ease: "power4.out",
                onComplete: function() {
                    // 隐藏开屏动画的 cccouo
                    gsap.set("#main-text", { opacity: 0 });
                }
            });

            // 背景颜色过渡到白色
            tl.to("#welcome-screen", {
                backgroundColor: "#f0f0f0", // 过渡到主页背景色
                duration: 1.5,
                onComplete: function() {
                    // 隐藏全屏容器
                    document.getElementById("welcome-screen").remove();
                }
            });

            // 显示页眉导航栏和主页内容
            tl.to("#header", {
                opacity: 1,
                y: 0, // 从顶部外滑入
                duration: 1
            });

            tl.to("#main-content", {
                opacity: 1,
                duration: 1
            });

            // 标记已看过动画
            localStorage.setItem('hasSeenAnimation', 'true');
        });
    } else {
        // 直接显示主页
        document.getElementById("welcome-screen").remove();
        gsap.set("#header", { opacity: 1, y: 0 });
        gsap.set("#main-content", { opacity: 1 });
        // 导航栏的 cccouo 已经默认显示
    }

    // 点击 Logo 返回首页
    document.getElementById("logo-container").addEventListener("click", function() {
        window.location.href = window.location.origin;
    });
});







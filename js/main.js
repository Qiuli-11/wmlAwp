// 配置文件加载
let config = {
    "password": "0127",
    "title": "生日快乐！",
    "message": "愿你的每一天都像今天一样充满快乐与惊喜！",
    "name": "亲爱的小明",
    "music": "music/love.mp3",
    "images": {
        "cake": "images/birthday-cake.svg",
        "balloons": "images/balloons.png"
    },
    "startDate": "2019-09-01",
    "photos": [
        {
            "url": "images/photo1.jpg",
            "caption": "我们的第一张合照"
        },
        {
            "url": "images/photo2.jpg",
            "caption": "生日派对"
        },
        {
            "url": "images/photo3.jpg",
            "caption": "快乐时光"
        }
    ],
    "wishes": [
        "生日快乐！",
        "永远开心！",
        "梦想成真！"
    ]
};

// 登录页面逻辑
if (document.querySelector('.login-page')) {
    // 创建漂浮气泡
    function createBubbles() {
        const bubblesContainer = document.querySelector('.floating-bubbles');
        const bubbleCount = 20;

        for (let i = 0; i < bubbleCount; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            
            // 随机大小和位置
            const size = Math.random() * 60 + 20;
            const left = Math.random() * 100;
            const duration = Math.random() * 3 + 4;
            const delay = Math.random() * 2;

            bubble.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${left}%;
                --duration: ${duration}s;
                animation-delay: ${delay}s;
            `;

            bubblesContainer.appendChild(bubble);
        }
    }

    createBubbles();

    // 密码输入处理
    const passwordInput = document.getElementById('password');
    const submitButton = document.getElementById('submit');
    const errorMessage = document.querySelector('.error-message');

    passwordInput.addEventListener('input', function(e) {
        // 只允许输入数字
        this.value = this.value.replace(/[^\d]/g, '');
        errorMessage.textContent = '';
    });

    async function handleLogin() {
        const password = passwordInput.value;
        
        if (!password) {
            errorMessage.textContent = '请输入密码';
            return;
        }

        try {
            if (password === config.password) {
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                localStorage.setItem('birthday_authorized', 'true');
                
                // 添加成功动画
                document.querySelector('.login-box').style.transform = 'scale(0.9)';
                setTimeout(() => {
                    window.location.href = 'HappyBirthday-main/index.html';
                }, 800);
            } else {
                errorMessage.textContent = '密码错误，请重试！';
                passwordInput.value = '';
                
                // 添加抖动效果
                submitButton.classList.add('shake');
                setTimeout(() => {
                    submitButton.classList.remove('shake');
                }, 500);
            }
        } catch (error) {
            console.error('登录处理错误:', error);
            errorMessage.textContent = '发生错误，请稍后重试';
        }
    }

    submitButton.addEventListener('click', handleLogin);
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleLogin();
        }
    });
}

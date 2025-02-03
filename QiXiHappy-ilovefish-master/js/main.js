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

// 主页面逻辑
if (document.querySelector('.main-page')) {
    // 已删除登录界面，直接进入主页面

    // 初始化页面
    function initPage() {
        // 设置标题和消息
        document.getElementById('mainTitle').textContent = config.title;
        document.getElementById('mainMessage').textContent = config.message;

        // 计算在一起的天数
        const startDate = new Date(config.startDate);
        const today = new Date();
        const days = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
        document.getElementById('dayCount').textContent = `${days} 天`;

        // 设置音乐并初始化控制
        const bgMusic = document.getElementById('bgMusic');
        bgMusic.src = config.music;
        
        const playBtn = document.getElementById('play-btn');
        const pauseBtn = document.getElementById('pause-btn');

        playBtn.addEventListener('click', function() {
            bgMusic.play();
            playBtn.style.display = 'none';
            pauseBtn.style.display = 'block';
        });

        pauseBtn.addEventListener('click', function() {
            bgMusic.pause();
            pauseBtn.style.display = 'none';
            playBtn.style.display = 'block';
        });

        // 自动播放处理
        bgMusic.addEventListener('play', function() {
            playBtn.style.display = 'none';
            pauseBtn.style.display = 'block';
        });

        bgMusic.addEventListener('pause', function() {
            pauseBtn.style.display = 'none';
            playBtn.style.display = 'block';
        });

        // 初始化照片墙
        const photoContainer = document.querySelector('.photo-container');
        config.photos.forEach(photo => {
            const photoItem = document.createElement('div');
            photoItem.className = 'photo-item';
            photoItem.innerHTML = `
                <img src="${photo.url}" alt="${photo.caption}">
                <div class="caption">${photo.caption}</div>
            `;
            photoContainer.appendChild(photoItem);
        });

        // 初始化愿望树
        const wishesContainer = document.querySelector('.wishes');
        config.wishes.forEach(wish => {
            const wishElement = document.createElement('div');
            wishElement.className = 'wish-item';
            wishElement.textContent = wish;
            wishesContainer.appendChild(wishElement);
        });

        // 启动动画
        startAnimations();
    }

    // 页面加载完成后初始化
    window.addEventListener('load', initPage);
}

document.addEventListener('DOMContentLoaded', function () {
    // 檢查登入狀態
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        alert(`您已登入，歡迎 ${loggedInUser}！`);
        window.location.href = '../profile/profile.html'; // 跳轉至會員資料頁
        return;
    }

    // 切換到註冊表單
    document.getElementById('showRegister').addEventListener('click', function () {
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('registerForm').classList.remove('hidden');
        document.querySelector('.form-container').style.left = '0%';
    });

    // 切換到登入表單
    document.getElementById('showLogin').addEventListener('click', function () {
        document.getElementById('registerForm').classList.add('hidden');
        document.getElementById('loginForm').classList.remove('hidden');
        document.querySelector('.form-container').style.left = '';
    });

    // 處理註冊表單提交
    document.getElementById('registerForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('registerUsername').value.trim();
        const password = document.getElementById('registerPassword').value.trim();

        if (username && password) {
            const existingUser = localStorage.getItem(username);
            if (existingUser) {
                alert('用戶名已存在，請使用其他用戶名！');
            } else {
                // 儲存新用戶資料
                const userData = {
                    password: password,
                    orders: [],
                    collections: [],
                    coupons: []
                };
                localStorage.setItem(username, JSON.stringify(userData));
                alert('註冊成功！即將跳轉到登入畫面...');
                document.getElementById('showLogin').click();
            }
        } else {
            alert('請輸入有效的用戶名和密碼！');
        }
    });

    // 處理登入表單提交
    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value.trim();

        const userData = JSON.parse(localStorage.getItem(username));

        if (userData && userData.password === password) {
            localStorage.setItem('loggedInUser', username); // 儲存登入狀態
            alert('登入成功！正在跳轉至會員資料頁...');
            window.location.href = '../profile/profile.html'; // 跳轉至會員資料頁
        } else {
            alert('帳號或密碼錯誤，請重試！');
        }
    });
});

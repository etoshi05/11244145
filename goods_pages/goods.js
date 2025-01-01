// 初始化 Swiper
const swiper = new Swiper(".mySwiper", {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

// 購物車相關邏輯
let cart = [];

// 評論數據
let ratings = [];

// DOMContentLoaded 事件
document.addEventListener('DOMContentLoaded', () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }

    updateAverageRating(); // 初始化平均評分
});

// 更新購物車數量
function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    cartCountElement.textContent = cart.length;
}

// 更新平均星級
function updateAverageRating() {
    const averageRatingElement = document.querySelector('#average-score');
    const starsElement = document.querySelector('#average-rating .stars');

    if (ratings.length === 0) {
        averageRatingElement.textContent = "0";
        starsElement.innerHTML = '☆☆☆☆☆'; // 沒有評分時顯示空星
        return;
    }

    const total = ratings.reduce((sum, rating) => sum + rating, 0);
    const average = (total / ratings.length).toFixed(1);

    averageRatingElement.textContent = average;
    const fullStars = '★'.repeat(Math.floor(average));
    const halfStar = average % 1 >= 0.5 ? '½' : '';
    const emptyStars = '☆'.repeat(5 - Math.ceil(average));

    starsElement.innerHTML = `${fullStars}${halfStar}${emptyStars}`;
}

// 加入購物車按鈕點擊事件
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const id = button.dataset.id;
        const name = button.dataset.name;
        const price = button.dataset.price;

        const item = { id, name, price };
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert(`${name} 已加入購物車！`);
    });
});

// 提交評論表單事件
document.querySelector('#review-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const rating = parseInt(document.querySelector('#rating').value);
    const comment = document.querySelector('#comment').value;

    // 更新評價列表
    ratings.push(rating);
    const reviewList = document.querySelector('#review-list');
    const reviewItem = document.createElement('div');
    reviewItem.className = 'review-item';
    reviewItem.innerHTML = `
        <div>
            評分: <span class="stars">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</span>
        </div>
        <div>評論: ${comment}</div>
    `;
    reviewList.appendChild(reviewItem);

    // 更新平均評分
    updateAverageRating();

    // 重置表單
    document.querySelector('#review-form').reset();
});

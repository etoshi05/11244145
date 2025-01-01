// 初始化 Swiper
const swiper = new Swiper(".mySwiper", {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
const languageSelect = document.getElementById("language-select");
const translations = {
        "zh-TW": {
            necklace1:"蝶戀閃耀項鍊",
            necklace2:"藍韻晶華項鍊",
            necklace3:"星影垂光項鍊",
            necklace4:"心繫結愛項鍊",

            neckintro1:"浪漫蝴蝶造型，搭配耀眼晶鑽，增添柔美氣質。",
            neckintro2:"清新藍水晶點綴，展現優雅自信。",
            neckintro3:"流線型垂墜設計，藍色晶體優雅迷人。",
            neckintro4:"蝴蝶結象徵愛與美，輕鬆打造甜美風格。",
            
            earrings1:"抗敏素鋼耳環",
            earrings2:"星耀之心耳針",
            earrings3:"流星月語耳環",
            earrings4:"水晶六芒",

            earintro1:"醫療鋼材質耐用抗敏，適合日常佩戴。",
            earintro2:"星光閃爍設計，展現迷人魅力。",
            earintro3:"星月造型搭配長流蘇，增添浪漫氣息。",
            earintro4:"六邊形搭配晶石，手工打造時尚氣息。",

            rings1:"銀月星辰戒指",
            rings2:"蝶結心語戒指",
            rings3:"花漾鏤空戒指",
            rings4:"星華圓舞戒指",

            ringsintro1:"滿天星元素，簡約設計展現高級感。",
            ringsintro2:"純銀打造的甜美設計，散發優雅韻味。",
            ringsintro3:"精緻花紋搭配鏤空設計，適合各種場合。",
            ringsintro4:"星形光環設計，為指尖增添閃耀光彩。",
            
            score:"評分",
            Submitcomment:"提交您的評論",
            productrating:"商品評分",
            cart:"加入購物車",
            collect:"加入我的收藏"
        },
        en: {
            
            necklace1:"Butterfly Shine Necklace",
            necklace2:"Blue Elegance Necklace",
            necklace3:"Starlight Drop Necklace",
            necklace4:"Heart-Tied Love Necklace",
            neckintro1:"Romantic butterfly design paired with dazzling crystals, adding a touch of soft elegance.",
            neckintro2:"Adorned with refreshing blue crystals, exuding confidence and grace.",
            neckintro3:"Streamlined drop design with elegant and enchanting blue crystals.",
            neckintro4:"A bow symbolizes love and beauty, creating a sweet and charming style effortlessly.",
            
            earrings1:"Anti-Allergy Stainless Steel Earrings",
            earrings2:"Starry Heart Stud Earrings",
            earrings3:"Falling Moon and Star Earrings",
            earrings4:"Crystal Hexagon",

            earintro1:"Durable medical-grade stainless steel, perfect for everyday wear.",
            earintro2:"A sparkling star design that highlights irresistible charm.",
            earintro3:"Star and moon design with long tassels, adding a romantic vibe.",
            earintro4:"Hexagonal elements paired with crystals, handcrafted for a stylish look.",

            rings1:"Silver Moonlight Ring",
            rings2:"Butterfly Bow Ring",
            rings3:"Bloom Hollow Ring",
            rings4:"Starry Waltz Ring",

            ringsintro1:"Starry sky motif in a minimalist design, showcasing understated sophistication.",
            ringsintro2:"Crafted from pure silver, the sweet design radiates elegance.",
            ringsintro3:"Delicate floral patterns with hollow detailing, suitable for any occasion.",
            ringsintro4:"A star-shaped halo design that adds a dazzling touch to your fingertips.",
            
            score:"score",
            Submitcomment:"Submit your comment",
            productrating:"product rating",
            cart:"Add to Cart",
            collect:"Add to Collection"
        },
    };
const currencySelect = document.getElementById("currency-select");
const currencyFormats = {
        TWD: { symbol: "NT$", rate: 1 },
        USD: { symbol: "$", rate: 0.03 },
    };
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
 // 語言切換功能
    languageSelect.addEventListener("change", (event) => {
        const selectedLanguage = event.target.value;
        const texts = translations[selectedLanguage];

        document.querySelectorAll("[data-text]").forEach(element => {
            const key = element.getAttribute("data-text");
            if (texts[key]) {
                element.textContent = texts[key];
            }
        });
    });

    // 幣別切換功能
    currencySelect.addEventListener("change", (event) => {
        const selectedCurrency = event.target.value;
        const { symbol, rate } = currencyFormats[selectedCurrency];

        document.querySelectorAll(".price").forEach(priceElement => {
            const basePrice = parseFloat(priceElement.dataset.basePrice);
            priceElement.textContent = `${symbol} ${(basePrice * rate).toFixed(2)}`;
        });
    });

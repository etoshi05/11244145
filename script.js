document.addEventListener("DOMContentLoaded", () => {
    // 初始化購物車和收藏數量
    let cart = [];
    let collection = [];
    let cartCount = 0;
    let collectionCount = 0;

    const cartCountElement = document.querySelector(".cart-count");
    const collectionCountElement = document.querySelector(".collection-count");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const addToCollectionButtons = document.querySelectorAll(".add-to-collection");
    const languageSelect = document.getElementById("language-select");
    const currencySelect = document.getElementById("currency-select");

    const translations = {
        "zh-TW": {
            welcome: "歡迎來到購物網站",
            explore: "探索您的時尚選擇，開始購物吧！",
            introduce: "介紹",
            category: "種類",
            necklace: "項鍊",
            earrings: "耳環",
            rings: "戒指",
            brand: "品牌",

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

            cart:"加入購物車",
            collect:"加入我的收藏"
        },
        en: {
            welcome: "Welcome to the Shopping Site",
            explore: "Discover your fashion options and start shopping!",
            introduce: "Introduce",
            category: "Categories",
            necklace: "Necklaces",
            earrings: "Earrings",
            rings: "Rings",
            brand: "Brand",
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
            
            cart:"Add to Cart",
            collect:"Add to Collection"
        },
    };

    const currencyFormats = {
        TWD: { symbol: "NT$", rate: 1 },
        USD: { symbol: "$", rate: 0.03 },
    };

    // 初始化商品圖片輪播
    const products = document.querySelectorAll(".product img");
    const productImages = [
        ["images/neck/lilia/blue1-1.avif", "images/neck/lilia/blue1-2.avif", "images/neck/lilia/gold1-1.avif", "images/neck/lilia/sliver1-1.avif", "images/neck/lilia/sliver1-2.avif", "images/neck/lilia/white1-1.avif"],
        ["images/neck/una/glod1-2.avif", "images/neck/una/gold1-1.avif", "images/neck/una/blue1-1.avif", "images/neck/una/blue1-2.avif", "images/neck/una/sliver1-1.avif", "images/neck/una/sliver1-2.avif", "images/neck/una/sliver1-3.avif"],
        ["images/neck/attract/blue1.avif", "images/neck/attract/blue2.avif", "images/neck/attract/gold1.avif", "images/neck/attract/gold2.avif", "images/neck/attract/pink1.avif", "images/neck/attract/pink2.avif"],
        ["images/neck/hyperbola/1-1.avif", "images/neck/hyperbola/1-2.avif", "images/neck/hyperbola/2-1.avif", "images/neck/hyperbola/2-2.avif"],
        
        ["images/earrings/KIRSTYHUGGIE/black1-1.avif", "images/earrings/KIRSTYHUGGIE/black1-2.avif", "images/earrings/KIRSTYHUGGIE/black1-3.avif"],
        ["images/earrings/LUX/sliver1-1.avif", "images/earrings/LUX/sliver1-2.avif", "images/earrings/LUX/sliver1-3.avif"],
        ["images/earrings/Tiana/1.avif", "images/earrings/Tiana/2.avif", "images/earrings/Tiana/3.avif"],
        ["images/earrings/SIX/gold2.avif", "images/earrings/SIX/0.avif", "images/earrings/SIX/black1.avif", "images/earrings/SIX/black2.avif", "images/earrings/SIX/gold1.avif", "images/earrings/SIX/silver1.avif", "images/earrings/SIX/silver2.avif"],
        
        ["images/ring/1/ring1.png","images/ring/1/ring1-2.png","images/ring/1/ring1-3.png","images/ring/1/ring1-4.png","images/ring/1/ring1-5.png",],
        ["images/ring/2/ring2.png","images/ring/2/ring2-2.png",],
        ["images/ring/3/ring3.png","images/ring/3/ring3-2.png","images/ring/3/ring3-3.png","images/ring/3/ring3-4.png",],
        ["images/ring/4/ring4-2.png", "images/ring/4/ring4-3.png", "images/ring/4/ring4-4.png", "images/ring/4/ring4-5.png", "images/ring/4/ring4.png"]
    ];

    products.forEach((img, index) => {
        if (productImages[index]) {
            const images = productImages[index];
            let currentIndex = 0;
            let interval;

            const startImageRotation = () => {
                interval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % images.length;
                    img.src = images[currentIndex];
                }, 2000);
            };

            const stopImageRotation = () => clearInterval(interval);

            startImageRotation();
            img.addEventListener("mouseenter", stopImageRotation);
            img.addEventListener("mouseleave", startImageRotation);
        }
    });

    // 從 localStorage 讀取購物車和收藏數據
    const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            cart = JSON.parse(savedCart);
            cartCount = cart.length;
        } else {
            cart = [];
            cartCount = 0;
        }
    
    const savedCollection = localStorage.getItem("collection");
        if (savedCollection) {
            collection = JSON.parse(savedCollection);
            collectionCount = collection.length;
        } else {
            collection = [];
            collectionCount = 0;
        }
    

    // 顯示彈窗提示
    function showAlert(message) {
        const alertBox = document.createElement("div");
        alertBox.textContent = message;
        alertBox.style.position = "fixed";
        alertBox.style.bottom = "20px";
        alertBox.style.right = "20px";
        alertBox.style.backgroundColor = "#f8d7da";
        alertBox.style.color = "#721c24";
        alertBox.style.padding = "10px 20px";
        alertBox.style.border = "1px solid #f5c6cb";
        alertBox.style.borderRadius = "5px";
        alertBox.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
        alertBox.style.zIndex = "1000";

        document.body.appendChild(alertBox);

        setTimeout(() => {
            document.body.removeChild(alertBox);
        }, 3000);
    }

    // 加入購物車功能
    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const productElement = button.closest(".product");
            const product = {
                id: productElement.getAttribute("data-id"),
                name: productElement.getAttribute("data-name"),
                price: parseFloat(productElement.getAttribute("data-price")),
            };

            cart.push(product);
            cartCount++;
            cartCountElement.textContent = cartCount;
            localStorage.setItem("cart", JSON.stringify(cart));
            showAlert(`${product.name} 已加入購物車`);
        });
    });

    // 加入收藏功能
    addToCollectionButtons.forEach(button => {
        button.addEventListener("click", () => {
            const productElement = button.closest(".product");
            const product = {
                id: productElement.getAttribute("data-id"),
                name: productElement.getAttribute("data-name"),
                price: parseFloat(productElement.getAttribute("data-price")),
            };

            if (collection.some(item => item.id === product.id)) {
                showAlert(`${product.name} 已在收藏中`);
                return;
            }

            collection.push(product);
            collectionCount++;
            collectionCountElement.textContent = collectionCount;
            localStorage.setItem("collection", JSON.stringify(collection));
            showAlert(`${product.name} 已加入我的收藏`);
        });
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

    // 倒數計時功能
    function startCountdown(durationInSeconds) {
        const timerElement = document.getElementById('countdown-timer');
        let remainingTime = durationInSeconds;

        function updateTimer() {
            const hours = Math.floor(remainingTime / 3600);
            const minutes = Math.floor((remainingTime % 3600) / 60);
            const seconds = remainingTime % 60;

            timerElement.textContent = `${hours}時 ${minutes}分 ${seconds}秒`;

            if (remainingTime > 0) {
                remainingTime--;
            } else {
                clearInterval(countdownInterval);
                timerElement.textContent = "特價已結束！";
                modal.classList.add("hidden");
            }
        }

        updateTimer();
        const countdownInterval = setInterval(updateTimer, 1000);
    }

    const modal = document.getElementById("modal");
    const closeButton = document.getElementById("close-button");

    closeButton.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    startCountdown(3 * 60 * 60);
});

// Render favorites when the page loads
renderFavorites();
document.addEventListener('DOMContentLoaded', () => {
    // 會員按鈕與登出邏輯管理
    function updateMemberLink() {
        const memberLink = document.getElementById('memberLink'); // 會員按鈕
        const dropdownMenu = document.querySelector('.dropdown-menu'); // 下拉選單
        const loggedInUser = localStorage.getItem('loggedInUser'); // 確認登入狀態
        
        if (loggedInUser) {
            // 已登入：顯示會員資料
            memberLink.innerText = '會員資料';
            memberLink.setAttribute('data-text', 'MemberData');
            memberLink.setAttribute('href', 'profile/profile.html');

            // 顯示登出按鈕（避免多次新增）
            if (!document.getElementById('logoutBtn')) {
                const logoutOption = document.createElement('li');
                logoutOption.innerHTML = `<a href="#" id="logoutBtn">登出</a>`;
                dropdownMenu.appendChild(logoutOption);

                // 登出按鈕邏輯
                document.getElementById('logoutBtn').addEventListener('click', () => {
                    localStorage.removeItem('loggedInUser');
                    alert('您已成功登出！');
                    location.reload(); // 刷新頁面
                });
            }
        } else {
            // 未登入：顯示會員登入/註冊
            memberLink.innerText = '會員登入/註冊';
            memberLink.setAttribute('data-text', 'Memberloginregistration');
            memberLink.setAttribute('href', 'login/login.html');
            
            // 隱藏登出選項
            const logoutBtn = document.getElementById('logoutBtn');
            if (logoutBtn) logoutBtn.parentElement.remove(); // 移除登出按鈕
        }
    }

    // 初始化會員按鈕狀態
    updateMemberLink();

    // 測試用：打印目前登入用戶 (在開發階段觀察)
    console.log('Logged in user:', localStorage.getItem('loggedInUser'));
});
document.addEventListener("DOMContentLoaded", () => {
    // 取得收藏清單
function getCollection() {
    const collection = localStorage.getItem("collection");
    return collection ? JSON.parse(collection) : [];
}

// 儲存收藏清單
function saveCollection(collection) {
    localStorage.setItem("collection", JSON.stringify(collection));
}

// 新增商品到收藏清單
function addToCollection(product) {
    const collection = getCollection();
    if (collection.some(item => item.id === product.id)) {
        alert(`${product.name} 已在收藏清單中！`);
        return;
    }

    collection.push(product); // 加入新的商品
    saveCollection(collection); // 儲存到 LocalStorage
    alert(`${product.name} 已成功加入收藏！`);
}
});

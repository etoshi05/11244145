let cart = [];
let totalPrice = 0;

document.addEventListener('DOMContentLoaded', () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        displayCart();
        updateTotalPrice();
    }
});

// 更新購物車計數
function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

// 更新總價格
function updateTotalPrice() {
    totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('total-price').textContent = totalPrice;
}

// 顯示購物車內容
function displayCart() {
    const cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = '';
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        // 添加刪除按鈕
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '刪除';
        deleteBtn.onclick = () => deleteContent(index);
        li.appendChild(deleteBtn);
        cartItemsElement.appendChild(li);
    });
}

// 加入購物車
function addToCart(product) {
    cart.push(product);
    updateCartCount();
    updateTotalPrice();
    displayCart();
    localStorage.setItem('cart', JSON.stringify(cart)); // 同步儲存至 localStorage
}

// 結帳
document.getElementById('checkout').addEventListener('click', () => {
    const username = localStorage.getItem('loggedInUser');
    if (!username) {
        alert('您尚未登入！請先登入或註冊。');
        window.location.href = '../login/login.html';
        return;
    }

    const userData = JSON.parse(localStorage.getItem(username)) || {};
    userData.orders = userData.orders || [];
    userData.orders.push(...cart); // 保存購物車的每筆訂單

    localStorage.setItem(username, JSON.stringify(userData)); // 更新用戶數據

    alert(`購物成功！總金額為 $${totalPrice}`);
    cart = [];
    localStorage.removeItem('cart'); // 清空購物車數據
    updateCartCount();
    updateTotalPrice();
    displayCart();
});


// 事件監聽器：加入購物車按鈕
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        const productElement = event.target.closest('.product');
        const product = {
            id: productElement.getAttribute('data-id'),
            name: productElement.getAttribute('data-name'),
            price: parseInt(productElement.getAttribute('data-price'), 10),
        };
        addToCart(product);
    });
});

// 刪除購物車內容
function deleteContent(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateTotalPrice();
    displayCart();
}

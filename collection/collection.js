const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

favorites.forEach(productId => {
  // 模擬加載商品數據
  const product = getProductById(productId); // 這是一個模擬函數
  const productElement = createProductElement(product); // 動態生成 DOM
  document.querySelector('.favorites-container').appendChild(productElement);
});

document.addEventListener("DOMContentLoaded", () => {
  // 從 LocalStorage 取得收藏清單
  function getCollection() {
      const collection = localStorage.getItem("collection");
      return collection ? JSON.parse(collection) : []; // 若無收藏清單，回傳空陣列
  }

  // 渲染收藏清單
  function renderCollection() {
      const collectionList = document.getElementById("collection-list");
      const collectionCount = document.getElementById("collection-count");
      const collection = getCollection(); // 從 LocalStorage 取得收藏清單

      collectionList.innerHTML = ""; // 清空清單

      if (collection.length === 0) {
          collectionList.innerHTML = "<p>尚未收藏任何商品。</p>";
          collectionCount.textContent = "收藏數量：0";
          return;
      }

      collectionCount.textContent = `收藏數量：${collection.length}`;

      // 顯示每個商品
      collection.forEach((product, index) => {
          const productItem = document.createElement("div");
          productItem.classList.add("product-item");

          productItem.innerHTML = `
              <h3>${product.name}</h3>
              <p>價格：${product.price} 元</p>
              <button class="remove-collection" data-index="${index}">刪除</button>
          `;

          collectionList.appendChild(productItem);
      });

      // 綁定「刪除」按鈕事件
      document.querySelectorAll(".remove-collection").forEach((button) => {
          button.addEventListener("click", (event) => {
              const index = event.target.dataset.index;
              confirmRemoveFromCollection(index); // 確認刪除
          });
      });
  }

  // 確認移除收藏商品
  function confirmRemoveFromCollection(index) {
      const confirmed = confirm("您確定要刪除這個商品嗎？");
      if (confirmed) {
          removeFromCollection(index);
      }
  }

  // 移除收藏商品
  function removeFromCollection(index) {
      let collection = getCollection();
      collection.splice(index, 1); // 移除指定索引的商品
      localStorage.setItem("collection", JSON.stringify(collection)); // 更新 LocalStorage
      renderCollection(); // 重新渲染清單
  }

  // 更新收藏數量
  function updateCollectionCount() {
      const collectionCount = document.getElementById("collection-count");
      const collection = getCollection();
      collectionCount.textContent = `收藏數量：${collection.length}`;
  }

  // 加入收藏
  function addToCollection(product) {
      let collection = getCollection();

      // 檢查是否已經存在該商品
      const exists = collection.some(item => item.id === product.id);
      if (!exists) {
          collection.push(product);
          localStorage.setItem("collection", JSON.stringify(collection)); // 更新 localStorage
          updateCollectionCount();
          alert(`${product.name} 已加入我的收藏`);
      } else {
          alert(`${product.name} 已在我的收藏中！`);
      }
  }

  // 事件監聽器：加入收藏按鈕
  document.querySelectorAll('.add-to-collection').forEach(button => {
      button.addEventListener('click', (event) => {
          console.log('收藏按鈕被點擊');
          const productElement = event.target.closest('.product');
          const product = {
            id: productElement.getAttribute('data-id'),
            name: productElement.getAttribute('data-name'),
            price: parseFloat(productElement.getAttribute('data-price'))
          };
          addToCollection(product);
      });
  });

  // 初次渲染收藏清單
  renderCollection();
});

// 更新後的收藏商品資料，刪除 URL 屬性
const collection = [
  // 項鍊類
  {
      id: "necklace_1",
      name: "蝶戀閃耀項鍊",
      price: 1000
  },
  {
      id: "necklace_2",
      name: "藍韻晶華項鍊",
      price: 1000
  },
  {
      id: "necklace_3",
      name: "星影垂光項鍊",
      price: 1000
  },
  {
      id: "necklace_4",
      name: "心繫結愛項鍊",
      price: 1000
  },

  // 耳環類
  {
      id: "earring_1",
      name: "抗敏素鋼耳環",
      price: 1000
  },
  {
      id: "earring_2",
      name: "星耀之心耳針",
      price: 1000
  },
  {
      id: "earring_3",
      name: "流星月語耳環",
      price: 1000
  },
  {
      id: "earring_4",
      name: "水晶六芒耳環",
      price: 1000
  },

  // 戒指類
  {
      id: "ring_1",
      name: "銀月星辰戒指",
      price: 1000
  },
  {
      id: "ring_2",
      name: "蝶結心語戒指",
      price: 1000
  },
  {
      id: "ring_3",
      name: "花漾鏤空戒指",
      price: 1000
  },
  {
      id: "ring_4",
      name: "星華圓舞戒指",
      price: 1000
  }
];

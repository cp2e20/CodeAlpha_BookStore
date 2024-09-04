document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const products = [
    {
      id: 1,
      name: "Romance Novel 1",
      image: "./assets/r1.jpg",
      category: "Romance",
      description: "Heartwarming love story set in a small town.",
      rating: 4,
    },
    {
      id: 2,
      name: "Romance Novel 2",
      image: "./assets/r2.jpg",
      category: "Romance",
      description: "A tale of forbidden love and family secrets.",
      rating: 4.5,
    },
    {
      id: 3,
      name: "Romance Novel 3",
      image: "./assets/r3.jpg",
      category: "Romance",
      description: "A modern love story with a twist.",
      rating: 3,
    },
    {
      id: 4,
      name: "Mystery Thriller 1",
      image: "./assets/m1.jpg",
      category: "Mystery",
      description:
        "A gripping mystery that will keep you on the edge of your seat.",
      rating: 5,
    },
    {
      id: 5,
      name: "Mystery Thriller 2",
      image: "./assets/m2.jpg",
      category: "Mystery",
      description: "A detective's hunt for a serial killer.",
      rating: 4,
    },
    {
      id: 6,
      name: "Mystery Thriller 3",
      image: "./assets/m3.jpg",
      category: "Mystery",
      description: "A cold case is reopened with shocking results.",
      rating: 4.5,
    },
    {
      id: 7,
      name: "Fantasy Epic 1",
      image: "./assets/f1.jpg",
      category: "Fantasy",
      description: "A hero's journey in a magical world.",
      rating: 4.5,
    },
    {
      id: 8,
      name: "Fantasy Epic 2",
      image: "./assets/f2.jpg",
      category: "Fantasy",
      description: "The battle between good and evil in a mystical land.",
      rating: 5,
    },
    {
      id: 9,
      name: "Fantasy Epic 3",
      image: "./assets/f3.jpg",
      category: "Fantasy",
      description: "A quest to find a lost artifact of great power.",
      rating: 4.6,
    },
    {
      id: 10,
      name: "Fantasy Epic 4",
      image: "./assets/f4.jpg",
      category: "Fantasy",
      description: "A story of dragons, knights, and magic.",
      rating: 4,
    },
    {
      id: 11,
      name: "Fantasy Epic 5",
      image: "./assets/f5.jpg",
      category: "Fantasy",
      description: "An epic saga of war and peace in a mythical kingdom.",
      rating: 4.5,
    },
    {
      id: 12,
      name: "Thriller 1",
      image: "./assets/th1.jpg",
      category: "Thriller",
      description: "A fast-paced thriller with unexpected twists.",
      rating: 4.5,
    },
    {
      id: 13,
      name: "Thriller 2",
      image: "./assets/th2.jpg",
      category: "Thriller",
      description: "A psychological thriller that delves into the human mind.",
      rating: 3.7,
    },
    {
      id: 14,
      name: "Thriller 3",
      image: "./assets/th3.jpg",
      category: "Thriller",
      description: "A race against time to stop a dangerous criminal.",
      rating: 4.5,
    },
    {
      id: 15,
      name: "Manga Volume 1",
      image: "./assets/manga1.jpg",
      category: "Manga",
      description: "The adventures of a young ninja in a hidden village.",
      rating: 4.5,
    },
    {
      id: 16,
      name: "Manga Volume 2",
      image: "./assets/manga6.jpg",
      category: "Manga",
      description: "A high school student's battle with supernatural forces.",
      rating: 4.5,
    },
    {
      id: 17,
      name: "Manga Volume 3",
      image: "./assets/manga2.jpg",
      category: "Manga",
      description: "A story of friendship and rivalry in a fantasy world.",
      rating: 4.75,
    },
    {
      id: 18,
      name: "Manga Volume 4",
      image: "./assets/manga3.jpg",
      category: "Manga",
      description: "An epic journey across time and space.",
      rating: 4.7,
    },
    {
      id: 19,
      name: "Manga Volume 5",
      image: "./assets/manga4.jpg",
      category: "Manga",
      description: "A tale of revenge and redemption.",
      rating: 5,
    },
    {
      id: 20,
      name: "Manga Volume 6",
      image: "./assets/manga5.jpeg",
      category: "Manga",
      description: "A story of love, loss, and the fight for survival.",
      rating: 4.5,
    },
  ];
  const productsPerPage = 12;
  let currentPage = 1;

  function renderProducts(products, page = 1) {
    productList.innerHTML = "";
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = page * productsPerPage;
    const paginatedProducts = products.slice(startIndex, endIndex);

    if (paginatedProducts.length === 0) {
      productList.innerHTML = "<p>No products found</p>";
      return;
    }

    paginatedProducts.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.className = "product-card col-4";
      productElement.innerHTML = `
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" />
          <div class="overlay">
            <h4>${product.name}</h4>
            <button class="view-details-btn" data-id="${product.id}">Read</button>
          </div>
        </div>
        <div class="product-info">
          <p>${product.description}</p>
          <p>Rating: ${product.rating}</p>
          <button class="mark-read-btn" data-id="${product.id}">Mark as Read</button>
        </div>
      `;
      productList.appendChild(productElement);
    });

    updatePaginationControls(products.length, page);
  }

  function updatePaginationControls(totalProducts, page) {
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    document.getElementById("page-info").innerText = `Page ${page}`;
    document.getElementById("prev-page").disabled = page === 1;
    document.getElementById("next-page").disabled = page === totalPages;
  }

  document.getElementById("prev-page").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderProducts(products, currentPage);
    }
  });

  document.getElementById("next-page").addEventListener("click", () => {
    const totalPages = Math.ceil(products.length / productsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      renderProducts(products, currentPage);
    }
  });

  document
    .getElementById("filter-category-btn")
    .addEventListener("click", () => {
      const category = document.getElementById("category").value.toLowerCase();
      const filteredProducts =
        category === "all"
          ? products
          : products.filter(
              (product) => product.category.toLowerCase() === category
            );

      currentPage = 1;
      renderProducts(filteredProducts, currentPage);
    });

  document.getElementById("search-btn").addEventListener("click", () => {
    const searchTerm = document
      .getElementById("search-bar")
      .value.toLowerCase();
    const filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    currentPage = 1;
    renderProducts(filteredProducts, currentPage);
  });

  productList.addEventListener("click", (event) => {
    if (event.target.classList.contains("view-details-btn")) {
      const productId = event.target.getAttribute("data-id");
      showProductDetails(productId);
    } else if (event.target.classList.contains("mark-read-btn")) {
      const bookId = event.target.getAttribute("data-id");
      addToHistory(bookId);
      alert("Book added to history!");
    }
  });

  function showProductDetails(productId) {
    alert(`Product ID: ${productId}`);
  }

  function addToHistory(bookId) {
    let history = JSON.parse(localStorage.getItem("readBooks")) || [];
    if (!history.includes(bookId)) {
      history.push(bookId);
      localStorage.setItem("readBooks", JSON.stringify(history));
    }
  }

  renderProducts(products, currentPage);
});

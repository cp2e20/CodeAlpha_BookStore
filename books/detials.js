document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

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

  const product = products.find((product) => product.id == productId);

  if (product) {
    const productDetailsContainer = document.getElementById("product-details");
    productDetailsContainer.innerHTML = `
            <div class="product-details-container">
                <div class="product-details-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-details-info">
                    <h1>${product.name}</h1>
                    <p>Description: ${product.description}</p>
                    <p>Price: $${product.price}</p>
                    <div class="rating">
                        <span>${"★".repeat(Math.floor(product.rating))}</span>
                        <span>${"☆".repeat(
                          5 - Math.floor(product.rating)
                        )}</span>
                        (${product.rating})
                    </div>
                    <br>
                    <div class="size-select">
                        <label for="size">Size:</label>
                        <select id="size" name="size">
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                        </select>
                    </div>
                    <br>
                    <div class="quantity-select">
                        <label for="quantity">Quantity:</label>
                        <input type="number" id="quantity" name="quantity" value="1" min="1" max="10">
                    </div>
                    <br>
                    <button class="add-to-cart-btn" data-id="${
                      product.id
                    }">Add to Cart</button>
                </div>
            </div>
        `;

    setupAddToCartButton(product);
  }

  function setupAddToCartButton(product) {
    const addToCartBtn = document.querySelector(".add-to-cart-btn");
    addToCartBtn.addEventListener("click", () => {
      const quantity = parseInt(document.getElementById("quantity").value);
      const size = document.getElementById("size").value;

      // Check if user is logged in
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      if (!loggedInUser) {
        alert("You need to be logged in to add items to the cart.");
        return;
      }

      addToCart(product, quantity, size, loggedInUser.email);
      alert("Product added to cart!");
    });
  }

  function addToCart(product, quantity, size, userEmail) {
    let carts = JSON.parse(localStorage.getItem("carts")) || {};
    if (!carts[userEmail]) {
      carts[userEmail] = [];
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.image,
    };

    carts[userEmail].push(cartItem);
    localStorage.setItem("carts", JSON.stringify(carts));
  }
});

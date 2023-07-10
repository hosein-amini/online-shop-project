// import { productsList } from "./data.js";
let $ = document;
let confirmComment = $.querySelector(".confirm-comment");
let searchParams = new URLSearchParams(location.search);
let searchParamsId = searchParams.get("id");
let productsInCart = [];
let productsList = [
  {
    id: 1,
    image: "images/cap-1.png",
    title: "Classic Cap",
    description:
      "Simple and versatile, suitable for a range of casual occasions.",
    price: "30",
    category: "Cap",
    quantity: 0,
  },
  {
    id: 2,
    image: "images/cap-2.png",
    title: "Vintage Cap",
    description:
      "Stylish and unique, perfect for adding a touch of personality to your look.",
    price: "40",
    category: "Cap",
    quantity: 0,
  },
  {
    id: 3,
    image: "images/hoodie-1.png",
    title: "Basic Hoodie",
    description: "Comfortable and casual, suitable for everyday wear.",
    price: "60",
    category: "Hoodie",
    quantity: 0,
  },
  {
    id: 4,
    image: "images/hoodie-2.png",
    title: "Zip-up Hoodie",
    description:
      "Functional and stylish, perfect for outdoor activities or casual wear.",
    price: "80",
    category: "Hoodie",
    quantity: 0,
  },
  {
    id: 5,
    image: "images/hoodie-3.png",
    title: "Graphic Hoodie",
    description: "Cool and trendy, perfect for making a fashion statement.",
    price: "100",
    category: "Hoodie",
    quantity: 0,
  },
  {
    id: 6,
    image: "images/hoodie-4.png",
    title: "Pullover Hoodie",
    description: "Warm and comfortable, suitable for colder weather.",
    price: "90",
    category: "Hoodie",
    quantity: 0,
  },
  {
    id: 7,
    image: "images/hoodie-5.png",
    title: "Pullover Hoodie",
    description: "Rustic and stylish, perfect for a range of casual occasions.",
    price: "80",
    category: "Hoodie",
    quantity: 0,
  },
  {
    id: 8,
    image: "images/hoodie-6.png",
    title: "Pullover Hoodie",
    description: "Sophisticated and elegant, suitable for formal occasions.",
    price: "110",
    category: "Hoodie",
    quantity: 0,
  },
  {
    id: 9,
    image: "images/jacket-1.png",
    title: "Leather Jacket",
    description: "Stylish and timeless, suitable for a range of occasions.",
    price: "250",
    category: "Jacket",
    quantity: 0,
  },
  {
    id: 10,
    image: "images/jacket-2.png",
    title: "Bomber Jacket",
    description:
      "Cool and casual, perfect for adding a trendy touch to your look.",
    price: "120",
    category: "Jacket",
    quantity: 0,
  },
  {
    id: 11,
    image: "images/shirt-1.png",
    title: "Dress Shirt",
    description: "Sophisticated and elegant, suitable for formal occasions.",
    price: "120",
    category: "Shirt",
    quantity: 0,
  },
  {
    id: 12,
    image: "images/shirt-2.png",
    title: "Casual T-shirt",
    description: "Comfortable and trendy, suitable for everyday wear.",
    price: "30",
    category: "Shirt",
    quantity: 0,
  },
  {
    id: 13,
    image: "images/shirt-3.png",
    title: "Polo Shirt",
    description:
      "Sporty and stylish, suitable for a range of casual occasions.",
    price: "50",
    category: "Shirt",
    quantity: 0,
  },
  {
    id: 14,
    image: "images/shirt-4.png",
    title: "Denim Shirt",
    description:
      "Classic and versatile, suitable for a range of occasions from work to casual wear.",
    price: "80",
    category: "Shirt",
    quantity: 0,
  },
  {
    id: 15,
    image: "images/sock-1.png",
    title: "Ankle Sock",
    description:
      "Simple and versatile, suitable for a range of casual occasions.",
    price: "10",
    category: "Sock",
    quantity: 0,
  },
  {
    id: 16,
    image: "images/sock-2.png",
    title: "Dress Sock",
    description: "Elegant and classy, suitable for formal occasions.",
    price: "15",
    category: "Sock",
    quantity: 0,
  },
  {
    id: 17,
    image: "images/trouser-1.png",
    title: "Slim Fit Trousers",
    description:
      "Flattering and comfortable, suitable for a variety of occasions.",
    price: "100",
    category: "Trouser",
    quantity: 0,
  },
  {
    id: 18,
    image: "images/trouser-2.png",
    title: "Chinos",
    description:
      "Classic and versatile, suitable for a range of occasions from work to casual wear.",
    price: "80",
    category: "Trouser",
    quantity: 0,
  },
  {
    id: 19,
    image: "images/short-1.png",
    title: "Cargo Shorts",
    description:
      "Functional and stylish, perfect for outdoor activities or casual wear.",
    price: "70",
    category: "Short",
    quantity: 0,
  },
  {
    id: 20,
    image: "images/shoe-1.png",
    title: "Sneakers",
    description: "Comfortable and stylish, suitable for everyday wear.",
    price: "120",
    category: "Shoe",
    quantity: 0,
  },
  {
    id: 21,
    image: "images/shoe-2.png",
    title: "Loafers",
    description:
      "Classic and versatile, suitable for a range of occasions from work to formal events.",
    price: "200",
    category: "Shoe",
    quantity: 0,
  },
  {
    id: 22,
    image: "images/shoe-3.png",
    title: "Running Shoes",
    description:
      "Functional and comfortable, perfect for sports and outdoor activities.",
    price: "150",
    category: "Shoe",
    quantity: 0,
  },
  {
    id: 23,
    image: "images/shoe-4.png",
    title: "Boots",
    description:
      "Sturdy and stylish, suitable for a range of casual and outdoor occasions.",
    price: "170",
    category: "Shoe",
    quantity: 0,
  },
  {
    id: 24,
    image: "images/shoe-5.png",
    title: "Boots",
    description:
      "These chic boots are perfect for casual outings with their rustic style.",
    price: "150",
    category: "Shoe",
    quantity: 0,
  },
  {
    id: 25,
    image: "images/shoe-6.png",
    title: "Boots",
    description: "Elevate any outfit with this refined and polished accessory.",
    price: "280",
    category: "Shoe",
    quantity: 0,
  },
  {
    id: 26,
    image: "images/shoe-7.png",
    title: "Boots",
    description: "Classic yet trendy, perfect for a range of occasions.",
    price: "220",
    category: "Shoe",
    quantity: 0,
  },
  {
    id: 27,
    image: "images/shoe-8.png",
    title: "Boots",
    description:
      "Make a statement with these elegant shoes at your next formal event.",
    price: "175",
    category: "Shoe",
    quantity: 0,
  },
  {
    id: 28,
    image: "images/shoe-9.png",
    title: "Boots",
    description:
      "Sleek and sturdy, ideal for outdoor adventures and relaxed weekends.",
    price: "250",
    category: "Shoe",
    quantity: 0,
  },
];

let selectedProduct = productsList.find(function (product) {
  return product.id == searchParamsId;
});
function generatingColor() {
  let colorSelector = $.querySelectorAll(".color-selector > div");
  colorSelector.forEach(function (selectedColor) {
    selectedColor.style.backgroundColor = selectedColor.dataset.color;
  });
}
function generatingProduct(product) {
  let mainInformation = $.querySelector(".main-information");
  let productImageContainer = $.querySelector(".product-image-container");
  let productDetails = $.querySelector(".product-details");
  productImageContainer.innerHTML = "";
  productDetails.innerHTML = "";

  productImageContainer.insertAdjacentHTML(
    "beforeend",
    `<img src="${product.image}" alt="${product.title}"/>`
  );
  productDetails.insertAdjacentHTML(
    "afterbegin",
    `
    <h1 class="item1 title">${product.title}</h1>
    <h3 class="item2 description">${product.description}</h3>
    <div class="item-3">
      <h4 class="price">$${product.price}</h4>
      <div class="color">
        <h3>Choose a Color</h3>
        <div class="color-selector">
          <div data-color="#008cff"></div>
          <div data-color="#ff00c8"></div>
          <div data-color="#00ff0d"></div>
          <div data-color="#000000"></div>
          <div data-color="#ff0000"></div>
        </div>
      </div>
    </div> 
    <div class="add-minus">
      <div class="minus" onclick="minusProduct()"> - </div>
      <div class="product-number">1</div>
      <div class="plus" onclick="plusProduct()"> + </div>
    </div>
    <div class="buttons">
      <button class="buy">Buy Now</button>
      <button class="add" onclick="addingToCart(${product.id})">Add to Cart</button>
    </div>
    <div class="delivery">
      <div class="part1">
        <h3>Free Delivery</h3>
        <p>Enter your Postal code for Delivery Availability</p>
      </div>
      <div class="part2">
        <h3>Return Delivery</h3>
        <p>Free 30Days Delivery Returns. <a href="#">Details...</a></p>
        <p></p>
      </div>
      `
  );
  mainInformation.append(productImageContainer, productDetails);
  generatingColor();

  let pageTitle = $.querySelector("title");
  let pageImage = $.querySelector('link[rel="shortcut icon"]');
  pageImage.href = product.image;
  pageTitle.innerHTML = `All Us Shop | ${product.title}`;
}
function plusProduct() {
  let productQuantity = $.querySelector(".product-number");
  productQuantity.innerHTML++;
}
function minusProduct() {
  let productQuantity = $.querySelector(".product-number");
  if (productQuantity.innerHTML != 1) {
    productQuantity.innerHTML--;
  }
}
function addingToCart(productId) {
  let productQuantity = $.querySelector(".product-number");
  if (productsInCart.length != 0) {
    productsInCart = JSON.parse(localStorage.getItem("localProductsInCart"));
    let productIndex = productsInCart.findIndex(function (product) {
      return product.id === productId;
    });

    if (productIndex != -1) {
      productsInCart[productIndex].quantity =
        productQuantity.innerHTML * 1 +
        productsInCart[productIndex].quantity * 1;
    } else {
      productsInCart.push(selectedProduct);
      productsInCart[productsInCart.length - 1].quantity =
        productQuantity.innerHTML;
    }
  } else {
    selectedProduct.quantity = productQuantity.innerHTML;
    productsInCart.push(selectedProduct);
  }
  localStorage.setItem("localProductsInCart", JSON.stringify(productsInCart));
  alertAdding();
}
function creatingComment() {
  let commentsContainer = $.querySelector(".comments");
  let textarea = $.querySelector("textarea");
  commentsContainer.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="comment-container">
      <div class="comment">
        <div class="user-profile">
          <img src="images/user-1.png" alt="user-1">
            <h5>NO2</h5>
        </div>
        <div class="comment-text">${textarea.value}</div>
      </div>
    </div>
     `
  );
  textarea.value = "";
}
function getFromLocalStorage() {
  let localProductsInCart;
  if (localStorage.getItem("localProductsInCart")) {
    localProductsInCart = JSON.parse(
      localStorage.getItem("localProductsInCart")
    );
    productsInCart = localProductsInCart;
  } else {
    productsInCart = [];
  }
  generatingProduct(selectedProduct);
}
function alertAdding() {
  let alertContainer = $.querySelector(".alert-container");
  alertContainer.insertAdjacentHTML(
    "beforeend",
    `
    <div class="successful-added">
      <span>added successfully</span>
      <i class="fa fa-angellist"></i>
    </div>
    `
  );
  let successfulAdded = $.querySelectorAll(".successful-added");

  successfulAdded.forEach(function (alert) {
    alert.addEventListener("animationend", function (event) {
      event.target.remove();
    });
  });
}
function alertAddingPosition() {
  let alertContainer = $.querySelector(".alert-container");
  if (window.innerWidth >= 768) {
    if (window.scrollY >= 1) {
      alertContainer.style.top = Math.ceil(window.scrollY + 54) + "px";
    } else {
      alertContainer.style.top = 54 + "px";
    }
  } else {
    alertContainer.style.top = 54 + "px";
  }
}
confirmComment.addEventListener("click", creatingComment);
window.addEventListener("load", getFromLocalStorage);
window.addEventListener("scroll", alertAddingPosition);

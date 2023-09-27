import { productsList, alertAdding, $ } from "./data.js";
let confirmComment = $.querySelector(".confirm-comment");
let productContainer = document.querySelector(".product-image-container");
let productImg = null;
let searchParams = new URLSearchParams(location.search);
let searchParamsId = searchParams.get("id");
let productsInCart = [];
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
    `<img class="product-img" src="${product.image}" alt="${product.title}"/>`
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
  productImg = document.querySelector(".product-img");
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
function zoomIn(e) {
  productImg.style.transformOrigin = `${e.offsetX}px ${e.offsetY}px`;
  productImg.classList.add("zoom");
}
function zoomOut(e) {
  productImg.classList.remove("zoom");
}
confirmComment.addEventListener("click", creatingComment);
productContainer.addEventListener("mousemove", zoomIn);
productContainer.addEventListener("mouseout", zoomOut);
window.addEventListener("load", getFromLocalStorage);

window.plusProduct = plusProduct;
window.minusProduct = minusProduct;
window.addingToCart = addingToCart;

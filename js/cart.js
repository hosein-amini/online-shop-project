let $ = document;
let totalPriceContainer = $.querySelector(".total-price-container");
let checkoutButton = $.querySelector(".total-price-container > button");
let cancelButton = $.querySelector(".cancel");
let confirmButton = $.querySelector(".confirm");
let modalWrapper = $.querySelector(".login-alert-bg");
let modal = $.querySelector(".login-alert");
let productsInCart = [];

function totalPricePosition() {
  totalPriceContainer.style.top = window.scrollY + 80 + "px";
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
  generatingCart();
}
function generatingCart() {
  let cart = $.querySelector(".cart");
  let main = $.querySelector("main");
  let body = $.querySelector("body");
  if (productsInCart.length != 0) {
    totalPriceContainer.classList.remove("none");
    cart.classList.remove("none");
    main.classList.remove("empty");
    body.classList.remove("empty");
    let tBodyFragment = new DocumentFragment();
    let tBody = $.querySelector("tbody");
    let sumPrices = 0;
    productsInCart.forEach(function (product) {
      tBody.innerHTML = "";
      let tableTr = $.createElement("tr");
      tableTr.insertAdjacentHTML(
        "beforeend",
        `<td>
          <div>
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
          </div>
         </td>
         <td>
          <div>
            <div class="plus-minus">
              <div class="minus" onclick="minusProduct(${product.id})">-</div>
              <div class="number">${product.quantity}</div>
              <div class="plus" onclick="plusProduct(${product.id})">+</div>
            </div>
            <div class="remove"onclick="removeProduct(${product.id})">
              <i class="fa fa-trash"></i>
              <span>remove</span>
            </div>
           </div>
          </td>
         <td>
          <div><span>$${product.price}</span></div>
         </td>`
      );
      tBodyFragment.append(tableTr);
      sumPrices += product.price * product.quantity;
    });
    tBody.append(tBodyFragment);
    let totalPrice = $.querySelector(
      ".total-price-container > div span:last-of-type"
    );
    totalPrice.innerHTML = "$" + sumPrices;
  } else {
    totalPriceContainer.classList.add("none");
    cart.classList.add("none");
    main.classList.add("empty");
    body.classList.add("empty");
  }
}
function plusProduct(productId) {
  productsInCart.some(function (product) {
    if (productId === product.id) {
      product.quantity++;
      return true;
    }
  });
  localStorage.setItem("localProductsInCart", JSON.stringify(productsInCart));
  generatingCart();
}
function minusProduct(productId) {
  productsInCart.some(function (product) {
    if (productId === product.id) {
      if (product.quantity === 1) {
        removeProduct(product.id);
        return true;
      } else {
        product.quantity--;
        localStorage.setItem(
          "localProductsInCart",
          JSON.stringify(productsInCart)
        );
        generatingCart();
        return true;
      }
    }
  });
}
function removeProduct(productId) {
  let productIndex = productsInCart.findIndex(function (product) {
    return productId === product.id;
  });
  productsInCart.splice(productIndex, 1);
  localStorage.setItem("localProductsInCart", JSON.stringify(productsInCart));
  generatingCart();
}
function paying() {
  if ($.cookie) {
    Swal.fire({
      icon: "success",
      title: "📦 Order Placed! 🎉",
      html: `<h4>Order ID:<span class="order-id">#5729401</span></h4><p class="order-description">We're getting everything ready to ship your items. You'll receive an email with the order details soon. If you have any questions, let us know! 😊</p>`,
      timer: 10000,
      timerProgressBar: true,
      willClose: () => {
        productsInCart = [];
        localStorage.setItem(
          "localProductsInCart",
          JSON.stringify(productsInCart)
        );
        location.reload();
      },
    });
  } else {
    Swal.fire({
      title: "you have to login first",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "OK , i'll do it",
      cancelButtonText: "later",
    }).then((result) => {
      if (result.isConfirmed) {
        location.assign("./login.html");
      }
    });
  }
  let confirmButton = $.querySelector("button.swal2-confirm.swal2-styled");
  confirmButton.blur();
}

checkoutButton.addEventListener("click", paying);
window.addEventListener("load", getFromLocalStorage);
window.addEventListener("scroll", totalPricePosition);

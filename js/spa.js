import router from "./router.js";

let productContainers = [...document.querySelectorAll(".product-container")];
let userInfoItem = document.querySelector(".user-info-item");
let productTarget = null;
// let productId = null;
userInfoItem.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.href) {
    urlRoutes(e.target.href);
  } else {
    urlRoutes(e.target.parentElement.href);
  }
});

productContainers.some((productContainer) => {
  productContainer.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.href) {
      productTarget = e.target;
      urlRoutes(productTarget.href);
      return true;
    }
    if (e.target.parentElement.href) {
      productTarget = e.target.parentElement;
      urlRoutes(productTarget.href);
      return true;
    }
    if (e.target.parentElement.parentElement.href) {
      if (e.target.className !== "add-to-cart") {
        productTarget = e.target.parentElement.parentElement;
        urlRoutes(productTarget.href);
      }
      return true;
    }
    if (e.target.parentElement.parentElement.parentElement.href) {
      if (e.target.className !== "add-to-cart") {
        productTarget = e.target.parentElement.parentElement.parentElement;
        urlRoutes(productTarget.href);
      }
      return true;
    }
  });
});

function urlRoutes(route) {
  // console.log(route);
  window.history.pushState({}, "", route);
  locationHandler();
}

async function locationHandler() {
  const loc = window.location.pathname;
  if (loc === "/product-details") {
    const fullLoc = window.location.href;
    let productId = fullLoc.slice(fullLoc.indexOf("=") + 1);
    console.log(productId);
  }
  console.log(loc);
  let url = router[loc].template

  const html = await fetch(url).then((res) => res.text());
  document.querySelector("#content").innerHTML = html;

  const titleElem = document.querySelector("title");
  titleElem.innerHTML = router[loc].title;
}

window.onpopstate = () => locationHandler();

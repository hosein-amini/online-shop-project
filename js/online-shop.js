import { productsList, alertAdding, $ } from "./data.js";
let searchButton = $.querySelector(".search img");
let categories = $.querySelector(".categories");
let hamburgerMenu = $.querySelector(".hamburger-menu");
let isMobileSize = window.innerWidth <= 768;
let prevMobileSize = isMobileSize;
let isMobileSizeProduct = window.innerWidth <= 576;
let prevMobileSizeProduct = isMobileSizeProduct;
let pageItems = 10;
let slideContainer = [
  {
    id: 1,
    destination: "#",
    image: "images/1.jpg",
    description1: "Find whatever you want",
    description2: "Anytime , Anywhere",
  },
  {
    id: 2,
    destination: "#",
    image: "images/2.jpg",
    description1: "don't think about money",
    description2: "change your thinking",
  },
  {
    id: 3,
    destination: "#",
    image: "images/3.jpg",
    description1: "buy any thing in best quality",
    description2: "it's your turn",
  },
  {
    id: 4,
    destination: "#",
    image: "images/4.jpg",
    description1: "The best choices come from within you",
    description2: "be your best self",
  },
];

let productsInCart = [];
let filteredProductsList = [];
let selectedCategoryItems = [];
let allCategoryItems = [
  "Shirt",
  "Cap",
  "Trouser",
  "Short",
  "Shoe",
  "Sock",
  "Jacket",
  "Hoodie",
];

const addingToCart = (productId, event) => {
  event.preventDefault();
  let addedProduct = filteredProductsList.find(function (product) {
    return product.id === productId;
  });
  if (productsInCart.length != 0) {
    productsInCart = JSON.parse(localStorage.getItem("localProductsInCart"));
    let productIndex = productsInCart.findIndex(function (product) {
      return product.id === productId;
    });

    if (productIndex != -1) {
      productsInCart[productIndex].quantity++;
    } else {
      productsInCart.push(addedProduct);
      productsInCart[productsInCart.length - 1].quantity++;
    }
  } else {
    addedProduct.quantity++;
    productsInCart.push(addedProduct);
  }
  localStorage.setItem("localProductsInCart", JSON.stringify(productsInCart));
  alertAdding();
};
function generatingPageButtons(products) {
  let pages = Math.ceil(products.length / pageItems);
  let pageButtonsContainer = $.querySelector(".pagination");
  pageButtonsContainer.innerHTML = "";

  for (let pageNumber = 1; pageNumber <= pages; pageNumber++) {
    let pageButton = $.createElement("div");
    pageButton.classList.add("page");
    pageButton.id = "page" + pageNumber;
    pageButton.addEventListener("click", function () {
      changePage(pageNumber, products);
      categories.scrollIntoView({ behavior: "smooth" });
    });
    pageButton.innerHTML = pageNumber;
    pageButtonsContainer.append(pageButton);
  }
  let firstPage = $.querySelector("#page1");
  firstPage.classList.add("active");
  changePage(1, products);
}
const changePage = (pageNumber, products) => {
  let activeButton = $.querySelector(".active");
  let selectedButton = $.getElementById("page" + pageNumber);
  let endProduct = pageNumber * pageItems;
  let startProduct = endProduct - pageItems;
  activeButton.classList.remove("active");
  selectedButton.classList.add("active");
  let selectedFinalFilteredProducts = products.slice(startProduct, endProduct);
  generatingProducts(selectedFinalFilteredProducts);
};
const generatingMobileProducts = (products) => {
  let productsContainer = $.querySelector(".products-container");
  let productsContainerFragment = new DocumentFragment();
  productsContainer.innerHTML = "";
  products.forEach(function (product) {
    let outerProductContainer = $.createElement("div");
    outerProductContainer.classList.add("product-container-padding");
    outerProductContainer.insertAdjacentHTML(
      "beforeend",

      `<a class="product-container"  href="./product-details.html?id=${product.id}">

        <div class="product-image-container">
          <img src="${product.image}" alt="${product.title}" />
        </div>
      
        <div class="product-details-bottom">
          <div class="product-title">${product.title}</div>
          <div class="product-description">${product.description}</div>
          <div id="bottom">
            <div class="product-price">$${product.price}</div>
            <div class="add-to-cart" onclick="addingToCart(${product.id},event)">Add to Cart</div>
          </div>
        </div>
      </a>`
    );

    productsContainerFragment.appendChild(outerProductContainer);
  });
  productsContainer.append(productsContainerFragment);
};
const generatingDesktopProducts = (products) => {
  let productsContainer = $.querySelector(".products-container");
  let productsContainerFragment = new DocumentFragment();
  productsContainer.innerHTML = "";
  products.forEach(function (product) {
    let outerProductContainer = $.createElement("div");
    outerProductContainer.classList.add("product-container-padding");
    outerProductContainer.insertAdjacentHTML(
      "beforeend",
      `<a class="product-container" href="./product-details.html?id=${product.id}">
        <div class="product-details-top">
          <div class="product-image-container">
            <img src="${product.image}" alt="${product.title}"/>
            <div class="product-description">${product.description}</div>
          </div>
          <div class="product-title">${product.title}</div>
        </div>
        
        <div class="product-details-bottom">
          <div class="product-price">$${product.price}</div>
          <div class="add-to-cart" onclick="addingToCart(${product.id},event)">Add to Cart</div>
        </div>
      </a>`
    );
    productsContainerFragment.appendChild(outerProductContainer);
  });
  productsContainer.append(productsContainerFragment);
};
const generatingProducts = (products) => {
  if (isMobileSizeProduct) {
    generatingMobileProducts(products);
  } else {
    generatingDesktopProducts(products);
  }
};
const filteringProducts = (selectedCategories) => {
  filteredProductsList = [];
  selectedCategories.forEach(function (selectedCategoryItem) {
    let filteredProducts = productsList.filter(function (selectedProduct) {
      return selectedCategoryItem === selectedProduct.category;
    });
    filteredProductsList.push(...filteredProducts);
  });
  generatingPageButtons(filteredProductsList);
};
const isAllButtonActive = (allItemButton, items) => {
  allItemButton.classList.add("change-color");
  Object.values(items).forEach(function (item) {
    item.classList.remove("change-color");
  });
  selectedCategoryItems.length = [];
  filteringProducts(allCategoryItems);
};
const selectCategories = (allItemButton, item, items) => {
  item.classList.toggle("change-color");
  let itemIndex = selectedCategoryItems.findIndex(function (selectedItem) {
    return selectedItem === item.innerHTML;
  });

  if (itemIndex === -1) {
    selectedCategoryItems.push(item.innerHTML);
  } else {
    selectedCategoryItems.splice(itemIndex, 1);
  }

  if (selectedCategoryItems.length === 1) {
    allItemButton.classList.remove("change-color");
  }

  if (
    selectedCategoryItems.length === 8 ||
    selectedCategoryItems.length === 0
  ) {
    isAllButtonActive(allItemButton, items);
  } else {
    filteringProducts(selectedCategoryItems);
  }
};
const displayingCategories = () => {
  let showFilter = $.querySelector(".plus");
  let hiddenFilter = $.querySelector(".minus");
  let categoriesItems = $.querySelector(".categories-items");
  let items = $.querySelectorAll(".item");
  let main = $.querySelector("main");
  let allItemButton = $.querySelector(".all-item");
  categories.classList.toggle("orange");
  showFilter.classList.toggle("hidden");
  hiddenFilter.classList.toggle("hidden");
  categoriesItems.classList.toggle("left-to-right");
  main.classList.toggle("top-to-bottom");
  items.forEach(function (item) {
    item.removeEventListener("click", function () {
      selectCategories(allItemButton, item, items);
    });
  });

  items.forEach(function (item) {
    item.addEventListener("click", function () {
      selectCategories(allItemButton, item, items);
    });
  });

  allItemButton.addEventListener("click", function () {
    isAllButtonActive(allItemButton, items);
  });
};
const displayingDesktopSearchField = () => {
  let desktopSearchField = $.querySelector(".search input");
  desktopSearchField.classList.toggle("show");
};
const displayingMobileSearchField = () => {
  let mobileSearchField = $.querySelector(".menu > input");
  mobileSearchField.classList.toggle("sliding");
};
const displayingMenu = () => {
  let mobileMenu = $.querySelector(".mobile-menu");
  let mobileMenuExit = $.querySelector(".mobile-menu-exit");
  mobileMenu.style.left = 0;
  mobileMenuExit.style.display = "block";
  document.body.style.overflow = "hidden";
  mobileMenuExit.addEventListener("click", function () {
    mobileMenu.style.left = -100 + "%";
    mobileMenuExit.style.display = "none";
    document.body.style.overflow = "";
  });
};
const generatingSlider = () => {
  let sliderWrapper = $.querySelector(".slider-wrapper");
  let slideFragment = new DocumentFragment();
  slideContainer.forEach(function (selectedSlide) {
    let slide = $.createElement("div");
    slide.classList.add("slide", "slide" + selectedSlide.id);
    slide.style.backgroundImage = "url(" + selectedSlide.image + ")";
    slide.insertAdjacentHTML(
      "beforeend",
      '<div class="center-title"><div><h1>' +
        selectedSlide.description1 +
        "</h1><h1>" +
        selectedSlide.description2 +
        '</h1></div><a href="#">Shop Now</a></div>'
    );
    slideFragment.appendChild(slide);
  });
  sliderWrapper.appendChild(slideFragment);
};
const scrollHandler = () => {
  let container = $.querySelector(".container");
  let scrollFiller = $.querySelector(".scroll-filler");
  let scrollFillerValue = Math.round(
    (container.clientWidth * window.scrollY * 100) /
      ($.body.clientHeight - window.innerHeight) /
      container.clientWidth
  );
  scrollFiller.style.width = scrollFillerValue + "%";
};
const resizeHandler = () => {
  isMobileSize = window.matchMedia("(max-width : 768px)").matches;
  isMobileSizeProduct = window.innerWidth <= 576;

  if (isMobileSize !== prevMobileSize) {
    prevMobileSize = isMobileSize;
    if (isMobileSize) {
      searchButton.removeEventListener("click", displayingDesktopSearchField);
      searchButton.addEventListener("click", displayingMobileSearchField);
    } else {
      searchButton.removeEventListener("click", displayingMobileSearchField);
      searchButton.addEventListener("click", displayingDesktopSearchField);
    }
  }

  if (isMobileSizeProduct !== prevMobileSizeProduct) {
    prevMobileSizeProduct = isMobileSizeProduct;
    generatingPageButtons(filteredProductsList);
  }
};
const getFromLocalStorage = () => {
  let localProductsInCart;
  if (localStorage.getItem("localProductsInCart")) {
    localProductsInCart = JSON.parse(
      localStorage.getItem("localProductsInCart")
    );
    productsInCart = localProductsInCart;
  } else {
    productsInCart = [];
  }
};
function successfulAddedPosition() {
  let alertContainer = $.querySelector(".alert-container");
  let slide = $.querySelector(".slide");
  let menu = $.querySelector(".menu");
  let slideHeight = parseInt(getComputedStyle(slide).height);
  let menuHeight = parseInt(getComputedStyle(menu).height);
  if (window.scrollY >= slideHeight - menuHeight) {
    alertContainer.style.top =
      Math.ceil(window.scrollY - slideHeight + menuHeight + 5) + "px";
  }
}
if (isMobileSize) {
  searchButton.addEventListener("click", displayingMobileSearchField);
} else {
  searchButton.addEventListener("click", displayingDesktopSearchField);
}

generatingSlider();
filteringProducts(allCategoryItems);
categories.addEventListener("click", displayingCategories);
hamburgerMenu.addEventListener("click", displayingMenu);
window.addEventListener("scroll", scrollHandler);
window.addEventListener("resize", resizeHandler);
window.addEventListener("load", getFromLocalStorage);
window.addEventListener("scroll", successfulAddedPosition);

window.addingToCart = addingToCart;

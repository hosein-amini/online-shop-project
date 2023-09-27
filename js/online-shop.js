import { productsList, alertAdding, $ } from "./data.js";
let searchButton = $.querySelector(".search img");
let categories = $.querySelector(".categories");
let hamburgerMenu = $.querySelector(".hamburger-menu");
let up = $.querySelector(".chevron-up");
let emailContainer = $.querySelector(".email-container");
let headerShoppingButton = $.querySelector(".header-shopping-button");
let isMobileSize = window.innerWidth <= 768;
let prevMobileSize = isMobileSize;
let isMobileSizeProduct = window.innerWidth <= 576;
let prevMobileSizeProduct = isMobileSizeProduct;
let pageItems = 10;
let searchBox = $.querySelector(".search input");
let suggestionsBox = $.querySelector(".search .autocom-box");
let mobileSearchBox = $.querySelector(".mobile-search input");
let mobileSuggestionsBox = $.querySelector(".mobile-search .autocom-box");
//! Type writer dependencies
let typeText = "Anytime, anywhere, ";
let typeVariableWords = [
  "Shop with ease.",
  "Find your favorites.",
  "Browse and buy.",
];
let typeSpeed = 100;
let clearSpeed = 100;
let endTextPauseTime = 1500;
let startTextPauseTime = 300;
let typeCounter = 0;
let typeVariableWordsCounter = -1;
let typeTextElem = document.querySelector("#typeWriter");
let typeIndex = null;
let typeSplittedWord = null;
typeTextElem.innerHTML = typeText;
//!-------------------------------------

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
let swiper = new Swiper(".mainSwiper", {
  speed: 800,
  slidesPerView: 1,
  spaceBetween: 0,
  centeredSlides: true,
  loop: true,
  grabCursor: true,
  followFinger: true,
  effect: "cards",
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  direction: "vertical",
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {},
});

//!-------------------------------------functions

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
  suggestionsBox.classList.add("hide");
  searchBox.value = "";
  searchBox.classList.remove("ChangeborderRadius");
  let desktopSearchField = $.querySelector(".search input");
  desktopSearchField.classList.toggle("show");
};
const displayingMobileSearchField = () => {
  mobileSuggestionsBox.classList.add("hide");
  mobileSearchBox.value = "";
  mobileSearchBox.classList.remove("ChangeborderRadius");
  let mobileSearchField = $.querySelector(".mobile-search");
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
const scrollHandler = () => {
  let container = $.querySelector(".container");
  let scrollFiller = $.querySelector(".scroll-filler");
  let scrollFillerValue = Math.round(
    (container.clientWidth * window.scrollY * 100) /
      ($.body.clientHeight - window.innerHeight) /
      container.clientWidth
  );
  scrollFiller.style.width = scrollFillerValue + "%";

  if (window.scrollY >= emailContainer.offsetTop) {
    up.classList.add("active");
  } else {
    up.classList.remove("active");
  }
};
const moveUp = () => {
  window.scrollTo(0, 0);
};
const moveToProducts = () => {
  categories.scrollIntoView();
};
const resizeHandler = () => {
  isMobileSize = window.matchMedia("(max-width : 768px)").matches;
  isMobileSizeProduct = window.innerWidth <= 576;

  if (isMobileSize !== prevMobileSize) {
    prevMobileSize = isMobileSize;
    if (isMobileSize) {
      selectingSuggestion();
      searchButton.removeEventListener("click", displayingDesktopSearchField);
      searchButton.addEventListener("click", displayingMobileSearchField);
    } else {
      mobileSelectingSuggestion();
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
const searching = () => {
  searchBox.classList.add("ChangeborderRadius");
  let searchValue = searchBox.value.toLowerCase();
  if (searchValue) {
    suggestionsBox.classList.remove("hide");
    suggestionsBox.innerHTML = "";

    let selectedSuggestions = productsList.filter(function (product) {
      return product.title.toLocaleLowerCase().includes(searchValue);
    });
    if (selectedSuggestions.length) {
      suggestionsBoxGenerator(selectedSuggestions);
    } else {
      selectedSuggestions = [{ id: 0, title: "not found !!!" }];
      suggestionsBoxGenerator(selectedSuggestions);
    }
  } else {
    suggestionsBox.classList.add("hide");
    searchBox.classList.remove("ChangeborderRadius");
  }
};
const selectingSuggestion = () => {
  searchBox.value = "";
  suggestionsBox.classList.add("hide");
  searchBox.classList.remove("ChangeborderRadius");
};
const suggestionsBoxGenerator = (products) => {
  let suggestionsBoxFragment = new DocumentFragment();
  products.some(function (product) {
    let productNameWrapper = $.createElement("li");
    if (product.id === 0) {
      productNameWrapper.insertAdjacentHTML(
        "beforeend",
        `<a href="#0" onclick="selectingSuggestion()">${product.title}</a>`
      );
      suggestionsBoxFragment.append(productNameWrapper);
      return true;
    }
    productNameWrapper.insertAdjacentHTML(
      "beforeend",
      `<a href="./product-details.html?id=${product.id}" onclick="selectingSuggestion(event)">${product.title}</a>`
    );
    suggestionsBoxFragment.append(productNameWrapper);
  });
  suggestionsBox.append(suggestionsBoxFragment);
};
const mobileSearching = () => {
  mobileSearchBox.classList.add("ChangeborderRadius");
  let searchValue = mobileSearchBox.value.toLowerCase();
  if (searchValue) {
    mobileSuggestionsBox.classList.remove("hide");
    mobileSuggestionsBox.innerHTML = "";

    let selectedSuggestions = productsList.filter(function (product) {
      return product.title.toLocaleLowerCase().includes(searchValue);
    });
    if (selectedSuggestions.length) {
      mobileSuggestionsBoxGenerator(selectedSuggestions);
    } else {
      selectedSuggestions = [{ id: 0, title: "not found !!!" }];
      mobileSuggestionsBoxGenerator(selectedSuggestions);
    }
  } else {
    mobileSuggestionsBox.classList.add("hide");
    mobileSearchBox.classList.remove("ChangeborderRadius");
  }
};
const mobileSelectingSuggestion = () => {
  mobileSearchBox.value = "";
  mobileSuggestionsBox.classList.add("hide");
  mobileSearchBox.classList.remove("ChangeborderRadius");
};
const mobileSuggestionsBoxGenerator = (products) => {
  let mobileSuggestionsBoxFragment = new DocumentFragment();
  products.some(function (product) {
    let productNameWrapper = $.createElement("li");
    if (product.id === 0) {
      productNameWrapper.insertAdjacentHTML(
        "beforeend",
        `<a href="#0" onclick="mobileSelectingSuggestion()">${product.title}</a>`
      );
      mobileSuggestionsBoxFragment.append(productNameWrapper);
      return true;
    }
    productNameWrapper.insertAdjacentHTML(
      "beforeend",
      `<a href="./product-details.html?id=${product.id}" onclick="mobileSelectingSuggestion(event)">${product.title}</a>`
    );
    mobileSuggestionsBoxFragment.append(productNameWrapper);
  });
  mobileSuggestionsBox.append(mobileSuggestionsBoxFragment);
};
//! Type writer functions
const addTextLetter = (typeCounter) => {
  typeIndex = variableWordsAdder();
  typeSplittedWord = typeVariableWords.at(typeIndex).split("");
  let addWords = setInterval(() => {
    if (typeCounter < typeSplittedWord.length) {
      typeText += typeSplittedWord[typeCounter];
      typeTextElem.innerHTML = typeText;
    } else {
      clearInterval(addWords);
      setTimeout(() => {
        clearTextLetter(typeCounter);
      }, endTextPauseTime);
    }
    typeCounter++;
  }, typeSpeed);
};
const clearTextLetter = (typeCounter) => {
  let removeWords = setInterval(() => {
    if (typeCounter !== 1) {
      typeText = typeText.slice(0, -1);
      typeTextElem.innerHTML = typeText;
      typeCounter--;
    } else {
      typeCounter--;
      clearInterval(removeWords);
      setTimeout(() => {
        addTextLetter(typeCounter);
      }, startTextPauseTime);
    }
  }, clearSpeed);
};
const variableWordsAdder = () => {
  if (typeVariableWordsCounter < typeVariableWords.length - 1) {
    typeVariableWordsCounter++;
  } else {
    typeVariableWordsCounter = 0;
  }
  return typeVariableWordsCounter;
};
//!-------------------------------------
if (isMobileSize) {
  searchButton.addEventListener("click", displayingMobileSearchField);
} else {
  searchButton.addEventListener("click", displayingDesktopSearchField);
}

addTextLetter(typeCounter);
filteringProducts(allCategoryItems);
categories.addEventListener("click", displayingCategories);
hamburgerMenu.addEventListener("click", displayingMenu);
up.addEventListener("click", moveUp);
headerShoppingButton.addEventListener("click", moveToProducts);
searchBox.addEventListener("input", searching);
mobileSearchBox.addEventListener("input", mobileSearching);
window.addEventListener("scroll", scrollHandler);
window.addEventListener("resize", resizeHandler);
window.addEventListener("load", getFromLocalStorage);

window.addingToCart = addingToCart;
window.selectingSuggestion = selectingSuggestion;
window.mobileSelectingSuggestion = mobileSelectingSuggestion;

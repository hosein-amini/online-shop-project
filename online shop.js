let $ = document;
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
if (isMobileSize) {
  searchButton.addEventListener("click", displayingMobileSearchField);
} else {
  searchButton.addEventListener("click", displayingDesktopSearchField);
}
function addingToCart(productId, event) {
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
  alertAdding()
}
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
function changePage(pageNumber, products) {
  let activeButton = $.querySelector(".active");
  let selectedButton = $.getElementById("page" + pageNumber);
  let endProduct = pageNumber * pageItems;
  let startProduct = endProduct - pageItems;
  activeButton.classList.remove("active");
  selectedButton.classList.add("active");
  let selectedFinalFilteredProducts = products.slice(startProduct, endProduct);
  generatingProducts(selectedFinalFilteredProducts);
}
function generatingMobileProducts(products) {
  let productsContainer = $.querySelector(".products-container");
  let productsContainerFragment = new DocumentFragment();
  productsContainer.innerHTML = "";
  products.forEach(function (product) {
    let outerProductContainer = $.createElement("div");
    outerProductContainer.classList.add("product-container-padding");
    outerProductContainer.insertAdjacentHTML(
      "beforeend",
      '<a class="product-container" href="./product details.html?id=' +
        product.id +
        '"><div class="product-image-container"><img src="' +
        product.image +
        '" alt="' +
        product.title +
        '"></div><div class="product-details-bottom"><div class="product-title">' +
        product.title +
        '</div><div class="product-description">' +
        product.description +
        '</div><div id="bottom"><div class="product-price">$' +
        product.price +
        '</div><div class="add-to-cart"onclick="addingToCart(' +
        product.id +
        ',event)">Add to Cart</div></div></div></a>'
    );

    productsContainerFragment.appendChild(outerProductContainer);
  });
  productsContainer.append(productsContainerFragment);
}
function generatingDesktopProducts(products) {
  let productsContainer = $.querySelector(".products-container");
  let productsContainerFragment = new DocumentFragment();
  productsContainer.innerHTML = "";
  products.forEach(function (product) {
    let outerProductContainer = $.createElement("div");
    outerProductContainer.classList.add("product-container-padding");
    outerProductContainer.insertAdjacentHTML(
      "beforeend",
      '<a class="product-container" href="./product details.html?id=' +
        product.id +
        '"target="_blank"><div class="product-details-top"><div class="product-image-container"><img src="' +
        product.image +
        '" alt="' +
        product.title +
        '" /><div class="product-description">' +
        product.description +
        '</div></div><div class="product-title">' +
        product.title +
        '</div></div><div class="product-details-bottom"><div class="product-price">$' +
        product.price +
        '</div><div class="add-to-cart" onclick="addingToCart(' +
        product.id +
        ',event)">Add to Cart</div></div></a>'
    );
    productsContainerFragment.appendChild(outerProductContainer);
  });
  productsContainer.append(productsContainerFragment);
}
function generatingProducts(products) {
  if (isMobileSizeProduct) {
    generatingMobileProducts(products);
  } else {
    generatingDesktopProducts(products);
  }
}
function filteringProducts(selectedCategories) {
  filteredProductsList = [];
  selectedCategories.forEach(function (selectedCategoryItem) {
    let filteredProducts = productsList.filter(function (selectedProduct) {
      return selectedCategoryItem === selectedProduct.category;
    });
    filteredProductsList.push(...filteredProducts);
  });
  generatingPageButtons(filteredProductsList);
}
function isAllButtonActive(allItemButton, items) {
  allItemButton.classList.add("change-color");
  Object.values(items).forEach(function (item) {
    item.classList.remove("change-color");
  });
  selectedCategoryItems.length = [];
  filteringProducts(allCategoryItems);
}
function selectCategories(allItemButton, item, items) {
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
}
function displayingCategories() {
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
}
function displayingDesktopSearchField() {
  let desktopSearchField = $.querySelector(".search input");
  desktopSearchField.classList.toggle("show");
}
function displayingMobileSearchField() {
  let mobileSearchField = $.querySelector(".menu > input");
  mobileSearchField.classList.toggle("sliding");
}
function displayingMenu() {
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
}
function generatingSlider() {
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
}
function scrollHandler() {
  let items = $.querySelector(".items");
  let logo = $.querySelector(".logo");
  let container = $.querySelector(".container");
  let scrollFiller = $.querySelector(".scroll-filler");
  if (window.scrollY > 500) {
    items.style.left = "-100%";
    logo.style.left = "-100%";
  } else {
    items.style.left = "0%";
    logo.style.left = "0%";
  }
  let scrollFillerValue = Math.round(
    (container.clientWidth * window.scrollY * 100) /
      ($.body.clientHeight - window.innerHeight) /
      container.clientWidth
  );
  scrollFiller.style.width = scrollFillerValue + "%";
}
function resizeHandler() {
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
}
function alertAdding() {
  let alertContainer = $.querySelector(".alert-container");
  alertContainer.insertAdjacentHTML(
    "beforeend",
    '<div class="successful-added"><span>added successfully</span><i class="fa fa-angellist"></i></div>'
  );
  let successfulAdded = $.querySelectorAll(".successful-added");

  successfulAdded.forEach(function (alert) {
    alert.addEventListener("animationend", function (event) {
      event.target.remove();
    });
  });
}
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
filteringProducts(allCategoryItems);
generatingSlider();
categories.addEventListener("click", displayingCategories);
hamburgerMenu.addEventListener("click", displayingMenu);
window.addEventListener("scroll", scrollHandler);
window.addEventListener("resize", resizeHandler);
window.addEventListener("load", getFromLocalStorage);
window.addEventListener("scroll", successfulAddedPosition);

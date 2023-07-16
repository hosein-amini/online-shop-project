// urlsearchparams
// add ${}in last template
let productID = 2;
const router = {
  "/": {
    template: "online shop.html",
    title: "ALL US Shop",
  },
  "/cart": {
    template: "cart.html",
    title: "cart",
  },
  "/product-details": {
    template: `product-details?id=${productID}.html`,
    title: "product name",
  },
};
export default router;

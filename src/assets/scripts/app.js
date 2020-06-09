const App = (() => {
  return {
    async initialize() {
      const eventBus = new EventEmitter();

      const basketRoot = document.querySelector('[data-component="basket"]');
      const productListRoot = document.querySelector(
        '[data-component="productList"]'
      );

      const Loader = makeLoader();
      const Product = makeProduct({ Currency, API });
      const ProductList = makeProductList({ eventBus });
      const Basket = makeBasket({ eventBus });

      Loader.initialize(productListRoot);
      Basket.initialize(basketRoot);

      const products = await Product.fetchAll();

      setTimeout(() => {
        ProductList.initialize(productListRoot, products);
      }, 500);
    },
  };
})();

App.initialize();

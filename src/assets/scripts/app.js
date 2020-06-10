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

      Basket.initialize(basketRoot);
      Loader.initialize(productListRoot, async (root) => {
        const products = await Product.fetchAll();
        ProductList.initialize(root, products);
      });
    },
  };
})();

App.initialize();

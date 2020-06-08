const App = (() => {
  return {
    async initialize () {
      const eventBus = new EventEmitter()

      const basketRoot = document.querySelector('[data-component="basket"]')
      const productListRoot = document.querySelector(
        '[data-component="productList"]'
      )

      const Product = makeProduct({ Currency })
      const ProductList = makeProductList({ eventBus })
      const Basket = makeBasket({ eventBus })

      const products = await Product.fetchAll()

      Basket.initialize(basketRoot)
      ProductList.initialize(productListRoot, products)
    }
  }
})()

App.initialize()

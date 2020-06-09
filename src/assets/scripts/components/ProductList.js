const makeProductList = ({ eventBus }) => {
  const ProductList = function (el, products = []) {
    this.el = el
    this.name = 'PRODUCT_LIST'
    this.products = products
  }

  const productItemTemplate = product => {
    return `
      <li class="product-list__item">
        ${product.render()}
      </li>
    `
  }

  ProductList.prototype.render = function () {
    this.el.innerHTML = `
      <ul class="product-list">
        ${this.products.map(productItemTemplate).join('')}
      </ul>
    `
  }

  ProductList.prototype.loadEvents = function () {
    const onBuyHandler = event => {
      if (event.target.dataset.action === 'buy') {
        const { productId } = event.target.dataset

        const product = this.products.find(({ id }) => id === Number(productId))

        if (product) {
          eventBus.dispatch('basket:addProduct', { product, quantity: 1 })
        }
      }
    }

    this.el.addEventListener('click', onBuyHandler)
  }

  ProductList.prototype.initialize = function () {
    this.loadEvents()
    this.render()
  }

  ProductList.initialize = function (el, products) {
    new ProductList(el, products).initialize()
  }

  return ProductList
}

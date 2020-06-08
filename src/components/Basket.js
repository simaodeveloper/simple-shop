const makeBasket = ({ eventBus }) => {
  const Basket = function (el, basketList = []) {
    this.el = el
    this.name = 'BASKET'
    this.basketList = basketList
    this.total = 0
    this.isOpen = false
  }

  const basketItemTemplate = ({ product, quantity }) => {
    const { name, id, price } = product

    return `
      <li class="basket__item">
        <div class="basket-product">
          <span class="basket-product__name">${name}</span>
          <span class="basket-product__quantity">${quantity}</span>
          <span class="basket-product__price">${Currency.normalize(
            price * quantity
          )}</span>
          <button data-action="remove" data-product-id="${id}">X</button>
        </div>
      </li>
    `
  }

  Basket.prototype.loadEvents = function () {
    const onToggleHandler = event => {
      if (event.target.classList.contains('basket__header')) {
        if (this.isEmpty()) return

        if (this.isOpen) {
          this.close()
        } else {
          this.open()
        }
      }
    }

    const onRemoveProductHandler = event => {
      if (event.target.dataset.action === 'remove') {
        const { productId } = event.target.dataset
        this.removeProductById(productId)
      }
    }

    const onAddProductHandler = ({ product, quantity }) => {
      this.addProduct(product, quantity)
    }

    this.el.addEventListener('click', onToggleHandler)
    this.el.addEventListener('click', onRemoveProductHandler)
    eventBus.on('basket:addProduct', onAddProductHandler)
  }

  Basket.prototype.open = function () {
    this.isOpen = true
    this.el.classList.add('basket--open')
  }

  Basket.prototype.close = function () {
    this.isOpen = false
    this.el.classList.remove('basket--open')
  }

  Basket.prototype.addProduct = function (product, quantity) {
    const basketList = [...this.basketList]
    const basketItem = basketList.find(
      basketItem => basketItem.product.id === product.id
    )

    if (basketItem) {
      basketItem.quantity += quantity
    } else {
      basketList.push({ product, quantity })
    }

    this.basketList = basketList

    this.render()
  }

  Basket.prototype.removeProductById = function (id) {
    const basketList = this.basketList.filter(
      ({ product }) => product.id !== Number(id)
    )

    this.basketList = basketList

    if (this.isEmpty()) this.close()

    this.render()
  }

  Basket.prototype.isEmpty = function () {
    return this.basketList.length === 0
  }

  Basket.prototype.getStatus = function () {
    const quantity = this.basketList.length
    return this.isEmpty()
      ? 'vazio'
      : quantity > 1
      ? `${quantity} produtos`
      : '1 produto'
  }

  Basket.prototype.render = function () {
    this.el.innerHTML = `
      <div class="basket ${this.isOpen ? 'basket--open' : ''}">
        <div class="basket__header">
          <p>Meu carrinho</p><span class="basket__status">${this.getStatus()}</span>
        </div>
        <div class="basket__wrap">
          <div class="basket__content">
            <ul class="basket__list">
              ${this.basketList.map(basketItemTemplate).join('')}
            </ul>
          <div class="basket__content">
          <div class="basket__footer">
            <span class="basket__total"></span>
          </div>
        </div>
      </div>
    `
  }

  Basket.prototype.initialize = function () {
    this.loadEvents()
    this.render()
  }

  Basket.initialize = function (el) {
    new Basket(el).initialize()
  }

  return Basket
}

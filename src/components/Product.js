const makeProduct = ({ Currency }) => {
  const Product = function ({
    id,
    name,
    description,
    longDescription,
    price,
    stock
  }) {
    this.id = id
    this.name = name
    this.description = description
    this.longDescription = longDescription
    this.price = price
    this.stock = stock
  }

  Product.fetchAll = async function () {
    const { products } = await API.fetchProducts()
    return products.map(product => new Product(product))
  }

  Product.prototype.render = function () {
    return `
      <div class="product">
        <span class="product__name">${this.name}</span>
        <img src="https://via.placeholder.com/160x120" title="product image" alt="product image" class="product__img">
        <p class="product__description">
          ${this.description}
        </p>
        <strong class="product__price">R$${Currency.normalize(
          this.price
        )}</strong>
        <button class="product__buy" data-action="buy" data-product-id="${
          this.id
        }">Comprar</button>
      </div>
    `
  }

  return Product
}

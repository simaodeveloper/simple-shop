const API = (({ API_URL }) => {
  const request = (url) => fetch(url)
  .then((response) => response.json())
  .catch((err) => //... errorhandler);

  return {
    async fetchProducts() {
      return await request(`${API_URL}/products.json`);
    },
  };
})(config);

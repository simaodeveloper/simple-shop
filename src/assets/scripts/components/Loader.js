const makeLoader = () => {
  const Loader = function () {
    return `
      <div class="loader">Loading...</div>
    `;
  };

  Loader.initialize = function (el) {
    el.innerHTML = Loader();
  };

  return Loader;
};

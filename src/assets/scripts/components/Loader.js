const makeLoader = () => {
  const Loader = function (root, fn, delay = 200) {
    this.root = root;
    this.fn = fn;
    this.delay = delay;
  };

  Loader.prototype.render = function () {
    this.root.innerHTML = `
      <div class="loader">Loading...</div>
    `;
  };

  Loader.prototype.initialize = function () {
    this.render();
    setTimeout(() => this.fn(this.root), this.delay);
  };

  Loader.initialize = (root, fn, delay) => {
    const instance = new Loader(root, fn, delay);
    instance.initialize();
    return instance;
  };

  return Loader;
};

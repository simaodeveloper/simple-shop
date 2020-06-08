const DEFAULTS = {
  template: {},
  callbacks: {},
  styleClasses: {
    SHOW: "modal--show",
  },
};

const MODAL_TYPES = ["message", "confirm", "prompt"];

const MODAL_ACTIONS = {
  CLOSE: "close",
  CONFIRM: "confirm",
  CANCEL: "cancel",
};

const isObjectEmpty = (object) =>
  Object.keys(object).length === 0 && object.constructor === Object;

const makeCore = function () {
  const context = this;

  return {
    isValidAction(action) {
      return Object.values(MODAL_ACTIONS).includes(action);
    },

    dispatchAction(action, ...args) {
      if (this.isValidAction(action)) context[action]();
    },

    addEvent(element, event, listener) {
      if (!this.listeners) this.listeners = {};
      if (!this.listeners[event]) this.listeners[event] = [];
      this.listeners[event].push(listener);
      element.addEventListener(event, listener);
    },

    removeAllEvents() {
      for (const event in this.listeners) {
        this.listeners[event].forEach((listener) => {
          context.modal.removeEventListener(event, listener);
        });
      }
    },

    preMount() {
      const fragment = document.createElement("div");
      fragment.innerHTML = context.template;
      context.modal = fragment.firstElementChild;
    },

    mount() {
      document.body.appendChild(context.modal);
    },

    create() {
      this.preMount();
      this.events();
      this.mount();
    },

    events() {
      if (!context.modal) return;

      const handleClick = (event) => {
        event.preventDefault();
        this.dispatchAction(event.target.dataset.action);
      };

      this.addEvent(context.modal, "click", handleClick);
    },

    setOptions(options) {
      const settings = Object.assign({}, DEFAULTS);

      for (const key in options) {
        if (key in settings) {
          if (typeof options[key] !== "object") {
            settings[key] = options[key];
            continue;
          }

          settings[key] = isObjectEmpty(options[key])
            ? settings[key]
            : options[key];
        }
      }

      return settings;
    },

    findPrompt() {
      return context.modal.querySelector('[data-action="prompt"]');
    },

    hasPrompt() {
      return Boolean(this.findPrompt());
    },

    fetchPromptValue() {
      return this.findPrompt().value;
    },
  };
};

export default makeCore;

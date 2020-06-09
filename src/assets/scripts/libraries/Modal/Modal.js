import makeCore from "./Modal.Core.js";
import { create as createTemplate } from "./Modal.Templates.js";

export default class Modal {
  constructor(options) {
    this.core = makeCore.call(this);
    this.settings = this.core.setOptions(options);

    this.template = createTemplate(this.settings.template);
    this.callbacks = this.settings.callbacks;
    this.styleClasses = this.settings.styleClasses;
  }

  destroy() {
    if (this.modal) {
      this.core.removeAllEvents();
      this.modal.parentNode.removeChild(this.modal);
    }
  }

  open() {
    if (!this.modal) {
      this.core.create();
    }

    if (this.styleClasses.SHOW) {
      this.modal.classList.add(this.styleClasses.SHOW);
    }

    if (this.callbacks.onOpen) {
      this.callbacks.onOpen();
    }
  }

  close() {
    if (this.styleClasses.SHOW) {
      this.modal.classList.remove(this.styleClasses.SHOW);
    }

    if (this.callbacks.onClose) {
      this.callbacks.onClose();
    }
  }

  confirm() {
    if (this.callbacks.onConfirm) {
      this.callbacks.onConfirm(
        this.core.hasPrompt() ? this.core.fetchPromptValue() : undefined
      );
    }
  }

  cancel() {
    if (this.callbacks.onCancel) {
      this.callbacks.onCancel();
    }

    this.close();
  }
}

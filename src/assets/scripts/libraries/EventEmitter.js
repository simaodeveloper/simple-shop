const EventEmitter = (() => {
  const EventEmitter = function () {
    this.events = {}
  }

  EventEmitter.prototype.dispatch = function (event, ...args) {
    if (this.events[event] && this.events[event].length > 0) {
      this.events[event].forEach(listener => listener(...args))
    }
  }

  EventEmitter.prototype.on = function (event, listener) {
    if (!this.events[event]) {
      this.events[event] = []
    }

    this.events[event].push(listener)
  }

  return EventEmitter
})()

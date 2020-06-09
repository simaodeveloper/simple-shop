const Currency = (() => {
  return {
    normalize (value) {
      return value.toFixed(2).replace(/\./, ',')
    }
  }
})()

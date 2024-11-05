document.addEventListener('DOMContentLoaded', () => {
  const products = [
    { id: 1, name: 'Cooler', price: 29.99 },
    { id: 2, name: 'Refrigerator', price: 89.99 },
    { id: 3, name: 'Air Condition', price: 109.99 },
    { id: 4, name: 'Oven', price: 9.99 },
    { id: 5, name: 'Mixer', price: 7.99 },
  ];
  
  let cart = JSON.parse(localStorage.getItem('cart-item')) || [];
 
  const productList = document.getElementById('product-list')
  const cartItems = document.getElementById('cart-items')
  const emptyCartText = document.getElementById('empty-cart')
  const cartTotal = document.getElementById('cart-total')
  const priceTotal = document.getElementById('total-price')
  const checkoutButton = document.getElementById('checkout-btn')
  const removeButton = document.getElementById('remove-btn')

  renderCart()

  products.forEach(product => {
      const productDiv = document.createElement('div')
      productDiv.classList.add('product')
      productDiv.innerHTML = `
      <span>${product.name} - $${product.price}</span>
      <button data-id="${product.id}">Add to Cart</button>
      `
      productList.append(productDiv)
  })

  productList.addEventListener('click', (e) => {
      if (e.target.tagName !== "BUTTON") {
          return
      }
      const productId = parseInt(e.target.getAttribute('data-id'))
      const product = products.find(p => p.id === productId)
      addToCart(product)
  })

  function addToCart(p) {
      cart.push(p)
      renderCart()
  }

  function renderCart() {
      let totalPrice = 0;
      cartItems.innerText = ''
      if (cart.length > 0) {
          emptyCartText.classList.add('hidden')
          cartTotal.classList.remove('hidden')
          cart.forEach((item, index) => {
              totalPrice += item.price
              const basketItem = document.createElement('div')
              basketItem.classList.add('item')
              basketItem.innerHTML = `
              <span>${item.name} - $${item.price.toFixed(2)}</span>
              <button data-id="${index}" id="remove-btn">Remove</button>
              `
              cartItems.append(basketItem)
              priceTotal.innerText = `$${totalPrice.toFixed(2)}`
          })
      } else {
          emptyCartText.classList.remove('hidden')
          cartTotal.classList.add('hidden')
          cartItems.innerHTML = '<p id="empty-cart">Your cart is empty.</p>'
          priceTotal.innerText = `$0.00`
      }
      saveProductToLocal();
      console.log(cart)
      console.log(cart.length)
  }

  function removeItem(index) {
      cart.splice(index, 1)
      renderCart()
  }

  checkoutButton.addEventListener('click', () => {
      cart.length = 0;
      alert("Checkout Successfully")
      renderCart()
  })

  cartItems.addEventListener("click", (e) => {
     if(e.target.tagName !== "BUTTON") {
      return
     } else {
      removeItem(parseInt(e.target.getAttribute('data-id')))
     }
  })

  function saveProductToLocal() {
      localStorage.setItem('cart-item', JSON.stringify(cart))
  }
})
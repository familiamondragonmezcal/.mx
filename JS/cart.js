document.addEventListener("DOMContentLoaded", () => {

  const cartText = document.getElementById("cartText");
  const cartPanel = document.getElementById("cartPanel");
  const closeCart = document.getElementById("closeCart");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // ===== ABRIR / CERRAR =====
  cartText.addEventListener("click", () => {
    cartPanel.classList.add("active");
  });

  closeCart.addEventListener("click", () => {
    cartPanel.classList.remove("active");
  });

  // ===== GUARDAR =====
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // ===== RENDER =====
  function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      cartItems.innerHTML = "<p>Carrito vacío</p>";
      cartTotal.innerText = "$0 MXN";
      return;
    }

    cart.forEach((item, index) => {
      total += item.price * item.quantity;

      const div = document.createElement("div");
      div.classList.add("cart-item");

      div.innerHTML = `
  <img src="${item.image}">
  
  <div class="cart-info">
    <p>${item.name}</p>

    <div class="qty-control">
      <button onclick="decreaseQty(${index})">-</button>
      <span>${item.quantity}</span>
      <button onclick="increaseQty(${index})">+</button>
    </div>

    <p>$${item.price * item.quantity} MXN</p>
  </div>

  <button onclick="removeItem(${index})">✕</button>
`;
window.increaseQty = function(index) {
  cart[index].quantity++;
  renderCart();
};

window.decreaseQty = function(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }
  renderCart();
};

      cartItems.appendChild(div);
    });

    cartTotal.innerText = "$" + total + " MXN";
    saveCart();
  }

  // ===== ELIMINAR =====
  window.removeItem = function(index) {
    cart.splice(index, 1);
    renderCart();
  };

  // ===== AGREGAR PRODUCTO =====
  window.addToCart = function(name, price, image) {

    const existing = cart.find(p => p.name === name);

    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ name, price, image, quantity: 1 });
    }

    renderCart();
    cartPanel.classList.add("active");
  };

  // ===== WHATSAPP =====
  document.getElementById("buyBtn").addEventListener("click", () => {

    if (cart.length === 0) {
      alert("Carrito vacío");
      return;
    }

    let message = "Hola, quiero comprar:%0A";

    cart.forEach(item => {
      message += `• ${item.name} x${item.quantity} - $${item.price * item.quantity}%0A`;
    });

    let total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    message += `%0ATotal: $${total} MXN`;

    // 🔥 CAMBIA TU NUMERO AQUÍ
    const phone = "5215657923327";

    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  });

  renderCart();
});
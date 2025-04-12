document.addEventListener("DOMContentLoaded", function () {
    const cartItems = document.getElementById("cartItems");
    const totalPrice = document.getElementById("totalPrice");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    let total = 0;
    cartItems.innerHTML = cart.map(item => {
      total += parseFloat(item.price);
      return `<li class="list-group-item">${item.name} - $${item.price}</li>`;
    }).join("");
  
    totalPrice.textContent = total.toFixed(2);
  });
  
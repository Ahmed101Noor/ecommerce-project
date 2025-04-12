document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById("productList");
    const products = JSON.parse(localStorage.getItem("products")) || [];
  
    productList.innerHTML = products.map(p => `
      <div class="col-md-4">
        <div class="card mb-4">
          <img src="${p.image}" class="card-img-top" style="height:200px;">
          <div class="card-body">
            <h5>${p.name}</h5>
            <p>${p.description}</p>
            <p><strong>$${p.price}</strong></p>
            <button onclick='addToCart(${p.id})' class="btn btn-primary">Add to Cart</button>
          </div>
        </div>
      </div>
    `).join("");
  });
  
  function addToCart(id) {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const product = products.find(p => p.id === id);
    if (!product) return;
  
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
  }
  
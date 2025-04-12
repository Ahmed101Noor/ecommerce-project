class Cart {
  static getCart() {
    const userId = ECommerce.getCurrentUser()?.id;
    if (!userId) return [];
    
    const carts = JSON.parse(localStorage.getItem('carts'));
    return carts[userId] || [];
  }

  static addToCart(productId, quantity = 1) {
    const userId = ECommerce.getCurrentUser()?.id;
    if (!userId) throw new Error('You must be logged in');
    
    const product = Products.getById(productId);
    if (!product) throw new Error('Product not found');
    
    if (product.stockQuantity < quantity) {
      throw new Error('Not enough stock available');
    }
    
    const carts = JSON.parse(localStorage.getItem('carts'));
    const userCart = carts[userId] || [];
    
    const existingItem = userCart.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      userCart.push({ productId, quantity });
    }
    
    carts[userId] = userCart;
    localStorage.setItem('carts', JSON.stringify(carts));
  }

  static removeFromCart(productId) {
    const userId = ECommerce.getCurrentUser()?.id;
    if (!userId) throw new Error('You must be logged in');
    
    const carts = JSON.parse(localStorage.getItem('carts'));
    if (!carts[userId]) return;
    
    carts[userId] = carts[userId].filter(item => item.productId !== productId);
    localStorage.setItem('carts', JSON.stringify(carts));
  }

  static updateQuantity(productId, newQuantity) {
    const userId = ECommerce.getCurrentUser()?.id;
    if (!userId) throw new Error('You must be logged in');
    
    const product = Products.getById(productId);
    if (!product) throw new Error('Product not found');
    
    if (product.stockQuantity < newQuantity) {
      throw new Error('Not enough stock available');
    }
    
    const carts = JSON.parse(localStorage.getItem('carts'));
    if (!carts[userId]) return;
    
    const item = carts[userId].find(item => item.productId === productId);
    if (item) {
      item.quantity = newQuantity;
      localStorage.setItem('carts', JSON.stringify(carts));
    }
  }

  static clearCart() {
    const userId = ECommerce.getCurrentUser()?.id;
    if (!userId) return;
    
    const carts = JSON.parse(localStorage.getItem('carts'));
    carts[userId] = [];
    localStorage.setItem('carts', JSON.stringify(carts));
  }
}
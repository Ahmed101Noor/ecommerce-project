// At the top of each protected page
const user = JSON.parse(localStorage.getItem('currentUser'));
if (!user) {
  window.location.href = 'login.html';
}
// Utility functions
class ECommerce {
    static initDatabase() {
      if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
      }
      if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify([]));
      }
      if (!localStorage.getItem('categories')) {
        localStorage.setItem('categories', JSON.stringify(['Casual', 'Formal', 'Party', 'Gym']));
      }
      if (!localStorage.getItem('orders')) {
        localStorage.setItem('orders', JSON.stringify([]));
      }
      if (!localStorage.getItem('wishlists')) {
        localStorage.setItem('wishlists', JSON.stringify({}));
      }
      if (!localStorage.getItem('carts')) {
        localStorage.setItem('carts', JSON.stringify({}));
      }
    }
  
    static getCurrentUser() {
      return JSON.parse(localStorage.getItem('currentUser')) || null;
    }
  
    static setCurrentUser(user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  
    static clearCurrentUser() {
      localStorage.removeItem('currentUser');
    }
  
    static generateId() {
      return Math.random().toString(36).substr(2, 9);
    }
  }
  // Initialize sample products if none exist
if (!localStorage.getItem('products')) {
  const sampleProducts = [
    {
      id: '1',
      name: 'Classic White T-Shirt',
      price: 24.99,
      category: 'T-Shirts',
      description: '100% cotton, comfortable fit',
      stockQuantity: 50,
      image: 'products/images/tshirt-white.jpg'
    },
    {
      id: '2',
      name: 'Slim Fit Jeans',
      price: 59.99,
      category: 'Pants',
      description: 'Stretch denim, modern fit',
      stockQuantity: 30,
      image: 'products/images/jeans-slim.jpg'
    },
    {
      id: '3',
      name: 'Leather Wallet',
      price: 34.99,
      category: 'Accessories',
      description: 'Genuine leather, multiple slots',
      stockQuantity: 75,
      image: 'products/images/wallet-leather.jpg'
    },
    {
      id: '4',
      name: 'Running Shoes',
      price: 89.99,
      category: 'Footwear',
      description: 'Lightweight, cushioned soles',
      stockQuantity: 40,
      image: 'products/images/shoes-running.jpg'
    },
    {
      id: '5',
      name: 'Baseball Cap',
      price: 19.99,
      category: 'Accessories',
      description: 'Adjustable, breathable fabric',
      stockQuantity: 60,
      image: 'products/images/cap-baseball.jpg'
    }
  ];
  
  localStorage.setItem('products', JSON.stringify(sampleProducts));
}
  // Initialize database when script loads
  ECommerce.initDatabase();
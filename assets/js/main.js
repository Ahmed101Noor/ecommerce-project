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
  
  // Initialize database when script loads
  ECommerce.initDatabase();
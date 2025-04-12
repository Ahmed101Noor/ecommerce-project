// At the top of each protected page
const user = JSON.parse(localStorage.getItem('currentUser'));
if (!user) {
  window.location.href = 'login.html';
}
class Products {
  static getAll() {
    return JSON.parse(localStorage.getItem('products')) || [];
  }

  static getById(id) {
    return Products.getAll().find(product => product.id === id);
  }

  static getByCategory(category) {
    return Products.getAll().filter(product => product.category === category);
  }

  static create(productData) {
    if (!Auth.isAdmin()) throw new Error('Unauthorized');
    
    const products = Products.getAll();
    const newProduct = {
      id: ECommerce.generateId(),
      ...productData,
      stockQuantity: parseInt(productData.stockQuantity),
      price: parseFloat(productData.price)
    };

    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    return newProduct;
  }

  static update(id, updates) {
    if (!Auth.isAdmin()) throw new Error('Unauthorized');
    
    const products = Products.getAll();
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) throw new Error('Product not found');
    
    products[index] = { ...products[index], ...updates };
    localStorage.setItem('products', JSON.stringify(products));
    return products[index];
  }

  static delete(id) {
    if (!Auth.isAdmin()) throw new Error('Unauthorized');
    
    const products = Products.getAll().filter(p => p.id !== id);
    localStorage.setItem('products', JSON.stringify(products));
  }
}
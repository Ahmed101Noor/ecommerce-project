// At the top of each protected page
const user = JSON.parse(localStorage.getItem('currentUser'));
if (!user) {
  window.location.href = 'login.html';
}
class Orders {
    static getAll() {
      const user = ECommerce.getCurrentUser();
      if (!user) return [];
      
      const allOrders = JSON.parse(localStorage.getItem('orders'));
      
      if (user.type === 'admin') {
        return allOrders;
      } else {
        return allOrders.filter(order => order.customerId === user.id);
      }
    }
  
    static create(cartItems, shippingInfo) {
      const user = ECommerce.getCurrentUser();
      if (!user) throw new Error('You must be logged in');
      
      // Validate stock
      cartItems.forEach(item => {
        const product = Products.getById(item.productId);
        if (!product || product.stockQuantity < item.quantity) {
          throw new Error(`Insufficient stock for ${product?.name || 'product'}`);
        }
      });
      
      // Calculate total
      const total = cartItems.reduce((sum, item) => {
        const product = Products.getById(item.productId);
        return sum + (product.price * item.quantity);
      }, 0);
      
      // Create order
      const newOrder = {
        id: ECommerce.generateId(),
        customerId: user.id,
        items: [...cartItems],
        shippingInfo,
        status: 'pending',
        date: new Date().toISOString(),
        total
      };
      
      // Update database
      const orders = JSON.parse(localStorage.getItem('orders'));
      orders.push(newOrder);
      localStorage.setItem('orders', JSON.stringify(orders));
      
      // Update stock quantities
      cartItems.forEach(item => {
        const product = Products.getById(item.productId);
        Products.update(product.id, {
          stockQuantity: product.stockQuantity - item.quantity
        });
      });
      
      // Clear cart
      Cart.clearCart();
      
      return newOrder;
    }
  
    static updateStatus(orderId, newStatus) {
      if (!Auth.isAdmin()) throw new Error('Unauthorized');
      
      const orders = JSON.parse(localStorage.getItem('orders'));
      const order = orders.find(o => o.id === orderId);
      if (!order) throw new Error('Order not found');
      
      order.status = newStatus;
      
      // If rejected or returned, restock items
      if (newStatus === 'rejected' || newStatus === 'returned') {
        order.items.forEach(item => {
          const product = Products.getById(item.productId);
          Products.update(product.id, {
            stockQuantity: product.stockQuantity + item.quantity
          });
        });
      }
      
      localStorage.setItem('orders', JSON.stringify(orders));
      return order;
    }
  }
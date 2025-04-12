class Auth {
  static validatePassword(password) {
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
  }

  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Please enter a valid email address');
    }
  }
  static register(userData) {
    const users = JSON.parse(localStorage.getItem('users'));
    
    // Validation
    if (!userData.name || !userData.email || !userData.password) {
      throw new Error('All fields are required');
    }
    
    if (users.some(user => user.email === userData.email)) {
      throw new Error('Email already exists');
    }

    const newUser = {
      id: ECommerce.generateId(),
      type: 'customer',
      ...userData
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    ECommerce.setCurrentUser(newUser);
    return newUser;
  }

  static login(email, password) {
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }

    ECommerce.setCurrentUser(user);
    return user;
  }

  static logout() {
    ECommerce.clearCurrentUser();
  }

  static isAdmin() {
    const user = ECommerce.getCurrentUser();
    return user && user.type === 'admin';

  }

  static createAdmin(email, password, name) {
    const users = JSON.parse(localStorage.getItem('users'));
    
    if (users.some(user => user.email === email)) {
      throw new Error('Admin with this email already exists');
    }

    const newAdmin = {
      id: ECommerce.generateId(),
      type: 'admin',
      email,
      password, // Note: In real app, hash this password
      name
    };

    users.push(newAdmin);
    localStorage.setItem('users', JSON.stringify(users));
    return newAdmin;
  }

  static getAllUsers() {
    if (!Auth.isAdmin()) throw new Error('Unauthorized');
    return JSON.parse(localStorage.getItem('users')) || [];
  }



  
}
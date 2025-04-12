// تسجيل مستخدم جديد
document.getElementById("registerForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value;
  
    if (!name || !email || !password) return;
  
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.find((u) => u.email === email);
    if (exists) {
      document.getElementById("regError").textContent = "Email already exists.";
      return;
    }
  
    const newUser = { name, email, password, role: "customer" };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful! Please login.");
    window.location.href = "login.html";
  });
  
  // تسجيل الدخول
  document.getElementById("loginForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
  
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const matchedUser = users.find((u) => u.email === email && u.password === password);
  
    if (matchedUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
      if (matchedUser.role === "admin") {
        window.location.href = "admin-dashboard.html";
      } else {
        window.location.href = "products.html";
      }
    } else {
      document.getElementById("loginError").textContent = "Invalid email or password.";
    }
  });
  
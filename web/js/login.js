function showRegisterForm() {
  document.getElementById('form-content').innerHTML = `
        <h1>Register</h1>
        <p>Welcome! Please fill in the form to create an account.</p>
        <div class="input-group inline-group">
            <input type="text" placeholder="Enter First Name" id="first_name" class="inline-input">
        </div>
        <div class="input-group inline-group">
            <input type="text" placeholder="Enter Last Name" id="last_name" class="inline-input">
        </div>
        <div class="input-group inline-group">
            <input type="text" placeholder="Enter Username" id="username" class="inline-input">
        </div>
        <div class="input-group inline-group">
            <input type="date" placeholder="Enter Date of Birth" id="dob" class="inline-input">
        </div>
        <div class="input-group inline-group">
            <input type="text" placeholder="Enter Role" id="role" class="inline-input">
        </div>
        <div class="input-group inline-group">
            <input type="email" placeholder="Enter Email" id="email" class="inline-input">
        </div>
        <div class="input-group inline-group">
            <input type="password" placeholder="Enter Password" id="register-password" class="inline-input">
        </div>
        <button onclick="register()">Register</button>
    `;
}

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  // Implement your login functionality here
}

function register() {
  const name = document.getElementById('name').value;
  const username = document.getElementById('register-username').value;
  const dob = document.getElementById('dob').value;
  const role = document.getElementById('role').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('register-password').value;
  // Implement your register functionality here
}
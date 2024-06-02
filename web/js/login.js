function showRegisterForm() {
  document.getElementById('form-content').innerHTML = `
        <form action="register">
            <h1>Sign up</h1>
            <p>Welcome! Please fill in the form to create an account.</p>
            <div class="input-group inline-group">
                <input type="text" placeholder="Enter First Name" name="firstname" class="inline-input">
            </div>
            <div class="input-group inline-group">
                <input type="text" placeholder="Enter Last Name" name="lastname" class="inline-input">
            </div>
            <div class="input-group inline-group">
                <input type="text" placeholder="Enter Username" name="username" class="inline-input">
            </div>
            <div class="input-group inline-group">
                <input type="text" placeholder="Enter Email" name="email" class="inline-input">
            </div>
            <div class="input-group inline-group">
                <input type="text" placeholder="Enter Your Address" name="address" class="inline-input">
            </div>
            <div class="input-group inline-group">
                <input type="text" placeholder="Enter Your Phone Number" name="phone" class="inline-input">
            </div>
            <div class="input-group inline-group">
                <input type="password" placeholder="Enter Password" name="password" class="inline-input">
            </div>
            <div class="input-group inline-group">
                <select name="gender" class="inline-input">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div class="input-group inline-group">
                <select name="role" class="inline-input">
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                </select>
            </div>
            <button type="submit">Sign up</button>
            <p>Already have an account? <a href="#" onclick="showLoginForm()">Login</a></p>
        </form>
    `;
}

function showLoginForm() {
    document.getElementById('form-content').innerHTML = `
            <h1>Login</h1>
            <p>Welcome back! Please login to your account.</p>
            <div class="input-group">
                <input type="text" placeholder="Enter Username" id="username">
            </div>
            <div class="input-group">
                <input type="password" placeholder="Enter Password" id="password">
            </div>
            <button onclick="login()">Login</button>
            <p>Don't have an account? <a href="#" onclick="showRegisterForm()">Register</a></p>
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
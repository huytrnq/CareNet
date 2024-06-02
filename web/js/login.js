function showRegisterForm() {
  document.getElementById('form-content').innerHTML = `
        <form action="register">
            <h1>Sign up</h1>
            <p>Please fill in the form to create an account.</p>
            <div class="input-group inline-group">
                <input type="text" placeholder="Enter First Name" name="firstname" class="inline-input">
            </div>
            <div class="input-group inline-group">
                <input type="text" placeholder="Enter Last Name" name="lastname" class="inline-input">
            </div>
            <div class="input-group inline-group">
                <input type="text" placeholder="Enter Username" name="username" class="inline-input" onchange="checkUsername()">
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
            <span id="username-error" style="color: red; font-size: smaller;"></span>
            <p>Already have an account? <a href="#" onclick="showLoginForm()">Login</a></p>
        </form>
    `;
}

function showLoginForm() {
    document.getElementById('form-content').innerHTML = `
        <form action="login">
            <h1>Login</h1>
            <div class="input-group inline-group">
                <input type="text" id="username" name="username" placeholder="Enter Username" class="inline-input">
            </div>
            <div class="input-group inline-group">
                <input type="password" id="password" name="password" placeholder="Enter Password" class="inline-input">
            </div>
            <button type="submit">Login</button>
            <div class="error hidden" id="error-message">
                <s:property value="%{#session.error}"/>
            </div>
            <p>Forgot your password? <a href="#">Click here</a></p>

            <!-- Display error message if login fails  -->
            <s:if test="#session.error != null">
                <script>
                    document.getElementById("error-message").classList.remove("hidden");
                    document.getElementById("error-message").style.color = 'red';
                </script>
            </s:if>
        </form>
        `;
    }

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  // Implement your login functionality here
}

function checkUsername() {
    let username = document.getElementsByName('username')[0].value;
    // Implement your username check functionality here
    if (username.length > 0) {
        $.ajax({
            url: 'checkUserExists',
            type: 'GET',
            dataType: 'json',
            data: { username: username },
            success: function(response) {
                console.log(response);
                if (response.userExists) {
                    console.log("User already exists!");
                    console.log(response.userExists);
                    $('#username-error').text('Username is already taken');
                } else {
                    $('#username-error').text('');
                }
            }
        });
    }

}
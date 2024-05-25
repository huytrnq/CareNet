<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Register and Login</title>
	<link rel="stylesheet" href="css/login.css">
</head>
<body>
<div class="container">
	<div class="form-container register-container">
		<!-- <form action="register" method="post">
			<button class="signup" type="submit">Sign Up</button>
		</form> -->
		<h1>Register</h1>
		<p>Register now to connect with top medical professionals</p>
		<button class="signup" onclick="location.href='register.jsp'">Sign Up</button>
		<img src="css/images/doctor-illustration.png" alt="Illustration" class="illustration">
	</div>
	<div class="form-container login-container">
		<form action="login" method="post">
			<h1>Login</h1>
			<div class="input-group">
				<input type="text" placeholder="Enter Username" name="username" required>
			</div>
			<div class="input-group">
				<input type="password" placeholder="Enter Password" name="password" required>
			</div>
			<button type="submit">Login</button>
			<!-- <p>Or sign in with social platforms</p>
            <div class="social-icons">
                <a href="#"><img src="facebook.png" alt="Facebook"></a>
                <a href="#"><img src="twitter.png" alt="Twitter"></a>
                <a href="#"><img src="linkedin.png" alt="LinkedIn"></a>
                <a href="#"><img src="google.png" alt="Google"></a>
            </div> -->
		</form>
	</div>
</div>
</body>
</html>

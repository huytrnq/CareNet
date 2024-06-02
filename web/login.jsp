<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Login</title>
	<link rel="stylesheet" href="css/login.css">
	<script src="js/login.js" defer></script>
</head>
<body>
<div class="container">
	<div class="form-container register-container">
		<h1>Register</h1>
		<p>Register now to connect with top medical professionals</p>
		<button class="signup" onclick="showRegisterForm()">Sign Up</button>
		<img src="css/images/doctor-illustration.png" alt="Illustration" class="illustration">
	</div>
	<div class="form-container login-container" id="form-content">
		<h1>Login</h1>
		<form action="login">
			<div class="input-group inline-group">
				<input type="text" id="username" name="username" placeholder="Enter Username" class="inline-input">
			</div>
			<div class="input-group inline-group">
				<input type="password" id="password" name="password" placeholder="Enter Password" class="inline-input">
			</div>
			<button type="submit">Login</button>
		</form>
	</div>
</div>
</body>
</html>

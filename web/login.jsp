<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s" %>
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
			<div class="input-group inline-group error hidden" id="error-message">
				<s:property value="%{#session.error}"/>
			</div>
			<button type="submit">Login</button>
		</form>
		<p>Forgot your password? <a href="#">Click here</a></p>

		<!-- Display error message if login fails  -->
		<s:if test="#session.error != null">
			<script>
				document.getElementById("error-message").classList.remove("hidden");
				document.getElementById("error-message").style.color = 'red';
			</script>
		</s:if>
	</div>
</div>
</body>
</html>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CareNet</title>
    <link rel="stylesheet" href="css/index.css">
</head>
<style>
    a {
        text-decoration: none;
        color: white;
    }
</style>
<body>
<header>
    <nav>
        <ul>
            <li><a href="aboutPage.html">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Products</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
    </nav>
</header>
<main>
    <section class="hero">
        <div class="content">
            <h1>CareNet</h1>
            <p>Create a network of care for your family</p>
            <button><a class="no-underline" href="<s:url action='start'/>">Get Started</a></button>
        <%--            <button onclick="window.location.href='login.jsp'">Get Started</button>--%>
        </div>
    </section>
</main>
</body>
</html>
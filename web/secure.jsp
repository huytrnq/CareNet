<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="/struts-tags" prefix="s" %>
<html>
<head>
    <title>Secure</title>
</head>
<body>
    <h1>Welcome to the secure page!</h1>
    <p>You are login in as <s:property value="%{#session.username}"/></p>
</body>
</html>

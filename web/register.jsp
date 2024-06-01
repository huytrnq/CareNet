<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="/struts-tags" prefix="s" %>
<html>
<head>
    <title>Register</title>
</head>
<body>
<s:form action="register.action">
    <s:textfield name="username" label="Username"/>
    <s:password name="password" label="Password"/>
    <s:select name="role" label="Role" list="#{'ADMIN':'Admin','DOCTOR':'Doctor','PATIENT':'Patient'}"/>
    <s:submit value="Submit"/>
</s:form>
</body>
</html>

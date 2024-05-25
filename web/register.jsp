<%@ taglib uri="/struts-tags" prefix="s" %>
<html>
<head>
    <title>Register</title>
</head>
<body>
<s:form action="register" method="post">
    <s:textfield name="user.username" label="Username"/>
    <s:password name="user.password" label="Password"/>
    <s:select name="user.role" label="Role" list="#{'ADMIN':'Admin','DOCTOR':'Doctor','PATIENT':'Patient'}"/>
    <s:submit value="Register"/>
</s:form>
</body>
</html>

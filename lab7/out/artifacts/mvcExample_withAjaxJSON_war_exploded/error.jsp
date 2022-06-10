<%--
  Created by IntelliJ IDEA.
  User: forest
  Date: 16.12.2014
  Time: 10:48
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Oops...</title>
    </head>

    <body>
    Oops...Login failed!
    <%
        String error = (String) session.getAttribute("error");
        if (error != null) {
            out.println("<p>" + error + "</p>");
        }
    %>
    </body>
</html>
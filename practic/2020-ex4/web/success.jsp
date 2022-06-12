<%--
  Created by IntelliJ IDEA.
  User: forest
  Date: 4/29/2021
  Time: 12:51 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page import="webubb.domain.User" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Insert title here</title>
    <style>
        .asset-name {
            background-color: cornflowerblue;
            border-right: solid 1px black;
        }
    </style>
    <script src="js/jquery-2.0.3.js"></script>
    <script src="js/ajax-utils.js"></script>
</head>

<body>
<%! String username; %>
<%  username = (String) session.getAttribute("username");
    if (username != null) {
        out.println("Welcome " + username);
    }
    out.println("<br>");
%>
<br/>
<br/>
<%--style="display: none"--%>
<section id="updatePost">
    <h2>Update a post</h2>
    <button onclick="getUserPosts()">Get posts</button>
    <table id="tablePosts"></table>
    <form id="editForm" style="display: none">

    </form>
</section>

<section id="addPost">
    <h2>Add post</h2>
    <label>Topic: </label>
    <input type='text' id='inputTopicAdd'>
    <label>Text: </label>
    <input type='text' id='inputTextAdd'>
    <button onclick='addPost()'>Add Post</button>
</section>

<script src="js/myscript.js"></script>

</body>
</html>
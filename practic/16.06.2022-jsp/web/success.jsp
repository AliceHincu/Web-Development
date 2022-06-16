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
    <title>Welcome!</title>
    <style>
        .asset-name {
            background-color: cornflowerblue;
            border-right: solid 1px black;
        }
    </style>
    <script src="js/jquery-2.0.3.js"></script>
    <script src="js/ajax-utils.js"></script>
    <script src="js/myscript.js"></script>
</head>
<body>
<%! String username; %>
<%  username = (String) session.getAttribute("username");
    if (username != null) {
        out.println("Welcome " + username);
    }
%>
<button onclick="getQuestions()">Get questions!</button>
<section id="get-section" style="display: none;">
    <table id="table" class="table"></table>
</section>

<h1>Create quiz</h1>
<form>
    <label for="nrQuestions">Number of questions:</label>
    <input id="nrQuestions" type="number">
    <button onclick="startCreatingQuiz()">Start creating quiz!</button>
</form>
<section id="create-quiz"></section>

<section id="start-quiz">
    <button onclick="getQuizzes()">Get Quizzes!</button>
    <select id="dropdown"></select>
    <br>
    <button onclick="startQuiz()">Start!</button>
</section>
</body>
</html>
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
    out.println("<button id='getJournalsBtn' onclick=\"getJournals('" + username + "')\">Get Journals</button>");
%>

<section id="journalsSection">
    <select name="journals" id="userJournals"></select>
    <button id="getArticlesBtn" onclick='getArticles()'>Get Articles</button>
    <button id="getArticlesPaginatedBtn" onclick='getArticlesPaginated()'>Get Articles Paginated</button>
</section>

<section id="articlesSection" style="display: none">
    <table id="articlesTable"></table>
</section>

<section id="paginatesSection" style="display: none">
    <table id="paginatedTable"></table>
    <button onclick="prevPage()">Prev</button>
    <button onclick="nextPage()">Next</button>
</section>

<br><br>
<section id="addArticle">
    <span style="font-weight: bold; background-color: mediumseagreen">Add article</span><br/>
    <form>
        <label for="inputJournalName">Journal: </label>
        <input type="text" id="inputJournalName">
        <label for="inputSummary">Summary: </label>
        <input type="text" id="inputSummary">
        <button onclick="addArticleToDb(event)">Add article</button>
    </form>
</section>
<section id="update-result-section"></section>

    <script src="js/myscript.js"></script>

</body>
</html>
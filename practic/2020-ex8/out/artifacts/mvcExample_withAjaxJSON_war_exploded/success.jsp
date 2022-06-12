<%--
  Created by IntelliJ IDEA.
  User: forest
  Date: 4/29/2021
  Time: 12:51 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page import="webubb.domain.FamilyRelation" %>
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
%>

<section id="addFamily">
    <span style="font-weight: bold; background-color: mediumseagreen">Add mother in Family Relations</span><br/>
    <form id="addMotherFamily">
        <label for="inputMotherNameOfMother">Her mother's name: </label>
        <input type="text" id="inputMotherNameOfMother">
        <label for="inputFatherNameOfMother">Her father's name: </label>
        <input type="text" id="inputFatherNameOfMother">
        <button id ="addMotherBtn" onclick="addMother()">Add mother</button>
    </form>
    <span style="font-weight: bold; background-color: mediumseagreen">Add father in Family Relations</span><br/>
    <form id="addFatherFamily">
        <label for="inputMotherNameOfFather">His mother's name: </label>
        <input type="text" id="inputMotherNameOfFather">
        <label for="inputFatherNameOfFather">His father's name: </label>
        <input type="text" id="inputFatherNameOfFather">
        <button id ="addFatherBtn" onclick="addFather()">Add father</button>
    </form>
</section>

<section id="descendingLine">
    <span style="font-weight: bold; background-color: mediumseagreen">Get descending line</span><br/>
    <button id="descendingLineMotherBtn" onclick="descendingLineMother()">Of Mother</button>
    <button id="descendingLineFatherBtn" onclick="descendingLineFather()">Of Father</button>
    <section id="descendingLineFather"></section>
    <section id="descendingLineMother"></section>

</section>

<script src="js/myscript.js"></script>

<script>
    $(document).ready(function(){
        <%--$("#getAssetsbtn").click(function() {--%>
        <%--    getUserAssets(<%= user.getId() %>, function(assets) {--%>
        <%--        console.log(assets);--%>
        <%--        $("#asset-table").html("");--%>
        <%--        $("#asset-table").append("<tr style='background-color: mediumseagreen'><td>Id</td><td>Userid</td><td>Description</td><td>Value</td></tr>");--%>
        <%--        for(var name in assets) {--%>
        <%--            //console.log(assets[name].description);--%>
        <%--            $("#asset-table").append("<tr><td class='asset-name'>"+assets[name].id+"</td>" +--%>
        <%--                "<td>"+assets[name].userid+"</td>" +--%>
        <%--                "<td>"+assets[name].description+"</td>" +--%>
        <%--                "<td>"+assets[name].value+"</td></tr>");--%>
        <%--        }--%>
        <%--    })--%>
        <%--})--%>

        $("#update-asset-btn").click(function() {
            updateAsset($("#asset-id").val(),
                $("#asset-userid").val(),
                $("#asset-description").val(),
                $("#asset-value").val(),
                function(response) {
                    $("#update-result-section").html(response);
                }
            )
        })

    });
</script>


</body>
</html>
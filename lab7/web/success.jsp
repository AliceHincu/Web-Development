<%--
  Created by IntelliJ IDEA.
  User: forest
  Date: 4/29/2021
  Time: 12:51 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page import="webubb.domain.User" %>
<%@ page import="webubb.domain.TravelRoute" %>
<%@ page import="webubb.domain.City" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="webubb.model.DBManager" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Insert title here</title>
    <link rel="stylesheet" href="css/style.css">
    <script src="js/jquery-2.0.3.js"></script>
    <script src="js/ajax-utils.js"></script>
</head>

<body>
    <button onclick="logout()">LOGOUT</button>
    <p class="welcome-text">
        <%! User user; %>
        <%  user = (User) session.getAttribute("user");
            if (user != null) {
                out.println("Welcome "+user.getUsername());}
        %>
    </p>

    <img class="gif-bus" src="images/E&Y_%20Bus.gif" alt="This is an animated gif image with a bus" width="250"/>
    <p class='welcome-text'>Plan your journey...</p><br>

    <%
        DBManager db = new DBManager();
        ArrayList<City> cities = db.getCurrentJourney(user.getId());
        City currentCity = null;

        if(cities == null || cities.isEmpty()) {
            out.println("<section id='get-starting-city'>");
            out.println("<select id='cities-select' class='cities-select'></select>");
            out.println("<button type='button' id='start-journey-btn' onclick='startJourney()' class='btn'>Start journey</button>");
            out.println("</section>");
        }
        else {
            currentCity = cities.get(cities.size()-1);
            out.println("<section id='get-current-journey'>");
            out.println("<p> Your journey until now: </p>");
            out.println("<ul class='visited-cities' id='visited-cities'>");
            for (City city : cities) {
                out.println("<li>" + city.getName() + "</li>");
            }
            out.println("</ul>");
            out.println("</section>");

            out.println("<section id='journey'>");
            out.println("<section id='see-current-city'>");
            out.println("Current city:<span id='current-city'>" + currentCity.getName() + "</span><br>");
            out.println("<button id='get-neighbours' class='btn' onclick='onClickGetNeighbours("+currentCity.getId()+")'>See neighbours</button><br>");
            out.println("<button id='finish-journey' class='btn' onclick='finishJourney()'>Finish journey</button><br>");
            out.println("<button id='undo-journey-btn' onclick='undoJourney()' class='btn'>Undo last city</button>");
            out.println("</section>");
            out.println("</section>");
        }
        %>

    <div id="finish"></div>
    <div style="display: block; height: 100px"> </div>


    <script src="js/myscript.js"></script>

</body>
</html>
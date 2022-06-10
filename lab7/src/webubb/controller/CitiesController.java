package webubb.controller;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import webubb.domain.City;
import webubb.model.DBManager;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;


/**
 * Created by forest on 5/17/2018.
 */

public class CitiesController extends HttpServlet {

    private static final String ACTION = "action";

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String action = request.getParameter(ACTION);

        if ((action != null) && action.equals("getCities")){

            response.setContentType("application/json");
            DBManager dbmanager = new DBManager();
            ArrayList<City> cities = dbmanager.getCities();
            JSONArray jsonCities = new JSONArray();

            for (City city : cities) {
                JSONObject jObj = new JSONObject();
                jObj.put("CityId", city.getId());
                jObj.put("Name", city.getName());
                jsonCities.add(jObj);
            }

            PrintWriter out = new PrintWriter(response.getOutputStream());
            out.println(jsonCities.toJSONString());
            out.flush();
        }

        if ("getFinalCities".equals(action)){
            response.setContentType("application/json");
            DBManager dbmanager = new DBManager();

            int userId = Integer.parseInt(request.getParameter("userId"));
            ArrayList<City> cities = dbmanager.getCurrentJourney(userId);
            JSONArray jsonCities = new JSONArray();

            for (int i = 0; i < cities.size(); i++) {
                JSONObject jObj = new JSONObject();
                jObj.put("CityId", cities.get(i).getId());
                jObj.put("Name", cities.get(i).getName());
                jsonCities.add(jObj);
            }

            PrintWriter out = new PrintWriter(response.getOutputStream());
            out.println(jsonCities.toJSONString());
            out.flush();
        }

        if ((action != null) && action.equals("getNeighbours")){
            int currentCityId = Integer.parseInt(request.getParameter("currentCityId"));

            response.setContentType("application/json");
            DBManager dbmanager = new DBManager();
            ArrayList<City> cities = dbmanager.getNeighbours(currentCityId);
            JSONArray jsonCities = new JSONArray();

            for (int i = 0; i < cities.size(); i++) {
                JSONObject jObj = new JSONObject();
                jObj.put("CityId", cities.get(i).getId());
                jObj.put("Name", cities.get(i).getName());
                jsonCities.add(jObj);
            }

            PrintWriter out = new PrintWriter(response.getOutputStream());
            out.println(jsonCities.toJSONString());
            out.flush();
        }

    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter(ACTION);

        if ((action != null) && action.equals("addCurrentCity")) {
            int cityId = Integer.parseInt(request.getParameter("cityId"));
            int userId = Integer.parseInt(request.getParameter("userId"));

            DBManager dbmanager = new DBManager();
            boolean result = dbmanager.addCurrentCity(userId, cityId);

            PrintWriter out = new PrintWriter(response.getOutputStream());
            if (result) {
                out.println("City added successfully.");
            } else {
                out.println("Error adding city!");
            }
            out.flush();
        }

        deleteCities(action, request, response);

        if ((action != null) && action.equals("undoCity")) {
            int userId = Integer.parseInt(request.getParameter("userId"));

            DBManager dbmanager = new DBManager();
            boolean result = dbmanager.deleteLastCity(userId);

            PrintWriter out = new PrintWriter(response.getOutputStream());
            if (result) {
                out.println("You are now starting another journey...");
            } else {
                out.println("Error when restarting journey city!");
            }
            out.flush();
        }
    }

    private void deleteCities(String action, HttpServletRequest request, HttpServletResponse response) throws IOException {
        if ((action != null) && action.equals("deleteCities")) {
            int userId = Integer.parseInt(request.getParameter("userId"));

            DBManager dbmanager = new DBManager();
            boolean result = dbmanager.deleteCities(userId);

            PrintWriter out = new PrintWriter(response.getOutputStream());
            if (result) {
                out.println("You are now starting another journey...");
            } else {
                out.println("Error when restarting journey city!");
            }
            out.flush();
        }
    }

}

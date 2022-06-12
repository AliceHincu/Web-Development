package webubb.controller;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import webubb.domain.FamilyRelation;
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

public class FamilyController extends HttpServlet {
    private final String ACTION = "action";
    private final String GET_MOTHER_USERNAME = "getMotherUsername";
    private final String GET_FATHER_USERNAME = "getFatherUsername";
    private final String GET_FAMILY = "getFamily";
    private final String ADD_FAMILY = "addFamily";

    private final String GET_FATHER_LINE = "getDescendingLineFather";
    private final String GET_MOTHER_LINE = "getDescendingLineMother";
    private final DBManager dbmanager = new DBManager();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter(ACTION);

        //getMotherUsername(action, request, response);
        getUserFamily(action, request, response);
        getDescendingLineFather(action, request, response);
        getDescendingLineMother(action, request, response);

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter(ACTION);

        addFamily(action, request, response);
    }

    private void getUserFamily(String action, HttpServletRequest request, HttpServletResponse response) throws IOException {
        if (GET_FAMILY.equals(action)) {
            String username = request.getParameter("username");

            FamilyRelation family = dbmanager.getFamily(username);

            PrintWriter out = new PrintWriter(response.getOutputStream());
            if(family != null) {
                out.println(family.convertToJSONObject());
            } else {
                out.println("{}");
            }

            out.flush();
        }
    }

    private void addFamily(String action, HttpServletRequest request, HttpServletResponse response) throws IOException{
        if (ADD_FAMILY.equals(action)) {
            String username = request.getParameter("username");
            String mother = request.getParameter("mother");
            String father = request.getParameter("father");

            boolean result = dbmanager.addFamily(username, mother, father);

            PrintWriter out = new PrintWriter(response.getOutputStream());
            out.println(result);

            out.flush();
        }
    }

    private void getDescendingLineFather(String action, HttpServletRequest request, HttpServletResponse response) throws IOException{
        if (GET_FATHER_LINE.equals(action)) {
            String username = request.getParameter("username");

            ArrayList<String> family = dbmanager.getDescendingLineFather(username);

            JSONArray jsonAssets = new JSONArray();
            for (String user : family) {
                jsonAssets.add(user);
            }

            PrintWriter out = new PrintWriter(response.getOutputStream());
            out.println(jsonAssets);
            out.flush();
        }
    }

    private void getDescendingLineMother(String action, HttpServletRequest request, HttpServletResponse response) throws IOException{
        if (GET_MOTHER_LINE.equals(action)) {
            String username = request.getParameter("username");

            ArrayList<String> family = dbmanager.getDescendingLineMother(username);

            JSONArray jsonAssets = new JSONArray();
            for (String user : family) {
                jsonAssets.add(user);
            }

            PrintWriter out = new PrintWriter(response.getOutputStream());
            out.println(jsonAssets);
            out.flush();
        }
    }

}

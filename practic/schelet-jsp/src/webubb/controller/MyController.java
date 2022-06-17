package webubb.controller;

import org.json.simple.JSONArray;
import webubb.domain.Entity;
import webubb.domain.Player;
import webubb.model.DBManager;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

public class MyController extends HttpServlet {
    private final String ACTION = "action";
    private final String GET = "getPlayersDegree";
    private final String GET_POSITION = "getPositionPlayer";
    private final String ADD = "add";
    private final String DELETE = "delete";
    private final String UPDATE = "update";
    private final String FILTER = "filter";


    private final DBManager dbmanager = new DBManager();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter(ACTION);

        get(action, request, response);
        filter(action, request, response);
        getPosition(action, request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter(ACTION);

//        add(action, request, response);
//        delete(action, request, response);
//        update(action, request, response);
    }

    private void get(String action, HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        if(GET.equals(action)) {
            int degree = Integer.parseInt(request.getParameter("degree"));
            String username = request.getParameter("username");

            ArrayList<Player> entities = dbmanager.getEntities(degree, username);

            JSONArray jsonAssets = new JSONArray();
            for (Player e : entities) {
                jsonAssets.add(e.convertToJSONObject());
            }

            PrintWriter out = new PrintWriter(response.getOutputStream());
            out.println(jsonAssets.toJSONString());
            out.flush();
        }
    }

    private void getPosition(String action, HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        if(GET_POSITION.equals(action)) {
            String username = request.getParameter("username");

            String pos = dbmanager.getPositionPlayer(username);
//
            JSONArray jsonAssets = new JSONArray();
            jsonAssets.add(pos);
//            for (Player e : entities) {
//                jsonAssets.add(e.convertToJSONObject());
//            }

            PrintWriter out = new PrintWriter(response.getOutputStream());
            out.println(jsonAssets.toJSONString());
            out.flush();
        }
    }

    private void filter(String action, HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        if(FILTER.equals(action)) {
            String name = request.getParameter("name");

            ArrayList<Player> entities = dbmanager.filter(name);

            JSONArray jsonAssets = new JSONArray();
            for (Player e : entities) {
                jsonAssets.add(e.convertToJSONObject());
            }

            PrintWriter out = new PrintWriter(response.getOutputStream());
            out.println(jsonAssets.toJSONString());
            out.flush();
        }
    }

    private void add(String action, HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
//        if(ADD.equals(action)) {
//
//        }
    }

    private void delete(String action, HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
//        if(DELETE.equals(action)) {
//
//        }
    }

    private void update(String action, HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
//        if(UPDATE.equals(action)) {
//
//        }
    }
}

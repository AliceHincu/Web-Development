package webubb.controller;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class TestingController {
    private static final String ACTION = "action";
    private static final String GET_ALL_TESTING = "getAll";

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter(ACTION);

        /*if ((action != null) && action.equals("update")) {
            // We update an asset
            Asset asset = new Asset(Integer.parseInt(request.getParameter("id")),
                    Integer.parseInt(request.getParameter("userid")),
                    request.getParameter("description"),
                    Integer.parseInt(request.getParameter("value")));
            DBManager dbmanager = new DBManager();
            Boolean result = dbmanager.updateAsset(asset);
            PrintWriter out = new PrintWriter(response.getOutputStream());
            if (result == true) {
                out.println("Update asset succesfully.");
            } else {
                out.println("Error updating asset!");
            }
            out.flush();
        } else*/

    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    private void getAllTesting(String action, HttpServletRequest request, HttpServletResponse response) throws IOException {
        if (GET_ALL_TESTING.equals(action)) {
//            int userid = Integer.parseInt(request.getParameter("userid"));
//
//            response.setContentType("application/json");
//            DBManager dbmanager = new DBManager();
//
//            ArrayList<Test> tests = dbmanager.getTests(userid);
//            JSONArray jsonAssets = new JSONArray();
//            for (Asset asset : assets) {
//                JSONObject jObj = new JSONObject();
//                jObj.put("id", asset.getId());
//                jObj.put("userid", asset.getUserid());
//                jObj.put("description", asset.getDescription());
//                jObj.put("value", asset.getValue());
//                jsonAssets.add(jObj);
//            }
//            PrintWriter out = new PrintWriter(response.getOutputStream());
//            out.println(jsonAssets.toJSONString());
//            out.flush();
        }
    }
}

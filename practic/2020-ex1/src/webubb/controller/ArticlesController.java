package webubb.controller;

import com.google.gson.Gson;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import webubb.domain.Article;
import webubb.domain.Journal;
import webubb.model.DBManager;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.TimeZone;

public class ArticlesController extends HttpServlet {
    private static final String ACTION = "action";
    private static final String GET_JOURNALS = "getJournals";
    private static final String GET_ARTICLES = "getArticles";
    private static final String GET_JOURNAL_ID = "getJournalId";
    private static final String ADD_ARTICLE = "addArticle";
    private static final String GET_USERS = "getUsers";
    private static final String GET_LAST_ARTICLE = "getLastArticle";

    private final DBManager dbmanager = new DBManager();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter(ACTION);

        getUserJournals(action, request, response);
        getJournalArticles(action, request, response);
        //getJournalId(action, request, response);
        getLastArticle(action, request, response);
        getUsers(action, request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter(ACTION);

        addArticle(action, request, response);
    }

    private void getUserJournals(String action, HttpServletRequest request, HttpServletResponse response) throws IOException {
        if (GET_JOURNALS.equals(action)) {
            String username = request.getParameter("username");

            ArrayList<Journal> journals = dbmanager.getUserJournals(username);

            JSONArray jsonAssets = new JSONArray();
            for (Journal journal : journals) {
                JSONObject jObj = new JSONObject();
                jObj.put("id", journal.getId());
                jObj.put("name", journal.getName());
                jsonAssets.add(jObj);
            }

            PrintWriter out = new PrintWriter(response.getOutputStream());
            out.println(jsonAssets.toJSONString());
            out.flush();
        }
    }

    private void getJournalArticles(String action, HttpServletRequest request, HttpServletResponse response) throws IOException {
        if (GET_ARTICLES.equals(action)) {
            int journalId = Integer.parseInt(request.getParameter("journalId"));

            ArrayList<Article> articles = dbmanager.getJournalArticles(journalId);

            JSONArray jsonAssets = new JSONArray();
            for (Article article : articles) {
                JSONObject jObj = new JSONObject();
                jObj.put("id", article.getId());
                jObj.put("user", article.getUser());
                jObj.put("journalid", article.getJournalid());
                jObj.put("summary", article.getSummary());
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
                sdf.setTimeZone(TimeZone.getTimeZone("CET"));
                jObj.put("date", sdf.format(article.getDate()));
                jsonAssets.add(jObj);
            }

            PrintWriter out = new PrintWriter(response.getOutputStream());
            out.println(jsonAssets.toJSONString());
            out.flush();
        }
    }

//    private void getJournalId(String action, HttpServletRequest request, HttpServletResponse response) throws IOException {
//        if (GET_JOURNAL_ID.equals(action)) {
//            String journalName = request.getParameter("journalName");
//
//            int journalId = dbmanager.getJournalId(journalName);
//
//            PrintWriter out = new PrintWriter(response.getOutputStream());
//            out.println(journalId);
//            out.flush();
//        }
//    }

    private void addArticle(String action, HttpServletRequest request, HttpServletResponse response) throws IOException{
        if (ADD_ARTICLE.equals(action)) {
            String journalName = request.getParameter("journalName");
            String summary = request.getParameter("summary");
            String username = request.getParameter("username");
            String date = request.getParameter("date");

            boolean result = dbmanager.addArticle(username, journalName, summary, date);

            PrintWriter out = new PrintWriter(response.getOutputStream());
            out.println(result);
            out.flush();
        }
    }

    private void getUsers(String action, HttpServletRequest request, HttpServletResponse response) throws IOException {
        if(GET_USERS.equals(action)){
            ArrayList<String> users = dbmanager.getUsers();

            JSONArray jsonAssets = new JSONArray();
            for (String user : users) {
                JSONObject jObj = new JSONObject();
                jObj.put("username", user);
                jsonAssets.add(jObj);
            }

            PrintWriter out = new PrintWriter(response.getOutputStream());
            out.println(jsonAssets.toJSONString());
            out.flush();
        }
    }

    private void getLastArticle(String action, HttpServletRequest request, HttpServletResponse response) throws IOException {
        if(GET_LAST_ARTICLE.equals(action)){
            Article article = dbmanager.getLastArticle();

            JSONArray jsonAssets = new JSONArray();
            JSONObject jObj = new JSONObject();
            jObj.put("id", article.getId());
            jObj.put("user", article.getUser());
            jObj.put("journalid", article.getJournalid());
            jObj.put("summary", article.getSummary());
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
            sdf.setTimeZone(TimeZone.getTimeZone("CET"));
            jObj.put("date", sdf.format(article.getDate()));
            jsonAssets.add(jObj);

            PrintWriter out = new PrintWriter(response.getOutputStream());
            out.println(jsonAssets.toJSONString());
            out.flush();
        }
    }
}

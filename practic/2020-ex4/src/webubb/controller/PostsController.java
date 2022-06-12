package webubb.controller;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import webubb.domain.Post;
import webubb.domain.Topic;
import webubb.model.DBManager;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

public class PostsController extends HttpServlet {
    private static final String ACTION = "action";
    private static final String GET_POSTS = "getUserPosts";
    private static final String GET_TOPICS = "getTopics";

    private static final String GET_TOPIC_NAME = "getTopicName";
    private static final String UPDATE_POST = "updatePost";
    private static final String ADD_POST = "addPost";
    private static final String GET_LAST_POST = "getLastPost";
    private final DBManager dbmanager = new DBManager();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter(ACTION);

        getUserPosts(action, request, response);
        getTopics(action, request, response);
        getTopicName(action, request, response);
        getLastPost(action, request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");

        updatePost(action, request, response);
        addPost(action, request, response);
    }

    private void getUserPosts(String action, HttpServletRequest request, HttpServletResponse response) throws IOException {
        if (GET_POSTS.equals(action)) {
            String username = request.getParameter("username");

            ArrayList<Post> posts = dbmanager.getUserPosts(username);

            JSONArray jsonAssets = new JSONArray();
            for (Post post : posts) {
                JSONObject postWithTopicName = post.convertToJSONObject();
                postWithTopicName.put("topicname", dbmanager.getTopicName(post.getTopicid()));
                jsonAssets.add(postWithTopicName);
            }

            PrintWriter out = new PrintWriter(response.getOutputStream());
            out.println(jsonAssets.toJSONString());
            out.flush();
        }
    }

    private void getTopics(String action, HttpServletRequest request, HttpServletResponse response) throws IOException {
        if (GET_TOPICS.equals(action)) {
            ArrayList<Topic> topics = dbmanager.getTopics();

            JSONArray jsonAssets = new JSONArray();
            for (Topic topic : topics) {
                jsonAssets.add(topic.convertToJSONObject());
            }

            PrintWriter out = new PrintWriter(response.getOutputStream());
            out.println(jsonAssets.toJSONString());
            out.flush();
        }
    }

    private void getTopicName(String action, HttpServletRequest request, HttpServletResponse response) throws IOException {
        if (GET_TOPIC_NAME.equals(action)) {
            int id = Integer.parseInt(request.getParameter("id"));

            String name = dbmanager.getTopicName(id);

            PrintWriter out = new PrintWriter(response.getOutputStream());
            out.println(name);
            out.flush();
        }
    }

    private void updatePost(String action, HttpServletRequest request, HttpServletResponse response) throws IOException {
        if(UPDATE_POST.equals(action)) {
            String postId = request.getParameter("id");
            String username = request.getParameter("username");
            String topicName = request.getParameter("topicName");
            String text = request.getParameter("text");
            String date = request.getParameter("date");

            boolean result = dbmanager.updatePost(postId, username, topicName, text, date);

            PrintWriter out = new PrintWriter(response.getOutputStream());
            out.println(result);
            out.flush();
        }
    }

    private void addPost(String action, HttpServletRequest request, HttpServletResponse response) throws IOException {
        if(ADD_POST.equals(action)) {
            String username = request.getParameter("username");
            String topicName = request.getParameter("topicName");
            String text = request.getParameter("text");
            String date = request.getParameter("date");

            boolean result = dbmanager.addPost(username, topicName, text, date);

            PrintWriter out = new PrintWriter(response.getOutputStream());
            out.println(result);
            out.flush();
        }
    }

    private void getLastPost(String action, HttpServletRequest request, HttpServletResponse response) throws IOException {
        if(GET_LAST_POST.equals(action)){
            Post post = dbmanager.getLastPost();

            JSONArray jsonAssets = new JSONArray();

            jsonAssets.add(post.convertToJSONObject());

            PrintWriter out = new PrintWriter(response.getOutputStream());
            out.println(jsonAssets.toJSONString());
            out.flush();
        }
    }
}

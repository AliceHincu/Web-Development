package webubb.controller;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;
import webubb.domain.Question;
import webubb.domain.Quiz;
import webubb.model.DBManager;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

public class QuizController extends HttpServlet {
    private final String ACTION = "action";
    private final String GET_QUESTIONS = "getQuestions";
    private final String ADD_QUIZ = "addQuiz";
    private final String GET_QUIZZES = "getQuizzes";
    private final String GET_QUIZ = "getQuiz";
    private final String GET_QUESTION = "getQuestionBasedOnIndex";


    private final DBManager dbmanager = new DBManager();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter(ACTION);

        getQuestions(action, request, response);
        getQuizzes(action, request, response);
        getQuiz(action, request, response);
        getQuestion(action, request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter(ACTION);

        addQuiz(action, request, response);
    }

    private void getQuestions(String action, HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        if(GET_QUESTIONS.equals(action)) {
            ArrayList<Question> questions = dbmanager.getQuestions();

            JSONArray jsonAssets = new JSONArray();
            for (Question q : questions) {
                jsonAssets.add(q.convertToJSONObject());
            }

            PrintWriter out = new PrintWriter(response.getOutputStream());
            out.println(jsonAssets.toJSONString());
            out.flush();

        }
    }

    private void getQuizzes(String action, HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        if(GET_QUIZZES.equals(action)) {
            ArrayList<Quiz> quizes = dbmanager.getQuizzes();

            JSONArray jsonAssets = new JSONArray();
            for (Quiz q : quizes) {
                jsonAssets.add(q.convertToJSONObject());
            }

            PrintWriter out = new PrintWriter(response.getOutputStream());
            out.println(jsonAssets.toJSONString());
            out.flush();

        }
    }

    private void getQuiz(String action, HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        if (GET_QUIZ.equals(action)) {
            int id = Integer.parseInt(request.getParameter("id"));

            Quiz q = dbmanager.getQuiz(id);

            JSONArray jsonAssets = new JSONArray();

            jsonAssets.add(q.convertToJSONObject());

            PrintWriter out = new PrintWriter(response.getOutputStream());
            out.println(jsonAssets.toJSONString());
            out.flush();
        }
    }

    private void getQuestion(String action, HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        if (GET_QUESTION.equals(action)) {
            int quizId = Integer.parseInt(request.getParameter("quizId"));
            int index = Integer.parseInt(request.getParameter("index"));

            Question q = dbmanager.getQuestion(quizId, index);

            PrintWriter out = new PrintWriter(response.getOutputStream());
            if(q == null){
                JSONObject o = new JSONObject();
                o.put("message", "done");
                out.println(o);
            } else {
                JSONArray jsonAssets = new JSONArray();

                jsonAssets.add(q.convertToJSONObject());


                out.println(jsonAssets.toJSONString());
            }

            out.flush();
        }
    }

    private void addQuiz(String action, HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if (ADD_QUIZ.equals(action)) {
            String title = request.getParameter("title");
            //ArrayList<String> questions = (ArrayList<String>) (JSONValue.parse(request.getParameter("questions")));
            String questions = request.getParameter("questions");

            boolean result = dbmanager.addQuiz(title, questions);
            PrintWriter out = new PrintWriter(response.getOutputStream());
            if (result){
                out.println("Successfully added!");
            } else {
                out.println("Didn't add...something went wrong@");
            }
            out.flush();
        }
    }
}

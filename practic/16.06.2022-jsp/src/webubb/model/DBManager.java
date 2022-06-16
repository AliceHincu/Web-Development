package webubb.model;

import webubb.domain.Asset;
import webubb.domain.Question;
import webubb.domain.Quiz;
import webubb.domain.User;

import java.sql.*;
import java.util.ArrayList;

/**
 * Created by forest.
 */
public class DBManager {
    private Statement stmt;
    private final String databaseName = "examprep";
    private final String connectionString = "jdbc:mysql://localhost:3306/" + databaseName;
    private final String username = "root";
    private final String password = "";
    private final String driver = "com.mysql.cj.jdbc.Driver";

    public DBManager() {
        connect();
    }

    public void connect() {
        try {
            Class.forName(driver);
            Connection con = DriverManager.getConnection(connectionString, username, password);
            stmt = con.createStatement();
        } catch(Exception ex) {
            System.out.println("Error when trying to connect:"+ex.getMessage());
            ex.printStackTrace();
        }
    }

    public ArrayList<Question> getQuestions() {
        ArrayList<Question> questions = new ArrayList<>();
        ResultSet rs;

        try {
            String sql = "select * from question";
            rs = stmt.executeQuery(sql);
            while (rs.next()) {
                questions.add(new Question(
                        rs.getInt("ID"),
                        rs.getString("text"),
                        rs.getString("correctAnswer"),
                        rs.getString("wrongAnswer")
                ));
            }
            rs.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return questions;
    }

    public boolean addQuiz(String title, String listOfQuestions){
        String sql = "INSERT INTO quiz(title, listOfQuestions) VALUES ('" + title + "', '" + listOfQuestions + "')";
        int r = 0;

        try {
            r = stmt.executeUpdate(sql);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return r > 0;
    }

    public ArrayList<Quiz> getQuizzes() {
        ArrayList<Quiz> quizzes = new ArrayList<>();
        ResultSet rs;

        try {
            String sql = "select * from quiz";
            rs = stmt.executeQuery(sql);
            while (rs.next()) {
                quizzes.add(new Quiz(
                        rs.getInt("ID"),
                        rs.getString("title"),
                        rs.getString("listOfQuestions")
                ));
            }
            rs.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return quizzes;
    }

    public Quiz getQuiz(int id) {
        ResultSet rs;
        Quiz q = null;

        try {
            String sql = "select * from quiz where ID=" + id;
            rs = stmt.executeQuery(sql);
            if (rs.next()) {
                q = new Quiz(
                        rs.getInt("ID"),
                        rs.getString("title"),
                        rs.getString("listOfQuestions")
                );
            }
            rs.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return q;
    }

    public Question getQuestion(int quizId, int index) {
        ResultSet rs;
        Question q = null;

        try {
            String sql = "select listOfQuestions from quiz where ID=" + quizId;
            rs = stmt.executeQuery(sql);
            if (rs.next()) {
                String questions = rs.getString("listOfQuestions");
                String[] arrOfStr = questions.split(";");

                // here condition
                if(index == arrOfStr.length)
                    return null;

                int questionId = Integer.parseInt(arrOfStr[index]);
                sql = "select * from question where ID=" + questionId;
                rs = stmt.executeQuery(sql);
                if (rs.next()) {
                    q = new Question(
                            rs.getInt("ID"),
                            rs.getString("text"),
                            rs.getString("correctAnswer"),
                            rs.getString("wrongAnswer")
                    );
                }
            }
            rs.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return q;
    }


}
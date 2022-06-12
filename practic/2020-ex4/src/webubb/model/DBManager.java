package webubb.model;

import webubb.domain.Asset;
import webubb.domain.Post;
import webubb.domain.Topic;
import webubb.domain.User;

import java.sql.*;
import java.util.ArrayList;

/**
 * Created by forest.
 */
public class DBManager {
    private Statement stmt;
    private final String databaseName = "testingconnection";
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

    public ArrayList<Post> getUserPosts(String username) {
        ArrayList<Post> posts = new ArrayList<>();
        ResultSet rs;
        try {
            rs = stmt.executeQuery("select * from posts where user='"+username+"'");
            while (rs.next()) {
                posts.add(new Post(
                        rs.getInt("id"),
                        rs.getString("user"),
                        rs.getInt("topicid"),
                        rs.getString("text"),
                        rs.getDate("date")
                ));
            }
            rs.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return posts;
    }

    public ArrayList<Topic> getTopics() {
        ArrayList<Topic> topics = new ArrayList<>();
        ResultSet rs;
        try {
            rs = stmt.executeQuery("select * from topics");
            while (rs.next()) {
                topics.add(new Topic(
                        rs.getInt("id"),
                        rs.getString("topicname")
                ));
            }
            rs.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return topics;
    }

    public boolean addTopic(String topicName){
        String sql = "INSERT INTO topics(topicname) VALUES ('" + topicName + "')";
        int r = 0;

        try {
            r = stmt.executeUpdate(sql);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return r > 0;
    }

    public int getTopicId(String topicName){
        /**
         * Receive the name of the topic. If the topic exists, return its id. Else, return 0.
         */
        ResultSet rs;
        String sqlGetTopicId = "select * from topics where topicname='"+ topicName + "'";
        int id = 0;

        try {
            rs = stmt.executeQuery(sqlGetTopicId);
            if (rs.next()) {
                id = rs.getInt("id");
            }
            rs.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return id;
    }

    public String getTopicName(int id){
        /**
         * Receive the id of the topic. If the topic exists, return its name. Else, return empty string.
         */
        ResultSet rs;
        String sqlGetTopicId = "select * from topics where id="+ id;
        String name = "";

        try {
            rs = stmt.executeQuery(sqlGetTopicId);
            if (rs.next()) {
                name = rs.getString("topicname");
            }
            rs.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return name;
    }


    public boolean updatePost(String postId, String username, String topicName, String text, String date) {
        int topicId = this.getTopicId(topicName);

        // if the topic does not exist, we add it
        if(topicId == 0){
            this.addTopic(topicName);
            topicId = this.getTopicId(topicName);
        }

        String updateSql = "update posts set " +
                "topicid=" + topicId +
                ", text='" + text + "'" +
                ", date='" + date + "'" +
                " where id=" + postId;
        int affectedRows = 0;
        try {
            affectedRows = stmt.executeUpdate(updateSql);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return affectedRows > 0;
    }

    public boolean addPost(String username, String topicName, String text, String date){
        ResultSet rs;
        int topicId = this.getTopicId(topicName);

        // if the topic does not exist, we add it
        if(topicId == 0){
            this.addTopic(topicName);
            topicId = this.getTopicId(topicName);
        }

        // add post
        String sqlAddPost = "INSERT INTO posts(user, topicid, text, date) VALUES ('"
                + username + "', " + topicId + ", '" + text + "', '" + date + "')";

        int affectedRows = 0;
        try {
            affectedRows = stmt.executeUpdate(sqlAddPost);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return affectedRows > 0;
    }

    public Post getLastPost() {
        ResultSet rs;
        Post p = null;
        try {
            rs = stmt.executeQuery("SELECT * FROM posts ORDER BY ID DESC LIMIT 1");
            if (rs.next()) {
                p = new Post(
                        rs.getInt("id"),
                        rs.getString("user"),
                        rs.getInt("topicid"),
                        rs.getString("text"),
                        rs.getDate("date")
                );
            }
            rs.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return p;
    }

}
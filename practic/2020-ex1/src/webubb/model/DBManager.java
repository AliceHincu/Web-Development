package webubb.model;

import webubb.domain.Article;
import webubb.domain.Journal;

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

//    public User authenticate(String username, String password) {
//        ResultSet rs;
//        User u = null;
//        System.out.println(username+" "+password);
//        try {
//            rs = stmt.executeQuery("select * from userpasswords where username='"+username+"' and password='"+password+"'");
//            if (rs.next()) {
//                u = new User(rs.getInt("id"), rs.getString("username"), rs.getString("password"));
//            }
//            rs.close();
//        } catch (SQLException e) {
//            e.printStackTrace();
//        }
//        return u;
//    }

    public ArrayList<Journal> getUserJournals(String username) {
        ArrayList<Journal> journals = new ArrayList<>();
        ResultSet rs;
        try {
            rs = stmt.executeQuery("select * from journals where id IN (select distinct journalid from articles where user='"+ username+"')");
            while (rs.next()) {
                journals.add(new Journal(
                        rs.getInt("id"),
                        rs.getString("name")
                ));
            }
            rs.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return journals;
    }

    public ArrayList<Article> getJournalArticles(int journalId) {
        ArrayList<Article> articles = new ArrayList<>();
        ResultSet rs;
        try {
            rs = stmt.executeQuery("select * from articles where journalid="+ journalId);
            while (rs.next()) {
                articles.add(new Article(
                        rs.getInt("id"),
                        rs.getString("user"),
                        rs.getInt("journalid"),
                        rs.getString("summary"),
                        rs.getDate("date")
                ));
            }
            rs.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return articles;
    }

    public int getJournalId(String journalName){
        /**
         * Receive the name of the journal. If the journal exists, return its id. Else, return 0.
         */
        ResultSet rs;
        String sqlGetJournalId = "select * from journals where name='"+ journalName + "'";
        int id = 0;

        try {
            rs = stmt.executeQuery(sqlGetJournalId);
            if (rs.next()) {
                id = rs.getInt("id");
            }
            rs.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return id;
    }

    public boolean addJournal(String journalName){
        String sql = "INSERT INTO journals(name) VALUES ('" + journalName + "')";
        int r = 0;

        try {
            r = stmt.executeUpdate(sql);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        if (r>0) return true;
        else return false;
    }

    public boolean addArticle(String username, String journalName, String summary, String date){
        ResultSet rs;
        int journalId = this.getJournalId(journalName);

        // if the journal does not exist, we add it
        if(journalId == 0){
            this.addJournal(journalName);
            journalId = this.getJournalId(journalName);
        }

        // add article
        String sqlAddArticle = "INSERT INTO articles(user, journalid, summary, date) VALUES ('"
                + username + "', " + journalId + ", '" + summary + "', '" + date + "')";
        System.out.println(sqlAddArticle);

        int affectedRows = 0;
        try {
            affectedRows = stmt.executeUpdate(sqlAddArticle);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return affectedRows > 0;
    }

//    public ArrayList<Article> getNewArticles(String username) {
//
//    }
    public ArrayList<String> getUsers(){
        ArrayList<String> usernames = new ArrayList<>();
        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT DISTINCT user FROM articles");
            while (rs.next()) {
                usernames.add(rs.getString("user"));
            }
            rs.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return usernames;
    }

    public Article getLastArticle() {
        ResultSet rs;
        Article a = null;
        try {
            rs = stmt.executeQuery("SELECT * FROM articles ORDER BY ID DESC LIMIT 1");
            if (rs.next()) {
                a = new Article(
                        rs.getInt("id"),
                        rs.getString("user"),
                        rs.getInt("journalid"),
                        rs.getString("summary"),
                        rs.getDate("date")
                );
            }
            rs.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return a;
    }
}
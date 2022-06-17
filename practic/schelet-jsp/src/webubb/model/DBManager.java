package webubb.model;

import webubb.domain.Asset;
import webubb.domain.Entity;
import webubb.domain.Player;
import webubb.domain.User;

import java.sql.*;
import java.util.ArrayList;

/**
 * Created by forest.
 */
public class DBManager {
    private Statement stmt;
    private final String databaseName = "exam";
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

    public Player authenticate(String username) {
        ResultSet rs;
        Player p = null;
        try {
            rs = stmt.executeQuery("select * from player where name='"+username+"'");
            if (rs.next()) {
                return new Player(
                        rs.getInt("ID"),
                        rs.getString("name"),
                        rs.getString("position")
                );
            }
            rs.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return p;
    }

    private int getIdPlayer(String name) {
        int id = -1;
        String sql = "SELECT ID FROM player WHERE name = '" + name + "'";
        ResultSet rs;
        try {
            rs = stmt.executeQuery(sql);
            if (rs.next()) {
                id = rs.getInt("ID");
            }
            rs.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return id;
    }
    public String getPositionPlayer(String name) {
        String s = "";
        String sql = "SELECT position FROM player WHERE name = '" + name + "'";
        ResultSet rs;
        try {
            rs = stmt.executeQuery(sql);
            if (rs.next()) {
                s = rs.getString("position");
            }
            rs.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return s;
    }


    public ArrayList<Player> getEntities(int degree, String username) {
        // sql query to find useriD
        int usernameId = this.getIdPlayer(username);
        String sql;
        sql = "SELECT * FROM player WHERE ID in( ";
//                "SELECT IDplayer2 FROM 'teammembers` WHERE IDPlayer1 IN
//                (SELECT IDplayer2 FROM `teammembers` WHERE IDplayer1 IN
//                        (SELECT IDplayer2 FROM `teammembers` WHERE IDplayer1 = 1 )
//                )

        if(degree == 1) {
            sql += "SELECT IDplayer2 FROM `teammembers` WHERE IDplayer1 = " + usernameId;
        } else if(degree == 2) {
            sql += "SELECT IDplayer2 FROM `teammembers` WHERE IDplayer1 IN " +
                    "(SELECT IDplayer2 FROM `teammembers` WHERE IDplayer1 = " + usernameId + ")";
        } else if(degree == 3) {
            sql += "SELECT IDplayer2 FROM `teammembers` WHERE IDPlayer1 IN" +
                    "(SELECT IDplayer2 FROM `teammembers` WHERE IDplayer1 IN" +
                        "(SELECT IDplayer2 FROM `teammembers` WHERE IDplayer1 = " + usernameId + ")" +
                    ")";
        }

        sql += ");";
        System.out.println(sql);
        ArrayList<Player> entities = new ArrayList<>();
        ResultSet rs;

        try {
            rs = stmt.executeQuery(sql);
            while (rs.next()) {
                entities.add(new Player(
                        rs.getInt("ID"),
                        rs.getString("name"),
                        rs.getString("position")
                ));
            }
            rs.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return entities;
    }

    public boolean add(String name, String date){
//        int topicId = this.getTopicId(topicName);
//
//        // if the topic does not exist, we add it
//        if(topicId == 0){
//            this.addTopic(topicName);
//            topicId = this.getTopicId(topicName);
//        }

        // add
        String sql = "INSERT INTO entities(name, date) VALUES ('"
                + name + "', '" + date + "')";

        int affectedRows = 0;
        try {
            affectedRows = stmt.executeUpdate(sql);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return affectedRows > 0;
    }

    public boolean delete(int id){
        String sql = "DELETE FROM entities WHERE id = " + id;

        int affectedRows = 0;
        try {
            affectedRows = stmt.executeUpdate(sql);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return affectedRows > 0;
    }

    public boolean update(int id, String name, String date) {
//        int topicId = this.getTopicId(topicName);
//
//        // if the topic does not exist, we add it
//        if(topicId == 0){
//            this.addTopic(topicName);
//            topicId = this.getTopicId(topicName);
//        }

        String updateSql = "update entities set " +
                "name='" + name + "'" +
                ", date='" + date + "'" +
                " where id=" + id;

        int affectedRows = 0;
        try {
            affectedRows = stmt.executeUpdate(updateSql);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return affectedRows > 0;
    }

    public ArrayList<Player> filter(String name) {
        ArrayList<Player> entities = new ArrayList<>();
        ResultSet rs;
        String sql = "select * from player where name like '%" + name + "%'";

        try {
            rs = stmt.executeQuery(sql);
            while (rs.next()) {
                entities.add(new Player(
                        rs.getInt("ID"),
                        rs.getString("name"),
                        rs.getString("position")
                ));
            }
            rs.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return entities;
    }
}
package webubb.model;

import webubb.domain.Asset;
import webubb.domain.City;
import webubb.domain.User;

import java.sql.*;
import java.util.ArrayList;

/**
 * Created by forest.
 */
public class DBManager {
    private Statement stmt;
    private final String connectionString = "jdbc:mysql://localhost:3306/login";
    private final String username = "root";
    private final String password = "";

    public DBManager() {
        connect();
    }

    public void connect() {
        try {
            String driver = "com.mysql.cj.jdbc.Driver";
            Class.forName(driver);
            Connection con = DriverManager.getConnection(connectionString, username, "");
            stmt = con.createStatement();
        } catch(Exception ex) {
            System.out.println("Error when trying to connect:"+ex.getMessage());
            ex.printStackTrace();
        }
    }

    public User authenticate(String username, String password) {
        ResultSet rs;
        User u = null;
        System.out.println(username+" "+password);
        try {
            rs = stmt.executeQuery("select * from userpasswords where username='"+username+"' and password='"+password+"'");
            if (rs.next()) {
                u = new User(rs.getInt("id"), rs.getString("username"), rs.getString("password"));
            }
            rs.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return u;
    }

    public ArrayList<City> getCities() {
        ArrayList<City> cities = new ArrayList<>();
        ResultSet rs;
        try {
            rs = stmt.executeQuery("select * from cities");
            while(rs.next()) {
                City city = new City(rs.getInt("CityId"), rs.getString("Name"));
                cities.add(city);
            }
            rs.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return cities;
    }


    public ArrayList<City> getCurrentJourney(int userId) {
        ArrayList<City> cities = new ArrayList<>();
        ResultSet rs;
        try {
            rs = stmt.executeQuery(
                    "select cities.CityId, cities.Name  " +
                            "from userjourney, cities " +
                            "where userjourney.UserId = " + userId + " and userjourney.CityId = cities.CityId");
            while(rs.next()) {
                City city = new City(rs.getInt("CityId"), rs.getString("Name"));
                cities.add(city);
            }
            rs.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return cities;
    }

    public ArrayList<City> getNeighbours(int cityId) {
        ArrayList<City> cities = new ArrayList<>();
        ResultSet rs;
        try {
            rs = stmt.executeQuery(
                    "select C.CityId, C.Name from cities C, neighbours N where N.CurrentCityId = "
                    +cityId+ " and C.CityId = N.NeighbourId");
            while(rs.next()) {
                City city = new City(rs.getInt("CityId"), rs.getString("Name"));
                cities.add(city);
            }
            rs.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return cities;
    }

    public boolean addCurrentCity(int userId, int cityId){
        String sql = "INSERT INTO userjourney(UserId, CityId) VALUES (" + userId + ", " + cityId + ")";
        int r = 0;
        try {
            r = stmt.executeUpdate(sql);
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return r > 0;

    }

    public boolean deleteCities(int userId){
        String sql = "DELETE FROM userjourney WHERE UserId= " + userId;
        int r = 0;
        try {
            r = stmt.executeUpdate(sql);
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return r > 0;
    }

    public boolean deleteLastCity(int userId){
        String sql = "DELETE FROM userjourney WHERE EntryId = " +
                        "(SELECT Max(EntryId) FROM userjourney WHERE userjourney.UserId = " + userId + ")";
        int r = 0;
        try {
            r = stmt.executeUpdate(sql);
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return r > 0;
    }

}
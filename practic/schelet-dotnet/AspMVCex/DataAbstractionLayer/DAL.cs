using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using AspMVCex.Models;
using MySql.Data.MySqlClient;

namespace AspMVCex.DataAbstractionLayer
{
    public class DAL
    {
        private static string host = "localhost";
        private static string port = "3306";
        private static string username = "root";
        private static string password = "";
        private static string database = "exam";
        private string connectionString = $"datasource={host};port={port};username={username};password={password};database={database};";

        public List<User> GetAllUsers()
        {
            /**
             * Get all users
             */
            List<User> list = new List<User>();

            try
            {
                MySqlConnection conn = new MySqlConnection(this.connectionString);
                conn.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conn;
                cmd.CommandText = "select * from users";
                MySqlDataReader myreader = cmd.ExecuteReader();

                while (myreader.Read())
                {
                    User user = new User();
                    user.id = myreader.GetInt32("id");
                    user.username = myreader.GetString("username");
                    user.password = myreader.GetString("password");
                    list.Add(user);
                }
                myreader.Close();
            }
            catch (MySqlException ex)
            {
                Console.Write(ex.Message);
            }
            return list;

        }

        public List<Entity> Get()
        {
            List<Entity> list = new List<Entity>();

            try
            {
                MySqlConnection conn = new MySqlConnection(this.connectionString);
                conn.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conn;
                cmd.CommandText = "select * from entities";
                MySqlDataReader myreader = cmd.ExecuteReader();

                while (myreader.Read())
                {
                    Entity entity = new Entity();
                    entity.id = myreader.GetInt32("id");
                    entity.name = myreader.GetString("name");
                    entity.date = myreader.GetDateTime("date");
                    list.Add(entity);
                }
                myreader.Close();
            }
            catch (MySqlException ex)
            {
                Console.Write(ex.Message);
            }
            return list;
        }

        public List<Entity> Filter(string name)
        {
            List<Entity> list = new List<Entity>();

            try
            {
                MySqlConnection conn = new MySqlConnection(this.connectionString);
                conn.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conn;
                cmd.CommandText = "select * from entities where name like '%" + name + "%'";
                MySqlDataReader myreader = cmd.ExecuteReader();

                while (myreader.Read())
                {
                    Entity entity = new Entity();
                    entity.id = myreader.GetInt32("id");
                    entity.name = myreader.GetString("name");
                    entity.date = myreader.GetDateTime("date");
                    list.Add(entity);
                }
                myreader.Close();
            }
            catch (MySqlException ex)
            {
                Console.Write(ex.Message);
            }
            return list;
        }

        public bool Add(string name, string date)
        {
            try
            {
                MySqlConnection conn = new MySqlConnection(this.connectionString);
                conn.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conn;
                cmd.CommandText = "insert into entities(name, date) values('" + name + "', '" + date + "')";
                if (cmd.ExecuteNonQuery() != 0)
                {
                    return true;
                }

            }
            catch (MySqlException ex)
            {
                Console.Write(ex.Message);
            }
            return false;

        }

        public bool Delete(int id)
        {
            try
            {
                MySqlConnection conn = new MySqlConnection(this.connectionString);
                conn.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conn;
                cmd.CommandText = "delete from entities where id = " + id;
                if (cmd.ExecuteNonQuery() != 0)
                {
                    return true;
                }

            }
            catch (MySqlException ex)
            {
                Console.Write(ex.Message);
            }
            return false;

        }

        public bool Update(int id, string name, string date)
        {
            try
            {
                MySqlConnection conn = new MySqlConnection(this.connectionString);
                conn.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conn;
                cmd.CommandText = "update entities set name='" + name + "', date='" + date + "' where id = " + id;
                if (cmd.ExecuteNonQuery() != 0)
                {
                    return true;
                }

            }
            catch (MySqlException ex)
            {
                Console.Write(ex.Message);
            }
            return false;

        }

        //public Student GetStudentByName(string name)
        //{
        //    MySql.Data.MySqlClient.MySqlConnection conn;
        //    string myConnectionString;

        //    myConnectionString = "server=localhost;uid=postgres;pwd=password;database=dotnet;";

        //    try
        //    {
        //        conn = new MySql.Data.MySqlClient.MySqlConnection();
        //        conn.ConnectionString = myConnectionString;
        //        conn.Open();

        //        MySqlCommand cmd = new MySqlCommand();
        //        cmd.Connection = conn;
        //        cmd.CommandText = "select * from students where name='" + name + "'";
        //        MySqlDataReader myreader = cmd.ExecuteReader();

        //        Student stud = new Student();
        //        if (myreader.Read())
        //        {
        //            stud.Id = myreader.GetInt32("id");
        //            stud.Nume = myreader.GetString("name");
        //            stud.Password = myreader.GetString("password");
        //            stud.Group_id = myreader.GetInt32("group_id");
        //        }
        //        myreader.Close();
        //        return stud;
        //    }
        //    catch (MySql.Data.MySqlClient.MySqlException ex)
        //    {
        //        Console.Write(ex.Message);
        //    }
        //    return null;

        //}

        //public List<Student> GetStudentsFromGroup(int group_id)
        //{
        //    MySql.Data.MySqlClient.MySqlConnection conn;

        //    List<Student> slist = new List<Student>();

        //    try
        //    {
        //        conn = new MySqlConnection();
        //        conn.ConnectionString = this.connectionString;
        //        conn.Open();

        //        MySqlCommand cmd = new MySqlCommand();
        //        cmd.Connection = conn;
        //        cmd.CommandText = "select * from students where group_id=" + group_id;
        //        MySqlDataReader myreader = cmd.ExecuteReader();

        //        while (myreader.Read())
        //        {
        //            Student stud = new Student();
        //            stud.Id = myreader.GetInt32("id");
        //            stud.Nume = myreader.GetString("name");
        //            stud.Password = myreader.GetString("password");
        //            stud.Group_id = myreader.GetInt32("group_id");
        //            slist.Add(stud);
        //        }
        //        myreader.Close();
        //    }
        //    catch (MySql.Data.MySqlClient.MySqlException ex)
        //    {
        //        Console.Write(ex.Message);
        //    }
        //    return slist;

        //}



    }
}
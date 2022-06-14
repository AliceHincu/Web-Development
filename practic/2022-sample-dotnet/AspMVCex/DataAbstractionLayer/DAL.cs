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
        private static string database = "dotnet";
        private string connectionString = $"datasource={host};port={port};username={username};password={password};database={database};";

        public List<SoftwareDeveloper> GetAllDevelopers()
        {
            /**
             * Get all users
             */
            List<SoftwareDeveloper> list = new List<SoftwareDeveloper>();

            try
            {
                MySqlConnection conn = new MySqlConnection(this.connectionString);
                conn.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conn;
                cmd.CommandText = "select * from softwaredeveloper";
                MySqlDataReader myreader = cmd.ExecuteReader();

                while (myreader.Read())
                {
                    SoftwareDeveloper user = new SoftwareDeveloper();
                    user.id = myreader.GetInt32("id");
                    user.name = myreader.GetString("name");
                    user.age = myreader.GetInt32("age");
                    user.skills = myreader.GetString("skills");
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

        public List<Project> GetProjectsByDeveloper(int userId)
        {
            List<Project> list = new List<Project>();

            try
            {
                MySqlConnection conn = new MySqlConnection(this.connectionString);
                conn.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conn;
                cmd.CommandText = "select * from project";
                MySqlDataReader myreader = cmd.ExecuteReader();

                while (myreader.Read())
                {
                    Project project = new Project();
                    project.id = myreader.GetInt32("id");
                    project.projectManagerID = myreader.GetInt32("ProjectManagerID");
                    project.name = myreader.GetString("name");
                    project.description = myreader.GetString("description");
                    project.members = myreader.GetString("members");
                    list.Add(project);
                }
                myreader.Close();
            }
            catch (MySqlException ex)
            {
                Console.Write(ex.Message);
            }
            return list; 
        }

        public List<Project> GetProjectsMemberOf(string name)
        {
            List<Project> list = new List<Project>();

            try
            {
                MySqlConnection conn = new MySqlConnection(this.connectionString);
                conn.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conn;
                cmd.CommandText = "select * from project where members LIKE '%" + name + "%'";
                MySqlDataReader myreader = cmd.ExecuteReader();

                while (myreader.Read())
                {
                    Project project = new Project();
                    project.id = myreader.GetInt32("id");
                    project.projectManagerID = myreader.GetInt32("ProjectManagerID");
                    project.name = myreader.GetString("name");
                    project.description = myreader.GetString("description");
                    project.members = myreader.GetString("members");
                    list.Add(project);
                }
                myreader.Close();
            }
            catch (MySqlException ex)
            {
                Console.Write(ex.Message);
            }
            return list;
        }


        /* HERE STARTS BIG FUNCTION*/
        public bool checkDev(string devname)
        {
            try
            {
                MySqlConnection conn = new MySqlConnection(this.connectionString);
                conn.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conn;
                cmd.CommandText = "select * from softwaredeveloper where name='" + devname + "'";
                MySqlDataReader myreader = cmd.ExecuteReader();

                if (myreader.Read())
                {
                    myreader.Close();
                    return true;
                }
                
            }
            catch (MySqlException ex)
            {
                Console.Write(ex.Message);
            }

            return false;
        }

        public bool checkProject(string name)
        {
            try
            {
                MySqlConnection conn = new MySqlConnection(this.connectionString);
                conn.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conn;
                cmd.CommandText = "select * from project where name='" + name + "'";
                MySqlDataReader myreader = cmd.ExecuteReader();

                if (myreader.Read())
                {
                    myreader.Close();
                    return true;
                }

            }
            catch (MySqlException ex)
            {
                Console.Write(ex.Message);
            }

            return false;
        }

        public void SaveProject(string name, string devname)
        {

            try
            {
                MySqlConnection conn = new MySqlConnection(this.connectionString);
                conn.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conn;
                cmd.CommandText = "insert into project(ProjectManagerID, name, description, members) values(0, '" + name + "', '', '" + devname + ";')";
                cmd.ExecuteNonQuery();

            }
            catch (MySqlException ex)
            {
                Console.Write(ex.Message);
            }

        }

        public void AddDevToProject(string devname, string project)
        {
            try
            {
                MySqlConnection conn = new MySqlConnection(this.connectionString);
                conn.Open();

                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conn;
                cmd.CommandText = "select * from project where name='" + project + "'";
                MySqlDataReader myreader = cmd.ExecuteReader();

                if (myreader.Read())
                {
                    int id = myreader.GetInt32("id");
                    myreader.Close();

                    cmd.CommandText = "update project set members=CONCAT(members, '" + devname + ";') WHERE id=" + id;
                    cmd.ExecuteNonQuery();
                    
                }

            }
            catch (MySqlException ex)
            {
                Console.Write(ex.Message);
            }

        }

        public string AddDevToProjects(string devname, string projects)
        {
            string[] projectsSplit = projects.Split(' ');

            // check if developer exists
            bool isExisting = this.checkDev(devname);
            if(!isExisting)
            {
                return "Developer does not exist";
            }

            foreach (var project in projectsSplit)
            {
                // if project doesn t exist, add it.
                isExisting = this.checkProject(project);

                if(!isExisting)
                {
                    this.SaveProject(project, devname);
                } else
                {
                    // check if dev already is in the project
                    List<Project> list = this.GetProjectsMemberOf(devname).Where(p => p.name == project).ToList();
                    if (list.Count.Equals(0))
                    {
                        this.AddDevToProject(devname, project);
                    } // else don't add.
                }

            }
            return "Developer added";
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

        //public void SaveStudent(Student stud)
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
        //        cmd.CommandText = "insert into students values(" + stud.Id + ",'" + stud.Nume + "','" + stud.Password + "'," + stud.Group_id + ")";
        //        cmd.ExecuteNonQuery();

        //    }
        //    catch (MySql.Data.MySqlClient.MySqlException ex)
        //    {
        //        Console.Write(ex.Message);
        //    }

        //}

    }
}
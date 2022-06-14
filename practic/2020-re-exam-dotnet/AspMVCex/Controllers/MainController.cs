using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using AspMVCex.Models;
using AspMVCex.DataAbstractionLayer;
using Microsoft.AspNetCore.Cors;
using Newtonsoft.Json;

namespace AspMVCex.Controllers
{
    //[EnableCors(origins: "*", headers: "*", methods: "*")]
    
    public class MainController : Controller
    {
        private DAL dal = new DAL();

        // GET: Main
        public ActionResult Index()
        {
            return View("Login");

        }

        public ActionResult Login(string username, string password)
        {
            List<User> users = this.dal.GetAllUsers()
                .Where(user => user.username.Equals(username) && user.password.Equals(password))
                .ToList();
            if (users.Count.Equals(0))
            {
                return View("LoginFailed");
            } 
            else
            {
                HttpCookie userInfo = new HttpCookie("user");
                userInfo["userid"] = users[0].id.ToString();

                ViewData["user"] = users[0];
                return View("MainPage");
            }
        }

        // GET
        public string GetFilesByUser(int userid)
        {
            //int id = (int) HttpContext.Session["userid"];
            //if (id == null)
            //{
            //    return JsonConvert.SerializeObject("Something went wrong with the user session");
            //}
            List<File> files = this.dal.GetFilesByUser(userid);
            return JsonConvert.SerializeObject(files);
        }

        public string GetFilesByUserPaginated(int userid, int currentPage, int pageSize)
        {
            List<File> files = this.dal.GetFilesByUser(userid)
                .Skip(currentPage * pageSize)
                .Take(pageSize)
                .ToList();
            return JsonConvert.SerializeObject(files);
        }


        public string TestController()
        {
            return "Testing the MainController .. OK!";
        }

        public ActionResult testGetStudent()
        {
            Student stud = new Student();

            stud.Id = 10;
            stud.Nume = "Nume1";
            stud.Password = "Pass1";
            stud.Group_id = 1;

            ViewData["student"] = stud;
            return View("ViewStudent");
        }

        //public ActionResult GetStudents()
        //{
        //    DAL dal = new DAL();
        //    List<User> slist = dal.GetAllUsers();
        //    ViewData["studentList"] = slist;
        //    return View("ViewGetStudents");
        //}

        //public ActionResult AddStudent()
        //{
        //    return View("AddNewStudent");
        //}

        //public ActionResult SaveStudent()
        //{
        //    Student stud = new Student();
        //    stud.Id = int.Parse(Request.Params["id"]);
        //    stud.Nume = Request.Params["nume"];
        //    stud.Password = Request.Params["password"];
        //    stud.Group_id = int.Parse(Request.Params["group_id"]);

        //    DAL dal = new DAL();
        //    dal.SaveStudent(stud);
        //    return RedirectToAction("GetStudents");
        //}

        //public string GetStudentsFromGroup()
        //{
        //    int group_id = int.Parse(Request.Params["group_id"]);
        //    DAL dal = new DAL();
        //    List<Student> slist = dal.GetStudentsFromGroup(group_id);
        //    ViewData["studentList"] = slist;

        //    string result = "<table><thead><th>Id</th><th>Nume</th><th>Password</th><th>Group_Id</th></thead>";

        //    foreach (Student stud in slist)
        //    {
        //        result += "<tr><td>" + stud.Id + "</td><td>" + stud.Nume + "</td><td>" + stud.Password + "</td><td>" + stud.Group_id + "</td><td></tr>";
        //    }

        //    result += "</table>";
        //    return result;
        //}
    }
}
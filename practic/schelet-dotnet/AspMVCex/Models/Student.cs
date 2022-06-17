using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AspMVCex.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string Nume { get; set; }
        public string Password { get; set; }
        public int Group_id { get; set; }
    }
}
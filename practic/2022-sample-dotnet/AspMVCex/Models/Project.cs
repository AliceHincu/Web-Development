using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AspMVCex.Models
{
    public class Project
    {
        public int id { get; set; }
        public int projectManagerID { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string members { get; set; }
    }
}
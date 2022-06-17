using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AspMVCex.Models
{
    public class File
    {
        public int id { get; set; }
        public int userid { get; set; }
        public string filename { get; set; }
        public string filepath { get; set; }
        public int size { get; set; }
    }
}
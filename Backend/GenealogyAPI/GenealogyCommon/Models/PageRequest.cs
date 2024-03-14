using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyCommon.Models
{
    public class PageRequest
    {
        public int PageSize {get; set;}
        public int PageNumber {get; set;}
        public string Condition {get; set;}
        public string SortOrder {get; set;}
    }
}

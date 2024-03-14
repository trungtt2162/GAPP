using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyCommon.Models
{
    public class PageResult<T>
    {
        public List<T> Data { get; set; }
        public int TotalCount { get; set; }
    }
}

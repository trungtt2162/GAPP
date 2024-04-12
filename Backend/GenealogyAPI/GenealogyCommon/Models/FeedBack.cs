using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyCommon.Models
{
    [Table("feedback")]
    public class FeedBack: BaseModel
    {
        public int IdGenealogy { get; set; }

        public int Type { get; set; }

        public string Name { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public int IdInstance { get; set; }

        public string Image { get; set; }
    }
}

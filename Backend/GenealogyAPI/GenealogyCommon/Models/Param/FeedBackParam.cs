using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyCommon.Models.Param
{
    public class FeedBackParam
    {
        [Required]
        public int IdGenealogy { get; set; }

        public int Type { get; set; }

        public string Name { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        [Required]
        public int IdInstance { get; set; }

        public string? Image { get; set; }

        public bool IsCheck { get; set; } = false;
    }
}

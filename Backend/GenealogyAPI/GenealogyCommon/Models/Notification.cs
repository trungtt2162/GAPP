using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyCommon.Models
{
    [Table("notification")]
    public class Notification: BaseModel
    {
        public int SenderID { get; set; }

        public string SenderName { get; set; }

        public int ReceiveID { get; set; }

        public string Type { get; set; }

        public string RawData { get; set; }
        
        public bool? IsViewed { get; set; } = false;
    }
}

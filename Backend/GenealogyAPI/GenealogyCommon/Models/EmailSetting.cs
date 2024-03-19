using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyCommon.Models
{
    public class EmailSetting
    {
        public string FromName { get; set; }
        public string FromAddress { get; set; }

        public string APIKey { get; set; }
        public string SecretKey { get; set; }
    }
}

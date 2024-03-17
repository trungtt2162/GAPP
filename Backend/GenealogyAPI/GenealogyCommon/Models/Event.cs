using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyCommon.Models
{
    [Table("event")]
    public class Event: BaseModel
    {

        public int IdGenealogy {get; set;}

        public string Name { get; set; }
        
        public string Description { get; set; }

        public string LinkStream { get; set; }
        
        public int Type { get; set; }
        
        public string Background {get; set;}

        public DateTime OrganizationDate {get; set;}

        public string Location {get; set;}

        public int UserIDHost { get; set; }
    }

    [Table("user_event")]
    public class UserEvent: BaseModel
    {

        public int IdGenealogy { get; set; }
        public int UserID { get; set; }
        
        public int IdEvent { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public int Type { get; set; } 
    }
}

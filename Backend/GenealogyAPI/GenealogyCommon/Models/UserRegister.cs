using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyCommon.Models
{
    public class UserRegister
    {

        [Required(ErrorMessage = "Username is required.")]
        [EmailAddress]
        public string Username { get; set; }

        [Required(ErrorMessage = "First name is required.")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last name is required.")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        public string Password { get; set; }

        public string Phone { get; set; }

        public string Address { get; set; }

        public bool Gender { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public string HomeTown { get; set; }


    }
}

using AutoMapper;
using GenealogyCommon.Models;
using GenealogyCommon.Models.Authen;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyCommon.Mapper
{
    public class UserMapper: Profile
    {
        public UserMapper() { 
            CreateMap<UserRegister, User>();
            CreateMap<UserRegister, Credential>();
        }
    }
}

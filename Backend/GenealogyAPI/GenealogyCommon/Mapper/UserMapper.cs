using AutoMapper;
using GenealogyCommon.Models;
using GenealogyCommon.Models.Authen;
using GenealogyCommon.Models.Param;
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
            CreateMap<UserRegister, User>()
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Username));
            CreateMap<UserRegister, Credential>();
            CreateMap<UserAdmin, User>();
            CreateMap<UserAdmin, Genealogy>();
            CreateMap<FamilyTreeParam, FamilyTree>();
        }
    }
}

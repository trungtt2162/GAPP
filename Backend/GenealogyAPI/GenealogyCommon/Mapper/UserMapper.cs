﻿using AutoMapper;
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
    public class CommonMapper: Profile
    {
        public CommonMapper() { 
            CreateMap<UserRegister, User>()
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Username))
                .ForMember(dest => dest.Gender, opt => opt.MapFrom(src => src.Gender ? 0 : 1));
            CreateMap<UserRegister, Credential>();
            CreateMap<UserAdmin, User>();
            CreateMap<UserAdmin, Genealogy>();
            CreateMap<FamilyTreeParam, FamilyTree>();
            CreateMap<UserGenealogyParam, UserGenealogy>();
            CreateMap<User, UserGenealogy>();
            CreateMap<UserGenealogy, User>();
            CreateMap<FamilyTree, FamilyTreeClient>();
            CreateMap<ChangePassword, Credential>();
            CreateMap<FamilyAddressParam, FamilyAddress>();
            CreateMap<FamilyHistoryParam, FamilyHistory>();
            CreateMap<FamilyHistoryDetailParam, FamilyHistoryDetail>();
            CreateMap<EventParam, Event>();
            CreateMap<EventUserParam, UserEvent>();
            CreateMap<FundParam, Fund>();
            CreateMap<FundContributorParam, FundContributor>();
            CreateMap<FundSendParam, FundSend>();
            CreateMap<FeedBackParam, FeedBack>();
            CreateMap<FamilyTreeClient, FamilyTreeExport>();
            CreateMap<UserParam, User>();
            CreateMap<UserGenealogy, UserRegister>().ForMember(des => des.Username, act => act.MapFrom(src => src.Email));
            CreateMap<EventRequest, Event>();

        }
    }
}

using GenealogyBL.Interfaces;
using GenealogyCommon.Constant;
using GenealogyCommon.Interfaces;
using GenealogyCommon.Models;
using GenealogyDL.Implements;
using GenealogyDL.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyBL.Implements
{
    internal class FamilyTreeBL: BaseBL<FamilyTree>, IFamilyTreeBL
    {
        private readonly IFamilyTreeDL _familyTreeDL;
        private readonly IUserBL _userBL;
        public readonly IAuthService _authService;
        public FamilyTreeBL(IAuthService authService,IUserBL userBL,IFamilyTreeDL familyTreeDL, IWebHostEnvironment env) : base(env, familyTreeDL)
        {
            _familyTreeDL = familyTreeDL;
            _userBL = userBL;
            _authService = authService;
        }

        public async Task<object> Create(FamilyTree familyTree)
        {
            var check = await _userBL.CheckPermissionSubSystem(int.Parse(_authService.GetUserID()), SubSystem.Genealogy, PermissionCode.Add, familyTree.IdGenealogy);
            if (!check)
            {
                throw new ArgumentException("UnAuthorized");
            }
            return await _familyTreeDL.Create(familyTree);
        }

        public async Task<bool> Update(FamilyTree familyTree)
        {
            var check = await _userBL.CheckPermissionSubSystem(int.Parse(_authService.GetUserID()), SubSystem.Genealogy, PermissionCode.Edit, familyTree.IdGenealogy);
            if (!check)
            {
                throw new ArgumentException("UnAuthorized");
            }
            return await _familyTreeDL.Update(familyTree);
        }

        public async Task<bool> DeleteByID(int id, int idGenealogy)
        {
            var check = await _userBL.CheckPermissionSubSystem(int.Parse(_authService.GetUserID()), SubSystem.Genealogy, PermissionCode.Delete, idGenealogy);
            if (!check)
            {
                throw new ArgumentException("UnAuthorized");
            }
            return await _familyTreeDL.DeleteById(id, idGenealogy);
        }

    }
}

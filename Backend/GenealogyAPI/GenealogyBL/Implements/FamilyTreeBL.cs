using AutoMapper;
using GenealogyBL.Interfaces;
using GenealogyCommon.Constant;
using GenealogyCommon.Implements;
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
        private readonly IUserGenealogyDL _userGenealogyDL;
        private readonly IMapper _mapper;
        private readonly IExportService _exportService;
        private readonly IEmailSender _emailSender;
        private readonly IGenealogyDL _genealogyDL;
        public FamilyTreeBL(IGenealogyDL genealogyDL, IEmailSender emailSender, IExportService exportService, IMapper mapper, IUserGenealogyDL userGenealogyDL,IUserBL userBL,IFamilyTreeDL familyTreeDL, IWebHostEnvironment env, ILogDL logDL, IAuthService authService) : base(env, familyTreeDL, logDL, authService)
        {
            _familyTreeDL = familyTreeDL;
            _userBL = userBL;
            _userGenealogyDL = userGenealogyDL;
            _mapper = mapper;
            _exportService = exportService;
            _emailSender = emailSender;
            _genealogyDL = genealogyDL;
        }

        public async Task<List<FamilyTreeClient>> GetTrees(object idGenealogy)
        {
            var trees =  await _familyTreeDL.GetAll(idGenealogy);
            var users = await _userGenealogyDL.GetAll(idGenealogy);
            var genInfo = await _genealogyDL.GetById(idGenealogy);
            var treeClient = new List<FamilyTreeClient>();
            if (trees.Any())
            {
                foreach(var t in trees)
                {
                    var d = _mapper.Map<FamilyTreeClient>(t);
                    d.GenealogyName = genInfo.Name;
                    d.Users = users.Where(x => x.IdFamilyTree == t.Id).ToList();
                    treeClient.Add(d);
                }
            }
            return treeClient;
        }

        public async Task<object> Create(FamilyTree familyTree)
        {
            var check = await _userBL.CheckPermissionSubSystem( SubSystem.Genealogy, PermissionCode.Add, familyTree.IdGenealogy);
            if (!check)
            {
                throw new ArgumentException("UnAuthorized");
            }
            return await _familyTreeDL.Create(familyTree);
        }

        public async Task<bool> Update(FamilyTree familyTree)
        {
            var check = await _userBL.CheckPermissionSubSystem( SubSystem.Genealogy, PermissionCode.Update, familyTree.IdGenealogy);
            if (!check)
            {
                throw new ArgumentException("UnAuthorized");
            }
            return await _familyTreeDL.Update(familyTree);
        }

        public async Task<bool> DeleteByID(int id, int idGenealogy)
        {
            var check = await _userBL.CheckPermissionSubSystem( SubSystem.Genealogy, PermissionCode.Delete, idGenealogy);
            if (!check)
            {
                throw new ArgumentException("UnAuthorized");
            }
            await _userGenealogyDL.ResetUserGenealogy(id, idGenealogy);
            return await _familyTreeDL.DeleteById(id, idGenealogy);
        }

        public async Task<string> ExportTree(int idGenealogy)
        {
            var treeClient = await GetTrees(idGenealogy);
            var root = BuildTree(_mapper.Map<List<FamilyTreeExport>>(treeClient));
            var gen = await _genealogyDL.GetById(idGenealogy);
            return _exportService.ExportTreeFamily(root, gen);
        }

        private FamilyTreeExport BuildTree(List<FamilyTreeExport> trees)
        {
            var dictionary = trees.ToDictionary(item => item.Id, item => item);
            var roots = new List<FamilyTreeExport>();
            foreach (var item in trees)
            {
                if (!item.ParentID.HasValue)
                {
                    roots.Add(item);
                }
                else
                {
                    if (dictionary.TryGetValue(item.ParentID.Value ,out var parent))
                    {
                        parent.Children.Add(item);
                    }
                }
            }
            int a = GetWeightTree(roots.FirstOrDefault());
            return roots.FirstOrDefault();
        }

        private int GetWeightTree(FamilyTreeExport familyTree)
        {
            if (familyTree == null)
            {
                return 0;
            }
            if (familyTree.Children.Count == 0)
            {
                familyTree.Weight = familyTree.Users.Count;
                return familyTree.Weight;
            }
            int weight = 0;
            foreach (var item in familyTree.Children)
            {
                weight += GetWeightTree(item);
            }
            familyTree.Weight = Math.Max(weight, familyTree.Users.Count);
            return weight;

        }

    }
}

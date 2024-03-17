using GenealogyCommon.Models;
using GenealogyCommon.Models.Authen;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyBL.Interfaces
{
    public interface IFamilyTreeBL: IBaseBL<FamilyTree>
    {
        Task<List<FamilyTreeClient>> GetTrees(object idGenealogy);

    }
}

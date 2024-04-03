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
    public interface IUserGenealogyBL: IBaseBL<UserGenealogy>
    {
        Task <IEnumerable<UserGenealogy>> GetUserGenealogyByFamilyTree(int idFamilyTree, int idGenealogy);

        Task<object> ApproveRegister(UserGenealogy obj);
        Task<IEnumerable<UserGenealogy>> GetAllByUserId(int userID);
    }
}

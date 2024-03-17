using GenealogyCommon.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyDL.Interfaces
{
    public interface IFundDL : IBaseDL<Fund>
    {
        Task<bool> UpdateMoneyFund(int idFund, int idGenealogy);
    }
}

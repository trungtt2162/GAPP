using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyBL.Interfaces
{
    public interface IBaseBL<T> 
    {
        Task<T> GetById(object id);

    }
}

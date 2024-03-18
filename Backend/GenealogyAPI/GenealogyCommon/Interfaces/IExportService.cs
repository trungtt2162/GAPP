using GenealogyCommon.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyCommon.Interfaces
{
    public interface IExportService
    {
        public string ExportTreeFamily(FamilyTreeExport root);
    }
}

using GenealogyCommon.Interfaces;
using GenealogyCommon.Models;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyCommon.Implements
{
    public class ExportService:IExportService
    {
        public void ExportFamilyTree(string filePath, FamilyTreeExport root)
        {
            string filePath = @"C:\path\to\output.xlsx";
            FileInfo file = new FileInfo(filePath);

            using (ExcelPackage package = new ExcelPackage(file))
            {
                ExcelWorksheet worksheet = package.Workbook.Worksheets.Add("Cây phả hệ");
                worksheet.Cells["A1"].Value = "Tên";
                worksheet.Cells["B1"].Value = "Tuổi";

                package.Save();
            }
        }
    }
}

using GenealogyCommon.Interfaces;
using GenealogyCommon.Models;
using GenealogyCommon.Utils;
using Microsoft.AspNetCore.Hosting;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyCommon.Implements
{
    public class ExportService: IExportService
    {
        private readonly IWebHostEnvironment _env;
        public ExportService(IWebHostEnvironment webHostEnvironmen) { 
            _env = webHostEnvironmen;
        }

        public string ExportTreeFamily(FamilyTreeExport root)
        {
            var file = Utilities.GetFile("familyTree.xlsx", _env);
            string fileName = $"FamilyTree_{DateTime.Now.ToString("yyyyMMddHHmmss")}.xlsx";
            ExcelPackage.LicenseContext = LicenseContext.Commercial;
            using (ExcelPackage package = new ExcelPackage(file))
            {
                ExcelWorksheet worksheet = package.Workbook.Worksheets["Sheet1"];
                RenderTree(worksheet, root, 1, 1);
                package.SaveAs(new FileInfo($"{Utilities.GetPathUpload(_env)}\\{fileName}"));
            }
            return fileName;
        }

        private void RenderTree(ExcelWorksheet worksheet, FamilyTreeExport root, int row = 1, int colUser = 1)
        {
            if (root == null)
            {
                return;
            }
            if (root.Users != null &&  root.Users.Any())
            {
                int wCol = root.Weight / root.Users.Count;
                int wLast = root.Weight - ( root.Users.Count - 1) *  wCol;
                int colStart = colUser;
                for (int i = 0; i < root.Users.Count; i++)
                {
                    if (i == root.Users.Count - 1)
                    {
                        wCol = wLast;
                    }
                    worksheet.Cells[row, colStart, row, colStart + wCol - 1].Merge = true;
                    worksheet.Cells[row, colStart].Value = $"{root.Users[i].FirstName}" ;
                    worksheet.Cells[row, colStart, row, colStart + wCol - 1].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    using (var range = worksheet.Cells[row, colStart, row, colStart + wCol - 1])
                    {
                        range.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                        range.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        range.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                        range.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    }
                    colStart += wCol ;
                }
            }
            if (root.Children != null && root.Children.Any())
            {
                int colChild = colUser;
                foreach (var child in root.Children)
                {
                    RenderTree(worksheet, child, row + 1, colChild);
                    colChild += child.Weight;
                }
            }

        }


    }
}

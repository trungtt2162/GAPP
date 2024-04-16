using GenealogyCommon.Interfaces;
using GenealogyCommon.Models;
using GenealogyCommon.Utils;
using Microsoft.AspNetCore.Hosting;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Reflection.Metadata;
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

        public string ExportTreeFamily(FamilyTreeExport root, Genealogy gen)
        {
            var file = Utilities.GetFile("familyTree.xlsx", _env);
            string fileName = $"FamilyTree_{DateTime.Now.ToString("yyyyMMddHHmmss")}.xlsx";
            ExcelPackage.LicenseContext = LicenseContext.Commercial;
            using (ExcelPackage package = new ExcelPackage(file))
            {
                ExcelWorksheet worksheet = package.Workbook.Worksheets["Sheet1"];
                worksheet.Cells[1, 1, 1, root.Weight].Merge = true;
                worksheet.Cells[1, 1].Value = gen.Name;
                worksheet.Cells[1, 1, 1, root.Weight].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                RenderTree(worksheet, root, 3, 1);
                package.SaveAs(new FileInfo($"{Utilities.GetPathUpload(_env)}\\{fileName}"));
            }
            return fileName;
        }

        public string ExportUserGenealogy(List<UserGenealogy> userGenealogies, Genealogy gen)
        {
            var file = Utilities.GetFile("member.xlsx", _env);
            string fileName = $"Member_{DateTime.Now.ToString("yyyyMMddHHmmss")}.xlsx";
            ExcelPackage.LicenseContext = LicenseContext.Commercial;
            using (ExcelPackage package = new ExcelPackage(file))
            {
                ExcelWorksheet worksheet = package.Workbook.Worksheets["Sheet1"];
                worksheet.Cells[1, 1, 1, 5].Merge = true;
                worksheet.Cells[1, 1].Value = gen.Name;
                worksheet.Cells[1, 1, 1,5].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                int row = 4;
                for (int i = 0;i < userGenealogies.Count;i ++)
                {
                    var user = userGenealogies[i];
                    worksheet.Cells[row, 1].Value = i + 1;
                    worksheet.Cells[row, 1].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;

                    worksheet.Cells[row, 2].Value = $"{user.FirstName} {user.LastName}";
                    worksheet.Cells[row, 2].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;

                    worksheet.Cells[row, 3].Value = user.DateOfBirth?.ToString("dd/MM/yyyy");
                    worksheet.Cells[row, 3].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                    worksheet.Cells[row, 4].Value = user.Email;
                    worksheet.Cells[row, 4].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;

                    worksheet.Cells[row, 5].Value = user.Phone;
                    worksheet.Cells[row, 5].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;
                    row++;

                }

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
                Random random = new Random();
                Color randomColor = Color.FromArgb(random.Next(256), random.Next(256), random.Next(256));
                for (int i = 0; i < root.Users.Count; i++)
                {
                    if (i == root.Users.Count - 1)
                    {
                        wCol = wLast;
                    }
                    worksheet.Cells[row, colStart, row, colStart + wCol - 1].Merge = true;
                    worksheet.Cells[row, colStart].Value = $"{root.Users[i].FirstName} {root.Users[i].LastName}" ;
                    worksheet.Cells[row, colStart, row, colStart + wCol - 1].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    worksheet.Cells[row, colStart].Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                    worksheet.Cells[row, colStart].Style.Fill.BackgroundColor.SetColor(randomColor);
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

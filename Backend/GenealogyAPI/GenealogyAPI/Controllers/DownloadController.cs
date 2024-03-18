using AutoMapper;
using GenealogyBL.Interfaces;
using GenealogyCommon.Constant;
using GenealogyCommon.Models;
using GenealogyCommon.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Drawing.Imaging;

namespace GenealogyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DownloadController : Controller
    {
        private readonly IWebHostEnvironment _env;
        public DownloadController(IWebHostEnvironment env) { 
            _env = env;
        }

        [HttpGet("")]
        public IActionResult GetBlobDownload([FromQuery] string fileName)
        {

            byte[] fileBytes = System.IO.File.ReadAllBytes($"{Utilities.GetPathUpload(_env)}\\{fileName}");

            return File(fileBytes, "application/force-download", fileName);
        }
    }
}

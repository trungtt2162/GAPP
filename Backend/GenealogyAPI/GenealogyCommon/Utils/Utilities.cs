using GenealogyCommon.Attributes;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyCommon.Utils
{
    public class Utilities
    {

        public static string GeFileContent(string fileName, IWebHostEnvironment webHostEnvironment)
        {
            string rootPath = webHostEnvironment.ContentRootPath;
            string folderPath = Path.Combine(rootPath, "Scripts");
            string filePath = Path.Combine(folderPath, fileName);
            string fileContent = System.IO.File.ReadAllText(filePath);
            return fileContent;
        }

        public static Dictionary<string, object>CreateParamDB(object obj)
        {
            Type type = obj.GetType();
            PropertyInfo[] properties = type.GetProperties();
            var param = new Dictionary<string, object>();
            foreach (PropertyInfo property in properties)
            {
                // Lấy tên thuộc tính và giá trị của nó từ đối tượng
                string propertyName = property.Name;
                object propertyValue = property.GetValue(obj);
                if (property.GetCustomAttribute<IgnoreAttribute>() != null)
                {
                    continue; 
                }
                switch (propertyName)
                {
                    case "ModifiedDate":
                        param[$"p_{propertyName}"] = DateTime.Now;
                        break;
                    default:
                        param[$"p_{propertyName}"] = propertyValue;
                        break;
                }
                
            }
            return param;
        }


        public static string GetTableName<T>() where T : class
        {
            Type type = typeof(T);
            object[] attributes = type.GetCustomAttributes(true);

            foreach (var attribute in attributes)
            {
                if (attribute is TableAttribute)
                {
                    TableAttribute tableAttribute = (TableAttribute)attribute;
                    return tableAttribute.Name;
                }
            }

            return null;
        }

        
    }
}

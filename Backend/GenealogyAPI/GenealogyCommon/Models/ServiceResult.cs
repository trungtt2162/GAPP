using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyCommon.Models
{
    public class ServiceResult
    {
        public bool Success { get; set; } = true;
        public string Message { get; set; }
        public object Data { get; set; }

        public int StatusCode { get; set; } = 200;

        public string DevMessage { get; set; }

        public ServiceResult OnUnauthorized(object data = null)
        {
            return new ServiceResult
            {
                Success = false,
                StatusCode = 403,
                Data = data
            };
        }

        public ServiceResult OnUnAuthen(object data = null)
        {
            return new ServiceResult
            {
                Success = false,
                StatusCode = 401,
                Data = data
            };
        }

        public ServiceResult OnBadRequest(object data = null)
        {
            return new ServiceResult
            {
                Success = false,
                StatusCode = 400,
                Data = data
            };
        }

        public ServiceResult OnSuccess(object data = null)
        {
            return new ServiceResult
            {
                Success = true,
                StatusCode = 200,
                Data = data
            };
        }
    }
}

using GenealogyBL.Interfaces;
using GenealogyCommon.Configuration;
using GenealogyCommon.Constant;
using GenealogyCommon.Interfaces;
using GenealogyCommon.Models;
using GenealogyDL.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyBL.Implements
{
    internal class BaseBL<T> : IBaseBL<T> where T : class
    {
        protected readonly IConfiguration _configuration;
        private readonly IBaseDL<T> _baseDL;
        protected readonly ILogDL _logDL;
        protected readonly IAuthService _authService;
        protected readonly INotificationDL _notificationDL;
        private readonly INotificationService _notificationService;
        public BaseBL(IWebHostEnvironment env, IBaseDL<T> baseDL, ILogDL logDL, IAuthService authService, INotificationDL notificationDL, INotificationService notificationService)
        {
            _configuration = ConfigService.GetConfiguration(env);
            _baseDL = baseDL;
            _logDL = logDL;
            _authService = authService;
            _notificationDL = notificationDL;
            _notificationService = notificationService;
        }

        public async Task<object> Create(T obj)
        {
            
            _ = InsertLog(LogAction.Create, obj);
            return await _baseDL.Create(obj);
        }

        public async Task<bool> DeleteByID(int Id)
        {
            _ = InsertLog(LogAction.Delete, Id);
            return await _baseDL.DeleteById(Id);
        }

        public async Task<bool> DeleteByID(int id, int idGenealogy)
        {
            _ = InsertLog(LogAction.Delete, new  {ID = id, IdGenealogy = idGenealogy }, idGenealogy);
            return await _baseDL.DeleteById(id , idGenealogy);
        }

        public async Task<T> GetById(object id)
        {
            return await _baseDL.GetById(id);
        }

        public async Task<IEnumerable<T>> GetAll(object idGenealogy)
        {
            return await _baseDL.GetAll(idGenealogy); ;
        }

        public Task<bool> Update(T obj)
        {
            _ = InsertLog(LogAction.Update, obj);
            return _baseDL.Update(obj);
        }
        public async Task<PageResult<T>> GetPagingData(PageRequest pagingRequest){
            this.GetCustomParamPaging(pagingRequest);
            return await _baseDL.GetPagingData(pagingRequest.PageSize, pagingRequest.PageNumber, pagingRequest.Condition, pagingRequest.SortOrder);
        }
        public virtual void GetCustomParamPaging(PageRequest pagingRequest){

        }

        public virtual async Task<bool> InsertLog(string action, object obj, int idGen = -1)
        {
            var log = new Log();
            if (obj == null)
            {
                obj = new object();
            }
            int idGenealogy = -1;
            if (idGen == -1)
            {
                PropertyInfo propertyInfo = typeof(T).GetProperty("IdGenealogy");
                if (propertyInfo != null)
                {
                    idGenealogy = (int)propertyInfo.GetValue(obj);
                }
            }
            else
            {
                idGenealogy = idGen;
            }
            log.RawData = JsonConvert.SerializeObject(obj);
            log.Action = action;
            log.IdGenealogy = idGenealogy;
            log.Date = DateTime.Now;
            
            switch (action)
            {
                case LogAction.CreateAdmin:
                    log.Description = $"{_authService.GetFullName()} đã tạo tài khoản admin";
                    break;
                case LogAction.Create:
                    log.Description = $"{_authService.GetFullName()} đã tạo dữ liệu {typeof(T).Name}";
                    break;
                case LogAction.Delete:
                    log.Description = $"{_authService.GetFullName()} đã xóa dữ liệu {typeof(T).Name} với ID = {JsonConvert.SerializeObject(obj)}";
                    break;
                case LogAction.Update:
                    log.Description = $"{_authService.GetFullName()} đã cập dữ liệu {typeof(T).Name}";
                    break;
            }
            await _logDL.Create(log);
            return true;
            
        }

        public async Task<bool> PushNotification(Notification notification)
        {
            notification.CreatedDate = DateTime.Now;
            notification.ModifiedDate = DateTime.Now;
            notification.CreatedBy = notification.SenderName;
            notification.ModifiedBy = notification.SenderName;
            await _notificationDL.Create(notification);
            _ = _notificationService.PushNotification(notification);
            return true;
        }

        public async Task<bool> UpdateViewNotification(string ids)
        {
            await _baseDL.UpdateViewNotification(ids);
            return true;
        }
    }
}

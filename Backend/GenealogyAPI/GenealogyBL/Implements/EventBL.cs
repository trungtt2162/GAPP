using GenealogyBL.Interfaces;
using GenealogyCommon.Implements;
using GenealogyCommon.Interfaces;
using GenealogyCommon.Models;
using GenealogyCommon.Models.Param;
using GenealogyDL.Implements;
using GenealogyDL.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyBL.Implements
{
    internal class EventBL : BaseBL<Event>, IEventBL
    {
        private readonly IEventDL _eventDL;
        public readonly IGenealogyBL _genealogyBL;
        private readonly IEmailSender _emailSender;
        public EventBL(IEmailSender emailSender, IGenealogyBL genealogyBL, IEventDL eventDL, IWebHostEnvironment env, ILogDL logDL, IAuthService authService) : base(env, eventDL, logDL, authService)
        {
            _eventDL = eventDL;
            _genealogyBL = genealogyBL;
            _emailSender = emailSender;
        }
        public async Task<object> Create(Event obj)
        {
            obj.UserIDHost = int.Parse(_authService.GetUserID());
            return await _eventDL.Create(obj);
        }

        override
        public void GetCustomParamPaging(PageRequest pagingRequest)
        {
            if (string.IsNullOrWhiteSpace(pagingRequest.Condition))
            {
                throw new ArgumentException("IDGenealogy is null");
            }

            if (!string.IsNullOrWhiteSpace(pagingRequest.SearchKey))
            {
                pagingRequest.Condition += $" and Name like '%{pagingRequest.SearchKey}%'";
            }

        }

        public async Task<PageResult<Event>> GetPagingDataGuest(PageRequest pagingRequest,int idGenealogy)
        {
            var gen = await _genealogyBL.GetById(idGenealogy);
            if (gen == null || !gen.IsPublic)
            {
                return new PageResult<Event>();
            }
            if (string.IsNullOrWhiteSpace(pagingRequest.Condition))
            {
                pagingRequest.Condition = $" 1 = 1 and IdGenealogy = {idGenealogy} ";
            }
            pagingRequest.Condition += " IsPublic = true ";

            if (!string.IsNullOrWhiteSpace(pagingRequest.SearchKey))
            {
                pagingRequest.Condition += $" and Name like '%{pagingRequest.SearchKey}%'";
            }
            return await _eventDL.GetPagingData(pagingRequest.PageSize, pagingRequest.PageNumber, pagingRequest.Condition, pagingRequest.SortOrder);
        }

        public async Task<bool> SendEmails(List<UserEvent> users)
        {
            if (!users.Any())
            {
                return false;
            }
            var eventInfo = await _eventDL.GetById(users[0].IdEvent);
            var receips = new JArray();
            foreach (var user in users)
            {
                var recip = new JObject {
                                {
                                    "Email",
                                    user.Email
                                }, {
                                    "Name",
                                   user.FirstName
                                }
                                };
                receips.Add(recip);


            }
            await _emailSender.SendEmailAsync(receips, $"Thư mời tham gia sự kiện {eventInfo.Name}",
               GetTemplateEmailEvent(eventInfo),
               GetTemplateEmailEvent(eventInfo));
            return true;
        }

        private string GetTemplateEmailEvent(Event eventParam)
        {
            var email = $"<div>"+
                $"<h2> THƯ MỜI THAM GIA SỰ KIỆN </h2>"+
                $"<p><strong> Tên sự kiện:</strong> {eventParam.Name} </p>"+
                $"<p><strong> Mô tả:</strong> {eventParam.Name} </p>"+
                $"<p><strong> Thời gian:</strong> {eventParam.OrganizationDate.ToString("MM:HH dd/MM/yy")} </p>"+
                $"<p><strong> Địa điểm tổ chức:</strong> {eventParam.Location} </p>"+
                $"<p><strong> Link tham gia sự kiện:</strong> {eventParam.LinkStream}</p>" +
                $"</div>";
            return email;
        }
    }

}
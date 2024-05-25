using GenealogyBL.Interfaces;
using GenealogyCommon.Constant;
using GenealogyCommon.Implements;
using GenealogyCommon.Interfaces;
using GenealogyCommon.Models;
using GenealogyCommon.Models.Param;
using GenealogyDL.Implements;
using GenealogyDL.Interfaces;
using Mailjet.Client.Resources;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyBL.Implements
{
    internal class EventBL : BaseBL<Event>, IEventBL
    {
        private readonly IEventDL _eventDL;
        public readonly IGenealogyDL _genealogyDL;
        private readonly IEmailSender _emailSender;
        private readonly IUserGenealogyDL _userGenealogyDL;
        public EventBL(IUserGenealogyDL userGenealogyDL, IEmailSender emailSender, IGenealogyDL genealogyDL, IEventDL eventDL, IWebHostEnvironment env, ILogDL logDL, IAuthService authService, INotificationDL notificationDL, INotificationService notificationService) : base(env, eventDL, logDL, authService, notificationDL, notificationService)
        {
            _eventDL = eventDL;
            _genealogyDL = genealogyDL;
            _emailSender = emailSender;
            _userGenealogyDL = userGenealogyDL;
        }
        public async Task<object> Create(Event obj)
        {
            obj.UserID = int.Parse(_authService.GetUserID());
            return await _eventDL.Create(obj);
        }

        override
        public void GetCustomParamPaging(PageRequest pagingRequest)
        {
            pagingRequest.SortOrder = " OrganizationDate desc ";
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
            //var gen = await _genealogyBL.GetById(idGenealogy);
            //if (gen == null || !gen.IsPublic)
            //{
            //    return new PageResult<Event>();
            //}
            if (string.IsNullOrWhiteSpace(pagingRequest.Condition))
            {
                pagingRequest.Condition = $" 1 = 1 and IdGenealogy = {idGenealogy} ";
            }
            pagingRequest.Condition += " and IsPublic = true ";

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
            _ = PushNotificationUser(users, "Invite_user_join_event");
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

        public async Task<bool> PushNotificationUser(List<UserEvent> users, string type)
        {
            if (!users.Any())
            {
                return false;
            }
            var eventInfo = await _eventDL.GetById(users[0].IdEvent);
            var gen = await _genealogyDL.GetById(users[0].IdGenealogy);
            foreach (var user in users)
            {
                var notification = new Notification()
                {
                    ReceiveID = user.UserID,
                    Type = type,
                    RawData = JsonConvert.SerializeObject(new
                    {
                        IdGenealogy = user.IdGenealogy,
                        GenealogyName = gen.Name,
                        EventName = eventInfo.Name,
                        EventDescription = eventInfo.Description
                    }),
                    SenderID = int.Parse(_authService.GetUserID()),
                    SenderName = _authService.GetFullName()
                };
                if (notification.ReceiveID != notification.SenderID)
                {
                    _ = PushNotification(notification);
                }
            }
            return true;
        }

        public async Task<bool> PushNotificationAdmin(int idEvent, string type)
        {
            var eventInfo = await _eventDL.GetById(idEvent);
            var gen = await _genealogyDL.GetById(eventInfo.IdGenealogy);
            var userAdmins = await _userGenealogyDL.GetUserAdminNotify(eventInfo.IdGenealogy);
            if (userAdmins.Any())
            {
                foreach(var user in userAdmins)
                {
                    var notification = new Notification()
                    {
                        ReceiveID = user.UserId,
                        Type = type,
                        RawData = JsonConvert.SerializeObject(new
                        {
                            IdGenealogy = eventInfo.IdGenealogy,
                            GenealogyName = gen.Name,
                            EventName = eventInfo.Name,
                            EventDescription = eventInfo.Description
                        }),
                        SenderID = int.Parse(_authService.GetUserID()),
                        SenderName = _authService.GetFullName()
                    };
                    _ = PushNotification(notification);
                }
            }
           
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

        public async Task<bool> DeleteByID(int id, int idGenealogy)
        {
            var eventInfo = await _eventDL.GetById(id);
            var idRes = await base.DeleteByID(id, idGenealogy);
            var gen = await _genealogyDL.GetById(idGenealogy);
            var userAdmins = await _userGenealogyDL.GetUserAdminNotify(idGenealogy);
            var idUserEdit = int.Parse(_authService.GetUserID());
            if (userAdmins.Any(x => x.UserId == idUserEdit) && eventInfo.InActive == true)
            {
                var notification = new Notification()
                {
                    ReceiveID = eventInfo.UserID.Value,
                    Type = "Admin_reject_request_event",
                    RawData = JsonConvert.SerializeObject(new
                    {
                        IdGenealogy = idGenealogy,
                        GenealogyName = gen.Name,
                        EventName = eventInfo.Name,
                        EventDescription = eventInfo.Description

                    }),
                    SenderID = int.Parse(_authService.GetUserID()),
                    SenderName = _authService.GetFullName()
                };
                _ = PushNotification(notification);
            }
            return idRes;
        }
    }

}
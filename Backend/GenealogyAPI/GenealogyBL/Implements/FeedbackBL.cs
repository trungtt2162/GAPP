using GenealogyBL.Interfaces;
using GenealogyCommon.Interfaces;
using GenealogyCommon.Models;
using GenealogyDL.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyBL.Implements
{
    internal class FeedbackBL: BaseBL<FeedBack>, IFeedbackBL
    {
        private readonly IFeedbackDL _feedbackDL;
        private readonly IGenealogyDL _genealogyDL;
        private readonly IFundDL _fundDL;
        private readonly IUserGenealogyDL _userGenealogyDL;
        public FeedbackBL(IUserGenealogyDL userGenealogyDL, IFundDL fundDL, IGenealogyDL genealogyDL,IFeedbackDL feedbackDL, IWebHostEnvironment env, ILogDL logDL, IAuthService authService, INotificationDL notificationDL, INotificationService notificationService) : base(env, feedbackDL, logDL, authService, notificationDL, notificationService)
        {
            _feedbackDL = feedbackDL;
            _genealogyDL = genealogyDL;
            _fundDL = fundDL;
            _userGenealogyDL = userGenealogyDL;
        }

        public async Task<object> Create(FeedBack obj)
        {
            var id = await base.Create(obj);
            await PushNotificationAdmin(obj);
            return id;
        }

        public async Task<bool> PushNotificationAdmin(FeedBack obj)
        {
            var gen = await _genealogyDL.GetById(obj.IdGenealogy);
            var fund = await _fundDL.GetById(obj.IdInstance);
            var userAdmins = await _userGenealogyDL.GetUserAdminNotify(obj.IdGenealogy);
            if (userAdmins.Any())
            {
                foreach (var userAdmin in userAdmins)
                {
                    var notification = new Notification()
                    {
                        ReceiveID = userAdmin.UserId,
                        Type = "Member_feedback_fund",
                        RawData = JsonConvert.SerializeObject(new
                        {
                            IdGenealogy = obj.IdGenealogy,
                            GenealogyName = gen.Name,
                            FundName = fund.Name
                        }),
                        SenderID = int.Parse(_authService.GetUserID()),
                        SenderName = _authService.GetFullName()
                    };
                    _ = PushNotification(notification);
                }
            }
            
            return true;
        }

    }
}

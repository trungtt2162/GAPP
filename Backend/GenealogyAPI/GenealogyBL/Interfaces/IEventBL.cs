using GenealogyCommon.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyBL.Interfaces
{
    public interface IEventBL: IBaseBL<Event>
    {
        Task<PageResult<Event>> GetPagingDataGuest(PageRequest pagingRequest, int idGenealogy);
        Task<bool> SendEmails(List<UserEvent> users);
        Task<bool> PushNotificationUser(List<UserEvent> users, string type);

        Task<bool> PushNotificationAdmin(int idEvent, string type);
    }
}

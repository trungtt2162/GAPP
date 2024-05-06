using GenealogyCommon.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyCommon.Interfaces
{
    public interface INotificationService
    {
        Task<bool> PushNotification(Notification notification);
    }
}

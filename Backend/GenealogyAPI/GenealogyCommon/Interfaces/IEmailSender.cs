using Newtonsoft.Json.Linq;

namespace GenealogyCommon.Interfaces
{
    public interface IEmailSender
    {
        Task SendEmailAsync(JArray recipients, string subject, string message, string htmlBody);

    } 
}
   
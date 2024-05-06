using GenealogyCommon.Interfaces;
using GenealogyCommon.Models;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.Text;

namespace GenealogyCommon.Implements
{
    public class NotificationService : INotificationService
    {
        protected readonly IConfiguration _configuration;
        protected readonly IAuthService _authService;
        private string socketURL = string.Empty;
        private string tokenSocket = string.Empty;
        public NotificationService(IConfiguration configuration, IAuthService authService )
        {
            this._configuration = configuration;
            this._authService = authService;
            socketURL = _configuration.GetValue<string>("AppSettings:SocketURL");
            tokenSocket = _configuration.GetValue<string>("AppSettings:TokenSocket");
            _authService = authService;
        }
        public Task<bool> PushNotification(Notification notification)
        {
            if (notification == null) throw new ArgumentNullException(nameof(notification));
            _ = DoPushNotification(notification);
            return Task.FromResult(true);
        }

        private async Task<object> DoPushNotification(Notification notification)
        {
            using (var client = new HttpClient())
            {
                try
                {
                    var content = new StringContent(JsonConvert.SerializeObject(notification), Encoding.UTF8, "application/json");
                    content.Headers.Add("X-AUTH-TOKEN", tokenSocket);
                    HttpResponseMessage response = await client.PostAsync($"{socketURL}/api/{notification.ReceiveID}/push", content);

                    if (response.IsSuccessStatusCode)
                    {
                        return Task.FromResult(await response.Content.ReadAsStringAsync());
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error: " + ex.Message);
                }
            }
            return null;
        }
    }
}

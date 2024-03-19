using GenealogyCommon.Interfaces;
using GenealogyCommon.Models;
using Mailjet.Client;
using Mailjet.Client.Resources;
using Mailjet.Client.TransactionalEmails;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace GenealogyCommon.Implements
{
    public class EmailSender : IEmailSender
    {
        public EmailSetting _emailSetting { get; }

        public EmailSender(IOptions<EmailSetting> emailSettings)
        {
            _emailSetting = emailSettings.Value;
        }

        public Task SendEmailAsync(JArray recipients, string subject, string message, string htmlBody)
        {
            DoSendMail(recipients, subject, message, htmlBody).Wait();

            return Task.FromResult(0);
        }

        private async Task<bool> DoSendMail(JArray recipients, string subject, string message, string htmlBody)
        {
            MailjetClient client = new MailjetClient(_emailSetting.APIKey, _emailSetting.SecretKey);

            MailjetRequest request = new MailjetRequest
            {
                Resource = Send.Resource,
            }
            .Property(Send.Messages, new JArray 
            {
                new JObject {
                    {
                        "FromEmail",
                        _emailSetting.FromAddress
                    }, 
                    {
                        "FromName",
                        _emailSetting.FromName
                    }, 
                    {
                        "Recipients",
                        recipients
                    }, 
                    {
                        "Subject",
                        subject
                    }, 
                    {
                        "Text-part",
                        message
                    }, 
                    {
                        "Html-part",
                        htmlBody
                    }
                }
            });
            MailjetResponse response = await client.PostAsync(request);
            if (!response.IsSuccessStatusCode)
            {
                return false;
            }
            return true;
        }
    }
}
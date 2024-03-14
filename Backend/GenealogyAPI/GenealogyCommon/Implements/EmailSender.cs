using GenealogyCommon.Interfaces;
using GenealogyCommon.Models;
using Microsoft.Extensions.Options;
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

        public Task SendEmailAsync(string email, string subject, string message)
        {
            Execute(email, subject, message, null).Wait();

            return Task.FromResult(0);
        }

        public async Task Execute(string email, string subject, string message, List<Attachment> attachments)
        {
            try
            {
                var toEmail = string.IsNullOrEmpty(email) ? _emailSetting.ToEmail : email;

                MailMessage mail = new MailMessage()
                {
                    From = new MailAddress(_emailSetting.FromAddress, _emailSetting.FromName)
                };

                mail.To.Add(new MailAddress(toEmail));

                if (!string.IsNullOrEmpty(_emailSetting.CcEmail))
                    mail.CC.Add(new MailAddress(_emailSetting.CcEmail));

                if (!string.IsNullOrEmpty(_emailSetting.BccEmail))
                    mail.Bcc.Add(new MailAddress(_emailSetting.BccEmail));

                if (attachments != null)
                {
                    foreach (var item in attachments)
                    {
                        mail.Attachments.Add(item);
                    }
                }

                mail.Subject = subject;
                mail.Body = message;
                mail.IsBodyHtml = true;
                mail.Priority = MailPriority.Normal;

                using (SmtpClient smtp = new SmtpClient(_emailSetting.ServerAddress, _emailSetting.ServerPort))
                {
                    smtp.UseDefaultCredentials = true;
                    smtp.Credentials = new NetworkCredential(_emailSetting.Username, _emailSetting.Password);
                    smtp.EnableSsl = true;

                    await smtp.SendMailAsync(mail);
                }
            }
            catch (Exception ex)
            {
                //throw ex;
            }
        }
    }
}
using GenealogyBL.Implements;
using GenealogyBL.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace GenealogyBL
{
    public static class ServiceExtension
    {
        public static void AddBLExtension(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped(typeof(IBaseBL<>), typeof(BaseBL<>));
            services.AddScoped<IUserBL, UserBL>();
            services.AddScoped<ISuperAdminBL, SuperAdminBL>();
            services.AddScoped<IFamilyTreeBL, FamilyTreeBL>();
            services.AddScoped<IUserGenealogyBL, UserGenealogyBL>();
            services.AddScoped<IFamilyHistoryBL, FamilyHistoryBL>();
            services.AddScoped<IEventBL, EventBL>();
            services.AddScoped<IFundBL, FundBL>();
            services.AddScoped<ILogBL, LogBL>();
            services.AddScoped<IFamilyAddressBL, FamilyAddressBL>();
            services.AddScoped<IFeedbackBL, FeedbackBL>();

        }

    }
}
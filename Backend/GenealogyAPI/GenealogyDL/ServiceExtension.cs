using GenealogyDL.DBContext;
using GenealogyDL.Implements;
using GenealogyDL.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace GenealogyDL
{
    public static class ServiceExtension
    {
        public static void AddDLExtension(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IDBContextFactory, DBContextFactory>();
            services.AddScoped(typeof(IBaseDL<>), typeof(BaseDL<>));
            services.AddScoped<IUserDL, UserDL>();
            services.AddScoped<IGenealogyDL, GenealogyTreeDL>();
            services.AddScoped<IPermissionDL, PermissionDL>();
            services.AddScoped<IFamilyTreeDL, FamilyTreeDL>();
            services.AddScoped<IUserGenealogyDL, UserGenealogyDL>();
            services.AddScoped<IFamilyHistoryDL, FamilyHistoryDL>();
            services.AddScoped<IFamilyAddressDL, FamilyAddressDL>();
            services.AddScoped<ILogDL, LogDL>();
            services.AddScoped<IFundDL, FundDL>();
            services.AddScoped<IEventDL, EventDL>();
            services.AddScoped<IFeedbackDL, FeedbackDL>();
        }

    }
}
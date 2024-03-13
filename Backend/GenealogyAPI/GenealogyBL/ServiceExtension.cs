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


        }

    }
}
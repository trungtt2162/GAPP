
using GenealogyBL;
using GenealogyCommon.Implements;
using GenealogyCommon.Interfaces;
using GenealogyDL;
namespace GenealogyAPI.Extensions
{
    public static class ServiceExtension
    {
        public static void AddServiceExtensions(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton<IPasswordHasher, PasswordHasher>();
            services.AddBLExtension(configuration);
            services.AddDLExtension(configuration);
        }
    }
}

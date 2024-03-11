
using GenealogyBL;
using GenealogyDL;
namespace GenealogyAPI.Extensions
{
    public static class ServiceExtension
    {
        public static void AddServiceExtensions(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddBLExtension(configuration);
            services.AddDLExtension(configuration);
        }
    }
}

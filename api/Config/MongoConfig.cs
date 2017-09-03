using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;

namespace api.Config
{
    public static class MongoConfig
    {
        public static void AddMongo(this IServiceCollection services, IConfiguration configuration) => 
        services.AddSingleton(new MongoClient(configuration["ConnectionString"]));
    }
}
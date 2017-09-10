using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace api.Controllers
{
    [Route("api/questions")]
    public class QuestionsController : Controller
    {
        IMongoDatabase db;
        IMongoCollection<Question> questions;
        IConfiguration configuration;

        public QuestionsController(MongoClient client, IConfiguration configuration)
        {
            this.configuration = configuration;
            this.db = client.GetDatabase(this.configuration["DbName"]);
            this.questions = this.db.GetCollection<Question>(nameof(Question));
        }   

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await questions
                            .Find(FilterDefinition<Question>.Empty)
                            .SortByDescending(e => e.Created)
                            .FirstOrDefaultAsync()
                            .ConfigureAwait(false);

            return this.Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Question entity)
        {
            entity.Created = DateTime.UtcNow;
            await questions.InsertOneAsync(entity).ConfigureAwait(false);
            return this.CreatedAtAction("Get", entity);
        }
    }
}

using System;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using MongoDB.Driver;

namespace api.Controllers
{
    [Route("api")]
    public class AnswersController : Controller
    {
        IMongoDatabase db;

        IMongoCollection<Answer> answers;

        IConfiguration configuration;

        public AnswersController(MongoClient client, IConfiguration configuration)
        {
            this.configuration = configuration;
            this.db = client.GetDatabase(this.configuration["DbName"]);
            this.answers = this.db.GetCollection<Answer>(nameof(Answer));
        }   

        [HttpGet("questions/{questionId}/answers")]
        public async Task<IActionResult> Get(string questionId)
        {
            var answersList = await answers
                            .Find(Builders<Answer>.Filter.Eq(e => e.QuestionId, ObjectId.Parse(questionId)))
                            .ToListAsync()
                            .ConfigureAwait(false);
                            
            var total = answersList.Count();

            var result = answersList
                            .GroupBy(e => e.Option)
                            .Select(e => new { Option = e.Key, Percentage = (e.Count() * 100) / total })
                            .ToList();

            return this.Ok(result);
        }

        [HttpPost("questions/{questionId}/answers")]
        public async Task<IActionResult> Post(string questionId, [FromBody]Answer entity)
        {
            var original = await this.LoadByRequestAndQuenstion(questionId, entity.RequestKey).ConfigureAwait(false);

            if(original != null)
                return this.CreatedAtAction("Get", original);

            entity.Created = DateTime.UtcNow;
            entity.ResponseKey = Guid.NewGuid();
            entity.QuestionId = ObjectId.Parse(questionId);

            await answers.InsertOneAsync(entity).ConfigureAwait(false);

            return this.CreatedAtAction("Get", entity);
        }

        private async Task<Answer> LoadByRequestAndQuenstion(string questionId, Guid requestKey)
        {
            var result = await answers
                            .Find(e => 
                                e.QuestionId == ObjectId.Parse(questionId)
                                && e.RequestKey == requestKey
                            )
                            .FirstOrDefaultAsync()
                            .ConfigureAwait(false);

            return result;
        }
    }
}

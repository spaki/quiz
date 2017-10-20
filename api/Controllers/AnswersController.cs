namespace api.Controllers
{
    using System;
    using System.Collections;
    using System.Linq;
    using System.Threading.Tasks;
    using api.Entities;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Configuration;
    using MongoDB.Bson;
    using MongoDB.Driver;

    [Route("api")]
    public class AnswersController : Controller
    {
        IMongoDatabase db;
        IMongoCollection<Answer> answers;
        IMongoCollection<Question> questions;
        IConfiguration configuration;

        public AnswersController(MongoClient client, IConfiguration configuration)
        {
            this.configuration = configuration;
            this.db = client.GetDatabase(this.configuration["DbName"]);
            this.answers = this.db.GetCollection<Answer>(nameof(Answer));
            this.questions = this.db.GetCollection<Question>(nameof(Question));
        }   

        [HttpGet("questions/{questionId}/answers")]
        public async Task<IActionResult> Get(string questionId)
        {
            Question question = await GetQuestionAsync(questionId);

            var answersList = await GetAnswerListByQuestionIdAsync(questionId);

            Decimal total = answersList.Count();

            var answersValues = new Hashtable(
                                    answersList
                                        .GroupBy(e => e.Option)
                                        .Select(e => new { Option = e.Key, Percentage = (e.Count() * 100) / total })
                                        .ToDictionary(e => e.Option, e => e.Percentage)
                                );

            var answersCompiled = question.Options.Select(e => new { Option = e, Percentage = (Decimal?)answersValues[e] ?? 0 }).ToList();

            var result = new { answers = answersCompiled, total = total };

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
            var result = await answers.Find(e => 
                                                e.QuestionId == ObjectId.Parse(questionId)
                                             && e.RequestKey == requestKey
                                        )
                                      .FirstOrDefaultAsync()
                                      .ConfigureAwait(false);

            return result;
        }

        private async Task<System.Collections.Generic.List<Answer>> GetAnswerListByQuestionIdAsync(string questionId)
        {
            return await answers.Find(Builders<Answer>.Filter.Eq(e => e.QuestionId, ObjectId.Parse(questionId)))
                                .ToListAsync()
                                .ConfigureAwait(false);
        }

        private async Task<Question> GetQuestionAsync(string questionId)
        {
            return await questions.Find(Builders<Question>.Filter.Eq(e => e.Id, questionId))
                                  .FirstOrDefaultAsync()
                                  .ConfigureAwait(false);
        }
    }
}

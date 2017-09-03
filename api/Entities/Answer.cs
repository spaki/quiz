using System;
using MongoDB.Bson;

namespace api.Entities
{
    public class Answer
    {
        public ObjectId Id { get; set; }

        public ObjectId QuestionId { get; set; }

        public Guid RequestKey { get; set; }

        public Guid ResponseKey { get; set; }

        public string Option { get; set; }

        public DateTime Created { get; set; }
    }
}
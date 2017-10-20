namespace api.Entities
{
    using System;
    using MongoDB.Bson;
    using MongoDB.Bson.Serialization.Attributes;

    public class Answer
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId QuestionId { get; set; }

        public Guid RequestKey { get; set; }

        public Guid ResponseKey { get; set; }

        public string Option { get; set; }

        public DateTime Created { get; set; }
    }
}
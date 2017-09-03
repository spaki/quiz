using System;
using System.Collections.Generic;
using MongoDB.Bson;

namespace api.Entities
{
    public class Question
    {
        public ObjectId Id { get; set; }
        
        public string Description { get; set; }

        public DateTime Created { get; set; }

        public List<string> Options { get; set; }
    }
}
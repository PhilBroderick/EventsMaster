using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EventsMaster.Api
{
    public class DocumentDBRepository<T> where T : class
    {
        private static string _databaseId;
        private static string _collectionId;
        private static DocumentClient _client;

        public DocumentDBRepository(string databaseId, string collectionId)
        {
            _databaseId = databaseId;
            _collectionId = collectionId;
            _client = new DocumentClient(new Uri("https://eventsmaster.documents.azure.com:443/"), "n9bgGZ7AIFIisJWVbHpLmdbdFByrIY9bmimnTGhns7dJqworsRgjVdQ2cwT7ZSuZ3xKnVKfnjZGDbtiMLHpVuw==");
        }

        public async Task<IEnumerable<T>> GetItemsAsync()
        {
            IDocumentQuery<T> query = _client.CreateDocumentQuery<T>(
                UriFactory.CreateDocumentCollectionUri(_databaseId, _collectionId),
                new FeedOptions { MaxItemCount = -1, EnableCrossPartitionQuery = true })
                .AsDocumentQuery();

            List<T> results = new List<T>();
            while (query.HasMoreResults)
            {
                results.AddRange(await query.ExecuteNextAsync<T>());
            }

            return results;
        }
    }
}

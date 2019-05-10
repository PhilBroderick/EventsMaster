using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace EventsMaster.Api.Controllers
{
    [Route("upload")]
    [ApiController]
    public class ImageUploadController : ControllerBase
    {
        string _connStr;
        IConfiguration _configuration = null;
        public ImageUploadController(IConfiguration config)
        {
            _configuration = config;
            _connStr = _configuration.GetValue<string>("AppSettings:StorageConnectionString");
        }

        [HttpPost, Route("image")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(_connStr);

            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();

            CloudBlobContainer container = blobClient.GetContainerReference("images");

            CloudBlockBlob blobReference = container.GetBlockBlobReference(file.FileName);

            using (var fileStream = file.OpenReadStream())
            {
                await blobReference.UploadFromStreamAsync(fileStream);
            }
            return Ok(new
            {
                name = blobReference.Name,
                uri = blobReference.Uri,
                size = blobReference.Properties.Length
            });
        }
    }
}
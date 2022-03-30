using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactWithBackend.Data;
using System.Collections.Generic;
using System.Threading;

namespace ReactWithBackend.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly string _connectionString;
        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        [HttpGet]
        [Route("GetAll")]
        public List<Person> GetAll()
        {
            Thread.Sleep(500);
            var repo = new PeopleRepository(_connectionString);
            return repo.GetAll();
        }
        [HttpPost]
        [Route("AddPerson")]
        public void AddPerson(Person p)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.AddPerson(p);
        }
        [HttpPost]
        [Route("UpdatePerson")]
        public void UpdatePerson(Person p)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.UpdatePerson(p);
        }
        [HttpPost]
        [Route("DeletePerson")]
        public void DeletePerson(Person p)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.DeletePerson(p.Id);
        }
        [HttpPost]
        [Route("DeleteAll")]
        public void DeleteAll(List<int> ids)
        {
            var repo = new PeopleRepository(_connectionString);
            ids.ForEach(i => repo.DeletePerson(i));
        }
    }
}

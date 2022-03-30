using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactWithBackend.Data
{
    public class PeopleRepository
    {
        private readonly string _connectionString;

        public PeopleRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Person> GetAll()
        {
            using var context = new PeopleDbContext(_connectionString);
            return context.People.ToList();
        }

        public void AddPerson(Person p)
        {
            using var context = new PeopleDbContext(_connectionString);
            context.People.Add(p);
            context.SaveChanges();
        }
        public void UpdatePerson(Person p)
        {
            using var context = new PeopleDbContext(_connectionString);
            context.People.Update(p);
            context.SaveChanges();
        }
        public void DeletePerson(int id) 
        {
            using var context = new PeopleDbContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM People WHERE Id={id}");
        }
    }
}

using Kanini_Tourism.Models;
using Kanini_Tourism.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Kanini_Tourism.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TravelerController : ControllerBase
    {
        private readonly ITravelerRepository _context;

        public TravelerController(ITravelerRepository context)
        {
            _context = context;
        }



        [HttpPost]
        public ActionResult<ICollection<Traveler>> PostTraveler(Traveler d)
        {
            _context.AddTraveler(d);
            return Ok(d);
        }

        [HttpGet]

        public ActionResult<ICollection<Traveler>> GetTraveler()
        {
            var res = _context.GetAllTraveler();
            return Ok(res);
        }

        [HttpGet("{id}")]

        public ActionResult<ICollection<Traveler>> GetTraveler(int id)
        {
            var res = _context.GetAllTravelerById(id);
            return Ok(res);
        }


        [HttpDelete("{id}")]

        public void Delete(int id)
        {
            _context.DeleteTraveler(id);
        }

        [HttpPut]

        public void Put(Traveler d)
        {
            _context.AddTraveler(d);
        }
    }
}

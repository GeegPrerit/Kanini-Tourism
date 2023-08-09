using Kanini_Tourism.Models;
using Kanini_Tourism.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Numerics;

namespace Kanini_Tourism.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TravelAgentController : ControllerBase
    {
        private readonly ITravelAgentRepository _context;

        public TravelAgentController(ITravelAgentRepository context)
        {
            _context = context;
        }

        //[Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<TravelAgent>> PostTravelAgents(TravelAgent d)
        {
            _context.AddTravelAgent(d);
            return Ok(d);
        }

        [HttpGet]
        public ActionResult<ICollection<TravelAgent>> GetAll()
        {
            var res = _context.GetAllTravelAgent();
            return Ok(res);
        }

        [HttpGet("{id}")]
        public ActionResult<ICollection<TravelAgent>> GetAgentsById(int id)
        {
            var res = _context.GetTravelAgentById(id);
            if (res == null)
            {
                return NotFound();
            }
            return Ok(res);
        }

        /*[HttpGet("{name}")]
        public ActionResult<ICollection<TravelAgent>> GetAByName(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return BadRequest("Name parameter is required.");
            }

            var res = _context.GetTravelAgentByName(name);
            if (res == null)
            {
                return NotFound($"Travel agent with name '{name}' not found.");
            }

            return Ok(res);
        }*/






        [HttpDelete("{id}")]
        public void DeleteDoctor(int id)
        {
            _context.DeleteTravelAgent(id);
        }


        [HttpPut("{id}")]
        public IActionResult UpdateDoctor(int id, TravelAgent doctor)
        {
            _context.UpdateTravelAgent(id, doctor);
            return NoContent();
        }
    }
}

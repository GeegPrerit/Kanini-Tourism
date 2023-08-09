using Kanini_Tourism.Models;
using Kanini_Tourism.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Kanini_Tourism.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TravelDetailsController : ControllerBase
    {
        private readonly ITravelDetailRepository _context;

        public TravelDetailsController(ITravelDetailRepository context)
        {
            _context = context;
        }



        [HttpPost]
        public ActionResult<ICollection<TravelDetail>> PostDetails(TravelDetail d)
        {
            _context.AddTravelDetail(d);
            return Ok(d);
        }

        [HttpGet]

        public ActionResult<ICollection<TravelDetail>> GetDetails()
        {
            var res = _context.GetAllTravelDetail();
            return Ok(res);
        }

        [HttpGet("{id}")]

        public ActionResult<ICollection<TravelDetail>> GetDetailsById(int id)
        {
            
            var res = _context.GetTravelDetail(id);
            return Ok(res);
        }

        
        [HttpGet("trip/{AgentId}")]

        public IActionResult GetTDetailsById(int AgentId)
        {

            var res = _context.GetTravelDetailsById(AgentId);
            return Ok(res);
        }



        [HttpDelete("{id}")]

        public void Delete(int id)
        {
            _context.DeleteTravelDetail(id);
        }

        [HttpPut]

        public void Put(TravelDetail d)
        {
            _context.AddTravelDetail(d);
        }
    }
}

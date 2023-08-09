using Kanini_Tourism.Models;
using Kanini_Tourism.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Kanini_Tourism.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminRepository _context;

        public AdminController(IAdminRepository context)
        {
            _context = context;
        }

        //[Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Administrator>> PostAdministrator(Administrator d)
        {
            _context.AddAdministrator(d);
            return Ok(d);
        }

        [HttpGet]
        public ActionResult<ICollection<Administrator>> GetAll()
        {
            var res = _context.GetAllAdministrator();
            return Ok(res);
        }

        [HttpGet("{id}")]
        public ActionResult<ICollection<Administrator>> GetAdministratorId(int id)
        {
            var res = _context.GetAdministratorById(id);
            if (res == null)
            {
                return NotFound();
            }
            return Ok(res);
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _context.DeleteAdministrator(id);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Administrator admin)
        {
            _context.UpdateAdministrator(id, admin);
            return NoContent();
        }
    }
}

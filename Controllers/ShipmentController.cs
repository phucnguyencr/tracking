using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tracking.Models;
using tracking.Services;
using tracking.Utils;

namespace tracking_api.Controllers
{
    [Route("tracking/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class ShipmentController : ControllerBase
    {
        private ShipmentService shipService;
        private TrackingContext _context;
        public ShipmentController(TrackingContext context)
        {
            _context = context;
            shipService = new ShipmentService();
        }

        [HttpPost]
        [ActionName("Search")]
        public IActionResult Get([FromBody] CriteriaModel condition)
        {
            if (!ModelState.IsValid) {
                throw new Exception(Contants.UNVALID);
            }
            return Ok(shipService.GetByCondition(condition, _context));
        }

        [HttpPost]
        [ActionName("Create")]
        public async Task<IActionResult> Create([FromBody] Shipment ship)
        {
            if (!ModelState.IsValid) {
                throw new Exception(Contants.UNVALID);
            }
            if (shipService.ShipmentExistByBillNo(ship.BillOfLading, _context))
            {
                throw new Exception(Contants.DUPLICATE);
            }
            await shipService.Create(ship, _context);
            return Created("", "");
        }

        [HttpPut("{id}")]
        [ActionName("Update")]
        public async Task<IActionResult> Update([FromRoute] string id, [FromBody] Shipment ship)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest();
            }
            if (!ModelState.IsValid)
            {
                throw new Exception(Contants.UNVALID);
            }
            var objDB = shipService.ShipmentExistById(id, _context);
            if (objDB == null)
            {
                throw new Exception(Contants.NOTFOUND);
            }
            objDB.VoyageNo = ship.VoyageNo;
            objDB.Origin = ship.Origin;
            objDB.DepShortName = ship.DepShortName;
            objDB.DepVessel = ship.DepVessel;
            objDB.DepContainer = ship.DepContainer;
            objDB.ActDepartureDate = ship.ActDepartureDate;
            objDB.Destination = ship.Destination;
            objDB.DestShortName = ship.DestShortName;
            objDB.EstDischargeDate = ship.EstDischargeDate;
            objDB.ArrVessel = ship.ArrVessel;
            objDB.ArrContainer = ship.ArrContainer;
            objDB.EstArrivalDate = ship.EstArrivalDate;
            await shipService.Update(objDB, _context);
            return NoContent();
        }

        [HttpPut("{id}")]
        [ActionName("Close")]
        public async Task<IActionResult> CloseShipment([FromRoute] string id) {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest();
            }
            var objDB = shipService.ShipmentExistById(id, _context);
            if (objDB == null)
            {
                throw new Exception(Contants.NOTFOUND);
            }
            await shipService.Close(objDB, _context);
            return Ok();
        }

        [HttpDelete("{id}")]
        [ActionName("Remove")]
        public async Task<IActionResult> Delete([FromRoute] string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest();
            }
            var objDB = shipService.ShipmentExistById(id, _context);
            if (objDB == null)
            {
                throw new Exception(Contants.NOTFOUND);
            }
            await shipService.Delete(objDB, _context);
            return Ok();
        }

        [HttpGet("{id}")]
        [ActionName("Details")]
        [AllowAnonymous]
        public IActionResult GetDetails([FromRoute] string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest();
            }
            var objDB = shipService.GetByBillNo(id, _context);
            var flowService = new FlowService();
            var flowData = flowService.Get(_context);
            return Ok(new { shipInfo = objDB, flowInfo = flowData  });
        }
    }
}
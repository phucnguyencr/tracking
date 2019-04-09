﻿using System;
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
    [Route("tracking/[controller]")]
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

        [HttpGet]
        public IActionResult Get([FromBody] CriteriaModel condition)
        {
            if (!ModelState.IsValid) {
                throw new Exception(Contants.UNVALID);
            }
            return Ok(shipService.GetByCondition(condition, _context));
        }

        [HttpPost]
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

        [HttpPost("{id}")]
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
        public IActionResult GetDetails([FromRoute] string strNo)
        {
            if (string.IsNullOrEmpty(strNo))
            {
                return BadRequest();
            }
            var objDB = shipService.GetByBillNo(strNo, _context);
            if (objDB == null)
            {
                throw new Exception(Contants.NOTFOUND);
            }
            return Ok(objDB);
        }
    }
}
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tracking.Models;
using tracking.Utils;

namespace tracking.Services
{
    public class ShipmentService
    {
        public Array GetByCondition(CriteriaModel condition, TrackingContext context)
        {
            switch(condition.FieldName) {
                case "ActDepartureDate":
                    return context.Shipment.Where(ship => 
                        ship.ActDepartureDate >= DateTime.Parse(condition.FieldFromValue) &&
                        ship.ActDepartureDate <= DateTime.Parse(condition.FieldToValue)
                    ).ToArray();
                case "EstArrivalDate":
                    return context.Shipment.Where(ship => 
                        ship.EstArrivalDate >= DateTime.Parse(condition.FieldFromValue) &&
                        ship.EstArrivalDate <= DateTime.Parse(condition.FieldToValue)
                    ).ToArray();
                case "BillOfLading":
                    return context.Shipment.Where(ship => 
                    ship.BillOfLading == condition.FieldFromValue).ToArray();
                default:
                    return context.Shipment.Where(ship => ship.IsClosed != Contants.CLOSED).ToArray();
            }
        }

        public async Task Create(Shipment ship, TrackingContext context)
        {
            ship.ID = Guid.NewGuid().ToString();
            ship.IsClosed = !Contants.CLOSED;
            context.Shipment.Add(ship);
            await context.SaveChangesAsync();
        }

        public async Task Update(Shipment ship, TrackingContext context)
        {
            context.Entry(ship).State = EntityState.Modified;
            await context.SaveChangesAsync();
        }

        public async Task Close(Shipment ship, TrackingContext context)
        {
            ship.IsClosed = Contants.CLOSED;
            context.Entry(ship).State = EntityState.Modified;
            await context.SaveChangesAsync();
        }

        public async Task Delete(Shipment ship, TrackingContext context)
        {
            context.Shipment.Remove(ship);
            await context.SaveChangesAsync();
        }

        public Shipment ShipmentExistById(string id, TrackingContext context)
        {
            return context.Shipment.Find(id);
        }

        public bool ShipmentExistByBillNo(string billNo, TrackingContext context)
        {
            return context.Shipment.Any(s => s.BillOfLading == billNo);
        }

        public Shipment GetByBillNo(string billNo, TrackingContext context)
        {
            return context.Shipment.FirstOrDefault(s => s.BillOfLading == billNo);
        }
    }
}

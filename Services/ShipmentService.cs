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
                    return context.Shipment.Where(ship => !ship.IsClosed).ToArray();
            }
        }

        public async Task Create(Shipment ship, TrackingContext context)
        {
            ship.ID = Guid.NewGuid().ToString();
            ship.IsClosed = !Contants.CLOSED;
            ship = setUpper(ship);
            context.Shipment.Add(ship);
            await context.SaveChangesAsync();
        }

        public async Task Update(Shipment ship, TrackingContext context)
        {
            ship = setUpper(ship);
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

        private Shipment setUpper (Shipment ship) 
        {
            System.Globalization.CultureInfo cultureInfo = System.Threading.Thread.CurrentThread.CurrentCulture;
            System.Globalization.TextInfo textInfo = cultureInfo.TextInfo;
            ship.BillOfLading = textInfo.ToUpper(ship.BillOfLading);
            ship.VoyageNo = textInfo.ToUpper(ship.VoyageNo);
            ship.Origin = textInfo.ToTitleCase(ship.Origin);
            ship.DepShortName = textInfo.ToUpper(ship.DepShortName);
            ship.DepVessel = textInfo.ToTitleCase(ship.DepVessel);
            ship.DepContainer = textInfo.ToUpper(ship.DepContainer);
            ship.Destination = textInfo.ToTitleCase(ship.Destination);
            ship.DestShortName = textInfo.ToUpper(ship.DestShortName);
            ship.ArrVessel = textInfo.ToTitleCase(ship.ArrVessel);
            ship.ArrContainer = textInfo.ToUpper(ship.ArrContainer);
            ship.CreatedBy = textInfo.ToTitleCase(ship.CreatedBy);
            return ship;
        }

        public Array mapFlowData(Shipment ship, TrackingContext context)
        {
            var flowService = new FlowService();
            var flowData = flowService.Get(context);
            List<Flow> newFlow = new List<Flow>();
            if(flowData.Length == 0) 
            {
                return new Array[0];
            }
            foreach(Flow flow in flowData)
            {
                newFlow.Add(mapStr(flow, ship));
            }
            return flowData;
        }

        private Flow mapStr(Flow flow, Shipment ship)
        {
            var Desc = "";
            var SubDesc = "";
            switch(flow.StepNo)
            {
                case 1:
                {
                    Desc = ReplaceParam.MakeStringWithParams(flow.Description, new string[] { ship.DepShortName, ship.CreatedBy });
                    SubDesc = String.Format("{0}{1: dd/MM/yyyy}", ship.DepShortName, ship.BookedDate);
                    break;
                }
                case 2:
                {
                    string opt = String.Format("{0: dd MMM yyyy}", ship.ActDepartureDate);
                    Desc = ReplaceParam.CheckActualOrEstimate(ship.ActDepartureDate.Date) 
                    + ReplaceParam.MakeStringWithParams(flow.Description, new string[] { opt });
                    SubDesc = String.Format("{0}{1: dd/MM/yyyy}", ship.DepShortName, ship.ActDepartureDate);
                    break;
                }
                case 3:
                {
                    string opt = String.Format("{0: dd MMM yyyy}", ship.TransArrivalDate);
                    Desc = ReplaceParam.CheckActualOrEstimate(ship.TransArrivalDate.Date) 
                    + ReplaceParam.MakeStringWithParams(flow.Description, new string[] { opt });
                    SubDesc = String.Format("{0}{1: dd/MM/yyyy}", ship.TransShortName, ship.TransArrivalDate);
                    break;
                }
                case 4:
                {
                    string opt = String.Format("{0: dd MMM yyyy}", ship.TransDepartureDate);
                    Desc = ReplaceParam.CheckActualOrEstimate(ship.TransDepartureDate.Date) 
                    + ReplaceParam.MakeStringWithParams(flow.Description, new string[] { opt });
                    SubDesc = String.Format("{0}{1: dd/MM/yyyy}", ship.TransShortName, ship.TransDepartureDate);
                    break;
                }
                case 5:
                {
                    string opt = String.Format("{0: dd MMM yyyy}", ship.EstArrivalDate);
                    Desc = ReplaceParam.CheckActualOrEstimate(ship.EstArrivalDate.Date) 
                    + ReplaceParam.MakeStringWithParams(flow.Description, new string[] { opt });
                    SubDesc = String.Format("{0}{1: dd/MM/yyyy}", ship.TransShortName, ship.EstArrivalDate);
                    break;
                }
                default:
                    break; 
            }
            flow.Description = Desc;
            flow.SubDescription = SubDesc;
            return flow;
        }
    }
}

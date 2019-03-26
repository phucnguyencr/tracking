using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tracking.Models;
using tracking.Utils;

namespace tracking.Services
{
    public class FlowService
    {
        public Array Get(TrackingContext context)
        {
            return context.Flow.ToArray();
        }

        public async Task Create(Flow flow, TrackingContext context)
        {
            flow.ID = Guid.NewGuid().ToString();
            context.Flow.Add(flow);
            await context.SaveChangesAsync();
        }

        public async Task Update(Flow flow, TrackingContext context)
        {
            context.Entry(flow).State = EntityState.Modified;
            await context.SaveChangesAsync();
        }

        public async Task Delete(Flow flow, TrackingContext context)
        {
            context.Flow.Remove(flow);
            await context.SaveChangesAsync();
        }

        public bool FlowExists(Flow flow, TrackingContext context)
        {
            return context.Flow.Any(e => e.Description == flow.Description);
        }

        public Flow FlowExistsById(String ID, TrackingContext context)
        {
            return context.Flow.FirstOrDefault(e => e.ID == ID);
        }
    }
}

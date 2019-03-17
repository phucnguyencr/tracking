using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tracking.Models;
using tracking.Utils;
using Microsoft.Extensions.Logging;

namespace tracking.Services
{
    public class ContactService
    {
        public async Task Update(Contact contact, TrackingContext context)
        {
            context.Entry(contact).State = EntityState.Modified;
            await context.SaveChangesAsync();
        }

        public Contact Get(TrackingContext context)
        {
            return context.Contact.FirstOrDefault();
        }
    }
}

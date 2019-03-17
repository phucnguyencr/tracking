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
    public class ContactActivityService
    {
        public async Task Create(ContactActivity contact, TrackingContext context)
        {
            contact.ID = Guid.NewGuid().ToString();
            contact.IsRead = false;
            contact.CreatedDate = DateTime.Now;
            context.ContactActivity.Add(contact);
            await context.SaveChangesAsync();
        }

        public async Task Update(ContactActivity contact, TrackingContext context)
        {
            context.Entry(contact).State = EntityState.Modified;
            await context.SaveChangesAsync();
        }

        public ContactActivity GetById(string id, TrackingContext context)
        {
            return context.ContactActivity.Find(id);
        }

        public Array GetNew(TrackingContext context)
        {
            var userList = context.ContactActivity.Where(x => !x.IsRead).ToArray();
            return userList;
        }
    }
}

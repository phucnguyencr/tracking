using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tracking.Models;
using tracking.Utils;

namespace tracking.Services
{
    public class UserService
    {
        public async void Create(User user, TrackingContext context)
        {
            user.Password = EncryptionUtil.Encrypt(user.Password, true);
            user.Active = true;
            user.ID = Guid.NewGuid().ToString();
            context.User.Add(user);
            await context.SaveChangesAsync();
        }

        public async void Update(User user, TrackingContext context)
        {
            context.Entry(user).State = EntityState.Modified;
            await context.SaveChangesAsync();
        }

        public async void Delete(User user, TrackingContext context)
        {
            context.User.Remove(user);
            await context.SaveChangesAsync();
        }

        public bool Authencation(Authencation login, TrackingContext context)
        {
            string Password = EncryptionUtil.Encrypt(login.Password, true);
            return context.User.Any(u => u.UserName == login.UserName && u.Password == Password && u.Active);
        }

        public bool UserExists(string UserName, TrackingContext context)
        {
            return context.User.Any(e => e.UserName == UserName);
        }

        public User UserExistById(string id, TrackingContext context)
        {
            return context.User.Find(id);
        }

        public Array Get(TrackingContext context)
        {
            var userList = context.User.Select(x => new {
                x.ID, x.FullName, x.Email, x.UserName, x.Active
            }).ToArray();
            return userList;
        }

        public User UserExistToChange(Authencation login, TrackingContext context)
        {
            return context.User.FirstOrDefault(u => u.UserName == login.UserName && u.Password == login.Password);
        }
    }
}

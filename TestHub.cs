using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetCoreTest
{
    public class TestHub : Hub
    {
        public async Task Subscribe(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            await Clients.Client(Context.ConnectionId).SendAsync("state", groupName + " has been subscribed");
        }

        public async Task Unsubscribe(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
        }

        public async Task GetGroupMessage(string groupName)
        {
            await Clients.Group(groupName).SendAsync("state", "Hello World " + groupName);
        }
    }
}

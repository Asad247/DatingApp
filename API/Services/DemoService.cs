using System;
using API.Interfaces;

namespace API.Services;

public class DemoService : IDemoService
{
    public string GetWelcomeMessage(string name)
    {
        return $"Hello {name}, welcome to the DatingApp API! The current server time is {DateTime.UtcNow}.";
    }
}

using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class DemoController(IDemoService demoService) : BaseApiController
{
    [HttpGet("welcome/{name}")]
    public ActionResult<string> GetWelcome(string name)
    {
        return Ok(demoService.GetWelcomeMessage(name));
    }
}

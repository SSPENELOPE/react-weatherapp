using Microsoft.AspNetCore.Mvc;

namespace react_weatherapp.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}

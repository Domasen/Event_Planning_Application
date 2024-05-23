using System.Security.Claims;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;

namespace PlanningApplication.Interceptors;

public class LogActionFilter : IAsyncActionFilter
{
    // private readonly IActionLogger _logger;
    // public LogActionFilter(ActionLogger logger)
    // {
    //     _logger = logger;
    // }

    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        var descriptor = context.ActionDescriptor as ControllerActionDescriptor;
        if (descriptor != null)
        {
            var hasLogAttribute = descriptor.MethodInfo.GetCustomAttributes(typeof(LogActionAttribute), true).Any();

            if (hasLogAttribute)
            {
                var logger = context.HttpContext.RequestServices.GetService<IActionLogger>();
                var user = context.HttpContext.User;

                var username = user.Identity.IsAuthenticated ? user.Identity.Name : "Anonymous";
                var roles = user.Identity.IsAuthenticated 
                    ? string.Join(",", user.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value)) 
                    : "No roles";
                var className = descriptor.ControllerTypeInfo.FullName;
                var methodName = descriptor.MethodInfo.Name;
                var timestamp = DateTime.UtcNow;

                logger.Log(username, roles, className, methodName, timestamp);
            }
        }

        await next();
    }
}
using System.Text;

namespace PlanningApplication.Interceptors;

public class RequestLoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<RequestLoggingMiddleware> _logger;

    public RequestLoggingMiddleware(RequestDelegate next, ILogger<RequestLoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        context.Request.EnableBuffering(); // Enable buffering to allow the stream to be read multiple times

        var request = context.Request;
        var buffer = new byte[Convert.ToInt32(request.ContentLength)];
        await request.Body.ReadAsync(buffer, 0, buffer.Length);
        var requestBody = Encoding.UTF8.GetString(buffer);

        _logger.LogInformation("Handling request: {Method} {Url} {Body}", request.Method, request.Path, requestBody);

        // Reset the request body stream position so the next middleware can read it
        request.Body.Position = 0;

        await _next(context);

        _logger.LogInformation("Finished handling request. Response: {StatusCode}", context.Response.StatusCode);
    }

}
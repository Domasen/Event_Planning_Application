namespace PlanningApplication.Interceptors;

public class ActionLogger : IActionLogger
{
    private readonly ILogger<ActionLogger> _logger;
    private readonly IConfiguration _configuration;
    private readonly bool _isLoggingEnabled;
    private readonly bool _logToDatabase;

    public ActionLogger(ILogger<ActionLogger> logger, IConfiguration configuration)
    {
        _logger = logger;
        _configuration = configuration;
        _isLoggingEnabled = _configuration.GetValue<bool>("Logging:ActionLogging:Enabled");
        _logToDatabase = _configuration.GetValue<bool>("Logging:ActionLogging:LogToDatabase");
    }


    public void Log(string username, string roles, string className, string methodName, DateTime timestamp)
    {
        if (!_isLoggingEnabled)
        {
            return;
        }
        
        _logger.LogInformation("User: {Username}, Roles: {Roles}, Class: {ClassName}, Method: {MethodName}, Timestamp: {Timestamp}",
            username, roles, className, methodName, timestamp);

        if (_logToDatabase)
        {
            // Implement database logging here
        }
    }

}
namespace PlanningApplication.Interceptors;

public class ActionLogger : IActionLogger
{
    private readonly ILogger<ActionLogger> _logger;
    private readonly IConfiguration _configuration;
    private readonly bool _isLoggingEnabled;
    private readonly bool _logToDatabase;
    private readonly string _filePath;
    public ActionLogger(ILogger<ActionLogger> logger, IConfiguration configuration)
    {
        _logger = logger;
        _configuration = configuration;
        _isLoggingEnabled = _configuration.GetValue<bool>("Logging:ActionLogging:Enabled");
        _logToDatabase = _configuration.GetValue<bool>("Logging:ActionLogging:LogToFile");
        _filePath = _configuration.GetValue<string>("Logging:ActionLogging:FilePath");
        //_filePath = @"C:\Users\Domas\Desktop\EventPlanner\PlanningApplication\log.txt";
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
            File.AppendAllText(_filePath, $"User: {username}, Roles: {roles}, Class: {className}, Method: {methodName}, Timestamp: {timestamp}\n");
        }
    }

}
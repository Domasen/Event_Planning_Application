namespace PlanningApplication.Interceptors;

public interface IActionLogger
{
    void Log(string username, string roles, string className, string methodName, DateTime timestamp);
}
using System.Text.Json;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.EntityFrameworkCore;
using PlanningApplication.Data;
using PlanningApplication.EmployeeComponent.Repository;
using PlanningApplication.EmployeeComponent.Services;
using PlanningApplication.ExpenseComponent.Repository;
using PlanningApplication.ExpenseComponent.Services;
using PlanningApplication.JobComponent.Models;
using PlanningApplication.UsersComponent.Models;
using PlanningApplication.UsersComponent.Repository;
using PlanningApplication.UsersComponent.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddIdentity<User, IdentityRole>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 6;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = true;
    options.Password.RequireLowercase = false;
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
    options.Lockout.MaxFailedAccessAttempts = 5;
    options.SignIn.RequireConfirmedEmail = false;
    options.User.RequireUniqueEmail = true;
}).AddEntityFrameworkStores<ApplicationDbContext>().AddDefaultTokenProviders();


builder.Services.AddTransient<IUserRepository, UserRepository>();
builder.Services.AddTransient<IUserServices, UserServices>();
builder.Services.AddTransient<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddTransient<IEmployeeService, EmployeeService>();
builder.Services.AddTransient<IJobRepository, JobRepository>();
builder.Services.AddTransient<IJobService, JobService>();
builder.Services.AddTransient<IExpenseRepository, ExpenseRepository>();
builder.Services.AddTransient<IExpenseService, ExpenseService>();
builder.Services.AddControllersWithViews()
    .AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
);

// Add CORS services
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
                // .AllowCredentials();
        });
});

//swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.Cookie.HttpOnly = true;
        options.Cookie.SecurePolicy = CookieSecurePolicy.None; // Use Always in production with HTTPS
        options.Cookie.SameSite = SameSiteMode.None; // Required for cross-origin
        options.LoginPath = "/User/Login";
    });    
//.AddCookie(x => x.LoginPath = "/User/Login");

builder.Services.AddHttpContextAccessor();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();

}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors("AllowAllOrigins");

app.UseAuthentication();
app.UseAuthorization();

var cookiePolicyOptions = new CookiePolicyOptions
{
    MinimumSameSitePolicy = SameSiteMode.None, // Ensure this matches your cookie configuration
};

app.UseCookiePolicy(cookiePolicyOptions);


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
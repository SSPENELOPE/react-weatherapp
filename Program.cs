
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Newtonsoft.Json.Serialization;
using react_weatherapp.Helpers;
using Microsoft.EntityFrameworkCore;


namespace react_weatherapp
{
    public class Program
    {
      
        public static void Main(string[] args)
        {

            /* EnableCorsAttribute cors = new EnableCorsAttribute(); */
            var builder = WebApplication.CreateBuilder(args);

            var json = GlobalConfiguration.Configuration.Formatters.JsonFormatter;
            json.UseDataContractJsonSerializer = true;

            // Connection String From appsettings
            var configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").AddUserSecrets<Program>().Build();
            var connectionString = configuration.GetConnectionString("DefaultConnection");

            // Dependacy injection for connection 
            builder.Services.AddSingleton<Connection>();

            // This is incorporated into connection.cs file, will dig more later to minimize usage
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(connectionString));

            // Add services to the container.
            builder.Services.AddControllersWithViews().AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore)
                .AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());

            //JWT Authentication
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = builder.Configuration["Jwt:Issuer"],
                    ValidAudience = builder.Configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
                };
            });

    
            var app = builder.Build();

            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                try
                {
                    var dbContext = services.GetRequiredService<AppDbContext>();
                    /* dbContext.Database.EnsureCreated(); */
                }
                catch (Exception ex)
                {
                    // Handle any errors that occur while creating the database
                    Console.WriteLine(ex.Message);
                }
            }

            // Configure the HTTP request pipeline.

      /*       if (app.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            } */
            if (!app.Environment.IsDevelopment())
                {
                    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                    app.UseHsts();
                }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllerRoute(
                name: "default",
                pattern: "{controller}/{action=Index}/{id?}");

            app.MapFallbackToFile("index.html");

            app.Run();
        }
    }
}
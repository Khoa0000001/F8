using BLL.Interfaces;
using BLL;
using DAL.Interfaces;
using DAL;
using DataAccessLayer;
using DataModel;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader());

    options.AddPolicy("AllowSpecificOrigin", builder =>
    {
        builder.WithOrigins("http://127.0.0.1:5500") // Th�m ngu?n c?a b?n v�o ?�y
                .AllowAnyMethod()
                .AllowAnyHeader();
    });

    options.AddPolicy("AllowAnyOrigin", builder =>
    {
        builder.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });

});
// Add services to the container.
builder.Services.AddTransient<IDatabaseHelper, DatabaseHelper>();
builder.Services.AddTransient<ICategoryRepository, CategoryRepository>();
builder.Services.AddTransient<ICategoryBusiness, CategoryBusiness>();
builder.Services.AddTransient<IBlogRepository, BlogRepository>();
builder.Services.AddTransient<IBlogBusiness, BlogBusiness>();
builder.Services.AddTransient<IUserRepository, UserRepository>();
builder.Services.AddTransient<IUserBusinesss, UserBusinesss>();
builder.Services.AddTransient<ILessonRepository, LessonRepository>();
builder.Services.AddTransient<ILessonBusiness, LessonBusiness>();
builder.Services.AddTransient<ISearchRepository, SearchRepository>();
builder.Services.AddTransient<ISearchBusiness, SearchBusiness>();
builder.Services.AddTransient<ICourseRepository, CourseRepository>();
builder.Services.AddTransient<ICourseBusiness, CourseBusiness>();
builder.Services.AddTransient<ICourseParticipationRepository, CourseParticipationRepository>();
builder.Services.AddTransient<ICourseParticipationBusiness, CourseParticipationBusiness>();


// configure strongly typed settings objects


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();
app.UseCors(x => x
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());
app.MapControllers();
app.Run();

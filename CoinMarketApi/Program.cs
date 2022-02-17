using Microsoft.EntityFrameworkCore;
using CoinMarketApi.Models;
using CoinMarketApi.Core;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<CoinMarketContext>(opt =>
    opt.UseSqlite("CoinMarket"));

builder.Services.AddHostedService<ConsumeScopedServiceHostedService>();
builder.Services.AddScoped<IScopedProcessingService, DataFetchBackgroundService>();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseWebSockets();
// Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
// app.UseSwagger();
// app.UseSwaggerUI();
// }

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

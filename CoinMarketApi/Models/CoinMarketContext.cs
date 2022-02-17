using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace CoinMarketApi.Models
{
    public class CoinMarketContext : DbContext
    {
        public DbSet<Coin> Coins { get; set; } = null!;

        public string DbPath { get; }

        public CoinMarketContext(DbContextOptions<CoinMarketContext> options)
            : base(options)
        {
            var folder = Environment.SpecialFolder.LocalApplicationData;
            var path = Environment.GetFolderPath(folder);
            DbPath = System.IO.Path.Join(path, "coin-market-api.db");
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite($"Data Source={DbPath}");
    }

}


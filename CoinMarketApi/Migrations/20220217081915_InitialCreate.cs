using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoinMarketApi.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Coins",
                columns: table => new
                {
                    Id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Symbol = table.Column<string>(type: "TEXT", nullable: false),
                    Slug = table.Column<string>(type: "TEXT", nullable: false),
                    NumMarketPairs = table.Column<long>(type: "INTEGER", nullable: false),
                    MaxSupply = table.Column<long>(type: "INTEGER", nullable: true),
                    CirculatingSupply = table.Column<long>(type: "INTEGER", nullable: false),
                    TotalSupply = table.Column<long>(type: "INTEGER", nullable: false),
                    CmcRank = table.Column<int>(type: "INTEGER", nullable: false),
                    price = table.Column<long>(type: "INTEGER", nullable: false),
                    Volume24h = table.Column<long>(type: "INTEGER", nullable: false),
                    PercentChange24h = table.Column<long>(type: "INTEGER", nullable: false),
                    PercentChange7d = table.Column<long>(type: "INTEGER", nullable: false),
                    MarketCap = table.Column<long>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Coins", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Coins");
        }
    }
}

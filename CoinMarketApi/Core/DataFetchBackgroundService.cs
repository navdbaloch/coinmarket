namespace CoinMarketApi.Core;

using CoinMarketApi.Models;
internal interface IScopedProcessingService
{
    Task DoWork(CancellationToken stoppingToken);
}

public class DataFetchEventArgs
{
    public Coin[] coins { get; set; }
}

public class DataFetchEventBus
{
    public static event Action<object, DataFetchEventArgs> DataFetchTriggered;

    public void trigger(Coin[] coins)
    {
        DataFetchTriggered?.Invoke(this, new DataFetchEventArgs { coins = coins });
    }
}

internal class DataFetchBackgroundService : IScopedProcessingService
{
    private int executionCount = 0;
    private readonly CoinMarketContext _context;

    public DataFetchBackgroundService(CoinMarketContext context)
    {
        _context = context;
    }

    public async Task DoWork(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            executionCount++;
            this.FetchConinData();
            await Task.Delay(5 * 60 * 1000, stoppingToken);
        }
    }

    private void FetchConinData()
    {
        var response = CoinMarketClient.getList();
        Coin[] coins = this.MapApiResponseToCoin(response.data);
        var eventBus = new DataFetchEventBus();
        foreach (Coin coin in coins)
        {
            bool exists = this._context.Coins.Any((c) => c.Id == coin.Id);
            if (exists)
            {
                this._context.Update(coin);
            }
            else
            {
                this._context.Add(coin);
            }
        }
        this._context.SaveChanges();

        foreach (Coin coin in coins)
            this._context.Entry(coin).State = Microsoft.EntityFrameworkCore.EntityState.Detached;

        eventBus.trigger(coins);
    }

    private Coin[] MapApiResponseToCoin(CoinResponseModel[] data)
    {
        Coin[] coins = new Coin[data.Length];
        for (var i = 0; i < data.Length; i++)
        {
            var apiCoin = data[i];
            Coin coin = new Coin();
            coin.Id = apiCoin.id;
            coin.Name = apiCoin.name;
            coin.Symbol = apiCoin.symbol;
            coin.Slug = apiCoin.slug;
            coin.NumMarketPairs = apiCoin.num_market_pairs;
            coin.MaxSupply = apiCoin.max_supply;
            coin.CirculatingSupply = apiCoin.circulating_supply;
            coin.TotalSupply = apiCoin.total_supply;
            coin.CmcRank = apiCoin.cmc_rank;
            coin.price = apiCoin.quote.USD.price;
            coin.Volume24h = apiCoin.quote.USD.volume_24h;
            coin.PercentChange24h = apiCoin.quote.USD.percent_change_24h;
            coin.PercentChange7d = apiCoin.quote.USD.percent_change_7d;
            coin.MarketCap = apiCoin.quote.USD.market_cap;
            coins[i] = coin;
        }

        return coins;
    }
}

public class ConsumeScopedServiceHostedService : BackgroundService
{
    private readonly ILogger<ConsumeScopedServiceHostedService> _logger;

    public ConsumeScopedServiceHostedService(IServiceProvider services,
        ILogger<ConsumeScopedServiceHostedService> logger)
    {
        Services = services;
        _logger = logger;
    }

    public IServiceProvider Services { get; }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await DoWork(stoppingToken);
    }

    private async Task DoWork(CancellationToken stoppingToken)
    {
        using (var scope = Services.CreateScope())
        {
            var scopedProcessingService =
                scope.ServiceProvider
                    .GetRequiredService<IScopedProcessingService>();

            await scopedProcessingService.DoWork(stoppingToken);
        }
    }

    public override async Task StopAsync(CancellationToken stoppingToken)
    {
        await base.StopAsync(stoppingToken);
    }
}
using System;
using System.Net;
using System.Web;
using Newtonsoft.Json;

namespace CoinMarketApi.Core;
class CoinMarketResponse
{
    public CoinResponseModel[] data { get; set; }
}

class CoinResponseModel
{
    public long id { get; set; }
    public string name { get; set; }
    public string symbol { get; set; }
    public string slug { get; set; }
    public long num_market_pairs { get; set; }

    public long? max_supply { get; set; }
    public long circulating_supply { get; set; }
    public long total_supply { get; set; }
    public int cmc_rank { get; set; }

    public QuoteModel quote { get; set; }

}

class QuoteModel
{
    public CurrencyModel USD { get; set; }
}

class CurrencyModel
{
    public long price { get; set; }
    public long volume_24h { get; set; }
    public long volume_change_24h { get; set; }
    public long percent_change_24h { get; set; }
    public long percent_change_7d { get; set; }
    public long market_cap { get; set; }

}
class CoinMarketClient
{
    private static string API_KEY = "b5d07a5f-14f3-42ab-823a-95ac65eef1c3";
    // private static string API_KEY = "b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c";

    public static CoinMarketResponse getList()
    {
        var URL = new UriBuilder("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest");

        var queryString = HttpUtility.ParseQueryString(string.Empty);
        queryString["sort"] = "market_cap";
        queryString["limit"] = "100";

        URL.Query = queryString.ToString();

        var client = new WebClient();
        client.Headers.Add("X-CMC_PRO_API_KEY", API_KEY);
        client.Headers.Add("Accepts", "application/json");
        String response = client.DownloadString(URL.ToString());
        return JsonConvert.DeserializeObject<CoinMarketResponse>(response);
    }

}
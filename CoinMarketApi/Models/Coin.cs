using Newtonsoft.Json;
namespace CoinMarketApi.Models
{
    public class Coin
    {
        [JsonProperty(PropertyName = "id")]
        public long Id { get; set; }
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
        [JsonProperty(PropertyName = "symbol")]
        public string Symbol { get; set; }
        [JsonProperty(PropertyName = "slug")]
        public string Slug { get; set; }
        [JsonProperty(PropertyName = "numMarketPairs")]
        public long NumMarketPairs { get; set; }
        [JsonProperty(PropertyName = "maxSupply")]
        public long? MaxSupply { get; set; }
        [JsonProperty(PropertyName = "circulatingSupply")]
        public long CirculatingSupply { get; set; }
        [JsonProperty(PropertyName = "totalSupply")]
        public long TotalSupply { get; set; }
        [JsonProperty(PropertyName = "cmcRank")]
        public int CmcRank { get; set; }
        [JsonProperty(PropertyName = "price")]
        public long price { get; set; }
        [JsonProperty(PropertyName = "volume24h")]
        public long Volume24h { get; set; }
        [JsonProperty(PropertyName = "percentChange24h")]
        public long PercentChange24h { get; set; }
        [JsonProperty(PropertyName = "percentChange7d")]
        public long PercentChange7d { get; set; }
        [JsonProperty(PropertyName = "marketCap")]
        public long MarketCap { get; set; }
    }
}
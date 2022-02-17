#nullable disable
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CoinMarketApi.Models;
using System.Net.WebSockets;
using CoinMarketApi.Core;
using System.Text;
using Newtonsoft.Json;

namespace CoinMarketApi.Controllers
{
    [ApiController]
    public class CoinsController : ControllerBase
    {
        private readonly CoinMarketContext _context;

        public CoinsController(CoinMarketContext context)
        {
            _context = context;
        }

        [HttpGet("get-latest-data")]
        public async Task<ActionResult<IEnumerable<Coin>>> GetCoins()
        {
            return await _context.Coins.OrderBy((e) => e.CmcRank).Take(100).ToListAsync();
        }

        [HttpGet("/ws")]
        public async Task Get()
        {
            if (HttpContext.WebSockets.IsWebSocketRequest)
            {
                using var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
                await Echo(webSocket);
            }
            else
            {
                HttpContext.Response.StatusCode = 400;
            }
        }

        private async Task Echo(WebSocket webSocket)
        {
            var buffer = new byte[1024 * 4];
            var serverMsg = Encoding.UTF8.GetBytes($"Server: Hello. You said: {Encoding.UTF8.GetString(buffer)}");
            DataFetchEventBus.DataFetchTriggered += async (ob, eventArgs) =>
            {
                if (webSocket.State == WebSocketState.Open)
                {
                    var coinsJson = JsonConvert.SerializeObject(eventArgs.coins);
                    await webSocket.SendAsync(buffer: new ArraySegment<byte>(array: Encoding.ASCII.GetBytes(coinsJson.ToString()),
                        offset: 0,
                        count: coinsJson.ToString().Length),
                        messageType: WebSocketMessageType.Text,
                        endOfMessage: true,
                        cancellationToken: System.Threading.CancellationToken.None);
                }
            };
            var result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
            await webSocket.CloseAsync(result.CloseStatus.Value, result.CloseStatusDescription, CancellationToken.None);
        }
    }
}

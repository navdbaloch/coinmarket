import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { merge, Observable } from 'rxjs';

export interface ICoin {
  circulatingSupply: number;
  cmcRank: number;
  id: number;
  marketCap: number;
  maxSupply: number;
  name: string;
  numMarketPairs: number;
  percentChange7d: number;
  percentChange24h: number;
  price: number;
  slug: string;
  symbol: string;
  totalSupply: number;
  volume24h: number;
}

@Injectable({
  providedIn: 'root',
})
export class CoinDataService {
  constructor(private http: HttpClient) {}

  getData(): Observable<ICoin[]> {
    const http$ = this.http.get<ICoin[]>(`/api/get-latest-data`);
    let webSocket = new WebSocket('wss://localhost:3000/ws');
    const socket$ = new Observable<ICoin[]>((subscriber) => {
      webSocket.onmessage = (data) =>
        subscriber.next(JSON.parse(data.data) as ICoin[]);
    });
    return merge(socket$, http$);
  }
}

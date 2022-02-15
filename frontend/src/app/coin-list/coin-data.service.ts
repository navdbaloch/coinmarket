import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { merge, Observable } from 'rxjs';

export interface ICoin {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  num_market_pairs: number;
  date_added: string;
  tags: string[];
  max_supply: number;
  circulating_supply: number;
  total_supply: number;
  cmc_rank: number;
  self_reported_circulating_supply: number;
  self_reported_market_cap: number;
  last_updated: string;
  quote: {
    USD: {
      price: number;
      volume_24h: number;
      volume_change_24h: number;
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_60d: number;
      percent_change_90d: number;
      market_cap: number;
      market_cap_dominance: number;
      fully_diluted_market_cap: number;
      last_updated: string;
    };
  };
}

export interface ICoinData {
  data: ICoin[];
}

@Injectable({
  providedIn: 'root',
})
export class CoinDataService {
  constructor(private socket: Socket, private http: HttpClient) {}

  getData(): Observable<ICoinData> {
    this.socket.connect();
    const http$ = this.http.get<ICoinData>(`/api/get-latest-data`);
    const socket$ = new Observable<ICoinData>((subscriber) => {
      this.socket.on('data', (data: ICoinData) => subscriber.next(data));
    });
    return merge(socket$, http$);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import axios, { AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class BitcoinService {
  private readonly COINBASE_API_URL = 'https://api.coinbase.com/v2/prices/spot?currency=USD';
  private readonly BINANCE_API_URL = 'https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT';
  private readonly KRAKEN_API_URL = 'https://api.kraken.com/0/public/Ticker?pair=XBTUSD';
  private readonly BITSTAMP_API_URL = 'https://www.bitstamp.net/api/v2/ticker/btcusd';
  http: any;

  constructor() { }

  getBitcoinPriceFromCoinbase(): Observable<any> {
    return new Observable(observer => {
      axios.get(this.COINBASE_API_URL).then((response: AxiosResponse<any>) => {
        observer.next(response.data);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  getBitcoinPriceFromBinance(): Observable<any> {
    return new Observable(observer => {
      axios.get(this.BINANCE_API_URL).then((response: AxiosResponse<any>) => {
        observer.next(response.data);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  getBitcoinPriceFromKraken(): Observable<any> {
    return new Observable(observer => {
      axios.get(this.KRAKEN_API_URL).then((response: AxiosResponse<any>) => {
        observer.next(response.data.result.XXBTZUSD);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  getBitcoinPriceFromBitstamp(): Observable<any> {
    return new Observable(observer => {
      axios.get(this.BITSTAMP_API_URL).then((response: AxiosResponse<any>) => {
        observer.next(response.data.last);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  getTicker() {
    return this.http.get(this.BITSTAMP_API_URL, { withCredentials: true });
  }
}

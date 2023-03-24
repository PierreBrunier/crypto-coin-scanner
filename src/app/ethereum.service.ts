import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import axios, { AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class EthereumService {
  private readonly COINBASE_API_URL = 'https://api.coinbase.com/v2/prices/ETH-USD/spot';
  private readonly BINANCE_API_URL = 'https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT';
  private readonly KRAKEN_API_URL = 'https://api.kraken.com/0/public/Ticker?pair=ETHUSD';
  private readonly BITSTAMP_API_URL = 'https://www.bitstamp.net/api/v2/ticker/ethusd';
  http: any;

  constructor() { }

  getEthereumPriceFromCoinbase(): Observable<any> {
    return new Observable(observer => {
      axios.get(this.COINBASE_API_URL).then((response: AxiosResponse<any>) => {
        observer.next(response.data);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  getEthereumPriceFromBinance(): Observable<any> {
    return new Observable(observer => {
      axios.get(this.BINANCE_API_URL).then((response: AxiosResponse<any>) => {
        observer.next(response.data);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  getEthereumPriceFromKraken(): Observable<any> {
    return new Observable(observer => {
      axios.get(this.KRAKEN_API_URL).then((response: AxiosResponse<any>) => {
        observer.next(response.data.result.XETHZUSD);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  getEthereumPriceFromBitstamp(): Observable<any> {
    //this.getTickerBitstamp();
    return new Observable(observer => {
      axios.get(this.BITSTAMP_API_URL).then((response: AxiosResponse<any>) => {
        observer.next(response.data.last);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import axios, { AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class LitecoinService {
  private readonly COINBASE_API_URL = 'https://api.coinbase.com/v2/prices/LTC-USD/spot';
  private readonly BINANCE_API_URL = 'https://api.binance.com/api/v3/ticker/price?symbol=LTCUSDT';
  private readonly KRAKEN_API_URL = 'https://api.kraken.com/0/public/Ticker?pair=LTCUSD';

  private readonly COINBASE_API_URL_HIST = 'https://api.pro.coinbase.com/products/LTC-USD/candles?granularity=60';
  private readonly BINANCE_API_URL_HIST = 'https://api.binance.com/api/v3/klines?symbol=LTCUSDT&interval=1m';
  private readonly KRAKEN_API_URL_HIST = 'https://api.kraken.com/0/public/OHLC?pair=LTCUSD&interval=1';
  http: any;

  constructor() { }

  getLitecoinPriceFromCoinbase(): Observable<any> {
    return new Observable(observer => {
      axios.get(this.COINBASE_API_URL).then((response: AxiosResponse<any>) => {
        observer.next(response.data);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  getLitecoinPriceFromBinance(): Observable<any> {
    return new Observable(observer => {
      axios.get(this.BINANCE_API_URL).then((response: AxiosResponse<any>) => {
        observer.next(response.data);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  getLitecoinPriceFromKraken(): Observable<any> {
    return new Observable(observer => {
      axios.get(this.KRAKEN_API_URL).then((response: AxiosResponse<any>) => {
        observer.next(response.data.result.XLTCZUSD);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  getLitecoinPriceHistFromCoinbase(): Observable<any> {
    return new Observable(observer => {
      axios.get(this.COINBASE_API_URL_HIST).then((response: AxiosResponse<any>) => {
        observer.next(response.data);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  getLitecoinPriceHistFromBinance(): Observable<any> {
    return new Observable(observer => {
      axios.get(this.BINANCE_API_URL_HIST).then((response: AxiosResponse<any>) => {
        observer.next(response.data);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  getLitecoinPriceHistFromKraken(): Observable<any> {
    return new Observable(observer => {
      axios.get(this.KRAKEN_API_URL_HIST).then((response: AxiosResponse<any>) => {
        observer.next(response.data.result.XLTCZUSD);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }
}

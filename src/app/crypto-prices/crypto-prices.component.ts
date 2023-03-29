import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

import { BitcoinService } from '../bitcoin.service';
import { EthereumService } from '../ethereum.service';
import { LitecoinService } from '../litecoin.service';
import { PlotlyService } from '../plotly.service';


@Component({
  selector: 'app-crypto-prices',
  templateUrl: './crypto-prices.component.html',
  styleUrls: ['./crypto-prices.component.css']
})

export class CryptoPricesComponent implements OnInit {
  bitcoinCoinbase!: string;
  bitcoinBinance!: string;
  bitcoinKraken!: string;
  bitcoinBitstamp!: string;

  ethereumCoinbase!: string;
  ethereumBinance!: string;
  ethereumKraken!: string;
  ethereumBitstamp!: string;

  litecoinCoinbase!: string;
  litecoinBinance!: string;
  litecoinKraken!: string;


  candlestickData: any[] = [];



  constructor(private bitcoinService: BitcoinService, private ethereumService: EthereumService, private litecoinService: LitecoinService, private plot:PlotlyService) {}

  ngOnInit() {
    // fetch initial prices on component initialization
    this.fetchPrices();
    
    // fetch latest prices every 10 seconds
    interval(10000).subscribe(() => {
      this.fetchPrices();
    });

    let x:number[] = [1,2,3,4,5];
    let y:number[] = [1,2,3,4,5];
    this.plot.plotLine("Line Plot","plot",x,y);
  }

  fetchPrices(): void {
    this.bitcoinService.getBitcoinPriceFromCoinbase().subscribe(data => this.bitcoinCoinbase = `${data.data.amount} ${data.data.currency}`);
    this.bitcoinService.getBitcoinPriceFromBinance().subscribe(data => this.bitcoinBinance = `${(Math.round(data.price * 100) / 100).toFixed(2)} USD`);
    this.bitcoinService.getBitcoinPriceFromKraken().subscribe(data => this.bitcoinKraken = `${(Math.round(data.a[0] * 100) / 100).toFixed(2)}  USD`);
    
    this.ethereumService.getEthereumPriceFromCoinbase().subscribe(data => this.ethereumCoinbase = `${data.data.amount} ${data.data.currency}`);
    this.ethereumService.getEthereumPriceFromBinance().subscribe(data => this.ethereumBinance = `${(Math.round(data.price * 100) / 100).toFixed(2)} USD`);
    this.ethereumService.getEthereumPriceFromKraken().subscribe(data => this.ethereumKraken = `${(Math.round(data.a[0] * 100) / 100).toFixed(2)} USD`);

    this.litecoinService.getLitecoinPriceFromCoinbase().subscribe(data => this.litecoinCoinbase = `${data.data.amount} ${data.data.currency}`);
    this.litecoinService.getLitecoinPriceFromBinance().subscribe(data => this.litecoinBinance = `${(Math.round(data.price * 100) / 100).toFixed(2)} USD`);
    this.litecoinService.getLitecoinPriceFromKraken().subscribe(data => this.litecoinKraken = `${(Math.round(data.a[0] * 100) / 100).toFixed(2)} USD`);
  }
}

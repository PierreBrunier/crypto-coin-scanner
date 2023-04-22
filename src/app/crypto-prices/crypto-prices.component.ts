import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { BitcoinService } from './bitcoin.service';
import { EthereumService } from './ethereum.service';
import { LitecoinService } from './litecoin.service';
import { PlotlyService } from './plotly.service';


@Component({
  selector: 'app-crypto-prices',
  templateUrl: './crypto-prices.component.html',
  styleUrls: ['./crypto-prices.component.css']
})

export class CryptoPricesComponent implements OnInit {

  bitcoinPriceCoinBase: string;
  bitcoinPriceBinance: string;
  bitcoinPriceKraken: string;
  bitcoinPriceBitstamp: string;

  ethereumPriceCoinBase: string;
  ethereumPriceBinance: string;
  ethereumPriceKraken: string;
  ethereumPriceBitstamp: string;

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

  bitcoinHistCoinbase!: number[];
  bitcoinHistBinance!: number[];
  bitcoinHistKraken!: number[];


  //arr_name: [][] | undefined;


  constructor(private bitcoinService: BitcoinService, private ethereumService: EthereumService, private litecoinService: LitecoinService, private plot:PlotlyService) {
    this.bitcoinPriceCoinBase = 'Loading...';
    this.bitcoinPriceBinance = 'Loading...';
    this.bitcoinPriceKraken = 'Loading...';
    this.bitcoinPriceBitstamp = 'Loading...';

    this.ethereumPriceCoinBase = 'Loading...';
    this.ethereumPriceBinance = 'Loading...';
    this.ethereumPriceKraken = 'Loading...';
    this.ethereumPriceBitstamp = 'Loading...';
  }

  ngOnInit() {
    this.getBitcoinPrice();
    this.getEthereumPrice();

    // fetch initial prices on component initialization
    this.fetchPrices();
    
    // fetch latest prices every 10 seconds
    interval(10000).subscribe(() => {
      this.fetchPrices();
    });

    //let CoinBase:number[] = this.bitcoinHistCoinbase;//[1.5,2,3,4,5,1,2,3,4,5,1,2,3,4,5];
    //let BiNance:number[] = [2,3,4,6,4,2,3,4,6,4,2,3,4,6,4];
    //let KraKen:number[] = [4,5,2,3,3,4,5,2,3,3,4,5,2,3,3];
    //let TimeAgo:number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    //console.log(this.bitcoinHistCoinbase);
    this.plot.plotLine("Bitcoin prices in the last 15 minutes","plot",this.bitcoinHistCoinbase,this.bitcoinHistBinance,this.bitcoinHistKraken);

    
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

    this.bitcoinService.getBitcoinPriceHistFromCoinbase().subscribe(data => {
      const lastFifteenValues = data.slice(0,15);
      const firstValues = lastFifteenValues.reverse().map((value: number[]) => Number(value[4]));
      console.log(firstValues);
      this.bitcoinHistCoinbase = firstValues;
      this.plot.plotLine("Bitcoin prices in the last 15 minutes","plot",this.bitcoinHistCoinbase,this.bitcoinHistBinance,this.bitcoinHistKraken);

    });
    this.bitcoinService.getBitcoinPriceHistFromBinance().subscribe(data => {
      const lastFifteenValues = data.slice(-15);
      const firstValues = lastFifteenValues.map((value: number[]) => Number(value[4]));
      console.log(firstValues);
      this.bitcoinHistBinance = firstValues;
      this.plot.plotLine("Bitcoin prices in the last 15 minutes","plot",this.bitcoinHistCoinbase,this.bitcoinHistBinance,this.bitcoinHistKraken);
    });
    this.bitcoinService.getBitcoinPriceHistFromKraken().subscribe(data => {
      const lastFifteenValues = data.slice(-15);
      const firstValues = lastFifteenValues.map((value: number[]) => Number(value[4]));
      console.log(firstValues);
      this.bitcoinHistKraken = firstValues;
      this.plot.plotLine("Bitcoin prices in the last 15 minutes","plot",this.bitcoinHistCoinbase,this.bitcoinHistBinance,this.bitcoinHistKraken);
    });
    
    
  }

  getBitcoinPrice() {
    this.bitcoinService.getBitcoinPriceFromCoinbase().subscribe(response => {
      this.bitcoinPriceCoinBase = response.data.amount + ' ' + response.data.currency;
    });

    this.bitcoinService.getBitcoinPriceFromBinance().subscribe(response => {
      this.bitcoinPriceBinance = response.price + ' ' + response.symbol;
    });

    this.bitcoinService.getBitcoinPriceFromKraken().subscribe(response => {
      this.bitcoinPriceKraken = response.a[0] + ' USD';
    });

    this.bitcoinService.getBitcoinPriceFromBitstamp().subscribe(response => {
      this.bitcoinPriceBitstamp = response + ' USD';
    });

    this.bitcoinService.getBitcoinPriceHistFromCoinbase().subscribe(response => {
      this.bitcoinPriceCoinBase = response;
    });

    this.bitcoinService.getBitcoinPriceHistFromBinance().subscribe(response => {
      this.bitcoinPriceBinance = response;
    });

    this.bitcoinService.getBitcoinPriceHistFromKraken().subscribe(response => {
      this.bitcoinPriceKraken = response;
    });
  }

  getEthereumPrice() {
    this.ethereumService.getEthereumPriceFromCoinbase().subscribe(response => {
      this.ethereumPriceCoinBase = response.data.amount + ' ' + response.data.currency;
    });

    this.ethereumService.getEthereumPriceFromBinance().subscribe(response => {
      this.ethereumPriceBinance = response.price + ' ' + response.symbol;
    });

    this.ethereumService.getEthereumPriceFromKraken().subscribe(response => {
      this.ethereumPriceKraken = response.a[0] + ' USD'; 
    });

    this.ethereumService.getEthereumPriceFromBitstamp().subscribe(response => {
      this.ethereumPriceBitstamp = response + ' USD';
    });
  }

}


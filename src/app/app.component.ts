import { Component, OnInit } from '@angular/core';
import { BitcoinService } from './bitcoin.service';
import { EthereumService } from './ethereum.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: any;
  bitcoinPriceCoinBase: string;
  bitcoinPriceBinance: string;
  bitcoinPriceKraken: string;
  bitcoinPriceBitstamp: string;

  ethereumPriceCoinBase: string;
  ethereumPriceBinance: string;
  ethereumPriceKraken: string;
  ethereumPriceBitstamp: string;

  constructor(private bitcoinService: BitcoinService, private ethereumService: EthereumService) {
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

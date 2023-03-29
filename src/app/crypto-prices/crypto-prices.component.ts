import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

import { BitcoinService } from '../bitcoin.service';
import { EthereumService } from '../ethereum.service';

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

  constructor(private bitcoinService: BitcoinService, private ethereumService: EthereumService) {}

  ngOnInit() {
    // fetch initial prices on component initialization
    this.fetchPrices();
  
    // fetch latest prices every 10 seconds
    interval(10000).subscribe(() => {
      this.fetchPrices();
    });
  }

  fetchPrices(): void {
    this.bitcoinService.getBitcoinPriceFromCoinbase().subscribe(data => this.bitcoinCoinbase = `${data.data.amount} ${data.data.currency}`);
    this.bitcoinService.getBitcoinPriceFromBinance().subscribe(data => this.bitcoinBinance = `${(Math.round(data.price * 100) / 100).toFixed(2)} USD`);
    this.bitcoinService.getBitcoinPriceFromKraken().subscribe(data => this.bitcoinKraken = `${(Math.round(data.a[0] * 100) / 100).toFixed(2)}  USD`);
    
    this.ethereumService.getEthereumPriceFromCoinbase().subscribe(data => this.ethereumCoinbase = `${data.data.amount} ${data.data.currency}`);
    this.ethereumService.getEthereumPriceFromBinance().subscribe(data => this.ethereumBinance = `${(Math.round(data.price * 100) / 100).toFixed(2)} USD`);
    this.ethereumService.getEthereumPriceFromKraken().subscribe(data => this.ethereumKraken = `${(Math.round(data.a[0] * 100) / 100).toFixed(2)} USD`);
  }
}

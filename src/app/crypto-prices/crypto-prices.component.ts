import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.bitcoinService.getBitcoinPriceFromCoinbase().subscribe(data => this.bitcoinCoinbase = `${data.data.amount} ${data.data.currency}`);
    this.bitcoinService.getBitcoinPriceFromBinance().subscribe(data => this.bitcoinBinance = `${data.price} ${data.symbol}`);
    this.bitcoinService.getBitcoinPriceFromKraken().subscribe(data => this.bitcoinKraken = `${data.a[0]}  USD`);
    
    this.ethereumService.getEthereumPriceFromCoinbase().subscribe(data => this.ethereumCoinbase = `${data.data.amount} ${data.data.currency}`);
    this.ethereumService.getEthereumPriceFromBinance().subscribe(data => this.ethereumBinance = `${data.price} ${data.symbol}`);
    this.ethereumService.getEthereumPriceFromKraken().subscribe(data => this.ethereumKraken = `${data.a[0]} USD`);
  }
}

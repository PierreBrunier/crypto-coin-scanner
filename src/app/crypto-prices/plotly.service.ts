import { Injectable } from '@angular/core';

declare let Plotly: any;

@Injectable({
  providedIn: 'root'
})

export class PlotlyService {
  constructor() { }

  plotLine(title: string, plotDiv: string, CoinBase:number[], BiNance:number[], KraKen:number[]){     
    let coinbase = {
      x: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],    
      y: CoinBase,   
      name: 'Coinbase',
      type: 'scatter',
      line: {color: 'rgb(0, 76, 153)'}, 
      hovertemplate: '<i>Price</i>: $%{y:.2f}' +
                        '<br><b>%{text}</b>',
      text: ['15mins ago','14mins ago','13mins ago','12mins ago','11mins ago','10mins ago','9mins ago','8mins ago','7mins ago','6mins ago','5mins ago','4mins ago','3mins ago','2mins ago','last minute']
    };

    let binance = {
      x: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],    
      y: BiNance,   
      name: 'Binance',
      type: 'scatter',
      line: {color: 'rgb(246, 176, 83)'}, 
      hovertemplate: '<i>Price</i>: $%{y:.2f}' +
                        '<br><b>%{text}</b>',
      text: ['15mins ago','14mins ago','13mins ago','12mins ago','11mins ago','10mins ago','9mins ago','8mins ago','7mins ago','6mins ago','5mins ago','4mins ago','3mins ago','2mins ago','last minute']
    };

    let kraken = {
      x: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],    
      y: KraKen,
      name: 'Kraken',
      type: 'scatter',
      line: {color: 'rgb(0, 0, 0)'}, 
      hovertemplate: '<i>Price</i>: $%{y:.2f}' +
                        '<br><b>%{text}</b>',
      text: ['15mins ago','14mins ago','13mins ago','12mins ago','11mins ago','10mins ago','9mins ago','8mins ago','7mins ago','6mins ago','5mins ago','4mins ago','3mins ago','2mins ago','last minute'] 
    };     

    let layout = {
      title:title,
      showlegend: true,
      yaxis: {tickprefix: '$'},
      xaxis: {visible: false}
      /**legend: {"orientation": "h"}*/
    };
    
    Plotly.newPlot(plotDiv, [coinbase,binance,kraken], layout);   
    
  }

  
}
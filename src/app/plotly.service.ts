import { Injectable } from '@angular/core';

declare let Plotly: any;

@Injectable({
  providedIn: 'root'
})

export class PlotlyService {constructor() { }plotLine(title: string, plotDiv: string, x:number[], y:number[]){           
    let trace = {
      x: x,    
      y: y,   
      type: 'scatter'   
    };
                  
    let layout = {
      title:title
    };
    
    Plotly.newPlot(plotDiv, [trace], layout);     
}}
"use client"
import React, { Component } from "react";
import Chart from "react-apexcharts";

interface CandleChartData {
    x: number;
    y: number[];
  }
  
  interface CandleChartSeries {
    data: CandleChartData[];
  }
  
  interface CandleChartState {
    options: {
      chart: {
        id: string;
      };
      xaxis: {
        categories: number[];
      };
    };
    series: CandleChartSeries[];
  }
  
  class CandleChart extends Component<{}, CandleChartState> { // <--- Use the interface here
    constructor(props: any) {
      super(props);
  
      this.state = {
        options: {
          chart: {
            id: "candlestick",
          },
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
          },
        },
        series: [
          {
            data: [
              {
                x: 1, // Fixed leading zeros
                y: [51.98, 56.29, 51.59, 53.85],
              },
              {
                x: 2, // Fixed leading zeros
                y: [53.66, 54.99, 51.35, 52.95],
              },
              {
                x: 3, // Fixed leading zeros
                y: [52.76, 57.35, 52.15, 57.03],
              },
            ],
          },
        ],
      };
    }
  
    render() {
      return (
        <div className="app">
          <div className="row">
            <div className="candlestick">
              <Chart
                options={this.state.options}
                series={this.state.series}
                type="candlestick" // Changed to "candlestick" to match your intent
                width="500"
                height="450"
              />
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default CandleChart;
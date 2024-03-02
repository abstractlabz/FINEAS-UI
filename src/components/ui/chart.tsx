"use client";
import React, { Component } from "react";
import Chart from "react-apexcharts";
import { useState } from "react";

class CandleChart extends Component {
    constructor(props: any) {
        super(props);
        
        

        const volumedata = [
            { x: 1, y: 458256 },
            { x: 2, y: 345212 },
            { x: 3, y: 207461 },
            { x: 4, y: 268907 },
            { x: 5, y: 137523 },
            { x: 6, y: 318021 },
            { x: 7, y: 205083 },
            { x: 8, y: 129690 },
            { x: 9, y: 198714 },
            { x: 10, y: 170352 },
            { x: 11, y: 126001 }
        ];
    
        const pricedata: {
            x: number;
            y: number[];
        }[] = [
            { x: 1, y: [51.98, 53.27, 51.59, 52.95] },
            { x: 2, y: [53.08, 53.14, 52.15, 52.48] },
            { x: 3, y: [52.33, 54.48, 51.96, 53.90] },
            { x: 4, y: [53.90, 54.90, 53.11, 53.61] },
            { x: 5, y: [53.72, 53.98, 52.55, 52.95] },
            { x: 6, y: [52.96, 53.78, 52.10, 52.67] },
            { x: 7, y: [52.68, 53.29, 52.10, 52.62] },
            { x: 8, y: [52.70, 53.70, 51.64, 52.13] },
            { x: 9, y: [52.00, 52.95, 51.89, 52.48] },
            { x: 10, y: [52.50, 52.78, 51.54, 52.29] },
            { x: 11, y: [52.23, 53.18, 52.13, 52.79] }
        ];
    
        // Set fillColor for volumedata based on pricedata
        const coloredVolumeData = volumedata.map((volume, index) => {
            if (index < pricedata.length) { // Ensure there's a corresponding price data
                const price = pricedata[index];
                const openPrice = price.y[0];
                const closePrice = price.y[3]; // Use the closing price
                const fillColor = closePrice > openPrice ? '#00B746' : '#EF403C'; // Determine color
                return { ...volume, fillColor };
            } else {
                // Handle the case where there's no corresponding price data
                // For example, by setting a default color or excluding the data point
                return { ...volume, fillColor: '#000000' }; // Default or fallback color
            }
        });
        
    
        this.state = {
          options: {
            chart: {
              id: "candlestick-volume",
              type: "candlestick",
              height: 350,
            },
            title: {
                text: "NVDA/USD",
                align: "center",
                style: {
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                }
              },
              xaxis: {
                type: "category",
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001],
                labels: {
                  style: {
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '12px',
                  }
                }
              },
              yaxis: [
                  {
                    // Configuration for the Price axis
                    title: {
                      text: "Price",
                      style: {
                        fontFamily: 'Arial, sans-serif',
                        fontSize: '14px',
                      }
                    },
                    labels: {
                      style: {
                        fontFamily: 'Arial, sans-serif',
                        fontSize: '12px',
                      }
                    }
                  },
                  {
                    // Configuration for the Volume axis
                    opposite: true,
                    title: {
                      text: "Volume",
                      style: {
                        fontFamily: 'Arial, sans-serif',
                        fontSize: '14px',
                      }
                    },
                    labels: {
                      style: {
                        fontFamily: 'Arial, sans-serif',
                        fontSize: '12px',
                      },
                      formatter: (value: any) => { return value.toFixed(0); }
                    },
                    axisTicks: {
                      show: false,
                    },
                    axisBorder: {
                      show: false,
                    },
                    min: 60000, // Ensure bars start from the bottom
                    max: 5000000, // Remove or adjust max if it's causing scaling issues
                    // Remove or adjust max if it's causing scaling issues
                  }
                ],
            plotOptions: {
              bar: {
                colors: {
                  ranges: [{
                    from: 0,
                    to: 0,
                    color: undefined, // This will be set dynamically
                  }],
                },
                columnWidth: '40%',
              }
            },
          },
          series: [
            {
              name: "Price",
              type: "candlestick",
              data: pricedata,
            },
            {
              name: "Volume",
              type: "bar",
              data: coloredVolumeData,
            },
          ],
        };
      }

      render() {
        return (
            <div className="app">
                <div className="row">
                    <div className="mixed-chart">
                        <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="line" // You might want to change this to "candlestick" if that's what you're aiming for
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
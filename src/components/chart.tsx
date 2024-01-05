import React, { useState } from 'react';
import ApexCharts from 'react-apexcharts';

const LineGraph = ({ data, tickerName }) => {
    const [series, setSeries] = useState([{
        name: tickerName || 'Series 1', // Use ticker name if provided
        data: data || [30, 40, 35, 50, 49, 60, 70, 91]
    }]);

    const options = {
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            },
            toolbar: {
                show: true,
                tools: {
                    download: true, // Show the download tool
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                    reset: true | '<img src="/static/icons/reset.png" width="20">',
                    customIcons: []
                },
                // Add export menu options
                export: {
                    csv: {
                        filename: `${tickerName}_Data`,
                        columnDelimiter: ',',
                        headerCategory: 'category',
                        headerValue: 'value',
                        dateFormatter(timestamp: string | number | Date) {
                            return new Date(timestamp).toDateString();
                        }
                    },
                    svg: {
                        filename: `${tickerName}_Data`,
                    },
                    png: {
                        filename: `${tickerName}_Data`,
                    }
                },
                autoSelected: 'zoom' 
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight',
            colors: ['#28a745'] // Line color set to green
        },
        title: {
            text: tickerName ? `${tickerName}: Historical Data` : 'Line Graph', // Dynamic title
            align: 'left',
            style: {
                color: '#ffffff' // Title color
            }
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            labels: {
                style: {
                    colors: '#ffffff' // X-axis labels color
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#ffffff' // Y-axis labels color
                }
            }
        },
        tooltip: {
            theme: 'dark' // Tooltip theme
        },
    };

    return (
        
        <>
        <div id="chart">
            <ApexCharts options={options} series={series} type="line" height={350} />
        </div>
        <style jsx global>{`
            .apexcharts-menu.apexcharts-menu-open {
                color: black;
            }

            .apexcharts-menu-item:hover {
                background-color: #f3f3f3;
                color: black;
            }

            .apexcharts-menu-item {
                color: black;
            }
        `}</style>
    </>
    );
};

export default LineGraph;

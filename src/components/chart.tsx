import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';

const LineGraph = ({tickerName}) => {
    const [series, setSeries] = useState([{ name: '', data: [] }]);

    useEffect(() => {
        const fetchData = async () => {
            const now = new Date();
            const sixMonthsAgo = new Date();
            sixMonthsAgo.setMonth(now.getMonth() - 6);

            try {
                // Replace vX with the correct API version
                const response = await axios.get(`https://api.polygon.io/v2/aggs/ticker/${tickerName}/range/1/day/${formatDate(sixMonthsAgo)}/${formatDate(now)}`, {
                    params: {
                        apiKey: process.env.NEXT_PUBLIC_POLY_API_KEY // Replace with your actual API key
                    }
                });

                const formattedData = response.data.results.map(item => ({
                    x: new Date(item.t).toLocaleDateString(),
                    y: item.c
                }));

                setSeries([{ name: tickerName, data: formattedData }]);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Additional logging for debugging
                console.log(`Requested URL: ${error.config.url}`);
                console.log(`Response data: ${error.response?.data}`);
            }
        };

        if (tickerName) {
            fetchData();
        }
    }, [tickerName]);

    const formatDate = (date) => {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };


    const options = {
        chart: {
            height: 370,
            type: 'line',
            zoom: {
                enabled: false
            },
            toolbar: {
                show: true,
                tools: {
                    download: true,
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                    reset: true | '<img src="/static/icons/reset.png" width="20">',
                    customIcons: []
                },
                export: {
                    csv: {
                        filename: `${tickerName}_Data`,
                        columnDelimiter: ',',
                        headerCategory: 'category',
                        headerValue: 'value',
                        dateFormatter: function (timestamp: any) {
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
            colors: ['#2d9e57']
        },
        title: {
            text: tickerName ? `${tickerName}: Historical Data` : 'Line Graph',
            align: 'left',
            style: {
                color: '#ffffff'
            }
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        xaxis: {
            type: 'datetime',
            labels: {
                style: {
                    colors: '#ffffff'
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#ffffff'
                }
            }
        },
        tooltip: {
            theme: 'dark'
        },
    };

    return (
        <>
            <div id="chart">
                <ApexCharts options={options} series={series} type="line" height={340} />
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

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts'; // Updated import

interface LineChartProps {
    tickerName: string;
}

interface ApiResponse {
    results: Array<{
        t: number; // Assuming 't' is a timestamp
        c: number; // Assuming 'c' is the value you need
    }>;
}

const LineChart: React.FC<LineChartProps> = ({ tickerName }) => {
    const [series, setSeries] = useState([{ name: '', data: [] }]);

    useEffect(() => {
        // Async function declared inside useEffect
        const fetchData = async () => {
            const now = new Date();
            const sixMonthsAgo = new Date();
            sixMonthsAgo.setMonth(now.getMonth() - 6);

            try {
                const response = await axios.get<ApiResponse>(`https://api.polygon.io/v2/aggs/ticker/${tickerName}/range/1/day/${formatDate(sixMonthsAgo)}/${formatDate(now)}`, {
                    params: {
                        apiKey: process.env.NEXT_PUBLIC_POLY_API_KEY
                    }
                });

                const formattedData = response.data.results.map(item => ({
                    x: new Date(item.t).toLocaleDateString(),
                    y: item.c
                }));

                setSeries([{ name: tickerName, data: formattedData }]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (tickerName) {
            // Call fetchData and handle any potential errors
            fetchData().catch(console.error);
        }
    }, [tickerName]);

    const formatDate = (date: Date) => {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };

    const chartType: ApexOptions["chart"]["type"] = "line";
    const strokeType: ApexOptions["stroke"]["curve"] = "straight";
    const alignType: ApexOptions["title"]["align"] = "left";
    const dateType: ApexOptions["xaxis"]["type"] = "datetime";

    const options: ApexOptions = {
        chart: {
          height: 350,
          type: chartType,
          zoom: {
            enabled: true
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
              reset: true
            }
          },
          background: '#3e0699'
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: strokeType,
          width: 5,
          colors: ['#39FF14']
        },
        title: {
          text: tickerName + " Historical Data",
          align: alignType,
            style: {
                color: '#ffffff'
            }
        },
        grid: {
          borderColor: "#e7e7e7",
          row: {
            colors: ["#f3f3f3", "transparent"],
            opacity: 0.5
          }
        },
        xaxis: {
          type: dateType,
          categories: [],
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

            #chart {
                background: #3e0699;
            }
        `}</style>
        </>
    );
};

export default LineChart;

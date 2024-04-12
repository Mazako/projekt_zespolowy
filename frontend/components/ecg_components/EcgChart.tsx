import React, {FC, useEffect, useRef, useState} from 'react';
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';

const EKGChart: FC<{ fileId?: string }> = ({ fileId }) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const [dataX, setDataX] = useState<number[]>([]);
    const [dataY, setDataY] = useState<number[]>([]);

    useEffect(() => {
        if (fileId) {
            const fetchData = async () => {
                const signalType = 'I';
                const response = await fetch(`/api/ecd?fileId=${fileId}&signal_type=${signalType}`);
                const json = await response.json();

                const period = 1 / json.frequency;
                const generatedDataX = Array.from({length: json.data.length}, (_, index) => period * index);

                setDataY(json.data);
                setDataX(generatedDataX);
            };
            fetchData();
        }
    }, [fileId]);

    useEffect(() => {
        let chartInstance: Chart | null = null;

        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                Chart.register(zoomPlugin);

                chartInstance = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: dataX.map(x => x.toString()),
                        datasets: [{
                            label: 'Sygnał EKG',
                            data: dataY,
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1,
                            pointRadius: 0,
                            pointHoverRadius: 5,
                            hoverBackgroundColor: 'rgb(255, 99, 132)',
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: false,
                                min: Math.min(...dataY),
                                max: Math.max(...dataY),
                            },
                            x: {
                                type: 'linear',
                                position: 'bottom',
                                min: dataX[0],
                                max: dataX[dataX.length - 1]
                            }
                        },
                        plugins: {
                            zoom: {
                                pan: {
                                    enabled: true,
                                    mode: 'x',
                                },
                                zoom: {
                                    wheel: {
                                        enabled: true,
                                    },
                                    pinch: {
                                        enabled: true,
                                    },
                                    mode: 'x',
                                }
                            }
                        },
                        interaction: {
                            mode: 'nearest',
                            intersect: false,
                            axis: 'x'
                        }
                    }
                });
            }
        }

        return () => {
            if (chartInstance) {
                chartInstance.destroy();
                chartInstance = null;
            }
        };
    }, [dataX, dataY]);

    return <canvas ref={chartRef} />;
};

export default EKGChart;

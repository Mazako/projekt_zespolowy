import React, {FC, useEffect, useRef, useState} from 'react';
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';
import annotationPlugin from "chartjs-plugin-annotation";
import {EcdSettings, EcgJsonData} from "@/utilsTypeScript/ecdChart/types/ecgFiles";
import {createAnnotations} from "@/utilsTypeScript/ecdChart/chartUtils";
import {Annotation} from "@/utilsTypeScript/ecdChart/types/annotations";


const EKGChart: FC<{ fileId?: string, signalType?: string, settings?:EcdSettings }> = ({ fileId,signalType,settings }) => {

    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const [dataX, setDataX] = useState<number[]>([]);
    const [dataY, setDataY] = useState<number[]>([]);
    const [ecgData, setEcgData] = useState<EcgJsonData | null>(null);
    const [annotations, setAnnotations] = useState<Annotation[]>([]);
    const dragStartRef = useRef<{ x: number; y: number } | null>(null);
    const chartInstanceRef = useRef<Chart | null>(null);

    const handleMouseDown = (event: MouseEvent) => {
        if (event.button !== 2) return;

        const chart = chartInstanceRef.current;
        if (chart && chartRef.current) {
            const rect = chartRef.current.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const xValue = chart.scales.x.getValueForPixel(x) ?? 0;
            const yValue = chart.scales.y.getValueForPixel(y) ?? 0;
            dragStartRef.current = { x: xValue, y: yValue };
        }
    };

    const handleMouseUp = (event: MouseEvent) => {
        if (event.button !== 2) return;

        const chart = chartInstanceRef.current;
        if (chart && dragStartRef.current && chartRef.current) {
            const rect = chartRef.current.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const xValue = chart.scales.x.getValueForPixel(x) ?? 0;
            const yValue = chart.scales.y.getValueForPixel(y) ?? 0;

            const newAnnotation: Annotation = {
                type: 'box',
                xMin: Math.min(dragStartRef.current.x, xValue),
                xMax: Math.max(dragStartRef.current.x, xValue),
                yMin: Math.min(dragStartRef.current.y, yValue),
                yMax: Math.max(dragStartRef.current.y, yValue),
                borderColor: 'rgba(0,0,0)',
                backgroundColor: 'rgba(255, 99, 132, 0.25)',
            };

            setAnnotations(prevAnnotations => [...prevAnnotations, newAnnotation]);
            dragStartRef.current = null;

        }
    };

    useEffect(() => {
        if (chartRef.current) {
            const canvas = chartRef.current;
            canvas.addEventListener('mousedown', handleMouseDown);
            canvas.addEventListener('mouseup', handleMouseUp);
            return () => {
                canvas.removeEventListener('mousedown', handleMouseDown);
                canvas.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, []);

    useEffect(() => {
        if (settings && ecgData) {
            const newAnnotations = createAnnotations(settings,ecgData);
            setAnnotations(newAnnotations);
        }
    }, [settings]);

    useEffect(() => {
        if (fileId && signalType) {
            const fetchData = async () => {
                const response = await fetch(`/api/ecd?fileId=${fileId}&signal_type=${signalType}`);
                const json = await response.json();
                const signals = json.signals;
                setEcgData({
                    data: signals[signalType].data,
                    annotations: undefined,
                    frequency: json.frequency,
                    P: signals[signalType].P,
                    Q: signals[signalType].Q,
                    R: signals[signalType].R,
                    S: signals[signalType].S,
                    T: signals[signalType].T
                });
                const period = 1 / json.frequency;
                const generatedDataX = Array.from({length: signals[signalType].data.length}, (_, index) => period * index);

                setDataY(signals[signalType].data);
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
                Chart.register(annotationPlugin);
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
                        animation: {
                            duration: 0,
                        },
                        scales: {
                            y: {
                                beginAtZero: false,
                                min: -1,
                                max: 1
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
                            },
                            annotation: {
                                annotations: annotations.map(ann => {
                                        return {
                                            type: ann.type,
                                            xMin: ann.xMin,
                                            xMax: ann.xMax,
                                            yMin: ann.yMin,
                                            yMax: ann.yMax,
                                            borderColor: ann.backgroundColor,
                                            backgroundColor: ann.backgroundColor,
                                        };
                                })
                            }
                        },
                        interaction: {
                            mode: 'nearest',
                            intersect: false,
                            axis: 'x'
                        }
                    }
                });
                chartInstanceRef.current = chartInstance;
            }
        }
        return () => {
            if (chartInstance) {
                chartInstance.destroy();
                chartInstance = null;
            }
        };
    }, [dataX, dataY,annotations]);
    return <canvas ref={chartRef} />;
};

export default EKGChart;

import React, {FC, useEffect, useRef, useState} from 'react';
import Chart, {ActiveElement, ChartEvent} from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';
import annotationPlugin from "chartjs-plugin-annotation";
import {EcdSettings, EcgJsonData} from "@/utilsTypeScript/ecdChart/types/ecgFiles";
import {convertToPosition, createAnnotations} from "@/utilsTypeScript/ecdChart/chartUtils";
import {Annotation} from "@/utilsTypeScript/ecdChart/types/annotations";



const EKGChart: FC<{ fileId?: string, signalType?: string, settings:EcdSettings }> = ({ fileId,signalType,settings }) => {

    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const [dataX, setDataX] = useState<number[]>([]);
    const [dataY, setDataY] = useState<number[]>([]);
    const [ecgData, setEcgData] = useState<EcgJsonData | null>(null);
    const [annotations, setAnnotations] = useState<Annotation[]>([]);
    const [currentR, setCurrentR] = useState(0); // New state to manage R index

    const chartInstanceRef = useRef<Chart | null>(null);

    const handleChartClick = async (_: ChartEvent, elements: ActiveElement[]) => {
        if (!elements.length || !settings.addPMode || !chartInstanceRef.current) {
            return;
        }
        const response = await fetch('/api/addP', {
            method: "POST",
            cache: "no-cache",
            body: JSON.stringify({
                ecd_id: fileId,
                signal: signalType,
                index: elements[0].index
            }),
        })

        if (response.ok) {
            const data = await response.json() as string[];
            setEcgData(prev => {
                if (!prev || !prev.P) {
                    return prev;
                }
                return {
                    ...prev,
                    P: data
                }
            });
        }

        chartInstanceRef.current.update();
    }

    useEffect(() => {
        if (settings && ecgData) {
            const newAnnotations = createAnnotations(settings,ecgData);
            setAnnotations(newAnnotations);
        }
    }, [settings, ecgData]);

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
            fetchData().then();
        }
    }, [fileId, signalType]);


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
                        onClick: handleChartClick,
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

    const changeWindow = (inc : number) =>{

        if (inc ==0 ){
            //@ts-ignore
            chartInstanceRef.current.options.scales.x.min = 0;
            //@ts-ignore
            chartInstanceRef.current.options.scales.x.max = 10;
            chartInstanceRef.current?.update();
            setCurrentR(0);
            return;
        }
        const newIndex = currentR + inc;
        console.log(newIndex)
        if (ecgData?.R && (newIndex <0 || newIndex > ecgData.R.length -2) ){
            return;
        }
        setCurrentR(newIndex);


        if (ecgData?.R) {
            const lastIndex = ecgData.R.length - 1;
            let xMin, xMax;

            if (newIndex < lastIndex-1) {
                xMin = convertToPosition(ecgData.R[newIndex]);
                xMax = convertToPosition(ecgData.R[newIndex + 2]);
            }else if (newIndex === lastIndex-1) {
                xMin = convertToPosition(ecgData.R[newIndex]);
                xMax = convertToPosition(ecgData.R[newIndex+1]) +convertToPosition(ecgData.R[0]);
            } else {
                return;
            }
            //@ts-ignore
            chartInstanceRef.current.options.scales.x.min = xMin + 0.1
            //@ts-ignore
            chartInstanceRef.current.options.scales.x.max = xMax - 0.1
            chartInstanceRef.current?.update();

        }

    }


    return (
        <div className={"text-center"}>
            <canvas ref={chartRef} />
            {ecgData && ecgData.R && (
                <div className={"mt-2"}>
                    <button className={"btn btn-primary mx-1"} onClick={() => changeWindow(0)}>Reset</button>
                    <button className={"btn btn-primary mx-1"} onClick={() => changeWindow(1)}>Kolejny</button>
                    <button className={"btn btn-primary mx-1"} onClick={() => changeWindow(-1)}>Poprzedni</button>
                </div>
            )}
        </div>
    );
};

export default EKGChart;

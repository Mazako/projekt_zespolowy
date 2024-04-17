
export type LineAnnotation = {
    type: 'line';
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
    borderColor: string;
    backgroundColor: string;
};

export type BoxAnnotation = {
    type: 'box';
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
    borderColor: string;
    backgroundColor: string;
};

export type Annotation = LineAnnotation | BoxAnnotation;
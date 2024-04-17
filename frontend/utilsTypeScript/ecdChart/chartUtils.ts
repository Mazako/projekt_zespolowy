import {EcdSettings, EcgJsonData} from "@/utilsTypeScript/ecdChart/types/ecgFiles";
import {LineAnnotation} from "@/utilsTypeScript/ecdChart/types/annotations";


const convertToPosition = (timeStr: string) => {
    const parts = timeStr.split(':');
    const hours = parseFloat(parts[0]);
    const minutes = parseFloat(parts[1]);
    const seconds = parseFloat(parts[2]);
    return hours * 3600 + minutes * 60 + seconds;
};

export function createAnnotations(settings?: EcdSettings, ecdData?: EcgJsonData): LineAnnotation[] {
    const annotations: LineAnnotation[] = [];
    if (settings) {
        const addAnnotation = (pos: number, color: string) => {
            annotations.push({
                type: 'line',
                xMin: pos,
                xMax: pos,
                yMin: -0.6,
                yMax: 0.6,
                backgroundColor: color,
                borderColor: color
            });
        };

        if (settings.showP && ecdData?.P) {
            ecdData.P.map(convertToPosition).forEach(pos => addAnnotation(pos, 'rgb(255, 0, 0)'));
        }
        if (settings.showQ && ecdData?.Q) {
            ecdData.Q.map(convertToPosition).forEach(pos => addAnnotation(pos, 'rgb(255, 165, 0)'));
        }
        if (settings.showR && ecdData?.R) {
            ecdData.R.map(convertToPosition).forEach(pos => addAnnotation(pos, 'rgb(0, 0, 255)'));
        }
        if (settings.showS && ecdData?.S) {
            ecdData.S.map(convertToPosition).forEach(pos => addAnnotation(pos, 'rgb(0, 0, 0)'));
        }
        if (settings.showT && ecdData?.T) {
            ecdData.T.map(convertToPosition).forEach(pos => addAnnotation(pos, 'rgb(60, 179, 113)'));
        }
    }
    return annotations;
}


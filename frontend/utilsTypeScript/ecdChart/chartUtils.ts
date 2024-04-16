// utils/chartUtils.ts

import {EcdSettings, EcgJsonData} from "@/utilsTypeScript/Interfaces/EcgFiles";
import {LineAnnotation} from "@/components/ecg_components/EcgChart";


export const updateSettingsFromData = (data: EcgJsonData, currentSettings: EcdSettings): EcdSettings => {
    console.log("Data",data.P?.map(convertToPosition));
    return  {
        ...currentSettings,
        showP: currentSettings.showP,
        pPosition: data.P?.map(convertToPosition) ??[],
        showQ: currentSettings.showQ,
        qPosition: data.Q?.map(convertToPosition)??[],
        showR: currentSettings.showR,
        rPosition: data.R?.map(convertToPosition)??[],
        showS: currentSettings.showS,
        sPosition: data.S?.map(convertToPosition)??[],
        showT: currentSettings.showT,
        tPosition: data.T?.map(convertToPosition)??[],
    };
};

const convertToPosition = (timeStr: string) => {
    console.log(timeStr);
    const [hours, minutes, seconds] = timeStr.split(':').map(parseFloat);
    return hours * 3600 + minutes * 60 + seconds;
};


export function createAnnotations(settings?: EcdSettings): LineAnnotation[] {
    const annotations: LineAnnotation[] = [];
    console.log("Anotacje w seting", settings);
    if (settings) {
        const addAnnotation = (pos: number, color: string) => {
            annotations.push({
                type: 'line',
                xMin: pos,
                xMax: pos,
                yMin: -0.3,
                yMax: 0.3,
                backgroundColor: color
            });
        };

        if (settings.showP && settings.pPosition) {
            settings.pPosition.forEach(pos => addAnnotation(pos, 'red'));
        }
        if (settings.showQ && settings.qPosition) {
            settings.qPosition.forEach(pos => addAnnotation(pos, 'yellow'));
        }
        if (settings.showR && settings.rPosition) {
            settings.rPosition.forEach(pos => addAnnotation(pos, 'blue'));
        }
        if (settings.showS && settings.sPosition) {
            settings.sPosition.forEach(pos => addAnnotation(pos, 'gray'));
        }
        if (settings.showT && settings.tPosition) {
            settings.tPosition.forEach(pos => addAnnotation(pos, 'green'));
        }
    }
    return annotations;
}

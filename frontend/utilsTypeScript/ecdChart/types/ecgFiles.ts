export interface FileDetails {
    _id: string;
    filename: string;
    length: string;
}

export interface EcgJsonData {
    P?: string[];
    Q?: string[];
    R?: string[];
    S?: string[];
    T?: string[];
    annotations?: string[]
    frequency: number;
    data: number[];
}

export interface EcdSettings {
    showP: boolean;
    showQ: boolean;
    showR: boolean;
    showS: boolean;
    showT: boolean;
    addPMode: boolean;

    colors: {
        P: string;
        Q: string;
        R: string;
        S: string;
        T: string;
    }
}


export interface EcgMenuProps {
    onSelectionChange: (settings: EcdSettings) => void;
    ecdId?: string,
}

export type Verdict = 'bradycardia' | 'tachycardia' | 'normal' | 'cannot determine'

export interface ConditionAnalyzeResponse {
    pBeforeQrsI: boolean
    pBeforeQrsII: boolean,
    pBeforeQrsAVR: boolean,
    pPositiveI?: boolean
    pPositiveII?: boolean
    pNegativeAVR?: boolean
    bpm?: number,
    verdict: Verdict
}

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
}


export interface EcgMenuProps {
    onSelectionChange: (settings: EcdSettings) => void;
}
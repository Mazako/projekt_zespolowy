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
    pPosition?: number[];
    showQ: boolean;
    qPosition?: number[];
    showR: boolean;
    rPosition?: number[];
    showS: boolean;
    sPosition?: number[];
    showT: boolean;
    tPosition?: number[];
}


export interface EcgMenuProps {
    onSelectionChange: (settings: EcdSettings) => void;
}
'use client'

import EKGChart from "@/components/ecg_components/EcgChart";
import UploadButton from "@/components/ecg_components/UploadButton";
import {useEffect, useState} from "react";
import {EcdSettings, FileDetails} from "@/utilsTypeScript/Interfaces/EcgFiles";
import EcgMenu from "@/components/ecg_components/EcgMenu";
const EcgPage =  () => {

    const [selectedFileId, setSelectedFileId] = useState<string>();
    const [selectedSignalType, setSelectedSignalType] = useState<string>();
    const [ecdSettings,setEcdSettings] = useState<EcdSettings>({ showP: false, showQ: false, showR: false, showS: false, showT: false });

    const handleSelectFile = (fileId: string, signalType: string) => {
        setSelectedFileId(fileId);
        setSelectedSignalType(signalType);
    };

    useEffect(() => {
        console.log(selectedFileId, selectedSignalType);
        console.log(ecdSettings);
    }, [selectedFileId, selectedSignalType,ecdSettings]);

    return (
        <div className="container-fluid h-100">
            <div className="row mb-3 mt-4">
                <div className="col">
                    <UploadButton onSelectFile={handleSelectFile} />
                </div>
            </div>
            <div className="row flex-grow-1">
                <div className="col-lg-10 col-md-10">
                    <EKGChart fileId={selectedFileId} signalType={selectedSignalType} settings={ecdSettings}/>
                </div>
                <div className="col-lg-2 col-md-2 pe-4"> {}
                    <EcgMenu onSelectionChange={setEcdSettings} />
                </div>
            </div>
        </div>
    );
};
export default EcgPage;
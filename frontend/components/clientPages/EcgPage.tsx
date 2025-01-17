'use client';

import EKGChart from "@/components/ecg_components/EcgChart";
import UploadButton from "@/components/ecg_components/UploadButton";
import {useState} from "react";
import {EcdSettings} from "@/utilsTypeScript/ecdChart/types/ecgFiles";
import EcgMenu from "@/components/ecg_components/EcgMenu";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const EcgPage = () => {

    const [selectedFileId, setSelectedFileId] = useState<string>();
    const [selectedSignalType, setSelectedSignalType] = useState<string>();
    const [ecdSettings, setEcdSettings] = useState<EcdSettings>({
        showP: false,
        showQ: false,
        showR: false,
        showS: false,
        showT: false,
        addPMode: false,
        colors:{
            P: '#ff0000',
            Q: '#ffa500',
            R: '#0000ff',
            S: '#000000',
            T: '#3cb371'
        }
    });

    const handleSelectFile = (fileId: string, signalType: string) => {
        console.log(fileId, signalType)
        setSelectedFileId(fileId);
        setSelectedSignalType(signalType);
    };

    return (
        <div className="container-fluid h-100">
            <div className="row mb-3 mt-4">
                <div className="col">
                    <UploadButton onSelectFile={handleSelectFile}/>
                </div>
            </div>
            <div className="row flex-grow-1">
                <div className="col-lg-10 col-md-10">
                    <EKGChart fileId={selectedFileId} signalType={selectedSignalType} settings={ecdSettings}/>
                </div>
                <div className="col-lg-2 col-md-2 pe-4"> {}
                    <EcgMenu onSelectionChange={setEcdSettings} ecdId={selectedFileId}/>
                </div>
            </div>
            <ToastContainer position='bottom-right' />
        </div>
    );
};
export default EcgPage;

'use client'

import EKGChart from "@/components/ecg_components/EcgChart";
import UploadButton from "@/components/ecg_components/UploadButton";
import {useEffect, useState} from "react";
import {FileDetails} from "@/ResponseBody/EcgFiles";
const EcgPage =  () =>{

    const [selectedFileId, setSelectedFileId] = useState<string>();
    const [selectedSignalType,setSelectedSignalType] = useState<string>();

    useEffect(() => {
        console.log(selectedFileId);
        console.log(selectedSignalType);
    }, [selectedFileId]);

    return (
        <>
            <UploadButton onSelectFile={setSelectedFileId}/>
            <EKGChart fileId={selectedFileId}/>
        </>)
};
export default EcgPage

'use client'

import EKGChart from "@/components/ecg_components/EcgChart";
import UploadButton from "@/components/ecg_components/UploadButton";
const EcgPage =  () =>{

    return (
        <>
            <UploadButton/>
            <EKGChart/>
        </>)
};
export default EcgPage

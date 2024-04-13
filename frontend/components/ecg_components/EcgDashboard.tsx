import React from 'react';
import UploadButton from "@/components/ecg_components/UploadButton";
import EKGChart from "@/components/ecg_components/EcgChart";
import EcgMenu from "@/components/ecg_components/EcgMenu";

const EcgDashboard = () => {
    return (
        <div className="container-fluid h-100">
            <div className="row mb-3 mt-4">
            </div>
            <div className="row flex-grow-1">
                <div className="col-lg-10 col-md-10">
                    <EKGChart/>

                </div>
                <div className="col-lg-2 col-md-2">
                    <EcgMenu />
                </div>
            </div>
        </div>
    );
}

export default EcgDashboard;

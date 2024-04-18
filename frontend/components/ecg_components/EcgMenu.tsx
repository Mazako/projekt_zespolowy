'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from "react";
import {EcgMenuProps} from "@/utilsTypeScript/ecdChart/types/ecgFiles";



const EcgMenu: React.FC<EcgMenuProps> = ({ onSelectionChange }) => {
    const [showP, setShowP] = useState(false);
    const [showQ, setShowQ] = useState(false);
    const [showR, setShowR] = useState(false);
    const [showS, setShowS] = useState(false);
    const [showT, setShowT] = useState(false);

    const handleChange = () => {
        onSelectionChange({
            showP, showQ, showR, showS, showT
        });
    };

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md- col-lg-12">
                    <div className="p-3 mb-2 bg-light border rounded">
                        <h4 className="mb-3">EKG Ustawienia</h4>
                        <div className="form-check mb-2">
                            <input className="form-check-input" type="checkbox" checked={showP}
                                   onChange={() => setShowP(!showP)} id="flexCheckP"/>
                            <label className="form-check-label">Pokaż załamki P</label>
                        </div>
                        <div className="form-check mb-2">
                            <input className="form-check-input" type="checkbox" checked={showQ}
                                   onChange={() => setShowQ(!showQ)} id="flexCheckQ"/>
                            <label className="form-check-label">Pokaż załamkiQ</label>
                        </div>
                        <div className="form-check mb-2">
                            <input className="form-check-input" type="checkbox" checked={showR}
                                   onChange={() => setShowR(!showR)} id="flexCheckR"/>
                            <label className="form-check-label">Pokaż załamki R</label>
                        </div>
                        <div className="form-check mb-2">
                            <input className="form-check-input" type="checkbox" checked={showS}
                                   onChange={() => setShowS(!showS)} id="flexCheckS"/>
                            <label className="form-check-label">Pokaż załamki S</label>
                        </div>
                        <div className="form-check mb-2">
                            <input className="form-check-input" type="checkbox" checked={showT}
                                   onChange={() => setShowT(!showT)} id="flexCheckT"/>
                            <label className="form-check-label">Pokaż załamki T</label>
                        </div>
                        <button className="btn btn-primary mt-2" onClick={handleChange}>Zastosuj</button>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default EcgMenu;

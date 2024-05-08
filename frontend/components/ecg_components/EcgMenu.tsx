'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from "react";
import {ConditionAnalyzeResponse, EcgMenuProps} from "@/utilsTypeScript/ecdChart/types/ecgFiles";
import {EcgConditionAnalyzer} from "@/components/ecg_components/EcgConditionAnalyzer";



const EcgMenu: React.FC<EcgMenuProps> = ({ onSelectionChange, ecdId}) => {
    const [showP, setShowP] = useState(false);
    const [showQ, setShowQ] = useState(false);
    const [showR, setShowR] = useState(false);
    const [showS, setShowS] = useState(false);
    const [showT, setShowT] = useState(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [conditionAnalyzeResponse, setConditionAnalyzeResponse] = useState<ConditionAnalyzeResponse>()


    const handleChange = () => {
        onSelectionChange({
            showP, showQ, showR, showS, showT
        });
    };

    const handleAnalyzeClick = async () => {
        if (!ecdId) {
            alert('Najpierw wybierz plik')
            return;
        }
        const data = await (await fetch(`/api/analyze?ecd_id=${ecdId}`)).json() as ConditionAnalyzeResponse;
        setConditionAnalyzeResponse(data);
        setModalVisible(true);
    }

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md- col-lg-12">
                    <div className="p-3 mb-2 bg-light border rounded">
                        <h4 className="mb-3 text-center">Ustawienia EKG</h4>
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
                        <div className='d-flex flex-column'>
                            <button className="btn btn-primary mt-2" onClick={handleChange}>Zastosuj</button>
                            <button className="btn btn-primary mt-2" onClick={handleAnalyzeClick}>Przeanalizuj sygnał</button>
                        </div>
                    </div>
                </div>
            </div>
            <EcgConditionAnalyzer visible={modalVisible} setVisible={setModalVisible} conditionAnalyze={conditionAnalyzeResponse}/>
        </div>
    );
}

export default EcgMenu;

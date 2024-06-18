'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState, useRef } from "react";
import { ConditionAnalyzeResponse, EcgMenuProps } from "@/utilsTypeScript/ecdChart/types/ecgFiles";
import { EcgConditionAnalyzer } from "@/components/ecg_components/EcgConditionAnalyzer";
import { toast } from "react-toastify";
import { SketchPicker } from 'react-color';
import { useClickAway } from 'react-use';

const EcgMenu: React.FC<EcgMenuProps> = ({ onSelectionChange, ecdId }) => {
    const [showP, setShowP] = useState(false);
    const [showQ, setShowQ] = useState(false);
    const [showR, setShowR] = useState(false);
    const [showS, setShowS] = useState(false);
    const [showT, setShowT] = useState(false);
    const [addPMode, setAddPMode] = useState(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [conditionAnalyzeResponse, setConditionAnalyzeResponse] = useState<ConditionAnalyzeResponse>();
    const [colors, setColors] = useState({
        P: '#ff0000',
        Q: '#ffa500',
        R: '#0000ff',
        S: '#000000',
        T: '#3cb371'
    });
    const [colorPickerVisible, setColorPickerVisible] = useState<string | null>(null);
    const colorPickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        onSelectionChange({
            showP, showQ, showR, showS, showT, addPMode, colors
        });
    }, [showP, showQ, showR, showS, showT, addPMode, colors]);

    useClickAway(colorPickerRef, () => {
        setColorPickerVisible(null);
    });

    const handleAnalyzeClick = async () => {
        if (!ecdId) {
            alert('Najpierw wybierz plik');
            return;
        }
        const data = await (await fetch(`/api/analyze?ecd_id=${ecdId}`)).json() as ConditionAnalyzeResponse;
        setConditionAnalyzeResponse(data);
        setModalVisible(true);
    };

    const handleAddPModeClick = () => {
        if (!addPMode) {
            toast('Włączono tryb dodawania załamków P. Klikaj lewym przyciskiem na wykres w miejsce, gdzie chcesz dodać załamek.')
        } else {
            toast('Wyłączono tryb dodawania załamków P.')
        }
        setAddPMode(!addPMode);
    }

    const handleColorChange = (component: string, color: string) => {
        setColors({ ...colors, [component]: color });
    }

    const toggleColorPicker = (component: string) => {
        setColorPickerVisible(colorPickerVisible === component ? null : component);
    }

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md- col-lg-12">
                    <div className="p-3 mb-2 bg-light border rounded">
                        <h4 className="mb-3 text-center">Ustawienia EKG</h4>
                        <div className="form-check mb-2 d-flex justify-content-between">
                            <input className="form-check-input" type="checkbox" checked={showP}
                                   onChange={() => {
                                       setShowP(!showP);
                                       setAddPMode(false);
                                   }} id="flexCheckP" />
                            <label className="form-check-label me-2">Pokaż załamki P</label>
                            <div
                                style={{ backgroundColor: colors.P, width: '20px', height: '20px', cursor: 'pointer' }}
                                onClick={() => toggleColorPicker('P')}
                            />
                            {colorPickerVisible === 'P' && (
                                <div ref={colorPickerRef} style={{ position: 'absolute', zIndex: 2 }}>
                                    <SketchPicker
                                        color={colors.P}
                                        onChangeComplete={(color) => handleColorChange('P', color.hex)}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="form-check mb-2 d-flex justify-content-between">
                            <input className="form-check-input" type="checkbox" checked={showQ}
                                   onChange={() => setShowQ(!showQ)} id="flexCheckQ" />
                            <label className="form-check-label me-2">Pokaż załamki Q</label>
                            <div
                                style={{ backgroundColor: colors.Q, width: '20px', height: '20px', cursor: 'pointer' }}
                                onClick={() => toggleColorPicker('Q')}
                            />
                            {colorPickerVisible === 'Q' && (
                                <div ref={colorPickerRef} style={{ position: 'absolute', zIndex: 2 }}>
                                    <SketchPicker
                                        color={colors.Q}
                                        onChangeComplete={(color) => handleColorChange('Q', color.hex)}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="form-check mb-2 d-flex justify-content-between">
                            <input className="form-check-input" type="checkbox" checked={showR}
                                   onChange={() => setShowR(!showR)} id="flexCheckR" />
                            <label className="form-check-label me-2">Pokaż załamki R</label>
                            <div
                                style={{ backgroundColor: colors.R, width: '20px', height: '20px', cursor: 'pointer' }}
                                onClick={() => toggleColorPicker('R')}
                            />
                            {colorPickerVisible === 'R' && (
                                <div ref={colorPickerRef} style={{ position: 'absolute', zIndex: 2 }}>
                                    <SketchPicker
                                        color={colors.R}
                                        onChangeComplete={(color) => handleColorChange('R', color.hex)}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="form-check mb-2 d-flex justify-content-between">
                            <input className="form-check-input" type="checkbox" checked={showS}
                                   onChange={() => setShowS(!showS)} id="flexCheckS" />
                            <label className="form-check-label me-2">Pokaż załamki S</label>
                            <div
                                style={{ backgroundColor: colors.S, width: '20px', height: '20px', cursor: 'pointer' }}
                                onClick={() => toggleColorPicker('S')}
                            />
                            {colorPickerVisible === 'S' && (
                                <div ref={colorPickerRef} style={{ position: 'absolute', zIndex: 2 }}>
                                    <SketchPicker
                                        color={colors.S}
                                        onChangeComplete={(color) => handleColorChange('S', color.hex)}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="form-check mb-2 d-flex justify-content-between">
                            <input className="form-check-input" type="checkbox" checked={showT}
                                   onChange={() => setShowT(!showT)} id="flexCheckT" />
                            <label className="form-check-label me-2">Pokaż załamki T</label>
                            <div
                                style={{ backgroundColor: colors.T, width: '20px', height: '20px', cursor: 'pointer' }}
                                onClick={() => toggleColorPicker('T')}
                            />
                            {colorPickerVisible === 'T' && (
                                <div ref={colorPickerRef} style={{ position: 'absolute', zIndex: 2 }}>
                                    <SketchPicker
                                        color={colors.T}
                                        onChangeComplete={(color) => handleColorChange('T', color.hex)}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="d-flex flex-column">
                            <button className="btn btn-primary mt-2" onClick={handleAnalyzeClick}>
                                Przeanalizuj sygnał
                            </button>
                            {
                                showP
                                &&
                                <button className="btn btn-primary mt-2"
                                        onClick={handleAddPModeClick}
                                        style={{ backgroundColor: addPMode ? "red" : "green" }}>
                                    {(addPMode ? 'Wyłącz' : 'Włącz') + ' tryb dodawania P'}
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <EcgConditionAnalyzer visible={modalVisible} setVisible={setModalVisible}
                                  conditionAnalyze={conditionAnalyzeResponse} />
        </div>
    );
};

export default EcgMenu;

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure Bootstrap CSS is imported

const EcgMenu = () => {
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md- col-lg-12">
                    <div className="p-3 mb-2 bg-light border rounded">
                        <h4 className="mb-3">EKG Ustawienia</h4>
                        <div className="form-check mb-2">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label">
                                Pokaż załamki P
                            </label>
                        </div>
                        <div className="form-check mb-2">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                            <label className="form-check-label">
                                Pokaż załamki T
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EcgMenu;

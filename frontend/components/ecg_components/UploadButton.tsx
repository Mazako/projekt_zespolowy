'use client'
import React, {useEffect, useState} from 'react';
import { Dropdown } from 'react-bootstrap';

const UploadButton = () => {

    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Wybierz opcję
            </Dropdown.Toggle>
            <Dropdown.Menu>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default UploadButton;

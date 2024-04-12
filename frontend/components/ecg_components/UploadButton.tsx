'use client'
import React, {useEffect, useState} from 'react';
import {Button, Dropdown} from 'react-bootstrap';
import {FileDetails} from "@/ResponseBody/EcgFiles";

const UploadButton = ({ onSelectFile }: { onSelectFile: (fileId: string) => void }) => {

    const [selectedFile, setSelectedFile] = useState<FileDetails | null>(null);
    const [selectedSignalType, setSelectedSignalType] = useState('');

    const [files, setFiles] = useState<FileDetails[]>([]);


    useEffect(() => {
        async function fetchFiles(){
            const response = await fetch("/api/getAllEcd")
            if (response.ok){
                const data = await response.json();
                console.log(data);
                const ecgFiles = data.map((item: any) =>{
                    return {
                        _id: item._id || '',
                        filename: item.filename || 'Unknown',
                        length: item.length || '00:00:00',
                    };
                })
                setFiles(ecgFiles);
            }else{
                console.error("Failed to fetch files")
            }
        }
        fetchFiles();
    }, []);

    const handleFileSelect = (file: FileDetails) => {
        setSelectedFile(file);
    };


    const handleSignalTypeSelect = (signalType: string): void => {
        setSelectedSignalType(signalType);
    };

    const handleSubmit = () => {
        console.log('ID:', selectedFile?._id);
        console.log('Type:', selectedSignalType);
    };
    return (
        <div className="d-flex align-items-start">
            <Dropdown className="me-2">
                <Dropdown.Toggle variant="primary" id="dropdown-basic-files">
                    {selectedFile ? selectedFile.filename : 'Wybierz plik'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {files.map(file => (
                        <Dropdown.Item key={file._id} onClick={() => onSelectFile(file._id)}>
                            {file.filename}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown className="me-2">
                <Dropdown.Toggle variant="primary" id="dropdown-basic-signals">
                    {selectedSignalType || 'Wybierz sygnał'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleSignalTypeSelect('I')}>I</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSignalTypeSelect('II')}>II</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Button variant="primary" onClick={handleSubmit}>
                Wyślij
            </Button>
        </div>
    );
};


export default UploadButton;

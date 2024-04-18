import React, { useEffect, useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { FileDetails } from "@/utilsTypeScript/ecdChart/types/ecgFiles";

const UploadButton = ({ onSelectFile }: { onSelectFile: (fileId: string, signalType: string) => void }) => {
    const [selectedFile, setSelectedFile] = useState<FileDetails | null>(null);
    const [selectedSignalType, setSelectedSignalType] = useState('');

    const [files, setFiles] = useState<FileDetails[]>([]);

    useEffect(() => {
        async function fetchFiles() {
            const response = await fetch("/api/allFiles")
            if (response.ok) {
                const data = await response.json();
                const ecgFiles = data.map((item: any) => ({
                    _id: item._id || '',
                    filename: item.filename || 'Unknown',
                    length: item.length || '00:00:00',
                }));
                setFiles(ecgFiles);
            } else {
                console.error("Failed to fetch files");
            }
        }
        fetchFiles();
    }, []);

    const handleSubmit = () => {
        if (selectedFile && selectedSignalType) {
            onSelectFile(selectedFile._id, selectedSignalType);
        }
    };

    return (
        <div className="d-flex align-items-start">
            <Dropdown className="me-2">
                <Dropdown.Toggle variant="primary" id="dropdown-basic-files">
                    {selectedFile ? selectedFile.filename : 'Wybierz plik'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {files.map(file => (
                        <Dropdown.Item key={file._id} onClick={() => setSelectedFile(file)}>
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
                    <Dropdown.Item onClick={() => setSelectedSignalType('I')}>I</Dropdown.Item>
                    <Dropdown.Item onClick={() => setSelectedSignalType('II')}>II</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Button variant="primary" onClick={handleSubmit}>
                Wyślij
            </Button>
        </div>
    );
};
export default UploadButton;

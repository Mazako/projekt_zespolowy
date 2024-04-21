import React, {FC, useState} from "react";
import {FileContainer} from "@/components/send_ecd/FileContainer";
import {Button, Spinner} from "react-bootstrap";
import {enqueueSnackbar, SnackbarProvider} from "notistack";

export const SendEcdForm: FC<{countIncrement: Function}> = ({countIncrement}) => {
    const [heaFile, setHeaFile] = useState<File | null>(null);
    const [matFile, setMatFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const handleUploadButton = async () => {
        setLoading(true);
        const formData = new FormData();
        if (heaFile && matFile) {
            formData.set('mat', matFile);
            formData.set('hea', heaFile);
            const response = await fetch('/api/uploadFile', {
                method: "POST",
                body: formData
            });
            console.log(response.status)
            if (response.status === 201) {
                enqueueSnackbar('Pomyślnie wysłano plik!', {variant: 'success'})
                countIncrement()
            } else {
                enqueueSnackbar('Nie udało się wysłać pliku.', {variant: 'error'})
            }

        }
        setLoading(false);
    }

    return (<>
        <SnackbarProvider anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}/>
        <div className='d-flex justify-content-around p-xxl-5'>
            <FileContainer title='Wybierz plik hea' file={heaFile} setFile={setHeaFile}/>
            <FileContainer title='Wybierz plik mat' file={matFile} setFile={setMatFile}/>
        </div>
        <div className='d-flex justify-content-center gap-3'>
            <Button className="px-lg-3" disabled={!matFile || !heaFile || loading} onClick={handleUploadButton}>Wyślij</Button>
            <Spinner className={loading ? 'd-block' : 'd-none'}></Spinner>
        </div>
    </>)
}

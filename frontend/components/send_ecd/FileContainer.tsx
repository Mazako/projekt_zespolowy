import React, {ChangeEvent, DragEventHandler, FC} from "react";
import styles from './FileContainer.module.css'

type FileContainerProps = {
    title: string,
    file: File | null,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
}
export const FileContainer: FC<FileContainerProps> = ({title, file, setFile}) => {
    const fileRef = React.useRef<HTMLInputElement>(null);
    const [drag, setDrag] = React.useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    }

    const handleButtonClick = () => {
        if (fileRef.current) {
            fileRef.current.click();
        }
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDrag(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDrag(false);
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFile(e.dataTransfer.files[0]);
        }
        setDrag(false);
    };


    return (<>
        <div className={drag ? styles.hover : styles.fc} onClick={handleButtonClick} onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
            <img src='/icons/file.svg' alt="file icon" width={50} height={50}/>
            <p className='text-primary'>{title}</p>
            {file == null || <p className={styles.spacer}>Wybrano plik: {file.name}</p>}
        </div>

        <input type="file"
               onChange={handleFileChange}
               ref={fileRef}
               className='d-none'/>
    </>);
}

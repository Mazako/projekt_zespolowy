import React, {FC} from "react";
import styles from './FileContainer.module.css'

export const FileContainer: FC<{
    title: string,
    file: File | null,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
}> = ({title, file, setFile}) => {
    const fileRef = React.useRef<HTMLInputElement>(null);

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

    return (<>
        <div className={styles.fc} onClick={handleButtonClick}>
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

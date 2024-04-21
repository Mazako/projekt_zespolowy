'use client';
import {SendEcdForm} from "@/components/send_ecd/SendEcdForm";
import {useEffect, useState} from "react";

export const SendEcdPage = () => {
    const [signalCount, setSignalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const maxCount = Number(process.env.NEXT_PUBLIC_MAX_FILES);

    const canSend = (count: number, max: number) :boolean => count < max;

    const incrementSignalCount = () => {
        setSignalCount(count => count + 1);
    }

    useEffect(() => {
        const getEcdSize = async () => {
            const request = await fetch(`api/ecdSize`);
            return Number(await request.json());
        }

        getEcdSize().then(count =>{
            setSignalCount(count);
            setLoading(false);
        });
    }, [])

    return (
        loading || <div>
            <h1>Wysyłanie sygnału EKG</h1>
            <p>(Aktualna ilość sygnałów w bazie: {signalCount} / {maxCount})</p>
            {
                canSend(signalCount, maxCount)
                    ? <SendEcdForm countIncrement={incrementSignalCount} />
                    : <h2 className='text-danger text-center'>Baza danych sygnałów została zapełniona</h2>
            }
        </div>
    )
}
